// ─── OVERLOAD MODULE ──────────────────────────────────────────────────────────
// Renders progressive overload tab — overload rules, body stats
// tracker with chart, deload reminder, workout notes per day.
// ──────────────────────────────────────────────────────────────────────────────

const Overload = (() => {

  let initialized = false;

  // ── Init ───────────────────────────────────────────────────────────────────

  function init() {
    if (initialized) return;
    initialized = true;
    render();
  }

  function render() {
    const container = document.getElementById('overloadContent');
    if (!container) return;

    container.innerHTML = `
      ${renderDeloadBanner()}
      ${renderBodyStats()}
      ${renderOverloadRules()}
      ${renderGeneralRules()}
    `;

    renderChart();
  }

  // ── Deload Banner ──────────────────────────────────────────────────────────

  function renderDeloadBanner() {
    const weeks = Storage.getWeeksSinceStart();
    const due   = Storage.isDeloadDue();

    return `
      <div class="deload-banner ${due ? 'visible' : ''}" id="deloadBanner">
        <div class="deload-icon">⚠️</div>
        <div class="deload-info">
          <div class="deload-title">Deload Week Due</div>
          <div class="deload-sub">
            ${weeks} weeks since you started. Reduce all weights by 40–50% this week.
          </div>
        </div>
        <button class="deload-dismiss" onclick="App.dismissDeload()">Done ✓</button>
      </div>`;
  }

  // ── Body Stats ─────────────────────────────────────────────────────────────

  function renderBodyStats() {
    const stats  = Storage.getBodyStats();
    const latest = stats.length ? stats[stats.length - 1] : null;

    return `
      <div class="section-hdr">
        <div class="section-line"></div>
        <div class="section-label">Body Stats</div>
        <div class="section-line"></div>
      </div>

      <div class="stats-log-card">
        <div class="stats-log-top">
          <div class="stats-current">
            <div class="stats-current-item">
              <div class="stats-current-label">Current Weight</div>
              <div class="stats-current-val" id="currentWeight">
                ${latest ? latest.weight + ' kg' : '75.0 kg'}
              </div>
            </div>
            <div class="stats-current-item">
              <div class="stats-current-label">Body Fat</div>
              <div class="stats-current-val" id="currentBF">
                ${latest?.bodyFat ? latest.bodyFat + '%' : '24.1%'}
              </div>
            </div>
            <div class="stats-current-item">
              <div class="stats-current-label">Target</div>
              <div class="stats-current-val target-val">69.7 kg</div>
            </div>
          </div>
          <button class="log-stat-btn" onclick="Overload.toggleStatForm()">
            + Log Stats
          </button>
        </div>

        <div class="stat-form" id="statForm" style="display:none;">
          <div class="log-row">
            <div class="log-input-wrap">
              <div class="log-label">Weight (kg)</div>
              <input class="log-input" type="number" id="statWeight"
                placeholder="e.g. 74.5" min="30" max="200" step="0.1">
            </div>
            <div class="log-input-wrap">
              <div class="log-label">Body Fat % (optional)</div>
              <input class="log-input" type="number" id="statBF"
                placeholder="e.g. 23.5" min="5" max="50" step="0.1">
            </div>
          </div>
          <button class="log-save" onclick="Overload.saveStat()">Save Stats</button>
        </div>
      </div>

      <div class="chart-card" id="chartCard">
        <div class="chart-tabs">
          <button class="chart-tab active" id="chartTabWeight"
            onclick="Overload.switchChart('weight')">Weight</button>
          <button class="chart-tab" id="chartTabBF"
            onclick="Overload.switchChart('bf')">Body Fat %</button>
        </div>
        <div class="chart-wrap">
          <canvas id="statsChart"></canvas>
        </div>
        ${stats.length < 2
          ? '<div class="chart-empty">Log at least 2 entries to see your progress chart</div>'
          : ''}
      </div>

      ${renderStatsHistory(stats)}
    `;
  }

  function renderStatsHistory(stats) {
    if (!stats.length) return '';
    const recent = [...stats].reverse().slice(0, 10);
    return `
      <div class="stats-history">
        <div class="stats-history-title">Recent Entries</div>
        ${recent.map(s => `
          <div class="stats-history-item">
            <span class="stats-history-date">${s.date}</span>
            <span class="stats-history-weight">${s.weight} kg</span>
            <span class="stats-history-bf">${s.bodyFat ? s.bodyFat + '%' : '—'}</span>
          </div>`).join('')}
      </div>`;
  }

  // ── Chart ──────────────────────────────────────────────────────────────────

  let chartInstance  = null;
  let chartMode      = 'weight';

  function renderChart() {
    const stats = Storage.getBodyStats();
    if (stats.length < 2) return;

    const canvas = document.getElementById('statsChart');
    if (!canvas) return;

    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    const labels = stats.map(s => s.date);
    const data   = chartMode === 'weight'
      ? stats.map(s => s.weight)
      : stats.map(s => s.bodyFat).filter(v => v !== null);

    const isDark  = document.documentElement.getAttribute('data-theme') !== 'light';
    const color   = chartMode === 'weight' ? '#C8F04A' : '#4AF0C8';
    const textCol = isDark ? '#888' : '#555';
    const gridCol = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    chartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor:     color,
          backgroundColor: color + '22',
          borderWidth:     2,
          pointBackgroundColor: color,
          pointRadius:     4,
          tension:         0.3,
          fill:            true
        }]
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => chartMode === 'weight'
                ? ctx.parsed.y + ' kg'
                : ctx.parsed.y + '%'
            }
          }
        },
        scales: {
          x: {
            ticks: { color: textCol, font: { size: 11 }, maxRotation: 45, autoSkip: true },
            grid:  { color: gridCol }
          },
          y: {
            ticks: {
              color: textCol,
              font:  { size: 11 },
              callback: v => chartMode === 'weight' ? v + ' kg' : v + '%'
            },
            grid: { color: gridCol }
          }
        }
      }
    });
  }

  function switchChart(mode) {
    chartMode = mode;
    document.getElementById('chartTabWeight')?.classList.toggle('active', mode === 'weight');
    document.getElementById('chartTabBF')?.classList.toggle('active',     mode === 'bf');
    renderChart();
    App.haptic('light');
  }

  // ── Stat Form ──────────────────────────────────────────────────────────────

  function toggleStatForm() {
    const form = document.getElementById('statForm');
    if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }

  function saveStat() {
    const wEl = document.getElementById('statWeight');
    const bEl = document.getElementById('statBF');

    if (!wEl || wEl.value === "" || isNaN(parseFloat(wEl.value))) { App.showToast('Enter your weight'); return; }

    Storage.saveBodyStat(wEl.value, bEl?.value || null);
    App.haptic('success');
    App.showToast('Stats saved ✓');

    // update display
    const weightEl = document.getElementById('currentWeight');
    const bfEl     = document.getElementById('currentBF');
    if (weightEl) weightEl.textContent = parseFloat(wEl.value).toFixed(1) + ' kg';
    if (bfEl && bEl?.value) bfEl.textContent = parseFloat(bEl.value).toFixed(1) + '%';

    // update home stats
    App.renderHomeStats();

    // close form
    const form = document.getElementById('statForm');
    if (form) form.style.display = 'none';

    // re-render history and chart
    const histEl = document.querySelector('.stats-history');
    if (histEl) histEl.outerHTML = renderStatsHistory(Storage.getBodyStats());

    setTimeout(renderChart, 100);
  }

  // ── Overload Rules ─────────────────────────────────────────────────────────

  function renderOverloadRules() {
    const rules = [
      {
        title:  'Main Compound Lifts',
        sub:    'Bench · OHP · Deadlift · Squat',
        items: [
          { accent: '+2.5 kg', text: 'Add every week when you complete all sets and reps with clean form.' },
          { accent: 'Fail?',   text: 'If you miss more than 2 reps on any set, repeat the same weight next session.' },
          { accent: 'Stuck?',  text: 'Drop weight by 10% and build back up over 2 weeks.' }
        ]
      },
      {
        title:  'Accessory Compound Lifts',
        sub:    'Barbell Row · RDL · Leg Press · Hip Thrust',
        items: [
          { accent: '+2.5 kg',     text: 'Add every 1–2 weeks. These move slower than main lifts.' },
          { accent: 'Form first',  text: 'Never sacrifice form for weight on these movements.' }
        ]
      },
      {
        title:  'Isolation Exercises',
        sub:    'Lateral Raises · Curls · Pushdowns · Calf Raises',
        items: [
          { accent: '+1–2 kg',  text: 'Add every 2 weeks or increase reps by 2 before adding weight.' },
          { accent: 'Example',  text: 'Move from 3×12 to 3×14 then add weight and drop back to 3×12.' }
        ]
      }
    ];

    return `
      <div class="section-hdr">
        <div class="section-line"></div>
        <div class="section-label">Overload Rules</div>
        <div class="section-line"></div>
      </div>
      ${rules.map(r => `
        <div class="overload-card">
          <div class="overload-title">${r.title}</div>
          <div class="overload-sub">${r.sub}</div>
          ${r.items.map(item => `
            <div class="overload-item">
              <div class="overload-accent">${item.accent}</div>
              <div>${item.text}</div>
            </div>`).join('')}
        </div>`).join('')}`;
  }

  // ── General Rules ──────────────────────────────────────────────────────────

  function renderGeneralRules() {
    const rules = [
      { accent: 'Track',   text: 'Record every session — weight, sets, reps. Use the log button on each exercise.' },
      { accent: 'Deload',  text: 'Every 6–8 weeks reduce all weights by 40–50% for one full week.' },
      { accent: 'Sleep',   text: 'Muscles grow during sleep. Aim for 7–8 hours every night.' },
      { accent: 'Retest',  text: 'Redo InBody scan every 6–8 weeks to track progress.' },
      { accent: 'Protein', text: 'Hit 140g+ protein daily consistently. This matters more than perfect training.' }
    ];

    return `
      <div class="section-hdr">
        <div class="section-line"></div>
        <div class="section-label">General Rules</div>
        <div class="section-line"></div>
      </div>
      <div class="overload-card">
        ${rules.map(r => `
          <div class="overload-item">
            <div class="overload-accent">${r.accent}</div>
            <div>${r.text}</div>
          </div>`).join('')}
      </div>`;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  return {
    init,
    toggleStatForm,
    saveStat,
    switchChart,
    renderChart
  };

})();
