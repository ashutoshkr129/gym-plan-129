const FOOD_TABLE = [
  // DAIRY
  {
    category: 'Dairy',
    name: 'Whole Egg',
    rawProtein: 6,
    cookedProtein: 6,
    calories100g: 155,
    serving: '1 egg (50g)',
    servingProtein: 6,
    servingCalories: 78,
    notes: 'Most bioavailable protein source. Cooked protein absorbs better than raw.'
  },
  {
    category: 'Dairy',
    name: 'Egg White',
    rawProtein: 11,
    cookedProtein: 11,
    calories100g: 52,
    serving: '1 white (30g)',
    servingProtein: 3.5,
    servingCalories: 16,
    notes: 'Pure protein, almost zero fat. Good for boosting protein without calories.'
  },
  {
    category: 'Dairy',
    name: 'Toned Milk',
    rawProtein: 3.5,
    cookedProtein: 3.5,
    calories100g: 58,
    serving: '1 glass 250ml',
    servingProtein: 6,
    servingCalories: 120,
    notes: 'Most common milk in India. Good post-workout with whey.'
  },
  {
    category: 'Dairy',
    name: 'Full Fat Milk',
    rawProtein: 3.4,
    cookedProtein: 3.4,
    calories100g: 61,
    serving: '1 glass 250ml',
    servingProtein: 7,
    servingCalories: 150,
    notes: 'Slightly higher fat and calories than toned milk.'
  },
  {
    category: 'Dairy',
    name: 'Paneer',
    rawProtein: 18,
    cookedProtein: 17,
    calories100g: 265,
    serving: '100g',
    servingProtein: 18,
    servingCalories: 265,
    notes: 'Best vegetarian protein source. Goes in almost every Indian meal.'
  },
  {
    category: 'Dairy',
    name: 'Hung Curd / Greek Yogurt',
    rawProtein: 10,
    cookedProtein: 10,
    calories100g: 97,
    serving: '150g bowl',
    servingProtein: 15,
    servingCalories: 145,
    notes: 'Strained curd has double protein of regular curd. Great snack.'
  },
  {
    category: 'Dairy',
    name: 'Regular Curd (Dahi)',
    rawProtein: 4,
    cookedProtein: 4,
    calories100g: 60,
    serving: '150g bowl',
    servingProtein: 6,
    servingCalories: 90,
    notes: 'Lower protein than hung curd. Use hung curd for better protein.'
  },
  {
    category: 'Dairy',
    name: 'Whey Protein (1 scoop)',
    rawProtein: 80,
    cookedProtein: 80,
    calories100g: 370,
    serving: '1 scoop 30g',
    servingProtein: 25,
    servingCalories: 120,
    notes: 'Fastest absorbing protein. Best taken immediately post workout.'
  },
  {
    category: 'Dairy',
    name: 'Cheese (Processed)',
    rawProtein: 20,
    cookedProtein: 19,
    calories100g: 350,
    serving: '1 slice 25g',
    servingProtein: 5,
    servingCalories: 88,
    notes: 'High fat and sodium. Occasional use only.'
  },

  // LEGUMES & DAAL
  {
    category: 'Daal & Legumes',
    name: 'Masoor Daal',
    rawProtein: 25,
    cookedProtein: 9,
    calories100g: 116,
    serving: '1 cup cooked 200g',
    servingProtein: 18,
    servingCalories: 230,
    notes: 'Raw has 25g per 100g but doubles in volume when cooked. 1 cup cooked = ~9g protein.'
  },
  {
    category: 'Daal & Legumes',
    name: 'Chana Daal',
    rawProtein: 22,
    cookedProtein: 9,
    calories100g: 120,
    serving: '1 cup cooked 200g',
    servingProtein: 18,
    servingCalories: 240,
    notes: 'Slower digesting than masoor. Good for sustained energy.'
  },
  {
    category: 'Daal & Legumes',
    name: 'Moong Daal',
    rawProtein: 24,
    cookedProtein: 8,
    calories100g: 105,
    serving: '1 cup cooked 200g',
    servingProtein: 16,
    servingCalories: 210,
    notes: 'Easiest to digest. Great for dinner. Also good as sprouts.'
  },
  {
    category: 'Daal & Legumes',
    name: 'Rajma',
    rawProtein: 22,
    cookedProtein: 8,
    calories100g: 127,
    serving: '1 cup cooked 200g',
    servingProtein: 16,
    servingCalories: 254,
    notes: 'Complete protein when eaten with rice. Sunday special.'
  },
  {
    category: 'Daal & Legumes',
    name: 'Chole (Chickpeas)',
    rawProtein: 20,
    cookedProtein: 8,
    calories100g: 164,
    serving: '1 cup cooked 200g',
    servingProtein: 16,
    servingCalories: 328,
    notes: 'Higher calories than other daals. Rich in fiber and iron.'
  },
  {
    category: 'Daal & Legumes',
    name: 'Moong Sprouts',
    rawProtein: 3,
    cookedProtein: 3,
    calories100g: 30,
    serving: '1 cup 100g',
    servingProtein: 3,
    servingCalories: 30,
    notes: 'Low calorie, high fiber. Great office snack. Protein is modest.'
  },
  {
    category: 'Daal & Legumes',
    name: 'Roasted Chana',
    rawProtein: 20,
    cookedProtein: 20,
    calories100g: 364,
    serving: '30g handful',
    servingProtein: 6,
    servingCalories: 109,
    notes: 'Great portable snack. Good protein to calorie ratio. Easy to carry.'
  },
  {
    category: 'Daal & Legumes',
    name: 'Peanuts',
    rawProtein: 26,
    cookedProtein: 26,
    calories100g: 567,
    serving: '30g handful',
    servingProtein: 8,
    servingCalories: 170,
    notes: 'High protein but also high calorie. Portion control important.'
  },

  // GRAINS
  {
    category: 'Grains',
    name: 'Whole Wheat Roti',
    rawProtein: 13,
    cookedProtein: 4,
    calories100g: 297,
    serving: '1 roti 40g',
    servingProtein: 3,
    servingCalories: 120,
    notes: 'Protein drops significantly when cooked. Main carb source not protein source.'
  },
  {
    category: 'Grains',
    name: 'White Rice (Cooked)',
    rawProtein: 7,
    cookedProtein: 2.7,
    calories100g: 130,
    serving: '1 bowl 150g',
    servingProtein: 4,
    servingCalories: 195,
    notes: 'Low protein. Pure carb source. Eat with daal for complete protein.'
  },
  {
    category: 'Grains',
    name: 'Oats',
    rawProtein: 17,
    cookedProtein: 6,
    calories100g: 389,
    serving: '1 cup dry 80g',
    servingProtein: 11,
    servingCalories: 307,
    notes: 'Best breakfast grain. High fiber, decent protein. Cook with milk for extra protein.'
  },
  {
    category: 'Grains',
    name: 'Brown Rice (Cooked)',
    rawProtein: 8,
    cookedProtein: 2.6,
    calories100g: 111,
    serving: '1 bowl 150g',
    servingProtein: 4,
    servingCalories: 167,
    notes: 'More fiber than white rice. Slightly lower GI. Swap occasionally.'
  },
  {
    category: 'Grains',
    name: 'Idli (steamed)',
    rawProtein: null,
    cookedProtein: 2,
    calories100g: 58,
    serving: '2 idlis 100g',
    servingProtein: 2,
    servingCalories: 116,
    notes: 'Fermented — good for gut health. Low calorie snack option.'
  },
  {
    category: 'Grains',
    name: 'Poha',
    rawProtein: 6,
    cookedProtein: 2,
    calories100g: 333,
    serving: '1 bowl cooked 150g',
    servingProtein: 3,
    servingCalories: 180,
    notes: 'Light and easy to digest. Low protein — add peanuts or eggs to boost.'
  },

  // NUTS & SEEDS
  {
    category: 'Nuts & Seeds',
    name: 'Almonds',
    rawProtein: 21,
    cookedProtein: 21,
    calories100g: 579,
    serving: '8 almonds 15g',
    servingProtein: 3,
    servingCalories: 87,
    notes: 'Rich in Vitamin E and magnesium. Soak overnight for better absorption.'
  },
  {
    category: 'Nuts & Seeds',
    name: 'Walnuts',
    rawProtein: 15,
    cookedProtein: 15,
    calories100g: 654,
    serving: '4–5 halves 15g',
    servingProtein: 2.3,
    servingCalories: 98,
    notes: 'Best plant source of Omega 3. Eat daily for anti-inflammatory benefits.'
  },
  {
    category: 'Nuts & Seeds',
    name: 'Chia Seeds',
    rawProtein: 17,
    cookedProtein: 17,
    calories100g: 486,
    serving: '1 tbsp 12g',
    servingProtein: 2,
    servingCalories: 58,
    notes: 'Excellent Omega 3 source. Add to curd or yogurt daily. Absorbs water — stay hydrated.'
  },
  {
    category: 'Nuts & Seeds',
    name: 'Flaxseeds',
    rawProtein: 18,
    cookedProtein: 18,
    calories100g: 534,
    serving: '1 tbsp 10g',
    servingProtein: 1.8,
    servingCalories: 53,
    notes: 'Grind before eating for better Omega 3 absorption. Whole flaxseeds pass undigested.'
  },
  {
    category: 'Nuts & Seeds',
    name: 'Pumpkin Seeds',
    rawProtein: 30,
    cookedProtein: 30,
    calories100g: 559,
    serving: '2 tbsp 20g',
    servingProtein: 6,
    servingCalories: 112,
    notes: 'Highest magnesium among seeds. Great for sleep and recovery.'
  },
  {
    category: 'Nuts & Seeds',
    name: 'Makhana (Fox Nuts)',
    rawProtein: 9,
    cookedProtein: 9,
    calories100g: 347,
    serving: '30g handful',
    servingProtein: 2.7,
    servingCalories: 104,
    notes: 'Light, portable office snack. Low fat, decent carbs. Easy to carry.'
  },

  // VEGETABLES
  {
    category: 'Vegetables',
    name: 'Spinach (Palak)',
    rawProtein: 2.9,
    cookedProtein: 3,
    calories100g: 23,
    serving: '1 cup cooked 180g',
    servingProtein: 5,
    servingCalories: 41,
    notes: 'Best magnesium source in Indian diet. Also rich in iron and folate. Eat daily.'
  },
  {
    category: 'Vegetables',
    name: 'Mushrooms',
    rawProtein: 3.1,
    cookedProtein: 3.5,
    calories100g: 22,
    serving: '1 cup 100g',
    servingProtein: 3,
    servingCalories: 22,
    notes: 'Only plant food with Vitamin D (when sun-dried). Great addition to sabzi.'
  },
  {
    category: 'Vegetables',
    name: 'Green Peas',
    rawProtein: 5,
    cookedProtein: 5,
    calories100g: 81,
    serving: '1/2 cup 80g',
    servingProtein: 4,
    servingCalories: 65,
    notes: 'Highest protein vegetable. Add to any sabzi for protein boost.'
  },
  {
    category: 'Vegetables',
    name: 'Broccoli',
    rawProtein: 2.8,
    cookedProtein: 2.5,
    calories100g: 34,
    serving: '1 cup 100g',
    servingProtein: 2.5,
    servingCalories: 34,
    notes: 'Rich in Vitamin C which helps iron absorption from daal and spinach.'
  },
  {
    category: 'Vegetables',
    name: 'Sweet Potato',
    rawProtein: 1.6,
    cookedProtein: 1.4,
    calories100g: 86,
    serving: '1 medium 150g',
    servingProtein: 2,
    servingCalories: 129,
    notes: 'Better carb than regular potato. High in Vitamin A and potassium.'
  },

  // CHICKEN (Occasional)
  {
    category: 'Chicken (Occasional)',
    name: 'Chicken Breast (skinless)',
    rawProtein: 23,
    cookedProtein: 31,
    calories100g: 165,
    serving: '100g cooked',
    servingProtein: 31,
    servingCalories: 165,
    notes: 'Protein increases when cooked as water evaporates. Best lean protein source.'
  },
  {
    category: 'Chicken (Occasional)',
    name: 'Chicken Leg / Thigh',
    rawProtein: 18,
    cookedProtein: 25,
    calories100g: 209,
    serving: '100g cooked',
    servingProtein: 25,
    servingCalories: 209,
    notes: 'More fat than breast but also more flavourful. Fine occasionally.'
  },
  {
    category: 'Chicken (Occasional)',
    name: 'Chicken Egg (whole)',
    rawProtein: 13,
    cookedProtein: 13,
    calories100g: 155,
    serving: '1 egg 50g',
    servingProtein: 6,
    servingCalories: 78,
    notes: 'Same as dairy egg entry. Listed here for reference.'
  }
];

const FOOD_CATEGORIES = [...new Set(FOOD_TABLE.map(f => f.category))];
