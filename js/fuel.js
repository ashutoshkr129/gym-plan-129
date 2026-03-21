// ─── FUEL MODULE ──────────────────────────────────────────────────────────────
// Renders nutrition tab — meal plan, macros, supplements,
// water tracker, meal checklist, food table, red/yellow flags,
// grocery list, sunday tips, micronutrients.
// ──────────────────────────────────────────────────────────────────────────────

const Fuel = (() => {

  let initialized = false;
  let foodFilter  = 'All';
  let foodSearch  = '';

  function init() {
    if (initialized) return;
    initialized = true;
    render();
  }

  function render() {
    const container = document.getElementById('fuelContent');
    if (!container) return;
    container.innerHTML = `
      ${renderJumpBar()}
      ${renderMacroTargets()}
      ${renderWaterTracker()}
      ${renderMealPlan()}
      ${renderSupplements()}
      ${renderSundayTips()}
      ${renderFoodTable()}
      ${renderRedYellowFlags()}
      ${renderGrocery()}
      ${renderMicronutrients()}
    `;
    initWaterTracker();
    initMealChecks();
  }

  function renderJumpBar() {
    const sections = [
      { id: 'fuel-targets', label: 'Targets'    },
      { id: 'fuel-water',   label: 'Water'      },
      { id: 'fuel-meals',   label: 'Meals'      },
      { id: 'fuel-supps',   label: 'Supps'      },
      { id: 'fuel-table',   label: 'Food Table' },
      { id: 'fuel-flags',   label: 'Flags'      },
      { id: 'fuel-grocery', label: 'Grocery'    }
    ];
    return `
      <div class="jump-bar">
        ${sections.map(s => `<button class="jump-btn" onclick="Fuel.jumpTo('${s.id}')">${s.label}</button>`).join('')}
      </div>`;
  }

  function jumpTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    App.haptic('light');
  }

  function renderMacroTargets() {
    const t = MEALS.targets;
    return `
      <div id="fuel-targets" class="fuel-section">
        <div class="fuel-hero">
          <div class="fuel-hero-title">Daily Targets</div>
          <div class="macro-grid">
            <div class="macro-card"><div class="macro-val push-color">${t.calories}</div><div class="macro-unit">kcal</div><div class="macro-label">Calories</div></div>
            <div class="macro-card"><div class="macro-val pull-color">${t.protein}</div><div class="macro-unit">g</div><div class="macro-label">Protein</div></div>
            <div class="macro-card"><div class="macro-val legs-color">${t.carbs}</div><div class="macro-unit">g</div><div class="macro-label">Carbs</div></div>
            <div class="macro-card"><div class="macro-val muted-color">${t.fat}</div><div class="macro-unit">g</div><div class="macro-label">Fat</div></div>
          </div>
        </div>
      </div>`;
  }

  function renderWaterTracker() {
    const data        = Storage.getWater();
    const goal        = Storage.getWaterGoal();
    const glassMl     = Storage.getGlassMl();
    const goalGlasses = Math.ceil(goal / glassMl);
    const pct         = Math.min(100, Math.round((data.ml / goal) * 100));
    return `
      <div id="fuel-water" class="fuel-section">
        <div class="section-hdr"><div class="section-line"></div><div class="section-label">Water Tracker</div><div class="section-line"></div></div>
        <div class="water-card">
          <div class="water-top">
            <div><div class="water-amount" id="waterAmount">${data.ml} ml</div><div class="water-goal">Goal: ${goal} ml · ${goalGlasses} glasses</div></div>
            <div class="water-pct" id="waterPct">${pct}%</div>
          </div>
          <div class="water-bar-wrap"><div class="water-bar" id="waterBar" style="width:${pct}%"></div></div>
          <div class="water-glasses" id="waterGlasses">${renderWaterGlasses(data.glasses, goalGlasses)}</div>
          <div class="water-actions">
            <button class="water-btn remove" onclick="Fuel.removeWater()">−</button>
            <button class="water-btn add" onclick="Fuel.addWater()">+ Glass</button>
          </div>
          <div class="water-note">You are on creatine — staying hydrated is extra important. Aim ${goalGlasses} glasses daily.</div>
        </div>
      </div>`;
  }

  function renderWaterGlasses(current, total) {
    return Array.from({ length: total }, (_, i) =>
      `<span class="water-glass ${i < current ? 'filled' : ''}">💧</span>`
    ).join('');
  }

  function initWaterTracker() {}

  function addWater() {
    const data        = Storage.addWater();
    const goal        = Storage.getWaterGoal();
    const glassMl     = Storage.getGlassMl();
    const goalGlasses = Math.ceil(goal / glassMl);
    const pct         = Math.min(100, Math.round((data.ml / goal) * 100));
    const amountEl    = document.getElementById('waterAmount');
    const pctEl       = document.getElementById('waterPct');
    const barEl       = document.getElementById('waterBar');
    const glassesEl   = document.getElementById('waterGlasses');
    if (amountEl)  amountEl.textContent = data.ml + ' ml';
    if (pctEl)     pctEl.textContent    = pct + '%';
    if (barEl)     barEl.style.width    = pct + '%';
    if (glassesEl) glassesEl.innerHTML  = renderWaterGlasses(data.glasses, goalGlasses);
    App.haptic('light');
    if (data.ml >= goal) App.showToast('🎉 Daily water goal reached!');
  }

  function removeWater() {
    const data        = Storage.removeWater();
    const goal        = Storage.getWaterGoal();
    const glassMl     = Storage.getGlassMl();
    const goalGlasses = Math.ceil(goal / glassMl);
    const pct         = Math.min(100, Math.round((data.ml / goal) * 100));
    const amountEl    = document.getElementById('waterAmount');
    const pctEl       = document.getElementById('waterPct');
    const barEl       = document.getElementById('waterBar');
    const glassesEl   = document.getElementById('waterGlasses');
    if (amountEl)  amountEl.textContent = data.ml + ' ml';
    if (pctEl)     pctEl.textContent    = pct + '%';
    if (barEl)     barEl.style.width    = pct + '%';
    if (glassesEl) glassesEl.innerHTML  = renderWaterGlasses(data.glasses, goalGlasses);
    App.haptic('light');
  }

  function renderMealPlan() {
    const checks = Storage.getMealChecks();
    const tip = `<div class="tip-card">Workout is at 8–9 AM. Pre-workout at 7:15 AM, post-workout by 9:30 AM. Office snack at 3:30 PM breaks the long lunch-dinner gap. Post office snack at 7:15 PM covers Omega 3.</div>`;
    return `
      <div id="fuel-meals" class="fuel-section">
        <div class="section-hdr"><div class="section-line"></div><div class="section-label">Meal Plan</div><div class="section-line"></div></div>
        ${tip}
        ${MEALS.meals.map(m => renderMealCard(m, checks[m.id])).join('')}
      </div>`;
  }

  function renderMealCard(meal, checked) {
    const hasOptions = meal.options;
    return `
      <div class="meal-card ${checked ? 'checked' : ''}">
        <div class="meal-header" onclick="Fuel.toggleMeal('${meal.id}')">
          <div class="meal-header-left">
            <button class="meal-check-btn ${checked ? 'checked' : ''}" onclick="Fuel.checkMeal(event,'${meal.id}')">${checked ? '✓' : '○'}</button>
            <div>
              <div class="meal-time">${meal.time}${meal.tag ? ' · ' + meal.tag : ''}</div>
              <div class="meal-name">${meal.name}</div>
            </div>
          </div>
          <div class="meal-header-right">
            <div class="meal-macros"><span class="meal-protein">${meal.protein}g</span><span class="meal-cal">${meal.calories} kcal</span></div>
            <div class="meal-chevron" id="chev-${meal.id}">▼</div>
          </div>
        </div>
        <div class="meal-body" id="meal-body-${meal.id}">
          <div class="meal-items">
            ${meal.items.map(item => `<div class="meal-item"><span class="meal-item-name">${item.name}</span><span class="meal-item-detail">${item.detail}</span></div>`).join('')}
          </div>
          ${hasOptions ? renderMealOptions(meal.options) : ''}
          <div class="meal-note">${meal.note}</div>
        </div>
      </div>`;
  }

  function renderMealOptions(options) {
    return `
      <div class="meal-options">
        ${options.carry ? `<div class="options-group"><div class="options-label">Carry from home</div>${options.carry.map(o => `<div class="meal-item"><span class="meal-item-name">${o.name}</span><span class="meal-item-detail">${o.detail}</span></div>`).join('')}</div>` : ''}
        ${options.canteen ? `<div class="options-group"><div class="options-label">From canteen</div>${options.canteen.map(o => `<div class="meal-item"><span class="meal-item-name">${o.name}</span><span class="meal-item-detail">${o.detail}</span></div>`).join('')}</div>` : ''}
        ${options.avoid ? `<div class="options-group avoid"><div class="options-label">Avoid</div>${options.avoid.map(o => `<div class="meal-item avoid-item"><span class="meal-item-name">✕ ${o}</span></div>`).join('')}</div>` : ''}
      </div>`;
  }

  function toggleMeal(mealId) {
    const body = document.getElementById('meal-body-' + mealId);
    const chev = document.getElementById('chev-' + mealId);
    if (body) body.classList.toggle('open');
    if (chev) chev.classList.toggle('open');
  }

  function checkMeal(event, mealId) {
    event.stopPropagation();
    const checked = Storage.toggleMealCheck(mealId);
    const btn = document.querySelector(`[onclick*="checkMeal(event,'${mealId}')"]`);
    const card = btn?.closest('.meal-card');
    if (card) card.classList.toggle('checked', checked);
    if (btn)  { btn.textContent = checked ? '✓' : '○'; btn.classList.toggle('checked', checked); }
    App.haptic('light');
    const checks = Storage.getMealChecks();
    const allDone = MEALS.meals.every(m => checks[m.id]);
    if (allDone) App.showToast('🎯 All meals for today done!');
  }

  function initMealChecks() {}

  function renderSupplements() {
    return `
      <div id="fuel-supps" class="fuel-section">
        <div class="section-hdr"><div class="section-line"></div><div class="section-label">Supplements</div><div class="section-line"></div></div>
        ${MEALS.supplements.map(s => `<div class="supp-card"><div class="supp-icon">${s.icon}</div><div class="supp-info"><div class="supp-name">${s.name}</div><div class="supp-detail">${s.detail}</div></div><div class="supp-time">${s.time}</div></div>`).join('')}
        <div class="tip-card">Creatine works by saturation not timing. Take it every day — even rest days. Takes 2–3 weeks to feel the effect. Stay well hydrated, aim 3–4L water daily.</div>
      </div>`;
  }

  function renderSundayTips() {
    return `
      <div class="fuel-section">
        <div class="section-hdr"><div class="section-line"></div><div class="section-label">Sunday Eating Out</div><div class="section-line"></div></div>
        <div class="info-card">${MEALS.sundayTips.map(tip => `<div class="info-item"><div class="info-dot"></div><span>${tip}</span></div>`).join('')}</div>
      </div>`;
  }

  function renderFoodTable() {
    return `
      <div id="fuel-table" class="fuel-section">
        <div class="section-hdr"><div class="section-line"></div><div class="section-label">Food Reference Table</div><div class="section-line"></div></div>
        <div class="food-table-controls">
          <input class="food-search" type="text" placeholder="Search food..." id="foodSearch" oninput="Fuel.filterFood()">
          <div class="food-filter-scroll" id="foodFilters">${renderFoodFilters()}</div>
        </div>
        <div class="food-table-wrap">
          <table class="food-table" id="foodTable">
            <thead>
              <tr>
                <th>Food</th>
                <th>Raw protein<br><span class="th-sub">per 100g</span></th>
                <th>Cooked protein<br><span class="th-sub">per 100g</span></th>
                <th>Calories<br><span class="th-sub">per 100g</span></th>
                <th>Serving protein</th>
                <th>Serving calories</th>
              </tr>
            </thead>
            <tbody id="foodTableBody">${renderFoodRows(FOOD_TABLE)}</tbody>
          </table>
        </div>
        <div class="food-table-note">Raw protein = uncooked per 100g. Cooked protein = after cooking per 100g. Protein often appears lower when cooked because food absorbs water and weight increases.</div>
      </div>`;
  }

  function renderFoodFilters() {
    return ['All', ...FOOD_CATEGORIES].map(cat =>
      `<button class="food-filter-btn ${cat === foodFilter ? 'active' : ''}" onclick="Fuel.setFoodFilter('${cat}')">${cat}</button>`
    ).join('');
  }

  function renderFoodRows(foods) {
    if (!foods.length) return '<tr><td colspan="6" class="food-empty">No results found</td></tr>';
    return foods.map(f => `
      <tr>
        <td><div class="food-name">${f.name}</div><div class="food-cat-badge">${f.category}</div>${f.notes ? `<div class="food-note">${f.notes}</div>` : ''}</td>
        <td class="food-num">${f.rawProtein !== null ? f.rawProtein + 'g' : '—'}</td>
        <td class="food-num">${f.cookedProtein !== null ? f.cookedProtein + 'g' : '—'}</td>
        <td class="food-num">${f.calories100g}</td>
        <td class="food-num"><div class="serving-size">${f.serving}</div><div class="serving-protein">${f.servingProtein}g</div></td>
        <td class="food-num">${f.servingCalories} kcal</td>
      </tr>`).join('');
  }

  function setFoodFilter(cat) {
    foodFilter = cat;
    document.querySelectorAll('.food-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === cat);
    });
    filterFood();
    App.haptic('light');
  }

  function filterFood() {
    const searchEl = document.getElementById('foodSearch');
    foodSearch = searchEl ? searchEl.value.toLowerCase() : '';
    const filtered = FOOD_TABLE.filter(f => {
      const matchCat    = foodFilter === 'All' || f.category === foodFilter;
      const matchSearch = !foodSearch ||
        f.name.toLowerCase().includes(foodSearch) ||
        f.category.toLowerCase().includes(foodSearch) ||
        (f.notes && f.notes.toLowerCase().includes(foodSearch));
      return matchCat && matchSearch;
    });
    const tbody = document.getElementById('foodTableBody');
    if (tbody) tbody.innerHTML = renderFoodRows(filtered);
  }

  function renderRedYellowFlags() {
    return `
      <div id="fuel-flags" class="fuel-section">
        <div class="section-hdr"><div class="section-line"></div><div class="section-label">Food Flags</div><div class="section-line"></div></div>
        <div class="flags-tabs">
          <button class="flag-tab active" id="tab-red" onclick="Fuel.showFlagTab('red')">🔴 Always Avoid</button>
          <button class="flag-tab" id="tab-yellow" onclick="Fuel.showFlagTab('yellow')">🟡 Weekly Cheat OK</button>
        </div>
        <div id="flags-red">
          ${MEALS.redFlags.map(f => `<div class="flag-card red"><div class="flag-item">${f.item}</div><div class="flag-reason">${f.reason}</div></div>`).join('')}
        </div>
        <div id="flags-yellow" style="display:none;">
          ${MEALS.yellowFlags.map(f => `<div class="flag-card yellow"><div class="flag-item">${f.item}</div><div class="flag-reason">${f.reason}</div></div>`).join('')}
          <div class="section-hdr" style="margin-top:16px;"><div class="section-line"></div><div class="section-label">Cheat Meal Rules</div><div class="section-line"></div></div>
          <div class="info-card">${MEALS.cheatRules.map(rule => `<div class="info-item"><div class="info-dot"></div><span>${rule}</span></div>`).join('')}</div>
        </div>
      </div>`;
  }

  function showFlagTab(tab) {
    const redEl     = document.getElementById('flags-red');
    const yellowEl  = document.getElementById('flags-yellow');
    const redTab    = document.getElementById('tab-red');
    const yellowTab = document.getElementById('tab-yellow');
    if (tab === 'red') {
      if (redEl)     redEl.style.display    = 'block';
      if (yellowEl)  yellowEl.style.display = 'none';
      if (redTab)    redTab.classList.add('active');
      if (yellowTab) yellowTab.classList.remove('active');
    } else {
      if (redEl)     redEl.style.display    = 'none';
      if (yellowEl)  yellowEl.style.display = 'block';
      if (redTab)    redTab.classList.remove('active');
      if (yellowTab) yellowTab.classList.add('active');
    }
    App.haptic('light');
  }

  function renderGrocery() {
    return `
      <div id="fuel-grocery" class="fuel-section">
        <div class="section-hdr"><div class="section-line"></div><div class="section-label">Weekly Grocery List</div><div class="section-line"></div></div>
        ${MEALS.grocery.map(cat => `
          <div class="grocery-card">
            <div class="grocery-title">${cat.category}</div>
            ${cat.items.map(item => `<div class="grocery-item"><span>${item.name}</span><span class="grocery-price">${item.price}</span></div>`).join('')}
          </div>`).join('')}
        <div class="grocery-total"><span>Estimated Weekly Total</span><span class="grocery-total-val">${MEALS.weeklyTotal}</span></div>
        <div class="tip-card">Monthly grocery spend ~₹10,500 — just within your ₹10,000 budget. Buying daal and atta in bulk monthly reduces cost. Swap paneer with tofu occasionally to save ~₹100/week.</div>
      </div>`;
  }

  function renderMicronutrients() {
    return `
      <div class="fuel-section">
        <div class="section-hdr"><div class="section-line"></div><div class="section-label">Micronutrient Sources</div><div class="section-line"></div></div>
        <div class="info-card">${MEALS.micronutrients.map(m => `<div class="info-item"><div class="info-dot"></div><span><strong>${m.nutrient}</strong> — ${m.sources}</span></div>`).join('')}</div>
      </div>`;
  }

  return {
    init, jumpTo,
    addWater, removeWater,
    toggleMeal, checkMeal,
    setFoodFilter, filterFood,
    showFlagTab
  };

})();
