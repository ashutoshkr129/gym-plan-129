// ─── APP MODULE ───────────────────────────────────────────────────────────────
// Core app logic — navigation, settings panel, onboarding,
// theme, haptics, offline indicator, streak, today's workout.
// ──────────────────────────────────────────────────────────────────────────────

const App = (() => {

  // ── State ──────────────────────────────────────────────────────────────────

  let currentPage = 'home';

  // ── Init ───────────────────────────────────────────────────────────────────

  function init() {
    applyTheme(Storage.getSettings().theme);
    registerServiceWorker();
    initOfflineIndicator();
    initOnboarding();
    initSettings();
    renderHomeStats();
    renderTodayBanner();
    renderStreak();
    checkDeload();
  }

  // ── Page Navigation ────────────────────────────────────────────────────────

  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const page = document.getElementById('page-' + id);
    const btn  = document.getElementById('nav-' + id);

    if (page) page.classList.add('active');
    if (btn)  btn.classList.add('active');

    currentPage = id;
    haptic('light');

    // lazy render on first visit
    if (id === 'fuel')     Fuel.init();
    if (id === 'overload') Overload.init();
  }

  // ── Theme ──────────────────────────────────────────────────────────────────

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const settings = Storage.getSettings();
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    Storage.saveSetting('theme', newTheme);
    applyTheme(newTheme);
    updateThemeToggle(newTheme);
  }

  function updateThemeToggle(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.textContent = theme === 'dark' ? '☀ Light' : '☾ Dark';
  }

  // ── Haptics ────────────────────────────────────────────────────────────────

  function haptic(type = 'light') {
    const settings = Storage.getSettings();
    if (!settings.haptics) return;
    if (!navigator.vibrate) return;
    const patterns = { light: 30, medium: 60, success: [40, 30, 40] };
    navigator.vibrate(patterns[type] || 30);
  }

  // ── Offline Indicator ──────────────────────────────────────────────────────

  function initOfflineIndicator() {
    const banner = document.getElementById('offlineBanner');
    if (!banner) return;

    function update() {
      banner.classList.toggle('visible', !navigator.onLine);
    }

    window.addEventListener('online',  update);
    window.addEventListener('offline', update);
    update();
  }

  // ── Service Worker ─────────────────────────────────────────────────────────

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      });
    }
  }

  // ── Onboarding ─────────────────────────────────────────────────────────────

  function initOnboarding() {
    if (Storage.isOnboarded()) return;
    showOnboarding();
  }

  function showOnboarding() {
    const overlay = document.getElementById('onboardingOverlay');
    if (overlay) overlay.classList.add('open');
    renderOnboardingStep(0);
  }

  let onboardStep = 0;
  const ONBOARD_STEPS = [
    {
      icon:    '👋',
      title:   'Welcome to Gym Plan',
      body:    'Your personalised PPL workout and nutrition app. Built around your InBody scan from 21 March 2026.',
      btn:     'Get Started'
    },
    {
      icon:    '🏋️',
      title:   'Your Split',
      body:    'Push · Pull · Legs — 6 days a week. Sunday is rest. Each day has warm up, exercises, core work, and stretching.',
      btn:     'Next'
    },
    {
      icon:    '⚡',
      title:   'Fuel Tab',
      body:    'Personalised meal plan for a vegetarian with your schedule. Timed around your 8 AM workout.',
      btn:     'Next'
    },
    {
      icon:    '📈',
      title:   'Track Progress',
      body:    'Log weight and reps for every exercise. Last 7 sessions saved. Personal bests highlighted automatically.',
      btn:     'Next'
    },
    {
      icon:    '🎯',
      title:   'Your Goals',
      body:    'Lose 7.6 kg fat. Gain 2.3 kg muscle. Reach 69.7 kg at under 18% body fat. Let\'s get to work.',
      btn:     "Let's Go!"
    }
  ];

  function renderOnboardingStep(step) {
    const s     = ONBOARD_STEPS[step];
    const icon  = document.getElementById('onboardIcon');
    const title = document.getElementById('onboardTitle');
    const body  = document.getElementById('onboardBody');
    const btn   = document.getElementById('onboardBtn');
    const dots  = document.getElementById('onboardDots');

    if (icon)  icon.textContent  = s.icon;
    if (title) title.textContent = s.title;
    if (body)  body.textContent  = s.body;
    if (btn)   btn.textContent   = s.btn;

    if (dots) {
      dots.innerHTML = ONBOARD_STEPS.map((_, i) =>
        `<span class="onboard-dot ${i === step ? 'active' : ''}"></span>`
      ).join('');
    }
  }

  function onboardNext() {
    onboardStep++;
    if (onboardStep >= ONBOARD_STEPS.length) {
      finishOnboarding();
    } else {
      renderOnboardingStep(onboardStep);
    }
    haptic('light');
  }

  function finishOnboarding() {
    Storage.setOnboarded();
    const overlay = document.getElementById('onboardingOverlay');
    if (overlay) overlay.classList.remove('open');
    Storage.initDeload ? Storage.resetDeload() : null;
  }

  // ── Settings Panel ─────────────────────────────────────────────────────────

  function initSettings() {
    const settings = Storage.getSettings();
    setLogStyle(settings.logStyle, false);
    updateThemeToggle(settings.theme);

    const hapticToggle = document.getElementById('hapticToggle');
    if (hapticToggle) hapticToggle.checked = settings.haptics;

    const versionEl = document.getElementById('appVersion');
    if (versionEl) versionEl.textContent = 'v' + Storage.getVersion();
  }

  function toggleSettings() {
    const overlay = document.getElementById('settingsOverlay');
    if (overlay) overlay.classList.toggle('open');
  }

  function closeSettingsOnBackdrop(e) {
    if (e.target.id === 'settingsOverlay') toggleSettings();
  }

  function setLogStyle(style, save = true) {
    if (save) Storage.saveSetting('logStyle', style);
    document.getElementById('btn-inline')?.classList.toggle('active', style === 'inline');
    document.getElementById('btn-popup')?.classList.toggle('active',  style === 'popup');
  }

  function setHaptics(enabled) {
    Storage.saveSetting('haptics', enabled);
  }

  // ── Home Stats ─────────────────────────────────────────────────────────────

  function renderHomeStats() {
    const stats = Storage.getBodyStats();
    if (stats.length) {
      const latest = stats[stats.length - 1];
      const weightEl = document.getElementById('statWeight');
      const bfEl     = document.getElementById('statBF');
      if (weightEl) weightEl.textContent = latest.weight + ' kg';
      if (bfEl && latest.bodyFat) bfEl.textContent = latest.bodyFat + '%';
    }
  }

  // ── Today's Workout Banner ─────────────────────────────────────────────────

  function renderTodayBanner() {
    const banner  = document.getElementById('todayBanner');
    if (!banner) return;

    const dayOfWeek = new Date().getDay(); // 0 = Sun
    const dayKey    = SCHEDULE[dayOfWeek];

    if (!dayKey) {
      banner.innerHTML = `
        <div class="today-rest">
          <span class="today-rest-icon">😴</span>
          <div>
            <div class="today-rest-title">Rest Day</div>
            <div class="today-rest-sub">Recovery is part of the program</div>
          </div>
        </div>`;
      return;
    }

    const day      = EXERCISES[dayKey];
    const done     = Storage.isCompleted(dayKey);
    const typeClass = day.type;

    banner.innerHTML = `
      <div class="today-card ${typeClass} ${done ? 'done' : ''}">
        <div class="today-left">
          <div class="today-label">Today</div>
          <div class="today-name">${day.day}</div>
          <div class="today-muscles">${day.muscles}</div>
        </div>
        <div class="today-right">
          ${done
            ? '<div class="today-done-badge">✓ Done</div>'
            : `<button class="today-start-btn" onclick="App.goToTodayWorkout('${dayKey}')">Start →</button>`
          }
        </div>
      </div>`;
  }

  function goToTodayWorkout(dayKey) {
    showPage('workout');
    setTimeout(() => Workout.switchDay(dayKey), 100);
  }

  // ── Streak ─────────────────────────────────────────────────────────────────

  function renderStreak() {
    const streak = Storage.getStreak();
    const el     = document.getElementById('streakCount');
    if (el) el.textContent = streak.count;

    const label = document.getElementById('streakLabel');
    if (label) {
      label.textContent = streak.count === 1 ? 'day streak' : 'day streak';
    }
  }

  // ── Deload Check ───────────────────────────────────────────────────────────

  function checkDeload() {
    if (!Storage.isDeloadDue()) return;
    const banner = document.getElementById('deloadBanner');
    if (banner) banner.classList.add('visible');
  }

  function dismissDeload() {
    Storage.resetDeload();
    const banner = document.getElementById('deloadBanner');
    if (banner) banner.classList.remove('visible');
  }

  // ── Confirm Popup ──────────────────────────────────────────────────────────

  function showConfirm(message, onConfirm) {
    const overlay = document.getElementById('confirmOverlay');
    const msg     = document.getElementById('confirmMessage');
    const yesBtn  = document.getElementById('confirmYes');

    if (msg)    msg.textContent = message;
    if (overlay) overlay.classList.add('open');

    if (yesBtn) {
      yesBtn.onclick = () => {
        closeConfirm();
        onConfirm();
        haptic('medium');
      };
    }
  }

  function closeConfirm() {
    const overlay = document.getElementById('confirmOverlay');
    if (overlay) overlay.classList.remove('open');
  }

  function confirmClearLogs() {
    toggleSettings();
    showConfirm(
      'This will permanently delete all workout history. This cannot be undone.',
      () => {
        Storage.clearAllLogs();
        Workout.renderAllHistories();
      }
    );
  }

  // ── Share Workout ──────────────────────────────────────────────────────────

  function shareWorkout(dayKey) {
    const day = EXERCISES[dayKey];
    if (!day) return;

    const text = [
      `💪 ${day.day} — ${day.focus} Day`,
      `${day.muscles}`,
      '',
      day.exercises.map((e, i) => `${i + 1}. ${e.name} ${e.sets}`).join('\n'),
      '',
      '📱 Tracked with Gym Plan 129'
    ].join('\n');

    if (navigator.share) {
      navigator.share({ title: 'My Workout', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Workout copied to clipboard!');
      });
    }
  }

  // ── Toast ──────────────────────────────────────────────────────────────────

  function showToast(message, duration = 2500) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), duration);
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  return {
    init,
    showPage,
    toggleSettings,
    closeSettingsOnBackdrop,
    setLogStyle,
    setHaptics,
    toggleTheme,
    onboardNext,
    goToTodayWorkout,
    renderTodayBanner,
    renderStreak,
    renderHomeStats,
    confirmClearLogs,
    closeConfirm,
    showConfirm,
    dismissDeload,
    shareWorkout,
    showToast,
    haptic
  };

})();
