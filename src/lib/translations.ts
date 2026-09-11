
export const TRANSLATIONS = {
  ar: {
    // Brand
    brandName: 'Vibey',
    tagline: 'نشوف الـVibe بينكم عامل إزاي؟',
    subTagline: 'موبايل واحد. شخصين. ومن غير أسئلة مملة.',
    letsVibe: 'يلا بينا ✨',
    secondaryTagline: 'Less awkward. More Vibey.',

    // PWA & Installation
    installApp: 'تثبيت التطبيق',
    installTitle: 'تثبيت Vibey كـ تطبيق',
    installSubtitle: 'لتجربة شاشة كاملة، أسرع، وبدون إنترنت كأنه تطبيق أصلي',
    installAction: 'تثبيت التطبيق 📲',
    installNotNow: 'ليس الآن',
    installedSuccess: 'التطبيق مثبت بالفعل ✨',
    iosInstallTitle: 'خطوات التثبيت على الآيفون (iOS)',
    iosStep1: 'اضغط على زر المشاركة (Share 􀈂) بالأسفل',
    iosStep2: 'مرر لأسفل واختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)',
    iosStep3: 'اضغط على "إضافة" (Add) في أعلى اليمين',
    pwaStandaloneBadge: 'تطبيق مثبت ✨',
    offlineReady: 'جاهز للاستخدام بدون إنترنت ⚡',

    // Modes
    modesTitle: 'نبدأ بإيه؟',
    modesSubtitle: 'اختاروا المود اللي حابين تدوسوا فيه سوا',
    modes: {
      'quick-vibes': {
        title: '⚡ Quick Vibes',
        desc: 'أسئلة واختيارات سريعة تكسر الصمت وتظبط المود.',
        badge: 'خفيف وسريع',
      },
      'get-to-know-me': {
        title: '👀 Get To Know Me',
        desc: 'نتعرف بجد شوية ورا السوشيال ميديا والإجابات الجاهزة.',
        badge: 'اكتشاف وتفاصيل',
      },
      'guess-me': {
        title: '🎯 Guess Me',
        desc: 'واحد يجاوب في سره والتاني يخمن.. نشوف عارفين بعض قد إيه.',
        badge: 'تخمين ولعب',
      },
      'chemistry': {
        title: '🔥 Chemistry',
        desc: 'ندخل في الكلام شوية ونفهم الفايب والـGreen Flags والجاذبية.',
        badge: 'فليرتي وذكي',
      },
      'deep-talk': {
        title: '🌙 Deep Talk',
        desc: 'كلام الساعة ٢ بالليل.. ذكريات، قرارات، وأفكار حقيقية.',
        badge: 'حقيقي وعميق',
      },
    },

    // Session Setup
    setupTitle: 'تظبيط القعدة',
    setupTimeQuestion: 'قد إيه عندكم وقت؟',
    sessionLengths: {
      10: { label: 'سريعة', count: '١٠ كروت', time: '~٥ دقايق' },
      20: { label: 'رايقة', count: '٢٠ كارت', time: '~١٠-١٥ دقيقة' },
      35: { label: 'سهرة', count: '٣٥ كارت', time: '~٢٠+ دقيقة' },
    },
    setupTurnQuestion: 'هتلعبوا إزاي؟',
    turnModes: {
      free: {
        title: 'كلام عادي 💬',
        desc: 'الكارت ينزل وانتوا الاتنين اتكلموا براحتكم من غير أدوار.',
      },
      alternating: {
        title: 'واحد واحد 🔄',
        desc: 'كل كارت موجه لشخص فيكم بالتناوب.. دور الشخص الأول والتاني.',
      },
    },
    startGame: 'ابدأوا القعدة 🚀',
    back: 'رجوع',

    // Game Controls & UI
    skip: 'عدّي',
    next: 'التالي',
    goodQuestion: '🔥 جامد',
    followUpBtn: 'طب سؤال كمان 👀',
    followUpLabel: 'سؤال زيادة 👀',
    playerTurn: (p: 1 | 2) => (p === 1 ? 'دور: الشخص الأول' : 'دور: الشخص التاني'),
    exitConfirmTitle: 'نقفل القعدة؟',
    exitConfirmDesc: 'لو خرجتوا دلوقتي هنخسر تقدم الجلسة دي.',
    resume: 'كمّل لعب',
    exit: 'خروج للرئيسية',

    // Quick Choice states
    personA: 'الشخص الأول اختار:',
    personB: 'الشخص التاني اختار:',
    choosePrompt: 'كل واحد يختار اختياره ⚡',
    sameVibe: 'Same vibe 👀🔥',
    defendVibe: 'أوكي… كل واحد يبرر بقى 😂',
    continueNext: 'كملوا يلا ✨',

    // Guess Me states
    guessStep1: 'اختار إجابتك من غير ما الشخص التاني يشوف 👀',
    hideScreen: 'إخفاء الاختيار',
    readyForGuess: 'جاهز تسلّم الموبايل؟',
    passPhone: 'إدي الموبايل للشخص التاني عشان يخمن 📱',
    guessPrompt: 'خمن هو اختار إيه؟',
    revealAnswer: 'اكشف الإجابة 💥',
    guessCorrect: 'كنت عارف 😎🔥',
    guessWrong: 'ولا قريب حتى 😂',

    // Plot Twist
    plotTwistBadge: '🎲 PLOT TWIST',
    plotTwistSub: 'تحدي عفوي في السريع.. اتعاملوا سوا!',
    plotTwistDone: 'تم بنجاح 🔥',

    // Results Screen
    resultHeading: 'الـVibe النهائي بينكم ✨',
    statsSummary: 'إحصائيات القعدة:',
    statQuestions: 'سؤال وكارت',
    statMatches: 'نفس الـVibe',
    statPlotTwists: 'Plot Twists',
    statSkips: 'تخطي',
    statGuessAccuracy: 'دقة التخمين',
    playAgain: 'نلعب تاني 🔁',
    changeVibe: 'نغيّر الـVibe ⚡',
    shareResult: 'شير النتيجة 📲',
    copiedLink: 'تم نسخ النتيجة!',
    shareTextPrefix: 'الفايب بيننا طلع',

    // Archetypes
    archetypes: {
      'same-braincell': {
        title: 'SAME BRAINCELL 🧠',
        subtitle: 'إنتوا الاتنين بتفكروا بنفس الـbrain cell تقريبًا 😂',
        desc: 'توافق عالي جدًا في الاختيارات، وتخمينات صح في كل لقطة.. شكلكم فاهمين دماغ بعض من غير ما تتكلموا كتير.',
        observation: 'بدأتوا باختيارات عادية.. بس طلع عندكم نفس الطريقة في كل حاجة تقريبًا.',
      },
      'certified-yappers': {
        title: 'CERTIFIED YAPPERS 🗣️',
        subtitle: 'الموبايل كان مجرد حجة عشان تفتحوا كلام بالساعات!',
        desc: 'تفاعلتم مع الأسئلة المفتوحة، وعملتوا لايكات كتير ومفيش كارت عدا بالساهل.. قعدة كلها رغي وحكايات متتفوتش.',
        observation: 'الكروت كانت بتنزل.. وانتوا بتنسوا الموبايل وتسرحوا في الكلام سوا.',
      },
      'chill-chemistry': {
        title: 'CHILL CHEMISTRY 😌✨',
        subtitle: 'الفايب رايق وسلس ومريح من غير أي تكلف.',
        desc: 'كلام لطيف وهادي، توازن بين الضحك والفضول.. النوع ده من التوافق بيخلي أي قعدة خفيفة على القلب.',
        observation: 'مفيش ضغط، ومفيش تمثيل.. مجرد اتنين قاعدين مرتاحين ومبسوطين بالفايب.',
      },
      'unexpectedly-deep': {
        title: 'UNEXPECTEDLY DEEP 🌙',
        subtitle: 'دخلتوا في الغويط وفتحتوا مواضيع الساعة ٢ بالليل!',
        desc: 'أكتر حاجة جذبتكم كانت الأسئلة العميقة والذكريات والقرارات.. قعدة حقيقية طلعتوا منها بحاجات مكنتوش متوقعين تسمعوها.',
        observation: 'بدأتوا بهزار وخفة.. ووصلتوا لكلام ومشاعر بجد.',
      },
      'opposites-working': {
        title: 'OPPOSITES, SOMEHOW WORKING ⚡',
        subtitle: 'مختلفين في كل اختيار.. بس الكيمياء بينكم مولعة!',
        desc: 'كل واحد فيكم في اتجاه تمامًا، بس كل اختلاف وراه ضحك وتبرير ونقاش أحلى من الاتفاق.. التضاد ده عامل طاقة جامدة.',
        observation: 'ولا إجابة شبه التانية.. بس ولا واحد فيكم حب يسكت.',
      },
      'chaotic-energy': {
        title: 'CHAOTIC ENERGY 🎲🔥',
        subtitle: 'ضحك، تحديات عفوية، ومواقف غير متوقعة!',
        desc: 'الـPlot Twists والتحديات كانت ملعونة، الطاقة كانت عفوية وسريعة ومفيش أي لحظة ملل طوال القعدة.',
        observation: 'قعدة مليانة مفاجآت وهزار ملوش كتالوج.',
      },
    },
  },

  en: {
    // Brand
    brandName: 'Vibey',
    tagline: 'Find your vibe.',
    subTagline: 'One phone. Two people. No boring questions.',
    letsVibe: "Let's vibe ✨",
    secondaryTagline: 'Less awkward. More Vibey.',

    // PWA & Installation
    installApp: 'Install App',
    installTitle: 'Install Vibey App',
    installSubtitle: 'Full screen, faster, and 100% offline like a native mobile app',
    installAction: 'Install Now 📲',
    installNotNow: 'Not Now',
    installedSuccess: 'App is already installed ✨',
    iosInstallTitle: 'How to Install on iPhone (iOS)',
    iosStep1: 'Tap the Share icon at the bottom of Safari',
    iosStep2: 'Scroll down and tap "Add to Home Screen"',
    iosStep3: 'Tap "Add" in the top right corner',
    pwaStandaloneBadge: 'Installed App ✨',
    offlineReady: 'Ready offline ⚡',

    // Modes
    modesTitle: 'Pick your vibe.',
    modesSubtitle: 'Choose the energy you want to dive into together.',
    modes: {
      'quick-vibes': {
        title: '⚡ Quick Vibes',
        desc: 'Rapid choices to break the ice and tune into the moment.',
        badge: 'Light & Fast',
      },
      'get-to-know-me': {
        title: '👀 Get To Know Me',
        desc: 'Real curiosities beyond social media bios and default answers.',
        badge: 'Discovery & Stories',
      },
      'guess-me': {
        title: '🎯 Guess Me',
        desc: 'One picks secretly, the other guesses. How well do you read each other?',
        badge: 'Intuition & Fun',
      },
      'chemistry': {
        title: '🔥 Chemistry',
        desc: 'Explore attraction, green flags, sparks, and unspoken curiosities.',
        badge: 'Flirty & Sharp',
      },
      'deep-talk': {
        title: '🌙 Deep Talk',
        desc: 'Late-night frequency. Memories, pivots, and honest perspectives.',
        badge: 'Real & Meaningful',
      },
    },

    // Session Setup
    setupTitle: 'Session Setup',
    setupTimeQuestion: 'How much time do you have?',
    sessionLengths: {
      10: { label: 'Quick', count: '10 cards', time: '~5 min' },
      20: { label: 'Normal', count: '20 cards', time: '~10–15 min' },
      35: { label: 'Deep Dive', count: '35 cards', time: '~20+ min' },
    },
    setupTurnQuestion: 'How do you want to play?',
    turnModes: {
      free: {
        title: 'Free Flow 💬',
        desc: 'Cards appear for both of you to talk openly without strict turns.',
      },
      alternating: {
        title: 'Take Turns 🔄',
        desc: 'Cards alternate between Player 1 and Player 2.',
      },
    },
    startGame: "Let's Start 🚀",
    back: 'Back',

    // Game Controls & UI
    skip: 'Skip',
    next: 'Next',
    goodQuestion: '🔥 Good One',
    followUpBtn: 'One more thing 👀',
    followUpLabel: 'Bonus question 👀',
    playerTurn: (p: 1 | 2) => `Turn: Player ${p}`,
    exitConfirmTitle: 'Leave session?',
    exitConfirmDesc: 'Leaving now will end current session progress.',
    resume: 'Resume Game',
    exit: 'Exit to Home',

    // Quick Choice states
    personA: 'Player 1 chose:',
    personB: 'Player 2 chose:',
    choosePrompt: 'Both make your pick ⚡',
    sameVibe: 'Same vibe 👀🔥',
    defendVibe: 'Okay… defend your answer 😂',
    continueNext: 'Keep going ✨',

    // Guess Me states
    guessStep1: 'Pick your answer secretly without them looking 👀',
    hideScreen: 'Hide selection',
    readyForGuess: 'Ready to pass the phone?',
    passPhone: 'Pass the phone to your partner to guess 📱',
    guessPrompt: 'Guess what they picked?',
    revealAnswer: 'Reveal Choice 💥',
    guessCorrect: 'Knew it! 😎🔥',
    guessWrong: 'Not even close 😂',

    // Plot Twist
    plotTwistBadge: '🎲 PLOT TWIST',
    plotTwistSub: 'A spontaneous mini-challenge. Do it together right now!',
    plotTwistDone: 'Done 🔥',

    // Results Screen
    resultHeading: 'Your Session Vibe ✨',
    statsSummary: 'Session Breakdown:',
    statQuestions: 'Cards played',
    statMatches: 'Same vibe picks',
    statPlotTwists: 'Plot twists',
    statSkips: 'Skips',
    statGuessAccuracy: 'Guess accuracy',
    playAgain: 'Play Again 🔁',
    changeVibe: 'Change Vibe ⚡',
    shareResult: 'Share Result 📲',
    copiedLink: 'Result copied!',
    shareTextPrefix: 'Our Vibey result is',

    // Archetypes
    archetypes: {
      'same-braincell': {
        title: 'SAME BRAINCELL 🧠',
        subtitle: "You two practically share a single braincell 😂",
        desc: "High matching answers, uncanny intuition on guesses, and effortless alignment across topics. You read each other without needing many words.",
        observation: 'Started with simple choices… ended up thinking in identical patterns.',
      },
      'certified-yappers': {
        title: 'CERTIFIED YAPPERS 🗣️',
        subtitle: 'The phone was just an excuse to start talking for hours!',
        desc: 'Loved the open questions, liked great prompts, and never skipped an opportunity to share a story. Non-stop lively storytelling.',
        observation: 'Cards came and went, while the two of you kept drifting into tangents.',
      },
      'chill-chemistry': {
        title: 'CHILL CHEMISTRY 😌✨',
        subtitle: 'Effortless, natural, and comfortable without forcing anything.',
        desc: 'Balanced laughs, genuine curiosity, and smooth flow. This kind of relaxed chemistry makes time fly by unnoticed.',
        observation: 'No pressure, no pretense. Just two people enjoying each other’s presence.',
      },
      'unexpectedly-deep': {
        title: 'UNEXPECTEDLY DEEP 🌙',
        subtitle: 'Steered right into meaningful 2 AM conversational territory!',
        desc: 'You gravitated toward meaningful perspectives, life shifts, and personal memories. A genuine conversation where you learned real things.',
        observation: 'Started lighthearted, and organically unlocked some unforgettable honest thoughts.',
      },
      'opposites-working': {
        title: 'OPPOSITES, SOMEHOW WORKING ⚡',
        subtitle: 'Different picks everywhere… yet undeniable spark!',
        desc: 'Contrasting answers on almost every choice, but every debate sparked banter, laughter, and defending your hot takes with style.',
        observation: 'Hardly agreed on a single answer, yet neither of you wanted the conversation to end.',
      },
      'chaotic-energy': {
        title: 'CHAOTIC ENERGY 🎲🔥',
        subtitle: 'Laughter, spontaneous challenges, and wild unpredictable banter!',
        desc: 'Embraced plot twists, made playful guesses, and kept the energy high and spontaneous throughout the entire session.',
        observation: 'An unpredictable session fueled by quick wit and good chaos.',
      },
    },
  },
};
