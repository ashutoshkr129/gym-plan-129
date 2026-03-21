// ─── WORKOUT MODULE ───────────────────────────────────────────────────────────
// Renders workout days, exercise cards, logging, history,
// rest timer, personal best, exercise swap, completion marking.
// ──────────────────────────────────────────────────────────────────────────────

const Workout = (() => {

  // ── State ──────────────────────────────────────────────────────────────────

  let currentDay      = 'push-a';
  let timerInterval   = null;
  let timerRemaining  = 0;
  let currentModalEx  = null;
  let initialized     = false;

  // ── Init ───────────────────────────────────────────────────────────────────

  function init() {
    if (initialized) return;
    initialized = true;
    renderDayPills();
    switchDay(getDefaultDay());
  }

  function getDefaultDay() {
    const dayOfWeek = new Date().getDay();
    return SCHEDULE[dayOfWeek] || 'push-a';
  }

  // ── Day Pills ──────────────────────────────────────────────────────────────

  function renderDayPills() {
    const container = document.getElementById('dayScroll');
    if (!container) return;

    const days = Object.keys(EXERCISES);
    container.innerHTML = days.map(key => {
      const day  = EXERCISES[key];
      const done = Storage.isCompleted(key);
      return `
        <button class="day-pill ${day.type} ${done ? 'completed' : ''}"
          onclick="Workout.switchDay('${key}', this)"
          id="pill-${key}">
          ${day.day}
          ${done ? '<span class="pill-check">✓</span>' : ''}
        </button>`;
    }).join('');
  }

  // ── Switch Day ─────────────────────────────────────────────────────────────

  function switchDay(dayKey, pillEl) {
    currentDay = dayKey;
    stopTimer();

    // update pills
    document.querySelectorAll('.day-pill').forEach(p => p.classList.remove('active'));
    const pill = pillEl || document.getElementById('pill-' + dayKey);
    if (pill) pill.classList.add('active');

    renderDay(dayKey);
    // scroll workout page to top
    const workoutPage = document.getElementById('page-workout');
    if (workoutPage) workoutPage.scrollTop = 0;
  }

  // ── Render Day ─────────────────────────────────────────────────────────────

  function renderDay(dayKey) {
    const container = document.getElementById('dayContent');
    if (!container) return;

    const day  = EXERCISES[dayKey];
    if (!day)  return;

    const done = Storage.isCompleted(dayKey);

    container.innerHTML = `
      ${renderDayHeader(day, dayKey, done)}
      ${renderSection('Warm Up', renderInfoList(day.warmup))}
      ${renderSection('Exercises', renderExercises(day.exercises, day.type))}
      ${renderSection('Core Work', renderInfoList(day.core))}
      ${renderSection('Stretching', renderInfoList(day.stretching))}
      ${renderNotesSection(dayKey)}
      ${renderCompleteBtn(dayKey, done)}
    `;

    renderAllHistories();
  }

  // ── Day Header ─────────────────────────────────────────────────────────────

  function renderDayHeader(day, dayKey, done) {
    return `
      <div class="day-hdr-card ${day.type}">
        <div class="day-accent ${day.type}-acc"></div>
        <div class="day-hdr-info">
          <div class="day-hdr-title">${day.day}</div>
          <div class="day-hdr-sub">${day.muscles} — ${day.focus}</div>
        </div>
        <div class="day-hdr-right">
          <div class="day-hdr-tag">${day.dayTag}</div>
          <button class="share-btn" onclick="App.shareWorkout('${dayKey}')" title="Share workout">⬆</button>
        </div>
      </div>`;
  }

  // ── Section Wrapper ────────────────────────────────────────────────────────

  function renderSection(label, content) {
    return `
      <div class="section-hdr">
        <div class="section-line"></div>
        <div class="section-label">${label}</div>
        <div class="section-line"></div>
      </div>
      ${content}`;
  }

  // ── Info List ──────────────────────────────────────────────────────────────

  function renderInfoList(items) {
    return `
      <div class="info-card">
        ${items.map(item => `
          <div class="info-item">
            <div class="info-dot"></div>
            <span>${item}</span>
          </div>`).join('')}
      </div>`;
  }

  // ── Exercises ──────────────────────────────────────────────────────────────

  function renderExercises(exercises, type) {
    return exercises.map(ex => renderExCard(ex, type)).join('');
  }

  function renderExCard(ex, type) {
    const pb = Storage.getPersonalBest(ex.id);
    return `
      <div class="ex-card" id="card-${ex.id}">
        <div class="ex-top">
          <div class="ex-name">${ex.name}</div>
          <div class="sets-badge">${ex.sets}</div>
        </div>
        <div class="ex-desc">${ex.desc}</div>
        <div class="ex-links">
          <a class="ex-link" href="${ex.youtube}" target="_blank">Watch ↗</a>
          <a class="ex-link" href="${ex.guide}"   target="_blank">Guide ↗</a>
          <button class="ex-link swap-btn" onclick="Workout.showSwap('${ex.id}')">Swap ↔</button>
        </div>
        <div class="rest-row">Rest: ${ex.rest}</div>

        <div class="ex-actions">
          <button class="log-btn ${type}" onclick="Workout.handleLog('${ex.id}', '${ex.name}', this)">
            + Log Session
          </button>
          <button class="timer-btn" onclick="Workout.startTimer('${ex.id}', '${ex.rest}')">
            ⏱ Timer
          </button>
        </div>

        <div class="timer-display" id="timer-${ex.id}" style="display:none;">
          <div class="timer-ring">
            <span class="timer-text" id="timer-text-${ex.id}">0:00</span>
          </div>
          <button class="timer-stop" onclick="Workout.stopTimer()">Stop</button>
        </div>

        <div class="log-inline" id="inline-${ex.id}">
          <div class="log-row">
            <div class="log-input-wrap">
              <div class="log-label">Weight (kg)</div>
              <input class="log-input" type="number" placeholder="${ex.weightPlaceholder}"
                min="0" step="0.5" id="w-${ex.id}">
            </div>
            <div class="log-input-wrap">
              <div class="log-label">Reps / Time</div>
              <input class="log-input" type="text" placeholder="${ex.repsPlaceholder}"
                id="r-${ex.id}">
            </div>
          </div>
          <button class="log-save" onclick="Workout.saveLog('${ex.id}', '${ex.name}')">
            Save Session
          </button>
        </div>

        <div class="swap-panel" id="swap-${ex.id}" style="display:none;">
          <div class="swap-title">Alternative Exercises</div>
          ${ex.alternatives.map(alt => `
            <div class="swap-option" onclick="Workout.confirmSwap('${ex.id}', '${alt}')">
              ${alt}
            </div>`).join('')}
          <button class="swap-close" onclick="Workout.hideSwap('${ex.id}')">Cancel</button>
        </div>

        <div class="history-strip" id="hist-${ex.id}"></div>

        ${pb ? `<div class="pb-badge" id="pb-${ex.id}">🏆 PB: ${pb.weight > 0 ? pb.weight + 'kg' : 'BW'} × ${pb.reps}</div>` : ''}
      </div>`;
  }

  // ── Notes Section ──────────────────────────────────────────────────────────

  function renderNotesSection(dayKey) {
    const notes = Storage.getNotes(dayKey);
    return `
      <div class="section-hdr">
        <div class="section-line"></div>
        <div class="section-label">Session Notes</div>
        <div class="section-line"></div>
      </div>
      <div class="notes-card">
        <textarea class="notes-input" id="notes-${dayKey}"
          placeholder="How did the session feel? Any PRs, pain points, or observations..."
          oninput="Workout.saveNotes('${dayKey}')"
        >${notes}</textarea>
      </div>`;
  }

  function saveNotes(dayKey) {
    const el = document.getElementById('notes-' + dayKey);
    if (el) Storage.saveNotes(dayKey, el.value);
  }

  // ── Complete Button ────────────────────────────────────────────────────────

  function renderCompleteBtn(dayKey, done) {
    return `
      <div class="complete-section">
        ${done
          ? `<div class="complete-done">✓ Session Completed</div>`
          : `<button class="complete-btn" onclick="Workout.markComplete('${dayKey}')">
               Mark Session Complete
             </button>`
        }
      </div>`;
  }

  function markComplete(dayKey) {
    Storage.markCompleted(dayKey);
    App.haptic('success');
    App.showToast('Session marked complete! 💪');
    App.renderTodayBanner();
    App.renderStreak();
    renderDayPills();
    renderDay(dayKey);
  }

  // ── Log Handling ───────────────────────────────────────────────────────────

  function handleLog(exId, exName, btn) {
    const style = Storage.getSettings().logStyle;
    if (style === 'inline') {
      const inline = document.getElementById('inline-' + exId);
      if (!inline) return;
      const isOpen = inline.classList.contains('open');
      inline.classList.toggle('open');
      btn.textContent = isOpen ? '+ Log Session' : '− Cancel';
    } else {
      showModal(exId, exName);
    }
    App.haptic('light');
  }

  function saveLog(exId, exName) {
    const wEl = document.getElementById('w-' + exId);
    const rEl = document.getElementById('r-' + exId);
    if (!rEl?.value) { App.showToast('Enter reps or time'); return; }

    const weight = wEl?.value || '0';
    const reps   = rEl.value;
    const isPB   = Storage.isPersonalBest(exId, weight);

    Storage.saveLog(exId, weight, reps);
    renderHistory(exId);
    updatePBBadge(exId);

    // close inline
    const inline = document.getElementById('inline-' + exId);
    if (inline) inline.classList.remove('open');
    const btn = document.querySelector(`[onclick*="handleLog('${exId}'"]`);
    if (btn) btn.textContent = '+ Log Session';

    if (isPB && parseFloat(weight) > 0) {
      App.showToast('🏆 New Personal Best!');
      App.haptic('success');
    } else {
      App.showToast('Session logged ✓');
      App.haptic('medium');
    }
  }

  // ── Popup Modal ────────────────────────────────────────────────────────────

  function showModal(exId, exName) {
    currentModalEx = { id: exId, name: exName };
    const modal = document.getElementById('logModal');
    const title = document.getElementById('logModalTitle');
    const wIn   = document.getElementById('logModalWeight');
    const rIn   = document.getElementById('logModalReps');

    if (title) title.textContent = 'Log: ' + exName;
    if (wIn)   wIn.value = '';
    if (rIn)   rIn.value = '';
    if (modal) modal.classList.add('open');
  }

  function closeModal() {
    const modal = document.getElementById('logModal');
    if (modal) modal.classList.remove('open');
    currentModalEx = null;
  }

  function saveFromModal() {
    if (!currentModalEx) return;
    const wEl = document.getElementById('logModalWeight');
    const rEl = document.getElementById('logModalReps');
    if (!rEl?.value) { App.showToast('Enter reps or time'); return; }

    const isPB = Storage.isPersonalBest(currentModalEx.id, wEl?.value || '0');
    Storage.saveLog(currentModalEx.id, wEl?.value || '0', rEl.value);
    renderHistory(currentModalEx.id);
    updatePBBadge(currentModalEx.id);
    closeModal();

    if (isPB && parseFloat(wEl?.value) > 0) {
      App.showToast('🏆 New Personal Best!');
      App.haptic('success');
    } else {
      App.showToast('Session logged ✓');
      App.haptic('medium');
    }
  }

  // ── Personal Best Badge ────────────────────────────────────────────────────

  function updatePBBadge(exId) {
    const pb  = Storage.getPersonalBest(exId);
    const el  = document.getElementById('pb-' + exId);
    if (!pb)  return;

    const label = pb.weight > 0 ? `${pb.weight}kg × ${pb.reps}` : `BW × ${pb.reps}`;

    if (el) {
      el.textContent = '🏆 PB: ' + label;
    } else {
      const card = document.getElementById('card-' + exId);
      if (card) {
        const badge = document.createElement('div');
        badge.className = 'pb-badge';
        badge.id = 'pb-' + exId;
        badge.textContent = '🏆 PB: ' + label;
        card.appendChild(badge);
      }
    }
  }

  // ── History Strip ──────────────────────────────────────────────────────────

  function renderHistory(exId) {
    const el      = document.getElementById('hist-' + exId);
    if (!el) return;

    const history = Storage.getLog(exId);
    if (!history.length) { el.innerHTML = ''; return; }

    el.innerHTML = `
      <div class="history-title">Last ${history.length} session${history.length > 1 ? 's' : ''}</div>
      <div class="history-scroll">
        ${history.map(h => {
          const wLabel = h.weight > 0 ? h.weight + 'kg' : 'BW';
          return `
            <div class="history-item">
              <div class="history-date">${h.date}</div>
              <div class="history-weight">${wLabel}</div>
              <div class="history-reps">${h.reps}</div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function renderAllHistories() {
    const cards = document.querySelectorAll('[id^="hist-"]');
    cards.forEach(el => {
      const exId = el.id.replace('hist-', '');
      renderHistory(exId);
    });
    // also update PB badges
    const day = EXERCISES[currentDay];
    if (day) day.exercises.forEach(ex => updatePBBadge(ex.id));
  }

  // ── Rest Timer ─────────────────────────────────────────────────────────────

  function parseRestSeconds(restStr) {
    // e.g. "3 min", "90 sec", "2 min"
    const minMatch = restStr.match(/(\d+)\s*min/);
    const secMatch = restStr.match(/(\d+)\s*sec/);
    if (minMatch) return parseInt(minMatch[1]) * 60;
    if (secMatch) return parseInt(secMatch[1]);
    return 60;
  }

  function startTimer(exId, restStr) {
    stopTimer();
    const seconds = parseRestSeconds(restStr);
    timerRemaining = seconds;

    const display = document.getElementById('timer-' + exId);
    if (display) display.style.display = 'flex';

    updateTimerDisplay(exId);
    App.haptic('light');

    timerInterval = setInterval(() => {
      timerRemaining--;
      updateTimerDisplay(exId);

      if (timerRemaining <= 0) {
        stopTimer();
        App.haptic('success');
        App.showToast('Rest complete — next set! 💪');
        if (display) display.style.display = 'none';
      }
    }, 1000);
  }

  function updateTimerDisplay(exId) {
    const el  = document.getElementById('timer-text-' + exId);
    if (!el) return;
    const m   = Math.floor(timerRemaining / 60);
    const s   = timerRemaining % 60;
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    // hide all timer displays
    document.querySelectorAll('.timer-display').forEach(d => d.style.display = 'none');
  }

  // ── Exercise Swap ──────────────────────────────────────────────────────────

  function showSwap(exId) {
    const panel = document.getElementById('swap-' + exId);
    if (panel) panel.style.display = 'block';
    App.haptic('light');
  }

  function hideSwap(exId) {
    const panel = document.getElementById('swap-' + exId);
    if (panel) panel.style.display = 'none';
  }

  function confirmSwap(exId, altName) {
    App.showConfirm(
      `Swap to "${altName}" for this session?`,
      () => {
        const nameEl = document.querySelector(`#card-${exId} .ex-name`);
        if (nameEl) nameEl.textContent = altName;
        hideSwap(exId);
        App.showToast(`Swapped to ${altName}`);
      }
    );
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  return {
    init,
    switchDay,
    handleLog,
    saveLog,
    saveFromModal,
    closeModal,
    renderAllHistories,
    markComplete,
    saveNotes,
    startTimer,
    stopTimer,
    showSwap,
    hideSwap,
    confirmSwap
  };

})();
