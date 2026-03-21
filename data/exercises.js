const EXERCISES = {
  'push-a': {
    day: 'Push A',
    dayTag: 'Monday',
    type: 'push',
    focus: 'Strength',
    muscles: 'Chest · Shoulders · Triceps',
    warmup: [
      '5 min light treadmill or bike',
      'Arm circles — 10 forward, 10 backward',
      'Band pull aparts — 2 × 15',
      'Light DB press — 1 × 15 (very light)',
      'Shoulder rotations — 10 each direction'
    ],
    core: [
      'Plank — 3 × 45 sec',
      'Dead Bug — 3 × 10 each side',
      'Cable Crunch — 3 × 15'
    ],
    stretching: [
      'Chest doorway stretch — 30 sec each side',
      'Overhead tricep stretch — 30 sec each arm',
      'Cross body shoulder stretch — 30 sec each',
      'Pec minor stretch — 30 sec'
    ],
    exercises: [
      {
        id: 'pa-bench',
        name: 'Barbell Bench Press',
        sets: '4 × 5',
        rest: '3 min',
        desc: 'Lie flat on bench, grip slightly wider than shoulder width, lower bar to chest and press up. Primary chest mass builder.',
        youtube: 'https://www.youtube.com/results?search_query=barbell+bench+press+form',
        guide: 'https://musclewiki.com/barbell/male/chest/barbell-bench-press',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 5',
        alternatives: ['Dumbbell Bench Press', 'Machine Chest Press', 'Push-ups']
      },
      {
        id: 'pa-ohp',
        name: 'Overhead Press (Barbell)',
        sets: '4 × 6',
        rest: '3 min',
        desc: 'Stand with bar at shoulder height, press straight overhead to full lockout. Builds front delts and upper traps.',
        youtube: 'https://www.youtube.com/results?search_query=barbell+overhead+press+form',
        guide: 'https://musclewiki.com/barbell/male/shoulders/barbell-overhead-press',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 6',
        alternatives: ['Dumbbell Shoulder Press', 'Arnold Press', 'Machine Shoulder Press']
      },
      {
        id: 'pa-incline',
        name: 'Incline Dumbbell Press',
        sets: '3 × 10',
        rest: '90 sec',
        desc: 'Set bench to 30–45°, press dumbbells from shoulder height upward. Targets upper chest which adds thickness to the top of your pecs.',
        youtube: 'https://www.youtube.com/results?search_query=incline+dumbbell+press+form',
        guide: 'https://musclewiki.com/dumbbells/male/chest/dumbbell-incline-bench-press',
        weightPlaceholder: 'per dumbbell',
        repsPlaceholder: 'e.g. 10',
        alternatives: ['Incline Barbell Press', 'Incline Machine Press', 'Cable Incline Fly']
      },
      {
        id: 'pa-lateral',
        name: 'Cable Lateral Raises',
        sets: '3 × 15',
        rest: '60 sec',
        desc: 'Single arm, cable at ankle height, raise arm out to side to shoulder level. Builds side delt width.',
        youtube: 'https://www.youtube.com/results?search_query=cable+lateral+raise+form',
        guide: 'https://musclewiki.com/cable/male/shoulders/cable-lateral-raise',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 15',
        alternatives: ['Dumbbell Lateral Raises', 'Machine Lateral Raises']
      },
      {
        id: 'pa-pushdown',
        name: 'Tricep Pushdowns (Cable)',
        sets: '3 × 12',
        rest: '60 sec',
        desc: 'Cable machine, straight bar or V-bar, press down to full extension keeping elbows tucked. Hits lateral and medial tricep head.',
        youtube: 'https://www.youtube.com/results?search_query=tricep+pushdown+cable+form',
        guide: 'https://musclewiki.com/cable/male/triceps/cable-pushdown',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Rope Pushdowns', 'Single Arm Pushdown', 'Band Pushdown']
      },
      {
        id: 'pa-ohtri',
        name: 'Overhead Tricep Extension',
        sets: '3 × 12',
        rest: '60 sec',
        desc: 'Dumbbell or cable, arms overhead, lower behind head and extend back up. Best exercise for tricep long head.',
        youtube: 'https://www.youtube.com/results?search_query=overhead+tricep+extension+form',
        guide: 'https://musclewiki.com/dumbbells/male/triceps/dumbbell-overhead-tricep-extension',
        weightPlaceholder: 'dumbbell weight',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Cable Overhead Extension', 'Skull Crushers', 'Single Arm Extension']
      }
    ]
  },

  'pull-a': {
    day: 'Pull A',
    dayTag: 'Tuesday',
    type: 'pull',
    focus: 'Strength',
    muscles: 'Back · Biceps · Rear Delts',
    warmup: [
      '5 min light treadmill or bike',
      'Cat-cow stretch — 10 reps',
      'Scapular pull ups — 2 × 10',
      'Band rows — 2 × 15',
      'Hip hinge practice with empty bar — 10 reps'
    ],
    core: [
      'Plank — 3 × 45 sec',
      'Dead Bug — 3 × 10 each side',
      'Cable Crunch — 3 × 15'
    ],
    stretching: [
      'Lat stretch — hang from bar 30 sec or standing overhead',
      'Bicep wall stretch — 30 sec each arm',
      'Thoracic rotation — 10 reps each side',
      "Child's pose — 45 sec for lower back"
    ],
    exercises: [
      {
        id: 'pla-deadlift',
        name: 'Deadlift',
        sets: '4 × 5',
        rest: '4 min',
        desc: 'Bar on floor, hinge at hips, chest up, bar close to shins. Drive through the floor and lock out at the top. Builds entire posterior chain.',
        youtube: 'https://www.youtube.com/results?search_query=deadlift+form+beginners',
        guide: 'https://musclewiki.com/barbell/male/hamstrings/barbell-deadlift',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 5',
        alternatives: ['Trap Bar Deadlift', 'Rack Pull', 'Romanian Deadlift']
      },
      {
        id: 'pla-pullup',
        name: 'Pull-ups / Lat Pulldown',
        sets: '4 × 6–8',
        rest: '2 min',
        desc: 'Pull-ups — hang from bar, pull chest to bar. Lat Pulldown — cable machine, pull bar to chin. Use pulldown until you can do 8+ clean pull-ups.',
        youtube: 'https://www.youtube.com/results?search_query=pull+up+lat+pulldown+form',
        guide: 'https://musclewiki.com/bodyweight/male/lats/pull-up',
        weightPlaceholder: '0 = bodyweight',
        repsPlaceholder: 'e.g. 8',
        alternatives: ['Assisted Pull-up Machine', 'Band Assisted Pull-up', 'TRX Row']
      },
      {
        id: 'pla-bbrow',
        name: 'Barbell Row',
        sets: '3 × 8',
        rest: '2 min',
        desc: 'Hinge forward at hips, overhand grip, pull bar to lower chest. Keep back flat throughout. Builds overall back thickness.',
        youtube: 'https://www.youtube.com/results?search_query=barbell+row+form',
        guide: 'https://musclewiki.com/barbell/male/upper-back/barbell-bent-over-row',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 8',
        alternatives: ['Pendlay Row', 'T-Bar Row', 'Chest Supported Row']
      },
      {
        id: 'pla-cablerow',
        name: 'Seated Cable Row (V-grip)',
        sets: '3 × 12',
        rest: '90 sec',
        desc: 'Sit upright, pull V-grip handle to lower chest, squeeze shoulder blades together at the end. Targets middle back and rhomboids.',
        youtube: 'https://www.youtube.com/results?search_query=seated+cable+row+v+grip+form',
        guide: 'https://musclewiki.com/cable/male/upper-back/cable-seated-row',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Wide Grip Cable Row', 'Single Arm Cable Row', 'Machine Row']
      },
      {
        id: 'pla-facepull',
        name: 'Face Pulls (Cable)',
        sets: '3 × 15',
        rest: '60 sec',
        desc: 'Cable at face height, rope attachment, pull toward face with elbows flared high. Builds rear delts and improves shoulder health and posture.',
        youtube: 'https://www.youtube.com/results?search_query=face+pulls+cable+form',
        guide: 'https://musclewiki.com/cable/male/shoulders/cable-face-pull',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 15',
        alternatives: ['Band Face Pull', 'Reverse Fly (DB)', 'Rear Delt Machine']
      },
      {
        id: 'pla-curl',
        name: 'Barbell / EZ-Bar Curl',
        sets: '3 × 10',
        rest: '60 sec',
        desc: 'Stand upright, curl bar from hip to chin with controlled movement. No swinging. Primary bicep mass builder.',
        youtube: 'https://www.youtube.com/results?search_query=ez+bar+curl+form',
        guide: 'https://musclewiki.com/barbell/male/biceps/barbell-curl',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 10',
        alternatives: ['Dumbbell Curl', 'Cable Curl', 'Preacher Curl']
      }
    ]
  },

  'legs-a': {
    day: 'Legs A',
    dayTag: 'Wednesday',
    type: 'legs',
    focus: 'Strength',
    muscles: 'Quads · Hamstrings · Glutes · Calves',
    warmup: [
      '5 min light bike or treadmill',
      'Hip circles — 10 each direction',
      'Bodyweight squats — 2 × 15',
      'Leg swings — 10 forward/back, 10 side to side',
      'Glute bridges — 2 × 15'
    ],
    core: [
      'Plank — 3 × 45 sec',
      'Dead Bug — 3 × 10 each side',
      'Cable Crunch — 3 × 15'
    ],
    stretching: [
      'Hip flexor lunge stretch — 45 sec each side',
      'Standing hamstring stretch — 30 sec each leg',
      'Pigeon pose — 45 sec each side',
      'Standing calf stretch — 30 sec each leg',
      'Seated glute stretch — 30 sec each side'
    ],
    exercises: [
      {
        id: 'la-squat',
        name: 'Barbell Back Squat',
        sets: '4 × 5',
        rest: '4 min',
        desc: 'Bar on upper traps, feet shoulder width, squat below parallel keeping chest up and knees tracking over toes. King of all leg exercises for overall mass.',
        youtube: 'https://www.youtube.com/results?search_query=barbell+back+squat+form',
        guide: 'https://musclewiki.com/barbell/male/quads/barbell-squat',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 5',
        alternatives: ['Goblet Squat', 'Leg Press', 'Hack Squat']
      },
      {
        id: 'la-rdl',
        name: 'Romanian Deadlift (RDL)',
        sets: '3 × 10',
        rest: '2 min',
        desc: 'Hinge at hips with slight knee bend, lower bar along legs until hamstring stretch, drive hips forward to stand. Best hamstring builder in the program.',
        youtube: 'https://www.youtube.com/results?search_query=romanian+deadlift+form',
        guide: 'https://musclewiki.com/barbell/male/hamstrings/barbell-romanian-deadlift',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 10',
        alternatives: ['Dumbbell RDL', 'Single Leg RDL', 'Cable Pull Through']
      },
      {
        id: 'la-legpress',
        name: 'Leg Press',
        sets: '3 × 12',
        rest: '90 sec',
        desc: 'Feet shoulder width on platform, lower sled until knees reach 90°, press back up without locking knees. High foot placement emphasises glutes.',
        youtube: 'https://www.youtube.com/results?search_query=leg+press+form',
        guide: 'https://musclewiki.com/machine/male/quads/machine-leg-press',
        weightPlaceholder: 'machine weight',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Hack Squat', 'Belt Squat', 'Sissy Squat']
      },
      {
        id: 'la-legcurl',
        name: 'Leg Curl (Machine)',
        sets: '3 × 12',
        rest: '90 sec',
        desc: 'Lying or seated, curl weight toward glutes with full ROM. Isolated hamstring work to complement RDL.',
        youtube: 'https://www.youtube.com/results?search_query=leg+curl+machine+form',
        guide: 'https://musclewiki.com/machine/male/hamstrings/machine-leg-curl',
        weightPlaceholder: 'machine weight',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Nordic Curl', 'Swiss Ball Curl', 'Cable Leg Curl']
      },
      {
        id: 'la-hipthrust',
        name: 'Hip Thrust (Barbell)',
        sets: '3 × 12',
        rest: '90 sec',
        desc: 'Upper back on bench, bar across hips, drive hips upward squeezing glutes hard at the top. Best glute builder — directly improves your waist-hip ratio.',
        youtube: 'https://www.youtube.com/results?search_query=barbell+hip+thrust+form',
        guide: 'https://musclewiki.com/barbell/male/glutes/barbell-hip-thrust',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Dumbbell Hip Thrust', 'Glute Bridge', 'Cable Pull Through']
      },
      {
        id: 'la-calf',
        name: 'Standing Calf Raises',
        sets: '4 × 15',
        rest: '60 sec',
        desc: 'Full ROM — pause at bottom for stretch and top for squeeze. Hits gastrocnemius, the larger upper calf muscle.',
        youtube: 'https://www.youtube.com/results?search_query=standing+calf+raise+form',
        guide: 'https://musclewiki.com/machine/male/calves/machine-standing-calf-raise',
        weightPlaceholder: '0 = bodyweight',
        repsPlaceholder: 'e.g. 15',
        alternatives: ['Seated Calf Raises', 'Leg Press Calf Raises', 'Donkey Calf Raises']
      }
    ]
  },

  'push-b': {
    day: 'Push B',
    dayTag: 'Thursday',
    type: 'push',
    focus: 'Hypertrophy',
    muscles: 'Chest · Shoulders · Triceps',
    warmup: [
      '5 min light treadmill or bike',
      'Arm circles — 10 forward, 10 backward',
      'Band pull aparts — 2 × 15',
      'Light incline DB press — 1 × 15 (very light)',
      'Shoulder rotations — 10 each direction'
    ],
    core: [
      'Plank — 3 × 45 sec',
      'Dead Bug — 3 × 10 each side',
      'Cable Crunch — 3 × 15'
    ],
    stretching: [
      'Chest doorway stretch — 30 sec each side',
      'Overhead tricep stretch — 30 sec each arm',
      'Cross body shoulder stretch — 30 sec each',
      'Pec minor stretch — 30 sec'
    ],
    exercises: [
      {
        id: 'pb-incline',
        name: 'Incline Barbell / DB Press',
        sets: '4 × 8–10',
        rest: '2 min',
        desc: 'Set bench to 30–45°, heavier than Push A incline. More chest volume with focus on upper pec hypertrophy.',
        youtube: 'https://www.youtube.com/results?search_query=incline+barbell+press+form',
        guide: 'https://musclewiki.com/barbell/male/chest/barbell-incline-bench-press',
        weightPlaceholder: 'total/per DB',
        repsPlaceholder: 'e.g. 10',
        alternatives: ['Flat DB Press', 'Cable Incline Press', 'Smith Machine Incline']
      },
      {
        id: 'pb-arnold',
        name: 'Arnold Press',
        sets: '3 × 12',
        rest: '90 sec',
        desc: 'Start with dumbbells at chin level palms facing you, rotate wrists outward as you press up. Hits all three delt heads in one movement.',
        youtube: 'https://www.youtube.com/results?search_query=arnold+press+form',
        guide: 'https://musclewiki.com/dumbbells/male/shoulders/dumbbell-arnold-press',
        weightPlaceholder: 'per dumbbell',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Dumbbell Shoulder Press', 'Cable Shoulder Press', 'Machine Shoulder Press']
      },
      {
        id: 'pb-cablefly',
        name: 'Cable Fly / Pec Deck',
        sets: '3 × 15',
        rest: '60 sec',
        desc: 'Arms wide, bring handles together in front of chest with slight bend in elbow. Pure chest isolation — focus on the stretch and squeeze.',
        youtube: 'https://www.youtube.com/results?search_query=cable+fly+pec+deck+form',
        guide: 'https://musclewiki.com/cable/male/chest/cable-fly',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 15',
        alternatives: ['Dumbbell Fly', 'Machine Fly', 'Resistance Band Fly']
      },
      {
        id: 'pb-lateral',
        name: 'Lateral Raises (DB)',
        sets: '4 × 15',
        rest: '60 sec',
        desc: 'Dumbbells at sides, raise to shoulder height with slight bend in elbow. 3 second slow lowering for maximum side delt activation.',
        youtube: 'https://www.youtube.com/results?search_query=dumbbell+lateral+raise+form',
        guide: 'https://musclewiki.com/dumbbells/male/shoulders/dumbbell-lateral-raise',
        weightPlaceholder: 'per dumbbell',
        repsPlaceholder: 'e.g. 15',
        alternatives: ['Cable Lateral Raises', 'Machine Lateral Raises', 'Band Lateral Raises']
      },
      {
        id: 'pb-rope',
        name: 'Rope Tricep Pushdowns',
        sets: '3 × 12–15',
        rest: '60 sec',
        desc: 'Cable machine with rope attachment, pull down and flare hands out at the bottom for full tricep contraction. Great for lateral head.',
        youtube: 'https://www.youtube.com/results?search_query=rope+tricep+pushdown+form',
        guide: 'https://musclewiki.com/cable/male/triceps/cable-pushdown-rope',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['V-Bar Pushdown', 'Single Arm Pushdown', 'Band Pushdown']
      },
      {
        id: 'pb-dips',
        name: 'Diamond Push-ups / Dips',
        sets: '3 × failure',
        rest: '90 sec',
        desc: 'Diamond push-ups — hands close together forming a diamond shape. Dips — on parallel bars, lean slightly forward. Burnout finisher for all three tricep heads.',
        youtube: 'https://www.youtube.com/results?search_query=diamond+pushups+dips+triceps+form',
        guide: 'https://musclewiki.com/bodyweight/male/triceps/dip',
        weightPlaceholder: '0 = bodyweight',
        repsPlaceholder: 'e.g. 15',
        alternatives: ['Bench Dips', 'Close Grip Push-ups', 'Machine Dips']
      }
    ]
  },

  'pull-b': {
    day: 'Pull B',
    dayTag: 'Friday',
    type: 'pull',
    focus: 'Hypertrophy',
    muscles: 'Back · Biceps · Rear Delts',
    warmup: [
      '5 min light treadmill or bike',
      'Cat-cow stretch — 10 reps',
      'Scapular pull ups — 2 × 10',
      'Band rows — 2 × 15',
      'Dead hangs — 2 × 20 sec'
    ],
    core: [
      'Plank — 3 × 45 sec',
      'Dead Bug — 3 × 10 each side',
      'Cable Crunch — 3 × 15'
    ],
    stretching: [
      'Lat stretch — hang from bar 30 sec or standing overhead',
      'Bicep wall stretch — 30 sec each arm',
      'Thoracic rotation — 10 reps each side',
      "Child's pose — 45 sec for lower back"
    ],
    exercises: [
      {
        id: 'plb-widepull',
        name: 'Wide-grip Lat Pulldown',
        sets: '4 × 10',
        rest: '2 min',
        desc: 'Grip bar wider than shoulder width, pull down to chin, full stretch at the top. Wide grip emphasises lat width more than close grip.',
        youtube: 'https://www.youtube.com/results?search_query=wide+grip+lat+pulldown+form',
        guide: 'https://musclewiki.com/cable/male/lats/cable-lat-pulldown',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 10',
        alternatives: ['Close Grip Pulldown', 'Pull-ups', 'Single Arm Pulldown']
      },
      {
        id: 'plb-dbrow',
        name: 'Single-arm DB Row',
        sets: '4 × 10/side',
        rest: '90 sec',
        desc: 'One knee and hand on bench, pull dumbbell from full stretch to hip. Elbow should pass your torso at the top. Best unilateral back builder.',
        youtube: 'https://www.youtube.com/results?search_query=single+arm+dumbbell+row+form',
        guide: 'https://musclewiki.com/dumbbells/male/lats/dumbbell-single-arm-row',
        weightPlaceholder: 'dumbbell weight',
        repsPlaceholder: 'e.g. 10',
        alternatives: ['Cable Single Arm Row', 'Machine Row', 'Meadows Row']
      },
      {
        id: 'plb-facepull',
        name: 'Face Pulls (Cable)',
        sets: '3 × 15',
        rest: '60 sec',
        desc: 'Cable at face height, rope attachment, pull toward face with elbows flared high. Rear delts need work both pull days for shoulder balance.',
        youtube: 'https://www.youtube.com/results?search_query=face+pulls+cable+form',
        guide: 'https://musclewiki.com/cable/male/shoulders/cable-face-pull',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 15',
        alternatives: ['Band Face Pull', 'Reverse Pec Deck', 'Rear Delt Fly']
      },
      {
        id: 'plb-straightarm',
        name: 'Straight-arm Pulldown',
        sets: '3 × 15',
        rest: '60 sec',
        desc: 'Arms straight, pull cable from overhead down to hips in a sweeping arc. Pure lat isolation — great for building width and the mind-muscle connection.',
        youtube: 'https://www.youtube.com/results?search_query=straight+arm+pulldown+cable+form',
        guide: 'https://musclewiki.com/cable/male/lats/cable-straight-arm-pulldown',
        weightPlaceholder: 'cable stack',
        repsPlaceholder: 'e.g. 15',
        alternatives: ['Band Pulldown', 'Dumbbell Pullover', 'Machine Pullover']
      },
      {
        id: 'plb-hammer',
        name: 'Hammer Curls',
        sets: '3 × 12',
        rest: '60 sec',
        desc: 'Dumbbells with neutral grip (palms facing each other), curl up and lower slowly. Hits brachialis and brachioradialis for fuller looking arms.',
        youtube: 'https://www.youtube.com/results?search_query=hammer+curl+form',
        guide: 'https://musclewiki.com/dumbbells/male/biceps/dumbbell-hammer-curl',
        weightPlaceholder: 'per dumbbell',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Cross Body Hammer Curl', 'Cable Hammer Curl', 'Rope Hammer Curl']
      },
      {
        id: 'plb-inclinecurl',
        name: 'Incline DB Curl',
        sets: '3 × 12',
        rest: '60 sec',
        desc: 'Sit on incline bench, arms hang back behind body, curl up from full stretch. Long head emphasis gives better bicep peak over time.',
        youtube: 'https://www.youtube.com/results?search_query=incline+dumbbell+curl+form',
        guide: 'https://musclewiki.com/dumbbells/male/biceps/dumbbell-incline-curl',
        weightPlaceholder: 'per dumbbell',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Cable Curl', 'Concentration Curl', 'Spider Curl']
      }
    ]
  },

  'legs-b': {
    day: 'Legs B',
    dayTag: 'Saturday',
    type: 'legs',
    focus: 'Hypertrophy',
    muscles: 'Quads · Hamstrings · Glutes · Calves',
    warmup: [
      '5 min light bike or treadmill',
      'Hip circles — 10 each direction',
      'Bodyweight squats — 2 × 15',
      'Leg swings — 10 forward/back, 10 side to side',
      'Glute bridges — 2 × 15'
    ],
    core: [
      'Plank — 3 × 45 sec',
      'Dead Bug — 3 × 10 each side',
      'Cable Crunch — 3 × 15'
    ],
    stretching: [
      'Hip flexor lunge stretch — 45 sec each side',
      'Standing hamstring stretch — 30 sec each leg',
      'Pigeon pose — 45 sec each side',
      'Standing calf stretch — 30 sec each leg',
      'Seated glute stretch — 30 sec each side'
    ],
    exercises: [
      {
        id: 'lb-frontsquat',
        name: 'Front Squat / Goblet Squat',
        sets: '4 × 8',
        rest: '2 min',
        desc: 'Front Squat — bar on front delts, elbows high. Goblet Squat — hold dumbbell at chest. Both are quad dominant with more upright torso than back squat.',
        youtube: 'https://www.youtube.com/results?search_query=front+squat+goblet+squat+form',
        guide: 'https://musclewiki.com/barbell/male/quads/barbell-front-squat',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 8',
        alternatives: ['Back Squat', 'Hack Squat', 'Leg Press']
      },
      {
        id: 'lb-bss',
        name: 'Bulgarian Split Squat',
        sets: '3 × 10/leg',
        rest: '2 min',
        desc: 'Rear foot elevated on bench, lower back knee toward floor, drive through front heel to stand. Best single leg exercise — fixes left-right imbalances.',
        youtube: 'https://www.youtube.com/results?search_query=bulgarian+split+squat+form',
        guide: 'https://musclewiki.com/dumbbells/male/quads/dumbbell-bulgarian-split-squat',
        weightPlaceholder: '0 = bodyweight',
        repsPlaceholder: 'e.g. 10',
        alternatives: ['Reverse Lunge', 'Step-ups', 'Single Leg Press']
      },
      {
        id: 'lb-legpress',
        name: 'Leg Press',
        sets: '3 × 12',
        rest: '90 sec',
        desc: 'Same as Legs A but slightly lighter since Bulgarian Split Squat pre-fatigues the legs. Focus on full ROM and controlled tempo.',
        youtube: 'https://www.youtube.com/results?search_query=leg+press+form',
        guide: 'https://musclewiki.com/machine/male/quads/machine-leg-press',
        weightPlaceholder: 'machine weight',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Hack Squat', 'Belt Squat', 'Goblet Squat']
      },
      {
        id: 'lb-nordic',
        name: 'Nordic Curl / Lying Leg Curl',
        sets: '3 × 12',
        rest: '90 sec',
        desc: 'Nordic — kneel, anchor feet, lower body to floor using hamstrings only. Very challenging. Substitute with Lying Leg Curl if Nordic is not available.',
        youtube: 'https://www.youtube.com/results?search_query=nordic+curl+lying+leg+curl+form',
        guide: 'https://musclewiki.com/machine/male/hamstrings/machine-leg-curl',
        weightPlaceholder: '0 = bodyweight',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Seated Leg Curl', 'Swiss Ball Curl', 'Cable Leg Curl']
      },
      {
        id: 'lb-hipthrust',
        name: 'Hip Thrust (Barbell)',
        sets: '4 × 12',
        rest: '90 sec',
        desc: 'Same as Legs A — load heavier progressively. Glutes on both leg days accelerates your waist-hip ratio improvement.',
        youtube: 'https://www.youtube.com/results?search_query=barbell+hip+thrust+form',
        guide: 'https://musclewiki.com/barbell/male/glutes/barbell-hip-thrust',
        weightPlaceholder: 'total bar weight',
        repsPlaceholder: 'e.g. 12',
        alternatives: ['Dumbbell Hip Thrust', 'Glute Bridge', 'Cable Pull Through']
      },
      {
        id: 'lb-seatedcalf',
        name: 'Seated Calf Raises',
        sets: '4 × 20',
        rest: '60 sec',
        desc: 'Seated position targets soleus, the deeper calf muscle underneath the gastrocnemius. Essential to train both standing and seated for complete calf development.',
        youtube: 'https://www.youtube.com/results?search_query=seated+calf+raise+form',
        guide: 'https://musclewiki.com/machine/male/calves/machine-seated-calf-raise',
        weightPlaceholder: 'machine weight',
        repsPlaceholder: 'e.g. 20',
        alternatives: ['Standing Calf Raises', 'Leg Press Calf Raises', 'Donkey Calf Raises']
      }
    ]
  }
};

const SCHEDULE = {
  0: null,        // Sunday - Rest
  1: 'push-a',   // Monday
  2: 'pull-a',   // Tuesday
  3: 'legs-a',   // Wednesday
  4: 'push-b',   // Thursday
  5: 'pull-b',   // Friday
  6: 'legs-b'    // Saturday
};
