// ─── STORAGE MODULE ───────────────────────────────────────────────────────────
// All localStorage read/write logic lives here.
// No other file should touch localStorage directly.
// ──────────────────────────────────────────────────────────────────────────────

const Storage = (() => {

  const KEYS = {
    SETTINGS:      'gp_settings',
    WORKOUT_LOG:   'gp_log_',         // + exerciseId
    STREAK:        'gp_streak',
    LAST_TRAINED:  'gp_last_trained',
    COMPLETED:     'gp_completed_',   // + YYYY-MM-DD
    BODY_STATS:    'gp_body_stats',
    WATER:         'gp_water_',       // + YYYY-MM-DD
    MEAL_CHECK:    'gp_meal_',        // + YYYY-MM-DD
    NOTES:         'gp_notes_',       // + dayKey
    DELOAD:        'gp_deload',
    ONBOARDED:     'gp_onboarded',
    USER:          'gp_user',
    VERSION:       'gp_version'
  };

  const APP_VERSION = '1.0.4';

  // ── Helpers ────────────────────────────────────────────────────────────────

  function get(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch (error) {
      ErrorHandler.handleStorageError('read', key, error);
      return null;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      ErrorHandler.handleStorageError('write', key, error);
      return false;
    }
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  function today() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }

  function todayLabel() {
    return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  }

  // ── Settings ───────────────────────────────────────────────────────────────

  const DEFAULT_SETTINGS = {
    logStyle:  'inline',   // 'inline' | 'popup'
    theme:     'dark',     // 'dark' | 'light'
    haptics:   true,
    version:   APP_VERSION
  };

  function getSettings() {
    return { ...DEFAULT_SETTINGS, ...(get(KEYS.SETTINGS) || {}) };
  }

  function saveSetting(key, value) {
    const settings = getSettings();
    settings[key] = value;
    set(KEYS.SETTINGS, settings);
  }

  // ── User Profile ───────────────────────────────────────────────────────────

  function getUser() {
    return get(KEYS.USER);
  }

  function saveUser(userData) {
    set(KEYS.USER, userData);
  }

  function isOnboarded() {
    return !!get(KEYS.ONBOARDED);
  }

  function setOnboarded() {
    set(KEYS.ONBOARDED, true);
  }

  // ── Workout Logs ───────────────────────────────────────────────────────────

  const MAX_HISTORY = 7;

  function getLog(exerciseId) {
    return get(KEYS.WORKOUT_LOG + exerciseId) || [];
  }

  function saveLog(exerciseId, weight, reps) {
    const history = getLog(exerciseId);
    const entry = {
      date:   todayLabel(),
      dateRaw: today(),
      weight: parseFloat(weight) || 0,
      reps:   reps
    };
    history.push(entry);
    if (history.length > MAX_HISTORY) history.shift();
    const success = set(KEYS.WORKOUT_LOG + exerciseId, history);
    return success;
  }

  function getPersonalBest(exerciseId) {
    const history = getLog(exerciseId);
    if (!history.length) return null;
    return history.reduce((best, entry) =>
      entry.weight > best.weight ? entry : best, history[0]);
  }

  function isPersonalBest(exerciseId, weight) {
    const pb = getPersonalBest(exerciseId);
    if (!pb) return true;
    return parseFloat(weight) > pb.weight;
  }

  function clearAllLogs() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(KEYS.WORKOUT_LOG))
      .forEach(k => remove(k));
  }

  // ── Streak ─────────────────────────────────────────────────────────────────

  function getStreak() {
    return get(KEYS.STREAK) || { count: 0, lastDate: null };
  }

  function updateStreak() {
    const streak    = getStreak();
    const todayStr  = today();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    if (streak.lastDate === todayStr) return streak;

    if (streak.lastDate === yStr) {
      streak.count++;
    } else if (streak.lastDate !== todayStr) {
      streak.count = 1;
    }
    streak.lastDate = todayStr;
    set(KEYS.STREAK, streak);
    return streak;
  }

  // ── Workout Completion ─────────────────────────────────────────────────────

  function markCompleted(dayKey) {
    const todayStr = today();
    const data = get(KEYS.COMPLETED + todayStr) || {};
    data[dayKey] = true;
    data.timestamp = Date.now();
    set(KEYS.COMPLETED + todayStr, data);
    updateStreak();
  }

  function isCompleted(dayKey, dateStr) {
    const d = dateStr || today();
    const data = get(KEYS.COMPLETED + d) || {};
    return !!data[dayKey];
  }

  function unmarkCompleted(dayKey) {
    const todayStr = today();
    const data = get(KEYS.COMPLETED + todayStr) || {};
    delete data[dayKey];
    set(KEYS.COMPLETED + todayStr, data);
  }

  function getWeekCompletions() {
    const result = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      result[dateStr] = get(KEYS.COMPLETED + dateStr) || {};
    }
    return result;
  }

  // ── Body Stats ─────────────────────────────────────────────────────────────

  function getBodyStats() {
    return get(KEYS.BODY_STATS) || [];
  }

  function saveBodyStat(weight, bodyFat) {
    const stats = getBodyStats();
    const entry = {
      date:    todayLabel(),
      dateRaw: today(),
      weight:  parseFloat(weight),
      bodyFat: parseFloat(bodyFat) || null
    };
    // avoid duplicate same day
    const idx = stats.findIndex(s => s.dateRaw === today());
    if (idx !== -1) {
      stats[idx] = entry;
    } else {
      stats.push(entry);
    }
    // keep last 30 entries
    if (stats.length > 30) stats.shift();
    set(KEYS.BODY_STATS, stats);
    return stats;
  }

  // ── Water Tracker ──────────────────────────────────────────────────────────

  const WATER_GOAL_ML = 3500;
  const GLASS_ML      = 250;

  function getWater(dateStr) {
    const d = dateStr || today();
    return get(KEYS.WATER + d) || { glasses: 0, ml: 0 };
  }

  function addWater() {
    const d    = today();
    const data = getWater(d);
    data.glasses++;
    data.ml = data.glasses * GLASS_ML;
    set(KEYS.WATER + d, data);
    return data;
  }

  function removeWater() {
    const d    = today();
    const data = getWater(d);
    if (data.glasses > 0) {
      data.glasses--;
      data.ml = data.glasses * GLASS_ML;
      set(KEYS.WATER + d, data);
    }
    return data;
  }

  function getWaterGoal() { return WATER_GOAL_ML; }
  function getGlassMl()   { return GLASS_ML; }

  // ── Meal Checklist ─────────────────────────────────────────────────────────

  function getMealChecks(dateStr) {
    const d = dateStr || today();
    return get(KEYS.MEAL_CHECK + d) || {};
  }

  function toggleMealCheck(mealId) {
    const d     = today();
    const checks = getMealChecks(d);
    checks[mealId] = !checks[mealId];
    set(KEYS.MEAL_CHECK + d, checks);
    return checks[mealId];
  }

  // ── Workout Notes ──────────────────────────────────────────────────────────

  function getNotes(dayKey) {
    return get(KEYS.NOTES + dayKey) || '';
  }

  function saveNotes(dayKey, text) {
    set(KEYS.NOTES + dayKey, text);
  }

  // ── Deload Tracker ─────────────────────────────────────────────────────────

  const DELOAD_WEEKS = 7;

  function getDeload() {
    return get(KEYS.DELOAD) || { startDate: today(), weekCount: 0 };
  }

  function initDeload() {
    const data = { startDate: today(), weekCount: 0 };
    set(KEYS.DELOAD, data);
    return data;
  }

  function getWeeksSinceStart() {
    const data      = getDeload();
    const start     = new Date(data.startDate);
    const now       = new Date();
    const diffDays  = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7);
  }

  function isDeloadDue() {
    return getWeeksSinceStart() >= DELOAD_WEEKS;
  }

  function resetDeload() {
    return initDeload();
  }

  // ── Export ─────────────────────────────────────────────────────────────────

  function exportLogs() {
    const rows    = [['Exercise', 'Date', 'Weight (kg)', 'Reps']];
    const logKeys = Object.keys(localStorage).filter(k => k.startsWith(KEYS.WORKOUT_LOG));

    logKeys.forEach(key => {
      const exId    = key.replace(KEYS.WORKOUT_LOG, '');
      const history = get(key) || [];
      history.forEach(entry => {
        rows.push([exId, entry.date, entry.weight, entry.reps]);
      });
    });

    const csv     = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob    = new Blob([csv], { type: 'text/csv' });
    const url     = URL.createObjectURL(blob);
    const a       = document.createElement('a');
    a.href        = url;
    a.download    = `gym-plan-logs-${today()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Version ────────────────────────────────────────────────────────────────

  function getVersion() { return APP_VERSION; }

  // ── Public API ─────────────────────────────────────────────────────────────

  return {
    // settings
    getSettings, saveSetting,
    // user
    getUser, saveUser, isOnboarded, setOnboarded,
    // logs
    getLog, saveLog, getPersonalBest, isPersonalBest, clearAllLogs,
    // streak
    getStreak, updateStreak,
    // completion
    markCompleted, unmarkCompleted, isCompleted, getWeekCompletions,
    // body stats
    getBodyStats, saveBodyStat,
    // water
    getWater, addWater, removeWater, getWaterGoal, getGlassMl,
    // meals
    getMealChecks, toggleMealCheck,
    // notes
    getNotes, saveNotes,
    // deload
    getDeload, isDeloadDue, resetDeload, getWeeksSinceStart,
    // export
    exportLogs,
    // version
    getVersion,
    // utils
    today, todayLabel
  };

})();
