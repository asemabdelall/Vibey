import type { QuestionItem } from '../../types/game';

export const CHEMISTRY_QUESTIONS: QuestionItem[] = [
  {
    id: 'chem-1',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['attraction', 'curiosity'],
    ar: {
      question: 'إيه أكتر حاجة بتخلي حد يلفت انتباهك من أول دقيقة كلام؟',
      followUp: 'هل ده حصل النهاردة في قعدتنا؟ 👀',
    },
    en: {
      question: 'What is the very first thing that captures your attention in someone during the first minute?',
      followUp: 'Did any of that spark during our chat today? 👀',
    },
  },
  {
    id: 'chem-2',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['green-flags', 'dating'],
    ar: {
      question: 'أكبر Green Flag بالنسبالك في أي شخص بتتعرف عليه إيه؟',
      followUp: 'شايف صفة منهم موجودة فيا دلوقتي؟ 😉',
    },
    en: {
      question: 'What is your ultimate Green Flag when getting to know someone new?',
      followUp: 'Do you notice any of that in me right now? 😉',
    },
  },
  {
    id: 'chem-3',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['attraction', 'personality'],
    ar: {
      question: 'الثقة الهادية الواثقة في نفسها 😎 ولا خفة الدم اللي تفطس من الضحك 😂؟',
      options: ['ثقة وهدوء وكاريزما 😎', 'خفة دم وضحك 😂'],
    },
    en: {
      question: 'Calm, effortless confidence 😎 or contagious, hilarious humor 😂?',
      options: ['Quiet confidence 😎', 'Contagious wit 😂'],
    },
  },
  {
    id: 'chem-4',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['attraction', 'subtlety'],
    ar: {
      question: 'إيه صفة جذابة جدًا في الناس ومش واخدة حقها ولا حد بيتكلم عنها؟',
    },
    en: {
      question: 'What is an extremely attractive trait that is wildly underrated and rarely talked about?',
    },
  },
  {
    id: 'chem-5',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['connection', 'spark'],
    ar: {
      question: 'إمتى بتحس إن الكلام مع حد مش عادي وفيه كيمياء حقيقية بينكم؟',
      followUp: 'بتحس بده في عقلك الأول ولا إحساس داخلي؟ ✨',
    },
    en: {
      question: 'At what point does a conversation stop feeling normal and start feeling electric?',
      followUp: 'Do you register it in your head first, or as a gut instinct? ✨',
    },
  },
  {
    id: 'chem-6',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['spark', 'love'],
    ar: {
      question: 'الـChemistry بتحصل من أول نظرة وشرارة ⚡ ولا بتبني مع الوقت والكلام ⏳؟',
      options: ['من أول شرارة ⚡', 'مع الوقت والمواقف ⏳'],
    },
    en: {
      question: 'Does real chemistry ignite in the very first instant ⚡ or build slowly over time ⏳?',
      options: ['Instant spark ⚡', 'Grows over time ⏳'],
    },
  },
  {
    id: 'chem-7',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['comfort', 'body-language'],
    ar: {
      question: 'إيه حركة صغيرة جدًا ممكن تخليك ترتاح لحد وتحس إنك مرحب بيك معاه؟',
    },
    en: {
      question: 'What subtle gesture or habit makes you immediately drop your guard and feel welcome?',
    },
  },
  {
    id: 'chem-8',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['first-impressions', 'perception'],
    ar: {
      question: 'أول انطباع أخدته عني كان إيه؟ 👀',
      followUp: 'اتغير بعد ما اتكلمنا دلوقتي ولا لسة زي ما هو؟ 😂',
    },
    en: {
      question: 'What was your genuine first impression of me? 👀',
      followUp: 'Did it change after talking today or did it stay the same? 😂',
    },
  },
  {
    id: 'chem-9',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['eyes', 'flirting'],
    ar: {
      question: 'نظرة العين الطويلة.. بتوترك ولا بتعجبك وتشدك؟',
      followUp: 'جرب تبص في عيني ٥ ثواني من غير كلام كده وريني 😂',
    },
    en: {
      question: 'Prolonged eye contact: does it make you flustered or draw you right in?',
      followUp: 'Hold eye contact for 5 silent seconds right now and let’s see 😂',
    },
  },
  {
    id: 'chem-10',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['dating', 'playlist'],
    ar: {
      question: 'لو حد عملك Playlist مخصوص عشانك، الحركة دي بتفرق معاك ولا عادية؟',
      followUp: 'إيه أول أغنية نفسك يحطها فيها؟ 🎶',
    },
    en: {
      question: 'If someone makes you a custom playlist, does that move you or is it overrated?',
      followUp: 'What track would you hope they put on it? 🎶',
    },
  },
  {
    id: 'chem-11',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['crush', 'stories'],
    ar: {
      question: 'إيه أكتر طريقة لطيفة وغريبة حد عبرلك بيها عن إعجابه قبل كده؟',
    },
    en: {
      question: 'What was the smoothest or most unique way someone expressed they liked you?',
    },
  },
  {
    id: 'chem-12',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['dating', 'flirting'],
    ar: {
      question: 'في الشات: ريبلاي فوري وسريع ⚡ ولا تقعد شوية وتتقل بدلع ⏳؟',
      options: ['رد فوري مفيش لف ⚡', 'تقل ودلع على مهلي ⏳'],
    },
    en: {
      question: 'Texting banter: lightning-fast instantaneous reply ⚡ or pacing it out playing it cool ⏳?',
      options: ['Instant reply ⚡', 'Cool & paced ⏳'],
    },
  },
  {
    id: 'chem-13',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['humor', 'attraction'],
    ar: {
      question: 'هل ممكن تعجب بشخص لمجرد إنه بيعرف يضحكك من قلبك حتى لو مش ستايلك؟',
    },
    en: {
      question: 'Can pure, effortless wit make you fall for someone who isn’t normally your type?',
    },
  },
  {
    id: 'chem-14',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['details', 'chemistry'],
    ar: {
      question: 'إيه أكتر حاجة لاحظتها فيا النهاردة ومقولتهاش بصوت عالي؟',
      followUp: 'قولها دلوقتي بصراحة.. مفيش أسرار 👀',
    },
    en: {
      question: 'What is something you silently noticed about me today but kept to yourself?',
      followUp: 'Say it out loud right now—no secrets 👀',
    },
  },
  {
    id: 'chem-15',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['scents', 'memory'],
    ar: {
      question: 'ريحة البرفيوم.. بتأثر في ذاكرتك للناس وانجذابك ليهم قد إيه؟',
    },
    en: {
      question: 'How heavily does someone’s signature fragrance impact your attraction to them?',
    },
  },
  {
    id: 'chem-16',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['attraction', 'mystery'],
    ar: {
      question: 'حد كتاب مفتوح وواضح من أول ثانية 📖 ولا فيه غموض وهادي يخليك عايز تكتشفه 🗝️؟',
      options: ['كتاب مفتوح وواضح 📖', 'غموض يشد للاكتشاف 🗝️'],
    },
    en: {
      question: 'An open book who lays everything on the table 📖 or quiet intrigue that makes you curious 🗝️?',
      options: ['Open book 📖', 'Quiet intrigue 🗝️'],
    },
  },
  {
    id: 'chem-17',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['vibe', 'intuition'],
    ar: {
      question: 'بتعرف منين إن الشخص اللي قدامك مرتاحلك ومعجب بوجودك؟ إيه الإشارة؟',
    },
    en: {
      question: 'How do you intuitively sense that someone is feeling the vibe and genuinely drawn to you?',
    },
  },
  {
    id: 'chem-18',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['compliments', 'words'],
    ar: {
      question: 'لو مسموح لك تديني مجاملة واحدة صادقة دلوقتي عن أي حاجة، هتقول إيه؟',
    },
    en: {
      question: 'If you had to give me one completely unfiltered, genuine compliment right now, what is it?',
    },
  },
  {
    id: 'chem-19',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['dating', 'dates'],
    ar: {
      question: 'شكل الـFirst Date المثالي بالنسبة لك: تمشية وكلام، ولا عشاء شيك، ولا نشاط وتجربة مجنونة؟',
    },
    en: {
      question: 'Your golden blueprint for a first date: long wandering walk, candlelit dinner, or a crazy interactive activity?',
    },
  },
  {
    id: 'chem-20',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['banter', 'teasing'],
    ar: {
      question: 'هل النكش والهزار والتنكيت المتبادل علامة إعجاب بالنسبالك ولا قلة ذوق؟',
      followUp: 'طب مين فينا بينكش التاني أكتر دلوقتي؟ 😂',
    },
    en: {
      question: 'Is playful teasing your primary flirtation language, or does it feel annoying?',
      followUp: 'Who has been teasing who more so far? 😂',
    },
  },
  {
    id: 'chem-21',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['attraction', 'voice'],
    ar: {
      question: 'نبرة الصوت وطريقة نطق الكلام.. بتفرق في جاذبية الشخص قد إيه بالنسبالك؟',
    },
    en: {
      question: 'How much does tone of voice and cadence affect how attractive you find someone?',
    },
  },
  {
    id: 'chem-22',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['chemistry', 'vibes'],
    ar: {
      question: 'إيه أكتر حاجة في قعدتنا سوا حاسس إنها مختلفة ومريحة عن العادي؟',
    },
    en: {
      question: 'What about the dynamic between us right now feels surprisingly easy or different?',
    },
  },
  {
    id: 'chem-23',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['dating', 'first-move'],
    ar: {
      question: 'تفضل الشخص التاني ياخد الخطوة الأولى 🎯 ولا أنت اللي تبادر وتبدأ 🚀؟',
      options: ['هو يبادر الأول 🎯', 'أنا اللي أبدأ بجرأة 🚀'],
    },
    en: {
      question: 'Do you prefer the other person to make the first move 🎯 or do you take the lead 🚀?',
      options: ['Them first 🎯', 'I make the move 🚀'],
    },
  },
  {
    id: 'chem-24',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['crush', 'signs'],
    ar: {
      question: 'إيه الإشارة الواضحة اللي بتفضحك لما تكون معجب بحد وعايز تقرب منه؟',
      followUp: 'أصحابك بيفهموها على طول ويضحكوا عليك؟ 😂',
    },
    en: {
      question: 'What is your dead-giveaway tell when you have a huge crush on someone?',
      followUp: 'Do your friends immediately spot it and roast you? 😂',
    },
  },
  {
    id: 'chem-25',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['energy', 'connection'],
    ar: {
      question: 'شايف إيه الحتة المشتركة بين شخصيتي وشخصيتك اللي مخلية الكلام ماشي بسلاسة؟',
    },
    en: {
      question: 'What mutual trait between our two personalities is making this conversation flow so effortlessly?',
    },
  },
  {
    id: 'chem-26',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['dating', 'standards'],
    ar: {
      question: 'إيه الحاجة اللي لو لقيتها في شخص ممكن تخليك تتمسك بيه وتنسى أي عيوب تانية؟',
    },
    en: {
      question: 'What rare character trait makes you forgive almost every other minor flaw in someone?',
    },
  },
  {
    id: 'chem-27',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['romance', 'style'],
    ar: {
      question: 'رومانسية هادية وخاصة بينكم بس 🕊️ ولا لفتات كبيرة ومفاجآت مجنونة قدام الكل 🎆؟',
      options: ['خاصة وهادية 🕊️', 'مفاجآت وجنان كبير 🎆'],
    },
    en: {
      question: 'Quiet, intimate affection private to you two 🕊️ or grand cinematic romantic gestures 🎆?',
      options: ['Quiet & private 🕊️', 'Grand gestures 🎆'],
    },
  },
  {
    id: 'chem-28',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['honesty', 'vibe'],
    ar: {
      question: 'إيه السؤال اللي كان نفسك تسألهوني من أول ما قعدنا وكنت متردد؟',
      followUp: 'اسأله دلوقتي حالا! مفيش كسوف 🚀',
    },
    en: {
      question: 'What question were you curious to ask me since we sat down but hesitated?',
      followUp: 'Ask it right now—no hesitation 🚀',
    },
  },
  {
    id: 'chem-29',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['attraction', 'intellect'],
    ar: {
      question: 'هل الذكاء الحاد جذاب أكتر ولا الحنية والتفهم العاطفي؟',
    },
    en: {
      question: 'Is razor-sharp intellect more attractive, or emotional warmth and empathy?',
    },
  },
  {
    id: 'chem-30',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['curiosity', 'energy'],
    ar: {
      question: 'لو كنا في مكان زحمة ومطلوب نشاور لبعض بنظرة عشان نخلع، تفتكر هنفهم بعض بسرعة؟',
    },
    en: {
      question: 'If we were at an awkward party and needed to coordinate an escape with a single look, would we sync up instantly?',
    },
  },
  {
    id: 'chem-31',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['dating', 'music'],
    ar: {
      question: 'هل ذوق الأغاني المتشابه شرط أساسي للـChemistry بينك وبين أي شخص؟',
    },
    en: {
      question: 'Is having overlapping music taste an absolute non-negotiable for chemistry, or can opposites thrive?',
    },
  },
  {
    id: 'chem-32',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['intuition', 'personality'],
    ar: {
      question: 'شايف إني شخصية سهلة الفهم ولا محتاج حد يركز عشان يفهمني صح؟',
    },
    en: {
      question: 'Do I come across as an easy read, or someone with layers you have to pay close attention to understand?',
    },
  },
  {
    id: 'chem-33',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['flirting', 'banter'],
    ar: {
      question: 'إيه أكتر كلمة أو لقب بتفرح لما تسمعه من شخص مقرب منك؟',
    },
    en: {
      question: 'What pet name or compliment feels genuinely heartwarming when said by someone you like?',
    },
  },
  {
    id: 'chem-34',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['dating', 'time'],
    ar: {
      question: 'نتكلم كل يوم طول اليوم 📱 ولا نقعد كام يوم مش بنتكلم ونرجع كأننا مسبناش بعض 🌿؟',
      options: ['كلام كل يوم 📱', 'براحتنا وكل فترة 🌿'],
    },
    en: {
      question: 'Talking every single day without fail 📱 or natural spaces where picking up feels seamless 🌿?',
      options: ['Everyday contact 📱', 'Spacious & seamless 🌿'],
    },
  },
  {
    id: 'chem-35',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['chemistry', 'presence'],
    ar: {
      question: 'إيه أكتر حاجة بتخلي وجود شخص معين جنبك مريح حتى لو قاعدين ساكتين تمامًا؟',
    },
    en: {
      question: 'What quality makes being in someone’s presence comfortable even in complete silence?',
    },
  },
  {
    id: 'chem-36',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['sparks', 'laughter'],
    ar: {
      question: 'إمتى آخر مرة ضحكت فيها مع حد لحد ما دموعك نزلت وبطنك وجعتك؟',
    },
    en: {
      question: 'When was the last time you laughed with someone until you couldn’t breathe and your ribs ached?',
    },
  },
  {
    id: 'chem-37',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['perception', 'flirting'],
    ar: {
      question: 'لو طلبت منك توصف طاقتي النهاردة بلون معين، هتختار لون إيه وليه؟',
    },
    en: {
      question: 'If you had to assign a color to my aura/energy today, what color would it be and why?',
    },
  },
  {
    id: 'chem-38',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['romance', 'gestures'],
    ar: {
      question: 'إيه لفتة اهتمام بسيطة اتعملت عشانك زمان وفضلت محفورة في قلبك؟',
    },
    en: {
      question: 'What is a small, quiet gesture someone did for you that permanently cemented itself in your memory?',
    },
  },
  {
    id: 'chem-39',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['connection', 'comfort'],
    ar: {
      question: 'حد يشبهك في كل أفكارك وطباعك 👯 ولا حد مختلف يفتحلك عوالم جديدة 🪐؟',
      options: ['شبهي في كل حاجة 👯', 'مختلف ويفتح عوالم 🪐'],
    },
    en: {
      question: 'Someone who mirrors your exact mindset 👯 or an intriguing opposite who expands your world 🪐?',
      options: ['Mirror mindset 👯', 'Intriguing opposite 🪐'],
    },
  },
  {
    id: 'chem-40',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['connection', 'future'],
    ar: {
      question: 'إيه أول خروجة أو نشاط جه في بالك إننا نعمله سوا بعد القعدة دي؟',
      followUp: 'طب يلا نرتبها بجد ولا كلام لعب؟ 😉',
    },
    en: {
      question: 'What is the first activity or outing that popped into your head that we should do next?',
      followUp: 'Are we locking it into the calendar or just playing around? 😉',
    },
  },
  {
    id: 'chem-41',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['confidence', 'attraction'],
    ar: {
      question: 'إيه اللي بيخلي الثقة بالنفس جذابة من غير ما تقلب لغرور وسماجة؟',
    },
    en: {
      question: 'What keeps confidence effortlessly attractive without crossing into obnoxious arrogance?',
    },
  },
  {
    id: 'chem-42',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['observations', 'spark'],
    ar: {
      question: 'إيه أكتر كلمة أو تعبير قولته النهاردة حسيت إنه عجبك أو علم في دماغك؟',
    },
    en: {
      question: 'What phrase or reaction did I have today that stood out to you most?',
    },
  },
  {
    id: 'chem-43',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['dating', 'curiosity'],
    ar: {
      question: 'إيه أكتر حاجة ممكن تحمسك إنك تقابل شخص تاني وتكمل كلام معاه؟',
    },
    en: {
      question: 'What makes you instantly eager to see someone a second time after hanging out?',
    },
  },
  {
    id: 'chem-44',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['honesty', 'chemistry'],
    ar: {
      question: 'نسبة الراحة بيننا من ١ لـ ١٠ دلوقتي واصلة لكام في رأيك؟ ومن غير مجاملة!',
    },
    en: {
      question: 'On a scale from 1 to 10, how high is the comfort level between us right now? Be honest!',
    },
  },
  {
    id: 'chem-45',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['attraction', 'humor'],
    ar: {
      question: 'لو حد دمه مش خفيف، هل في أي أمل الـChemistry تكمل؟',
    },
    en: {
      question: 'If someone has zero sense of humor, is there any mathematical hope for chemistry?',
    },
  },
  {
    id: 'chem-46',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['style', 'looks'],
    ar: {
      question: 'شياكة عفوية وبسيطة 🌿 ولا ستايل جريء وملفت للأنظار 💫؟',
      options: ['بساطة وشياكة عفوية 🌿', 'جرأة ولفت أنظار 💫'],
    },
    en: {
      question: 'Effortless understated style 🌿 or bold head-turning fashion 💫?',
      options: ['Understated effortless 🌿', 'Bold head-turner 💫'],
    },
  },
  {
    id: 'chem-47',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['vulnerability', 'sparks'],
    ar: {
      question: 'إمتى آخر مرة حسيت فيها بـ"الفراشات" أو دقة قلب لما شوفت حد؟',
    },
    en: {
      question: 'When was the last time you felt legitimate butterflies in your stomach around someone?',
    },
  },
  {
    id: 'chem-48',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['communication', 'dating'],
    ar: {
      question: 'إيه الرسالة أو الكلمة اللي لما بتوصلك على الموبايل بترسم ابتسامة على وشك تلقائيًا؟',
    },
    en: {
      question: 'What kind of notification text automatically puts a genuine smile on your face?',
    },
  },
  {
    id: 'chem-49',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['chemistry', 'humor'],
    ar: {
      question: 'لو حد قال إننا شكلنا لايقين على بعض، إيه أول رد هيطلع منك؟ 😂',
    },
    en: {
      question: 'If a stranger said we look great together, what would your immediate reaction be? 😂',
    },
  },
  {
    id: 'chem-50',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['spontaneity', 'connection'],
    ar: {
      question: 'إيه أكتر تصرف عفوي اتعمل معاك وخلاك تحس إنك مميز عند الشخص ده؟',
    },
    en: {
      question: 'What spontaneous gesture made you realize someone considered you genuinely special?',
    },
  },
  {
    id: 'chem-51',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['eyes', 'expression'],
    ar: {
      question: 'شايف نظراتي ليك بتعبر عن فضول أكتر ولا راحة وهدوء؟',
    },
    en: {
      question: 'Do my expressions toward you read more as playful curiosity or quiet comfort?',
    },
  },
  {
    id: 'chem-52',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 3,
    tags: ['dating', 'pace'],
    ar: {
      question: 'الكلام يفضل لساعات من أول ليلة 🌌 ولا يتقطع عشان يفضل الشوق شغال 🔥؟',
      options: ['ساعات متواصلة للصبح 🌌', 'نوقف ونسيب شوية شوق 🔥'],
    },
    en: {
      question: 'Talk until 4 AM on day one 🌌 or leave each other wanting more on purpose 🔥?',
      options: ['Talk until 4 AM 🌌', 'Leave them wanting more 🔥'],
    },
  },
  {
    id: 'chem-53',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['attraction', 'mind'],
    ar: {
      question: 'إيه النقاش أو الموضوع اللي لو فتحناه بيخليك تشوف اللي قدامك جذاب بزيادة؟',
    },
    en: {
      question: 'What intellectual debate or topic makes someone 10x more attractive in your eyes?',
    },
  },
  {
    id: 'chem-54',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['connection', 'chemistry'],
    ar: {
      question: 'حسيت في أي لحظة النهاردة إن الوقت عدى أسرع من المتوقع؟',
      followUp: 'تفتكر ده بسبب إيه؟ ✨',
    },
    en: {
      question: 'Did you notice time flying by faster than you expected today?',
      followUp: 'What do you think caused that warp? ✨',
    },
  },
  {
    id: 'chem-55',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['social', 'comfort'],
    ar: {
      question: 'إيه اللي بيخلي الصمت بين اتنين يبقى مريح مش محرج؟',
    },
    en: {
      question: 'What turns silence between two people into cozy tranquility rather than awkwardness?',
    },
  },
  {
    id: 'chem-56',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['compliments', 'details'],
    ar: {
      question: 'إيه أكتر تفصيلة في شكلي أو لبسي لفتت نظرك أول ما تقابلنا؟',
    },
    en: {
      question: 'What specific detail in my style or appearance caught your eye the moment we met?',
    },
  },
  {
    id: 'chem-57',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 3,
    tags: ['vibes', 'energy'],
    ar: {
      question: 'إيه اللي يخليك تقول على شخص "الفايب بتاعه خطير"؟',
    },
    en: {
      question: 'What makes you look at someone and immediately say "their vibe is immaculate"?',
    },
  },
  {
    id: 'chem-58',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['connection', 'honesty'],
    ar: {
      question: 'لو اتطلب منك توصفني بكلمة واحدة لواحد صاحبك بعد القعدة دي، هتقول إيه؟',
    },
    en: {
      question: 'If your best friend texts "How are they?" after this, what is your one-word reply?',
    },
  },
  {
    id: 'chem-59',
    mode: 'chemistry',
    type: 'quick-choice',
    level: 4,
    tags: ['chemistry', 'conclusion'],
    ar: {
      question: 'الفايب بيننا دلوقتي: كيمياء وسرعة بديهة 🔥 ولا راحة وألفة كأننا نعرف بعض زمان 🌿؟',
      options: ['كيمياء وسرعة بديهة 🔥', 'راحة وألفة سحرية 🌿'],
    },
    en: {
      question: 'Our vibe right now: electric banter & sparks 🔥 or unforced natural familiarity 🌿?',
      options: ['Electric sparks 🔥', 'Familiar comfort 🌿'],
    },
  },
  {
    id: 'chem-60',
    mode: 'chemistry',
    type: 'open-conversation',
    level: 4,
    tags: ['spark', 'closing'],
    ar: {
      question: 'إيه أكتر حاجة هتفتكرها عن قعدتنا دي لما تروح البيت؟',
    },
    en: {
      question: 'What will be the primary takeaway you remember from our hangout once you head home?',
    },
  },
];
