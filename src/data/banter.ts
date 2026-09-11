import type { BanterLine } from '../types/banter';

export const ALL_BANTER_LINES: BanterLine[] = [
  // --- SESSION_START ---
  {
    id: 'start_01',
    event: 'SESSION_START',
    ar: 'يلا بينا… نشوف مين فيكم اللي حافظ التاني أكتر 👀',
    en: "Let's see who actually knows the other better 👀",
    weight: 2,
    tone: 'playful',
  },
  {
    id: 'start_02',
    event: 'SESSION_START',
    ar: 'نصيحة قبل ما نبدأ: الصراحة مطلوبة ومفيش زعل 🤝',
    en: 'Rule zero: total honesty, no taking it personally 🤝',
    weight: 2,
    tone: 'wholesome',
  },
  {
    id: 'start_03',
    event: 'SESSION_START',
    ar: 'الموبايل وسيط محايد تمامًا… لو فيه خناقة مش ذنبنا 😭',
    en: 'Vibey is strictly neutral. Any debates are between you two 😭',
    weight: 1,
    tone: 'teasing',
  },

  // --- FIRST_MATCH ---
  {
    id: 'first_match_01',
    event: 'FIRST_MATCH',
    ar: 'أول Same Vibe… هنعدّيها المرة دي 👀',
    en: "First match! We'll allow it for now 👀",
    weight: 2,
    tone: 'playful',
  },
  {
    id: 'first_match_02',
    event: 'FIRST_MATCH',
    ar: 'بداية مبشرة… طلع فيه أمل نتفق على حاجة ✨',
    en: 'Promising start. Common ground unlocked ✨',
    weight: 2,
    tone: 'wholesome',
  },

  // --- MATCH ---
  {
    id: 'match_01',
    event: 'MATCH',
    ar: 'أوكي، دي اتحسبت توافق رسمي 🤝',
    en: 'Count it. Official alignment 🤝',
    cooldown: 4,
    weight: 2,
    tone: 'playful',
  },
  {
    id: 'match_02',
    event: 'MATCH',
    ar: 'نقطة اتفاق نادرة في عالم مليان حيرة ✨',
    en: 'A rare moment of mutual clarity ✨',
    cooldown: 4,
    weight: 1,
    tone: 'wholesome',
  },
  {
    id: 'match_03',
    event: 'MATCH',
    ar: 'مش بطالين خالص… نفس الدماغ شغالة 🔥',
    en: 'Not bad at all. Same wavelength 🔥',
    cooldown: 4,
    weight: 2,
    tone: 'playful',
  },
  {
    id: 'match_04',
    event: 'MATCH',
    ar: 'شكلكم متفقين على حاجات أكتر ما كنتوا متوقعين 👀',
    en: 'Seems like you agree more than you thought 👀',
    cooldown: 5,
    weight: 1,
    tone: 'reaction',
  },

  // --- MATCH_STREAK ---
  {
    id: 'match_streak_01',
    event: 'MATCH_STREAK',
    ar: 'ثالث مرة؟ يا إما نفس الـVibe يا إما حد بيبص 👀',
    en: "Third time in a row? Same vibe or someone's peeking 👀",
    minOccurrences: 3,
    cooldown: 6,
    weight: 3,
    tone: 'teasing',
  },
  {
    id: 'match_streak_02',
    event: 'MATCH_STREAK',
    ar: 'لا لا… الاتفاق المتتالي ده بقى مريب الصراحة 💀',
    en: 'Wait… this streak is officially suspicious 💀',
    minOccurrences: 3,
    cooldown: 6,
    weight: 2,
    tone: 'dramatic',
  },
  {
    id: 'match_streak_03',
    event: 'MATCH_STREAK',
    ar: 'طب اقفلوا Vibey بقى، واضح إنكم مش محتاجينه 😂',
    en: 'You two clearly did not need an icebreaker app 😂',
    minOccurrences: 4,
    cooldown: 8,
    weight: 3,
    tone: 'teasing',
  },

  // --- FIRST_DIFFERENCE ---
  {
    id: 'first_diff_01',
    event: 'FIRST_DIFFERENCE',
    ar: 'بدأنا مشاكل بدري 💀',
    en: 'And the polite consensus ends right here 💀',
    weight: 3,
    tone: 'teasing',
  },
  {
    id: 'first_diff_02',
    event: 'FIRST_DIFFERENCE',
    ar: 'وأول خلاف رسمي وصل… كل واحد يبرر بقى 😂',
    en: 'First debate of the night. Defend your picks 😂',
    weight: 2,
    tone: 'playful',
  },

  // --- DIFFERENCE ---
  {
    id: 'diff_01',
    event: 'DIFFERENCE',
    ar: 'أنا مالي… حلّوها بينكم 😭',
    en: 'Vibey is staying out of this one 😭',
    cooldown: 4,
    weight: 3,
    tone: 'reaction',
  },
  {
    id: 'diff_02',
    event: 'DIFFERENCE',
    ar: 'كل واحد مقتنع تمامًا إنه الصح. جميل جدا 😌',
    en: 'Both completely convinced they picked the right one. Lovely 😌',
    cooldown: 4,
    weight: 2,
    tone: 'teasing',
  },
  {
    id: 'diff_03',
    event: 'DIFFERENCE',
    ar: 'الاختلاف هو اللي بيعمل طعم للقعدة ✨',
    en: 'Contrasting answers keep things interesting ✨',
    cooldown: 4,
    weight: 1,
    tone: 'wholesome',
  },
  {
    id: 'diff_04',
    event: 'DIFFERENCE',
    ar: 'مش هدخل في الحوار ده عشان هتحط في النص 💀',
    en: 'Refusing to mediate this debate 💀',
    cooldown: 5,
    weight: 2,
    tone: 'teasing',
  },

  // --- DIFFERENCE_STREAK ---
  {
    id: 'diff_streak_01',
    event: 'DIFFERENCE_STREAK',
    ar: 'الاتفاق عندكم واخد أجازة رسمية النهارده 🤝',
    en: 'Consensus took the night off 🤝',
    minOccurrences: 3,
    cooldown: 6,
    weight: 3,
    tone: 'teasing',
  },
  {
    id: 'diff_streak_02',
    event: 'DIFFERENCE_STREAK',
    ar: 'قررتوا تتفقوا على عدم الاتفاق؟ عظيم 😂',
    en: 'Agreed to disagree on literally everything? Iconic 😂',
    minOccurrences: 3,
    cooldown: 6,
    weight: 2,
    tone: 'playful',
  },
  {
    id: 'diff_streak_03',
    event: 'DIFFERENCE_STREAK',
    ar: 'جميل. اتنين غرباء رسميًا بيتعرفوا من الأول 🤝',
    en: 'Two complete strangers discovering each other in real time 🤝',
    minOccurrences: 4,
    cooldown: 8,
    weight: 2,
    tone: 'teasing',
  },

  // --- FIRST_SKIP ---
  {
    id: 'first_skip_01',
    event: 'FIRST_SKIP',
    ar: 'هنعمل نفسنا مشوفناش الـSkip ده 😌',
    en: "Yeah, we're pretending that skip never happened 😌",
    weight: 3,
    tone: 'playful',
  },
  {
    id: 'first_skip_02',
    event: 'FIRST_SKIP',
    ar: 'عدّت بسلاسة… السؤال اللي بعده مستني ✨',
    en: 'Clean pass. Next question awaits ✨',
    weight: 2,
    tone: 'wholesome',
  },

  // --- SKIP ---
  {
    id: 'skip_01',
    event: 'SKIP',
    ar: 'Next. مفيش أي إحراج خالص.',
    en: 'Next. Zero judgment here.',
    cooldown: 4,
    weight: 2,
    tone: 'wholesome',
  },
  {
    id: 'skip_02',
    event: 'SKIP',
    ar: 'سؤال مش راكب على المود؟ نغيّره فورًا.',
    en: 'Not feeling that one? Moving right along.',
    cooldown: 4,
    weight: 2,
    tone: 'wholesome',
  },
  {
    id: 'skip_03',
    event: 'SKIP',
    ar: 'حقكم تمامًا.. القعدة معمولة للروقان مش للتحقيق 🛋️',
    en: 'Respect. Vibey is about comfort, not interrogation 🛋️',
    cooldown: 5,
    weight: 1,
    tone: 'wholesome',
  },

  // --- SKIP_STREAK ---
  {
    id: 'skip_streak_01',
    event: 'SKIP_STREAK',
    ar: 'واضح إننا محتاجين نغيّر الـVibe لكروت أروق شوية ☕',
    en: 'Time to recalibrate the vibe to something smoother ☕',
    minOccurrences: 3,
    cooldown: 6,
    weight: 2,
    tone: 'playful',
  },

  // --- GOOD_QUESTION (🔥) ---
  {
    id: 'fire_01',
    event: 'GOOD_QUESTION',
    ar: 'أوووه… السؤال ده اشتغل ولمس حاجة 👀🔥',
    en: 'Ooh… that question struck a nerve 👀🔥',
    cooldown: 4,
    weight: 3,
    tone: 'reaction',
  },
  {
    id: 'fire_02',
    event: 'GOOD_QUESTION',
    ar: 'أخيرًا سؤال عجبكم وحرّك الكلام 😭✨',
    en: 'Finally, a question that earned the fire badge 😭✨',
    cooldown: 4,
    weight: 2,
    tone: 'wholesome',
  },
  {
    id: 'fire_03',
    event: 'GOOD_QUESTION',
    ar: 'واضح إننا مسكنا خيط موضوع كبير هنا 🧶',
    en: 'Looks like you tapped into a deep rabbit hole here 🧶',
    cooldown: 5,
    weight: 2,
    tone: 'playful',
  },

  // --- FIRST_GUESS_CORRECT ---
  {
    id: 'first_guess_correct_01',
    event: 'FIRST_GUESS_CORRECT',
    ar: 'لقطة تخمين صح من أول تجربة! مبهرين 😎',
    en: 'First guess right on the bullseye! Impressive 😎',
    weight: 3,
    tone: 'playful',
  },

  // --- GUESS_CORRECT ---
  {
    id: 'guess_correct_01',
    event: 'GUESS_CORRECT',
    ar: 'حافظين تفكير بعض زيادة عن اللزوم 👀',
    en: 'Reading minds or just observing closely? 👀',
    cooldown: 4,
    weight: 2,
    tone: 'playful',
  },
  {
    id: 'guess_correct_02',
    event: 'GUESS_CORRECT',
    ar: 'جابها صح! الـRadar شغال بدقة عالية 🎯',
    en: 'Nailed it. Intuition is fully calibrated 🎯',
    cooldown: 4,
    weight: 2,
    tone: 'wholesome',
  },

  // --- GUESS_WRONG ---
  {
    id: 'guess_wrong_01',
    event: 'GUESS_WRONG',
    ar: 'ولا قريب حتى 😭 بس المحاولة محترمة!',
    en: 'Not even close 😭 but solid attempt!',
    cooldown: 4,
    weight: 3,
    tone: 'teasing',
  },
  {
    id: 'guess_wrong_02',
    event: 'GUESS_WRONG',
    ar: 'التوقع كان في كوكب والإجابة في كوكب تاني 🪐',
    en: 'Expectation was on Mars, reality was on Venus 🪐',
    cooldown: 4,
    weight: 2,
    tone: 'teasing',
  },
  {
    id: 'guess_wrong_03',
    event: 'GUESS_WRONG',
    ar: 'معلش… لسه بتكتشفوا حاجات جديدة في بعض 😌',
    en: 'All good… still discovering new layers 😌',
    cooldown: 4,
    weight: 1,
    tone: 'wholesome',
  },

  // --- GUESS_STREAK ---
  {
    id: 'guess_streak_01',
    event: 'GUESS_STREAK',
    ar: 'التخمينات كلها صح تقريبًا؟ أنتوا مخترقين دماغ بعض 💀',
    en: 'Multiple correct guesses? Certified mind readers 💀',
    minOccurrences: 3,
    cooldown: 7,
    weight: 3,
    tone: 'dramatic',
  },

  // --- ZERO_GUESS_STREAK ---
  {
    id: 'zero_guess_01',
    event: 'ZERO_GUESS_STREAK',
    ar: 'أنتوا اتقابلتوا النهارده الصبح صح؟ ولا تخمين راكب 😂',
    en: 'Did you two meet twenty minutes ago? Zero accuracy 😂',
    minOccurrences: 3,
    cooldown: 8,
    weight: 3,
    tone: 'teasing',
  },

  // --- PLOT_TWIST_COMPLETE ---
  {
    id: 'twist_done_01',
    event: 'PLOT_TWIST_COMPLETE',
    ar: 'التحدي اتنفذ بأعلى درجات الضحك 🔥',
    en: 'Challenge cleared with maximum style 🔥',
    cooldown: 4,
    weight: 2,
    tone: 'playful',
  },
  {
    id: 'twist_done_02',
    event: 'PLOT_TWIST_COMPLETE',
    ar: 'عاش! كسرنا الروتين وفتحنا ضحك غير متوقع 🎲',
    en: 'Boom! Spontaneous energy delivered 🎲',
    cooldown: 4,
    weight: 2,
    tone: 'wholesome',
  },

  // --- CHEMISTRY_ENTER ---
  {
    id: 'chem_enter_01',
    event: 'CHEMISTRY_ENTER',
    ar: 'أوكي… كفاية تسخين، الكلام بدأ ياخد منحنى interesting 👀',
    en: 'Warm-up is officially over. Things are getting interesting 👀',
    weight: 3,
    tone: 'playful',
  },
  {
    id: 'chem_enter_02',
    event: 'CHEMISTRY_ENTER',
    ar: 'Vibey مش مسؤول عن أي صراحة صادمة جاية 🌚',
    en: 'Vibey disclaims all responsibility for what comes next 🌚',
    weight: 2,
    tone: 'teasing',
  },

  // --- DEEP_TALK_ENTER ---
  {
    id: 'deep_enter_01',
    event: 'DEEP_TALK_ENTER',
    ar: 'دخلنا في مود الساعة ٢ بالليل… الكلام بقى بجد 🌙',
    en: 'Entering 2 AM frequency. Real talk mode 🌙',
    weight: 3,
    tone: 'dramatic',
  },
  {
    id: 'deep_enter_02',
    event: 'DEEP_TALK_ENTER',
    ar: 'الموضوع قلب عميق وفيه أسرار وقرارات.. نسمع بعض كويس ✨',
    en: 'Slowing down the tempo for some honest reflection ✨',
    weight: 2,
    tone: 'wholesome',
  },

  // --- HALFWAY ---
  {
    id: 'halfway_01',
    event: 'HALFWAY',
    ar: 'وصلتوا نص القعدة! الوقت بيجري لما الـVibe يكون مظبوط ⏳',
    en: 'Halfway mark! Time flies when the vibe is effortless ⏳',
    weight: 2,
    tone: 'wholesome',
  },

  // --- NEAR_END ---
  {
    id: 'near_end_01',
    event: 'NEAR_END',
    ar: 'قربنا على النهاية… كل كارت جاي له وزنه 👀',
    en: 'Final stretch. Make these last questions count 👀',
    weight: 2,
    tone: 'playful',
  },

  // --- MORE_LIKELY_AGREEMENT ---
  {
    id: 'more_likely_agree_01',
    event: 'MORE_LIKELY_AGREEMENT',
    ar: 'الإجماع تم فورًا من غير تفكير.. التهمة ثابتة 😂',
    en: 'Instant consensus without hesitation. Case closed 😂',
    cooldown: 4,
    weight: 3,
    tone: 'teasing',
  },
  {
    id: 'more_likely_agree_02',
    event: 'MORE_LIKELY_AGREEMENT',
    ar: 'مفيش مجال للإنكار.. الاتنين شاوروا على نفس الشخص 🎯',
    en: 'Zero room for denial. Both pointed the exact same way 🎯',
    cooldown: 4,
    weight: 2,
    tone: 'playful',
  },

  // --- MORE_LIKELY_DISAGREEMENT ---
  {
    id: 'more_likely_diff_01',
    event: 'MORE_LIKELY_DISAGREEMENT',
    ar: 'كل واحد شايف المصيبة في التاني.. الثقة بينكم جميلة 💀',
    en: 'Both nominated each other. Peak mutual trust 💀',
    cooldown: 4,
    weight: 3,
    tone: 'teasing',
  },
  {
    id: 'more_likely_diff_02',
    event: 'MORE_LIKELY_DISAGREEMENT',
    ar: 'مفيش إجماع.. محتاجين قاضي يحكم بينكم هنا ⚖️',
    en: 'Split verdict! You need an independent judge here ⚖️',
    cooldown: 4,
    weight: 2,
    tone: 'playful',
  },

  // --- POINT_AT_SAME_PERSON ---
  {
    id: 'point_same_01',
    event: 'POINT_AT_SAME_PERSON',
    ar: 'أنا مش هسأل مين اتفضح.. نظراتكم كفاية 😭',
    en: "I won't ask who got exposed. The eye contact says it all 😭",
    cooldown: 4,
    weight: 3,
    tone: 'teasing',
  },
  {
    id: 'point_same_02',
    event: 'POINT_AT_SAME_PERSON',
    ar: 'الأصابع شاورت في ثانية واحدة.. السر اتكشف 👀',
    en: 'Zero second delay on that point. The truth is out 👀',
    cooldown: 4,
    weight: 2,
    tone: 'playful',
  },

  // --- POINT_AT_DIFFERENT_PEOPLE ---
  {
    id: 'point_diff_01',
    event: 'POINT_AT_DIFFERENT_PEOPLE',
    ar: 'كل صباع رايح في اتجاه.. ده إنكار جماعي رسمي 😂',
    en: 'Pointing at opposite corners. Collective denial in action 😂',
    cooldown: 4,
    weight: 3,
    tone: 'teasing',
  },

  // --- RARE_EVENT ---
  {
    id: 'rare_01',
    event: 'RARE_EVENT',
    ar: 'إحنا كنا بنلعب لعبة خفيفة على فكرة.. أنتوا قلبتوها مؤتمر 🌚',
    en: 'This was supposed to be a light conversation game… not a summit 🌚',
    weight: 1,
    tone: 'teasing',
  },
  {
    id: 'rare_02',
    event: 'RARE_EVENT',
    ar: 'لو كملتوا بالسرعة دي هتخلصوا كل مواضيع الحياة النهارده 🚀',
    en: 'At this rate you will solve every philosophical debate tonight 🚀',
    weight: 1,
    tone: 'playful',
  },
];
