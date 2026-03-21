# Gym Plan 129

A personalised Progressive Web App (PWA) for tracking a Push-Pull-Legs workout split, built around an InBody body composition scan. Includes a full nutrition plan, workout logging, progress tracking, and offline support.

---

## Features

### Workout
- 6 day PPL split — Push A/B, Pull A/B, Legs A/B — Sunday rest
- Auto detects today's workout on home screen
- Warm up, exercises, core work, and stretching for every session
- Exercise descriptions with YouTube and MuscleWiki links
- Exercise swap suggestions — 3 alternatives per exercise
- Rest timer per exercise with vibration alert
- Inline or popup log input (user preference)
- Last 7 sessions logged per exercise — oldest auto deleted
- Personal best detection with 🏆 badge
- Session notes per day
- Mark session complete — updates streak automatically
- Share workout summary via native share sheet

### Fuel
- Personalised meal plan timed around 8 AM workout
- 7 meals — pre-workout, breakfast, milk before lunch, lunch, office snack, post office snack, dinner
- Corrected protein and calorie figures per meal
- Office snack options — carry from home or canteen
- Meal checklist — tick each meal through the day
- Water tracker — 250ml per glass, 3500ml daily goal
- Supplement timing guide — whey and creatine
- Food reference table — raw vs cooked protein, calories per 100g, 38 foods across 6 categories
- Searchable and filterable food table
- Red flags — foods to always avoid
- Yellow flags — acceptable weekly cheat options with cheat meal rules
- Weekly grocery list with prices (~₹2,650/week)
- Sunday eating out tips
- Micronutrient food sources

### Overload
- Progressive overload rules for compounds, accessories, and isolation
- Body stats tracker — log weight and body fat %
- Progress chart — weight and body fat % over time (Chart.js)
- Deload reminder — triggers after 7 weeks
- General training rules

### App
- Dark and light mode
- Haptic feedback (toggleable)
- Offline support — full PWA with service worker
- Offline indicator banner
- 5 step onboarding on first launch
- Settings panel — log style, theme, haptics, export, clear logs
- Export workout logs as CSV
- Streak counter
- Installable on Android home screen

---

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks
- Chart.js for progress graphs
- localStorage for all data persistence
- Service Worker for offline caching
- PWA manifest for home screen installation

---

## Project Structure

```
gym-plan-129/
├── index.html              Main app shell
├── manifest.json           PWA manifest
├── sw.js                   Service worker
├── README.md
├── .gitignore
├── assets/
│   ├── css/
│   │   └── styles.css      All styles — dark/light theme
│   └── icons/
│       ├── icon-192.png    App icon 192×192
│       └── icon-512.png    App icon 512×512
├── js/
│   ├── app.js              Core — navigation, settings, onboarding
│   ├── storage.js          All localStorage logic
│   ├── workout.js          Workout rendering and logging
│   ├── fuel.js             Nutrition tab
│   └── overload.js         Progress and overload tab
└── data/
    ├── exercises.js        All exercise data
    ├── meals.js            Meal plan and nutrition data
    └── foodtable.js        Food reference table data
```

---

## Getting Started

### Run locally

```bash
git clone https://github.com/your-username/gym-plan-129.git
cd gym-plan-129
```

Open `index.html` in a browser. For PWA features (service worker, install prompt), serve over HTTP:

```bash
# Using Python
python3 -m http.server 8000

# Using Node
npx serve .
```

Then open `http://localhost:8000` in Chrome.

### Deploy to Netlify

1. Push repo to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Select your repo → Deploy
4. Open the Netlify URL on your Android phone in Chrome
5. Tap **Add to Home Screen** when prompted

### Install on Android

1. Open the hosted URL in Chrome on Android
2. Tap the three dot menu → **Add to Home Screen**
3. Or wait for the install banner to appear automatically

---

## Personalisation

This app is built for:
- **Age:** 22 | **Height:** 178 cm | **Starting weight:** 75 kg
- **Body fat:** 24.1% | **InBody score:** 70/100
- **Goal:** Lose 7.6 kg fat, gain 2.3 kg muscle, reach 69.7 kg at under 18% body fat
- **Diet:** Primarily vegetarian, occasional eggs and chicken
- **Workout time:** 8–9 AM daily

To personalise for someone else, update `data/exercises.js`, `data/meals.js`, and the stats in `index.html`.

---

## Updating the App

When you make changes and push to GitHub, bump the cache version in `sw.js`:

```js
const CACHE_NAME   = 'gym-plan-129-v1.0.1'; // increment this
const CACHE_STATIC = 'gym-plan-static-v1.0.1';
const CACHE_FONTS  = 'gym-plan-fonts-v1.0.1';
```

---

## License

MIT — feel free to fork and personalise for your own use.
