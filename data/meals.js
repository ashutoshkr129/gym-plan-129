const MEALS = {
  targets: {
    calories: 2400,
    protein: 140,
    carbs: 240,
    fat: 65
  },

  meals: [
    {
      id: 'pre-workout',
      name: 'Pre-Workout',
      time: '7:00 – 7:15 AM',
      tag: null,
      protein: 14,
      calories: 250,
      items: [
        { name: '2 whole eggs (boiled/scrambled)', detail: '12g protein' },
        { name: '1 banana', detail: '27g carbs · energy' },
        { name: '5–6 soaked almonds', detail: 'healthy fats' }
      ],
      note: 'Light and fast — gives energy without making you heavy during workout. Eat 30–45 min before gym.'
    },
    {
      id: 'breakfast',
      name: 'Breakfast',
      time: '9:15 – 9:30 AM',
      tag: 'Post Workout',
      protein: 47,
      calories: 550,
      items: [
        { name: 'Whey protein shake (1 scoop)', detail: '25g protein' },
        { name: '3 whole eggs + 2 egg whites', detail: '22g protein' },
        { name: '2 roti / 1 cup oats', detail: '40–50g carbs' },
        { name: '1 tsp ghee on roti', detail: 'healthy fat' }
      ],
      note: 'Most important meal of the day. Muscle repair starts here. Take whey immediately after gym, eat full breakfast within 30 min.'
    },
    {
      id: 'milk-pre-lunch',
      name: 'Milk',
      time: '12:00 PM',
      tag: 'Before Lunch',
      protein: 6,
      calories: 120,
      items: [
        { name: '1 glass toned milk (250ml)', detail: '6g protein · no sugar' }
      ],
      note: 'Adds protein between breakfast and lunch. Slightly fills you up so you do not overeat at lunch.'
    },
    {
      id: 'lunch',
      name: 'Lunch',
      time: '1:00 – 2:00 PM',
      tag: null,
      protein: 35,
      calories: 650,
      items: [
        { name: '1 cup cooked masoor / chana daal', detail: '9g protein' },
        { name: '100g paneer (sabzi or grilled)', detail: '18g protein' },
        { name: '2 roti OR 1 bowl rice — not both', detail: '30–40g carbs' },
        { name: 'Sabzi (any vegetable)', detail: 'fiber + micros' }
      ],
      note: 'Paneer + daal together gives a complete amino acid profile. Roti or rice — pick one to control calories.'
    },
    {
      id: 'office-snack',
      name: 'Office Snack',
      time: '3:30 – 4:00 PM',
      tag: 'At Office',
      protein: 12,
      calories: 200,
      items: [
        { name: '1 coffee with milk (no sugar)', detail: '6g protein · caffeine' },
        { name: 'Pick one from options below', detail: 'see options' }
      ],
      options: {
        carry: [
          { name: 'Roasted makhana (30g)', detail: '4g protein · 110 kcal' },
          { name: 'Roasted chana (30g)', detail: '5g protein · 110 kcal' }
        ],
        canteen: [
          { name: 'Sprouts (1 cup)', detail: '8g protein · 100 kcal' },
          { name: 'Idli (2 pcs)', detail: '4g protein · 130 kcal' },
          { name: 'Any steamed snack', detail: 'avoid fried' }
        ],
        avoid: [
          'Chips and namkeen',
          'Packaged biscuits',
          'Vending machine snacks',
          'Sugary drinks'
        ]
      },
      note: 'Coffee with milk is your base. Add one carry or canteen snack based on availability. Avoid anything fried or packaged.'
    },
    {
      id: 'post-office',
      name: 'Post Office Snack',
      time: '7:15 – 7:30 PM',
      tag: 'Back Home',
      protein: 12,
      calories: 150,
      items: [
        { name: 'Greek yogurt / hung curd (150g)', detail: '10–12g protein' },
        { name: '1 tbsp chia seeds or flaxseeds', detail: 'Omega 3 source' },
        { name: 'Drizzle of honey (optional)', detail: 'natural sweetener' }
      ],
      note: 'Quick and easy right when you get home. Covers your daily Omega 3 via chia seeds. Keeps you from being too hungry before dinner.'
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '8:30 – 9:00 PM',
      tag: null,
      protein: 34,
      calories: 550,
      items: [
        { name: '1 cup cooked rajma / chole / moong daal', detail: '8–9g protein' },
        { name: '100g paneer OR 3 eggs', detail: '18–21g protein' },
        { name: '2 roti (whole wheat)', detail: '30g carbs' },
        { name: 'Sabzi with mustard oil', detail: 'Omega 3 from oil' },
        { name: 'Spinach / palak in any form', detail: 'Magnesium source' }
      ],
      note: 'Use mustard oil for cooking — best Omega 3 source in Indian cooking. Spinach adds magnesium for better sleep and recovery.'
    }
  ],

  supplements: [
    {
      icon: '💪',
      name: 'Whey Protein',
      detail: '1 scoop · ~25g protein per serve',
      time: 'Right after gym'
    },
    {
      icon: '⚡',
      name: 'Creatine Monohydrate',
      detail: '3g daily · timing does not matter much',
      time: 'With breakfast'
    }
  ],

  sundayTips: [
    'Order daal, paneer dishes, or egg options first',
    'Avoid fried starters — go for tandoor or grilled',
    'Skip sugary drinks — stick to lassi, chaas, or water',
    'One cheat item is fine — enjoy it guilt free',
    'Still take creatine and hit protein target for the day'
  ],

  redFlags: [
    { item: 'Sugary drinks', reason: 'Cold drinks, packaged juices, energy drinks — pure liquid sugar' },
    { item: 'Fried snacks', reason: 'Samosa, vada, chips, namkeen — empty calories and bad fats' },
    { item: 'Maida based items', reason: 'Burger bun, pizza base, pav, white bread — spikes insulin' },
    { item: 'Packaged biscuits & cookies', reason: 'More sugar than nutrients, highly processed' },
    { item: 'Sweets & mithai', reason: 'Gulab jamun, ice cream — high sugar with no protein' },
    { item: 'Instant noodles', reason: 'Maggi and similar — sodium bomb with zero nutrition' },
    { item: 'Fruit juices', reason: 'Even fresh juice removes fiber — eat the fruit instead' },
    { item: 'Flavoured yogurt', reason: 'Marketed as healthy but loaded with sugar — use plain hung curd' },
    { item: 'Most protein bars', reason: 'Indian market ones (RiteBite, Yoga Bar) have more sugar than protein' },
    { item: 'Reheated vegetable oils', reason: 'Common in canteen food — very inflammatory' },
    { item: 'Diet / zero sugar drinks', reason: 'Artificial sweeteners affect gut health and insulin response' }
  ],

  yellowFlags: [
    { item: 'Pizza', reason: '1–2 slices max, not a full large. Once a week.' },
    { item: 'Burger', reason: 'Once, skip the fries. Grilled patty preferred.' },
    { item: 'Biryani', reason: 'Portion controlled — one plate not two.' },
    { item: 'Chole bhature', reason: 'One plate, not two. Occasional treat.' },
    { item: 'Dosa with chutney', reason: 'Relatively clean — fermented, decent carbs.' },
    { item: 'Dark chocolate', reason: '1–2 squares of 70%+ cocoa. Actually has magnesium.' },
    { item: 'Dal makhani', reason: 'Occasional is fine — not daily due to heavy cream.' },
    { item: 'Peanut butter (2 tbsp)', reason: 'Borderline green. Good fat and protein. Avoid sweet varieties.' },
    { item: 'Poha / Upma', reason: 'Relatively clean Indian breakfast. Fine if made at home.' },
    { item: 'Rajma chawal (generous)', reason: 'Your Sunday special — enjoy a generous portion guilt free.' },
    { item: 'Paneer tikka at restaurant', reason: 'Grilled not fried. Decent protein. Acceptable cheat.' }
  ],

  cheatRules: [
    'One cheat meal per week maximum',
    'Never cheat two days in a row',
    'Still hit protein target on cheat day',
    'Cheat meal not cheat day'
  ],

  micronutrients: [
    { nutrient: 'Vitamin D', sources: '15–20 min sunlight daily + eggs + mushrooms' },
    { nutrient: 'Omega 3', sources: 'Chia seeds + walnuts + flaxseeds + mustard oil daily' },
    { nutrient: 'Magnesium', sources: 'Spinach + banana + dark chocolate + pumpkin seeds' },
    { nutrient: 'Iron', sources: 'Daal + spinach + jaggery (eat with Vitamin C source)' }
  ],

  grocery: [
    {
      category: 'Protein Sources',
      items: [
        { name: 'Eggs (30 eggs)', price: '~₹300' },
        { name: 'Paneer (500g)', price: '~₹250' },
        { name: 'Daal assorted (masoor, chana, moong, rajma)', price: '~₹300' },
        { name: 'Greek yogurt / hung curd', price: '~₹150' },
        { name: 'Milk (2L)', price: '~₹120' }
      ]
    },
    {
      category: 'Carbs & Grains',
      items: [
        { name: 'Whole wheat atta (5kg)', price: '~₹250' },
        { name: 'Rice (2kg)', price: '~₹120' },
        { name: 'Oats (1kg)', price: '~₹150' },
        { name: 'Banana (12 pcs)', price: '~₹60' },
        { name: 'Seasonal fruits', price: '~₹200' }
      ]
    },
    {
      category: 'Healthy Fats & Micros',
      items: [
        { name: 'Walnuts (250g)', price: '~₹300' },
        { name: 'Chia seeds / Flaxseeds (250g)', price: '~₹150' },
        { name: 'Almonds (250g)', price: '~₹250' },
        { name: 'Mustard oil (1L)', price: '~₹180' },
        { name: 'Ghee (200g)', price: '~₹150' }
      ]
    },
    {
      category: 'Vegetables',
      items: [
        { name: 'Spinach / Palak', price: '~₹60' },
        { name: 'Mixed seasonal vegetables', price: '~₹300' },
        { name: 'Mushrooms (for Vitamin D)', price: '~₹100' }
      ]
    }
  ],

  weeklyTotal: '~₹2,650'
};
