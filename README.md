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

### Deploy to GitHub Pages

This repo uses GitHub Actions to auto deploy on every push to `main`. No manual steps needed after initial setup.

**One time setup:**

1. Create a new public repository named `gym-plan-129` on GitHub — do NOT initialize with README
2. Go to repo **Settings** → **Pages** → set Source to **GitHub Actions** → Save
3. Push the code:

```bash
git init
git add .
git commit -m "Initial commit — gym plan 129"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gym-plan-129.git
git push -u origin main
```

4. Go to the **Actions** tab in your repo and watch the workflow run
5. Once green your app is live at:

```
https://YOUR_USERNAME.github.io/gym-plan-129/
```

Every future push to `main` auto deploys — no manual steps ever again.

### Install on Android

1. Open `https://YOUR_USERNAME.github.io/gym-plan-129/` in Chrome on your phone
2. Tap the three dot menu → **Add to Home Screen**
3. Or wait for the install banner to appear automatically
4. The app works fully offline after first load

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

## CI/CD

GitHub Actions workflow is at `.github/workflows/deploy.yml`.

It triggers on every push to `main` and deploys to GitHub Pages automatically using the official `actions/deploy-pages` action. No build step needed — pure static files are uploaded directly.

To trigger a manual deploy go to **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.

## Updating the App

When you make changes:

1. Edit the relevant file
2. Commit and push to main — GitHub Actions handles the rest
3. If you update any cached files bump the cache version in `sw.js` so users get the fresh version:

```js
const CACHE_NAME   = 'gym-plan-129-v1.0.1'; // increment this
const CACHE_STATIC = 'gym-plan-static-v1.0.1';
const CACHE_FONTS  = 'gym-plan-fonts-v1.0.1';
```

---

## License

MIT — feel free to fork and personalise for your own use.
