import type { QuestionItem } from '../../types/game';

export const GUESS_ME_QUESTIONS: QuestionItem[] = [
  {
    id: 'gm-1',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['coffee', 'taste'],
    ar: {
      question: 'لو دخلت كافيه الصبح، طلبي المفضل هيبقى إيه؟',
      options: ['إسبريسو / أمريكانو سادة ☕', 'سبانش لاتيه / كراميل كولد 🧊', 'ماتشا أو شاي بالنعناع 🍵', 'هوت شوكليت وكريمة 🍫'],
    },
    en: {
      question: 'If I walk into a coffee shop right now, what am I ordering?',
      options: ['Black espresso / Americano ☕', 'Iced Spanish / Caramel Latte 🧊', 'Matcha or fresh mint tea 🍵', 'Rich hot chocolate with cream 🍫'],
    },
  },
  {
    id: 'gm-2',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['vacation', 'travel'],
    ar: {
      question: 'نوع السفرية اللي بفضلها أكتر في إجازتي؟',
      options: ['ريلاكس وتشميس على البحر 🏖️', 'مغامرة واستكشاف وطبيعة 🧗', 'سياحة وتسوق ومطاعم في مدينة كبيرة 🏙️', 'مكان هادي معزول مفيش فيه شبكة ⛺'],
    },
    en: {
      question: 'My absolute dream vacation setup:',
      options: ['Beach lounger doing nothing 🏖️', 'Hiking and rugged adventure 🧗', 'Big city shopping and fine food 🏙️', 'Remote off-grid quiet cabin ⛺'],
    },
  },
  {
    id: 'gm-3',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['sleep', 'habits'],
    ar: {
      question: 'أنا بنام إمتى في العادي؟',
      options: ['قبل الساعة ١٢ بالليل ملاك 😴', 'بين ١ و ٢ بالليل مظبوط 🌙', 'بين ٣ و ٤ الفجر سهران 🦉', 'ساعة ما النوم يغلبني ماليش مواعيد 🌀'],
    },
    en: {
      question: 'My realistic bedtime on an average weeknight:',
      options: ['Before midnight asleep like an angel 😴', 'Between 1 AM and 2 AM 🌙', 'Between 3 AM and 4 AM night owl 🦉', 'Whenever my eyes collapse, no schedule 🌀'],
    },
  },
  {
    id: 'gm-4',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['social', 'party'],
    ar: {
      question: 'رد فعلي لما أكون في حفلة أو خروجة زحمة وكبيرة؟',
      options: ['في نص الدايرة بهزر وبرقص 🕺', 'واقف مع اتنين تلاتة بتكلم بروقان 🥂', 'بدور على الأكل والحلويات 🍕', 'بحسب الوقت عشان أخلع وأروح بدري 🏃💨'],
    },
    en: {
      question: 'My natural behavior at a crowded party:',
      options: ['Center of the room dancing & joking 🕺', 'Stationed with 2-3 people chatting comfortably 🥂', 'Camping right by the food snacks 🍕', 'Mentally calculating the Irish exit 🏃💨'],
    },
  },
  {
    id: 'gm-5',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['cinema', 'genres'],
    ar: {
      question: 'نوع الأفلام اللي دايمًا بختاره في سهرة السينما؟',
      options: ['إثارة وغموض وجريمة 🕵️', 'كوميديا مصرية أو أجنبية ضحك 😂', 'رعب وأدرينالين وتوتر 👻', 'خيال علمي وسفر عبر الزمن 🚀'],
    },
    en: {
      question: 'My go-to movie genre when picking movie night:',
      options: ['Psychological thriller & mystery 🕵️', 'Hilarious comedy 😂', 'Nerve-wrecking horror 👻', 'Sci-fi / Mind-bending time travel 🚀'],
    },
  },
  {
    id: 'gm-6',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['food', 'delivery'],
    ar: {
      question: 'لو طلبت دليفري عشوائي بالليل هيكون إيه؟',
      options: ['بيتزا ومشروب غازي 🍕', 'سندوتشات برجر وبطاطس 🍔', 'شاورما سوري صواريخ وثومية 🌯', 'سوشي ودلع 🍣'],
    },
    en: {
      question: 'My late-night craving food order:',
      options: ['Pizza & soda 🍕', 'Smash burger & curly fries 🍔', 'Stacked shawarma with garlic sauce 🌯', 'Sushi platter 🍣'],
    },
  },
  {
    id: 'gm-7',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['driving', 'music'],
    ar: {
      question: 'مزيكتي في طريق السفر بالعربية؟',
      options: ['مهرجانات وتراب مصري مولع 🔊', 'أغاني أجنبية بوب وهيب هوب 🎧', 'فيروز وعمرو دياب ونوستالجيا 📻', 'إندي روك وأغاني رايقة هادية 🌿'],
    },
    en: {
      question: 'My road trip driving soundtrack:',
      options: ['High-energy hype beats / Trap 🔊', 'Pop & hip-hop hits 🎧', 'Classic nostalgic anthems 📻', 'Indie alternative / chillwave 🌿'],
    },
  },
  {
    id: 'gm-8',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['personality', 'fights'],
    ar: {
      question: 'طريقتي لما أتعصب أو أضايق من حد؟',
      options: ['بسكت تمامًا وببقى بارد كتلج 🧊', 'بقول كل اللي في قلبي في لحظتها بصراحة 💥', 'بهزر بسخرية مبطنة ولاذعة 🎭', 'باخد جنب ومابردش على التليفون 🔕'],
    },
    en: {
      question: 'How I react when I get genuinely pissed off:',
      options: ['Total stone-cold silence 🧊', 'Unfiltered honest confrontation on the spot 💥', 'Sharp witty sarcasm 🎭', 'Going offline and ignoring notifications 🔕'],
    },
  },
  {
    id: 'gm-9',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['money', 'spending'],
    ar: {
      question: 'أكتر حاجة بصرف عليها فلوس من غير ندم؟',
      options: ['الأكل والمطاعم والتجارب 🍽️', 'اللبس والستايل والشوزات 👟', 'السفر والخروجات والمصايف ✈️', 'التكنولوجيا والأجهزة والجيمنج 💻'],
    },
    en: {
      question: 'Where most of my disposable income disappears:',
      options: ['Dining out & food experiences 🍽️', 'Wardrobe fits & sneakers 👟', 'Travel tickets & getaways ✈️', 'Gadgets, tech & gaming 💻'],
    },
  },
  {
    id: 'gm-10',
    mode: 'guess-me',
    type: 'guess-me',
    level: 2,
    tags: ['habits', 'morning'],
    ar: {
      question: 'أول حاجة بعملها فورًا أول ما أصحى من النوم؟',
      options: ['بمسك الموبايل وأفتح الإشعارات 📱', 'بقعد متنح في السقف ١٠ دقايق 😶', 'بقوم على الحمام والمية على طول 🚿', 'بدور على القهوة / الشاي فورًا ☕'],
    },
    en: {
      question: 'First involuntary action the second my eyes open:',
      options: ['Check phone notifications 📱', 'Stare into the ceiling void for 10 mins 😶', 'Jump straight into the shower / bathroom 🚿', 'Sprint toward coffee / caffeine ☕'],
    },
  },
  {
    id: 'gm-11',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['friendship', 'loyalty'],
    ar: {
      question: 'أكتر حاجة مستحيل أقبلها في علاقة صداقة؟',
      options: ['الكذب وتغيير الحقائق 🤥', 'النميمة ونقل الكلام ورا الضهر 🗣️', 'الأنانية ومبيفتكرنيش غير وقت المصلحة 🐍', 'الغيرة والتقليل من نجاحاتي 🪞'],
    },
    en: {
      question: 'My absolute biggest dealbreaker in a friendship:',
      options: ['Lying or rewriting truth 🤥', 'Gossip behind my back 🗣️', 'Selfishness & only reaching out for favors 🐍', 'Jealousy & undermining my wins 🪞'],
    },
  },
  {
    id: 'gm-12',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['dreams', 'superpowers'],
    ar: {
      question: 'لو هختار مهارة أتقنها في ثانية واحدة؟',
      options: ['أتكلم كل لغات العالم بطلاقة 🌍', 'أعزف أي آلة موسيقية باحتراف 🎸', 'أطبخ أحسن من أعظم شيف 👨‍🍳', 'أعرف لغة الجسد وقراءة النوايا 🔮'],
    },
    en: {
      question: 'If I could instantly download a master skill Matrix-style:',
      options: ['Fluent in every language on earth 🌍', 'Virtuoso on any musical instrument 🎸', 'World-class Michelin chef 👨‍🍳', 'Master of body language & human psychology 🔮'],
    },
  },
  {
    id: 'gm-13',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['stress', 'habits'],
    ar: {
      question: 'لما بحس بالملل التام، إيه أول فكرة بتيجي في بالي؟',
      options: ['أفتح تيك توك / ريلز بدون هدف 📱', 'أقوم أفتح التلاجة وأقفلها من غير ما آكل 🧊', 'أنزل أتمشى أو ألف بالعربية 🚗', 'أكلم حد في التليفون أرغي معاه 📞'],
    },
    en: {
      question: 'My default instinct when pure boredom strikes:',
      options: ['Mindless doomscrolling 📱', 'Open and stare into the empty fridge 🧊', 'Go for a drive or walk 🚗', 'Call a friend for random banter 📞'],
    },
  },
  {
    id: 'gm-14',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['romance', 'chemistry'],
    ar: {
      question: 'أكتر صفة بتلفت انتباهي في أول تعارف؟',
      options: ['خفة الدم والضحك التلقائي 😂', 'طريقة الكلام والثقة بالهداوة 🎙️', 'الستايل والشياكة والريحة الحلوة ✨', 'الذكاء والاهتمام بالتفاصيل الصغيرة 🧠'],
    },
    en: {
      question: 'The single quality that catches my attention most during a first meet:',
      options: ['Effortless sense of humor & laughs 😂', 'Calm quiet confidence & tone of voice 🎙️', 'Immaculate style & great scent ✨', 'Sharp wit & paying attention to tiny details 🧠'],
    },
  },
  {
    id: 'gm-15',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['habits', 'pets'],
    ar: {
      question: 'لو هختار أربي حيوان في البيت هيكون إيه؟',
      options: ['قطة كيوت ورايقة 🐱', 'كلب وفي ورياضي 🐶', 'ببغاء ملون وذكي 🦜', 'حوض سمك ونباتات مائية 🐠'],
    },
    en: {
      question: 'My dream house pet companion:',
      options: ['Chill, independent cat 🐱', 'Loving, athletic dog 🐶', 'Witty, vibrant parrot 🦜', 'Serene aquarium setup 🐠'],
    },
  },
  {
    id: 'gm-16',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['travel', 'style'],
    ar: {
      question: 'لو سافرنا سوا بكرة، دوري هيكون إيه في الرحلة؟',
      options: ['اللي بيلف ويختار أحسن مطاعم وأكل 🍔', 'اللي معاه الـGPS والـPlaylist 🎶', 'اللي بيقترح الجنان والخروج في أي وقت 🚀', 'اللي بيتصور وبيوثق كل لحظة 📸'],
    },
    en: {
      question: 'If we traveled together, what role would I naturally adopt?',
      options: ['The ultimate food & restaurant scout 🍔', 'The designated navigator & DJ 🎶', 'The instigator of spontaneous adventures 🚀', 'The photographer documenting everything 📸'],
    },
  },
  {
    id: 'gm-17',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['work', 'attitude'],
    ar: {
      question: 'طريقة شغلي الحقيقية تحت الضغط؟',
      options: ['مخطط كل حاجة بالساعة والدقيقة ⏱️', 'بأجل لآخر لحظة وبطلع إبداع تحت النار 🔥', 'هادي ورايق ومفيش حاجة بتهزني 🧘', 'بتوتر في سري وبطلع الشغل مظبوط 💼'],
    },
    en: {
      question: 'My actual work style under pressure:',
      options: ['Methodical, scheduled to the minute ⏱️', 'Procrastinating until crunch time brilliance 🔥', 'Super chill, unflappable Zen 🧘', 'Secretly stressed but delivering perfection 💼'],
    },
  },
  {
    id: 'gm-18',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['games', 'trivia'],
    ar: {
      question: 'أكتر مجال عندي معلومات عامة عنه من غير ما أحس؟',
      options: ['الكورة والرياضة العالمية ⚽', 'السينما والمسلسلات والممثلين 🎬', 'التاريخ والجغرافيا والحضارات 🗺️', 'التكنولوجيا والذكاء الاصطناعي والمستقبل 🤖'],
    },
    en: {
      question: 'My biggest reservoir of random trivia knowledge:',
      options: ['Football / Sports ⚽', 'Cinema, shows & pop culture 🎬', 'History & world geography 🗺️', 'Tech, science & futuristic innovations 🤖'],
    },
  },
  {
    id: 'gm-19',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['social', 'gifts'],
    ar: {
      question: 'نوع الهدية اللي يفرحني أكتر من أي حاجة؟',
      options: ['حاجة أنا قولت نفسي فيها عرضًا وافتكرتها 🎁', 'تذكرة سفرية أو خروجة تجربة جديدة 🎟️', 'برفيوم راقي أو حاجة شياكة للبس 🧴', 'حاجة مكتوبة بخط الإيد أو معمولة مخصوص 💌'],
    },
    en: {
      question: 'The gift that would melt my heart most:',
      options: ['Something I casually mentioned wanting months ago 🎁', 'Tickets to an experience or trip 🎟️', 'Luxury fragrance or style piece 🧴', 'Handwritten letter or personalized keepsake 💌'],
    },
  },
  {
    id: 'gm-20',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['weekend', 'energy'],
    ar: {
      question: 'أكتر وقت في اليوم بكون فيه في قمة طاقتي ومزاجي؟',
      options: ['الصبح بدري مع أول فنجان قهوة 🌅', 'العصر مع وقت الغروب 🌇', 'الساعة ٩ بالليل مع بداية السهرة 🌃', 'بعد نص الليل في سكون العالم 🌙'],
    },
    en: {
      question: 'The time of day when my energy and mood peak:',
      options: ['Early morning with fresh coffee 🌅', 'Golden hour late afternoon 🌇', '9 PM prime evening vibe 🌃', 'Post-midnight in total quiet 🌙'],
    },
  },
  {
    id: 'gm-21',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['social', 'communication'],
    ar: {
      question: 'طريقتي المفضلة للتواصل مع أقرب الناس ليا؟',
      options: ['شات ورسائل وميمز طول اليوم 💬', 'فويسات طويلة بنحكي فيها كل التفاصيل 🎙️', 'مكالمات فيديو وساعات كلام 📹', 'نقابل بعض في الحقيقة وخلاص ☕'],
    },
    en: {
      question: 'My preferred way of staying in touch with my favorite person:',
      options: ['Steady meme & text drip 💬', 'Long unhinged voice notes 🎙️', 'Hours-long video calls 📹', 'In-person coffee dates or nothing ☕'],
    },
  },
  {
    id: 'gm-22',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['food', 'sweets'],
    ar: {
      question: 'نقطة ضعفي في الحلويات؟',
      options: ['آيس كريم بكل النكهات 🍦', 'سينابون سايح بالقرفة والجبنة 🥮', 'شوكولاتة دارك أو نوتيلا 🍫', 'أم علي أو تشيز كيك كريمي 🍰'],
    },
    en: {
      question: 'My ultimate sweet indulgence weakness:',
      options: ['Artisan gelato / ice cream 🍦', 'Warm gooey cinnamon rolls 🥮', 'Decadent dark chocolate / Nutella 🍫', 'Creamy New York cheesecake 🍰'],
    },
  },
  {
    id: 'gm-23',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['personality', 'decisions'],
    ar: {
      question: 'لما باخد قرار مصيري في حياتي، بعتمد على إيه أكتر؟',
      options: ['إحساسي الداخلي وحدسي 🧭', 'المنطق والورقة والقلم والحسابات 📊', 'باخد رأي أقرب اتنين في حياتي 👥', 'بسيبها للظروف والوقت لحد ما تبان ⏳'],
    },
    en: {
      question: 'How I ultimately decide on big life choices:',
      options: ['Gut instinct & intuition 🧭', 'Cold logic & pros/cons list 📊', 'Consulting my 2 closest confidants 👥', 'Letting time and unfolding events decide ⏳'],
    },
  },
  {
    id: 'gm-24',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['fashion', 'colors'],
    ar: {
      question: 'اللون اللي بيميل ليه دولابي ولبسي أكتر؟',
      options: ['الأسود والرمادي والغامق 🖤', 'الأبيض والبيج والألوان الهادية 🤍', 'الأزرق والكحلي والجينز 💙', 'ألوان مبهجة وفاتحة وأخضر 💚'],
    },
    en: {
      question: 'The dominant color palette of my closet:',
      options: ['All-black, graphite & monochrome 🖤', 'White, beige & earth tones 🤍', 'Classic denim & navy blue 💙', 'Vibrant pops of color & olive green 💚'],
    },
  },
  {
    id: 'gm-25',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['comfort', 'weekend'],
    ar: {
      question: 'فكرتي عن اليوم الـRelax التام؟',
      options: ['نوم من غير منبه + أكل جاهز + فيلم 🛋️', 'سبا ومساج وحمام دافي 🛁', 'مشي على البحر ومزيكا في السماعة 🌊', 'طبخة حلوة وقعدة مع شخص بحبه 🍲'],
    },
    en: {
      question: 'My blueprint for a pure relaxation day:',
      options: ['No alarm + takeout + couch movie marathon 🛋️', 'Steam room, massage & hot bath 🛁', 'Quiet coastal walk with headphones 🌊', 'Cooking a slow meal with my favorite person 🍲'],
    },
  },
  {
    id: 'gm-26',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['humor', 'memes'],
    ar: {
      question: 'نوع الكوميديا اللي بيضحكني بجد من قلبي؟',
      options: ['الإيفيهات التلقائية وسرعة البديهة 😂', 'المواقف المحرجة والـCringe المضحك 🙈', 'الميمز العشوائية والمبالغة السريالية 🛸', 'النكت الساخرة والكوميديا السودا 🖤'],
    },
    en: {
      question: 'The comedy style that guarantees tears of laughter:',
      options: ['Lightning-fast witty banter 😂', 'Secondhand cringe situations 🙈', 'Unhinged surreal internet memes 🛸', 'Dry deadpan dark satire 🖤'],
    },
  },
  {
    id: 'gm-27',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['social', 'secrets'],
    ar: {
      question: 'لو عندي سر ومضغوط، مين اللي هحكيله أول واحد؟',
      options: ['البيست فريند بتاعي 🤝', 'أمي أو حد من إخواتي 🏡', 'الشخص اللي معجب بيه / شريكي 💫', 'محدش، بشيل سري في صدري 🤐'],
    },
    en: {
      question: 'If I have a pressing secret weighing on my chest, who hears it first?',
      options: ['My ride-or-die best friend 🤝', 'My mom or sibling 🏡', 'My crush / partner 💫', 'Nobody, it goes into the mental vault 🤐'],
    },
  },
  {
    id: 'gm-28',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['travel', 'nature'],
    ar: {
      question: 'المنظر الطبيعي اللي بيسحرني أكتر؟',
      options: ['بحر أزرق صافي وشمس دافية 🌊', 'جبال عالية وسحاب وضباب 🏔️', 'سما صحراء مليانة نجوم ومجرات 🌌', 'غابات خضرا وشلالات مية 🌿'],
    },
    en: {
      question: 'The landscape that takes my breath away most:',
      options: ['Crystal clear ocean waves 🌊', 'Misty alpine mountain summits 🏔️', 'Desert starry night sky 🌌', 'Lush waterfalls in dense forests 🌿'],
    },
  },
  {
    id: 'gm-29',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['habits', 'phone'],
    ar: {
      question: 'نسبة شحن موبايلي في العادي بتبقى؟',
      options: ['فوق ٨٠٪ ودايمًا الشاحن في جيبي 🔋', 'بين ٤٠٪ و ٧٠٪ متوازن 📱', 'أقل من ٢٠٪ وعايش على الحافة 🪫', 'الأبلكيشنز شغالة والموبايل سخن مولع 🔥'],
    },
    en: {
      question: 'My battery level right now / generally:',
      options: ['Above 80% with charger always ready 🔋', 'Comfortable 40%–70% range 📱', 'Living dangerously under 15% 🪫', 'Low power mode & sweating bullets 🔥'],
    },
  },
  {
    id: 'gm-30',
    mode: 'guess-me',
    type: 'guess-me',
    level: 3,
    tags: ['shopping', 'habits'],
    ar: {
      question: 'طريقتي في الشراء والتسوق؟',
      options: ['عارف داخل أشتري إيه وبخرج في ٥ دقايق ⚡', 'بلف وأقارن الأسعار وأقرأ المراجعات 🔎', 'بشتري بالحماس والـImpulse buying 💸', 'بحط في الـCart ومبشتريش غير بعد شهر 🛒'],
    },
    en: {
      question: 'My real shopping behavior:',
      options: ['In and out with laser focus in 5 mins ⚡', 'Review reader & comparison researcher 🔎', 'Impulsive emotional buyer 💸', 'Leave items in cart for 3 weeks 🛒'],
    },
  },
  {
    id: 'gm-31',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['chemistry', 'attraction'],
    ar: {
      question: 'أول تفصيلة بلاحظها في مظهر الشخص اللي قدامي؟',
      options: ['العينين ونظرة النظافة والاهتمام 👀', 'الابتسامة والضحكة الصافية ✨', 'الريحة والشياكة وتناسق اللبس 🧴', 'طريقة الوقفة ولغة الجسد 🚶'],
    },
    en: {
      question: 'The physical detail I register first on someone:',
      options: ['Eyes & expressive focus 👀', 'Smile & genuine laugh ✨', 'Scent & outfit coordination 🧴', 'Posture & body language confidence 🚶'],
    },
  },
  {
    id: 'gm-32',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['personality', 'trust'],
    ar: {
      question: 'حاجة بتخليني أقفل من شخص تمامًا حتى لو كان لطيف؟',
      options: ['المعاملة بتكبر مع الناس أو الويترز 🚩', 'النرجسية وإن الكلام كله عنه بس 🪞', 'التناقض بين الكلام والأفعال 🎭', 'البرود وانعدام الحماس لأي حاجة ❄️'],
    },
    en: {
      question: 'Instant subtle turn-off even if they seem nice:',
      options: ['Rude behavior toward service staff 🚩', 'Self-absorbed talking only about themselves 🪞', 'Glaring contradictions between words & actions 🎭', 'Lethargic apathy & negative energy ❄️'],
    },
  },
  {
    id: 'gm-33',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['romance', 'love-language'],
    ar: {
      question: 'لغة الحب الأساسية عندي اللي بتوصلني أسرع؟',
      options: ['الكلام الحلو والتقدير الصادق 💬', 'الوقت الرايق سوا من غير تشتيت ⏳', 'الهدايا اللي وراها فكرة وتفكير 🎁', 'المساعدة في زنقة ووقفة الجدعنة 🤝'],
    },
    en: {
      question: 'My primary love language that hits deepest:',
      options: ['Words of appreciation & verbal praise 💬', 'Undivided quality time together ⏳', 'Thoughtful surprise gifts 🎁', 'Acts of service & stepping up when it matters 🤝'],
    },
  },
  {
    id: 'gm-34',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['dreams', 'adventure'],
    ar: {
      question: 'مغامرة مجنونة نفسي أجربها قبل ما أموت؟',
      options: ['قفز مظلي Skydiving من طيارة 🪂', 'غوص في أعماق المحيط مع القروش 🦈', 'سفر بالسيارة حول العالم لشهور 🚙', 'تسلق قمة جبل عالية والتخييم عليها 🏔️'],
    },
    en: {
      question: 'Wild adrenaline bucket-list adventure I want to conquer:',
      options: ['Skydiving from 15,000 feet 🪂', 'Deep scuba diving in open waters 🦈', 'Months-long overland road trip across continents 🚙', 'Summiting a high mountain peak 🏔️'],
    },
  },
  {
    id: 'gm-35',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['personality', 'vibe'],
    ar: {
      question: 'الكلمة اللي بتلخص طاقتي في أغلب الأيام؟',
      options: ['رايق ومروق دماغي 😌', 'طموح وبجري ورا أهدافي 🚀', 'حساس وبدقق في التفاصيل 🧐', 'عفوي ومستني المفاجآت 🎲'],
    },
    en: {
      question: 'The word that best captures my everyday frequency:',
      options: ['Calm & unfazed 😌', 'Driven & ambitious 🚀', 'Thoughtful & observant 🧐', 'Spontaneous & playful 🎲'],
    },
  },
  {
    id: 'gm-36',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['childhood', 'personality'],
    ar: {
      question: 'وأنا في المدرسة زمان كنت أنهي نوع من الطلاب؟',
      options: ['الشاطر الهادي اللي في أول ديسك 📚', 'المشاغب خفيف الدم اللي في آخر فصل 😂', 'المحبوب وصاحب الدفعة كلها 🤝', 'اللي بيحضر ويمشي من سكات 🫥'],
    },
    en: {
      question: 'Back in school, what kind of student was I?',
      options: ['Quiet straight-A student front row 📚', 'Class clown making people laugh back row 😂', 'Social butterfly friends with everyone 🤝', 'Ghosted in, ghosted out with no drama 🫥'],
    },
  },
  {
    id: 'gm-37',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['food', 'cuisine'],
    ar: {
      question: 'لو هعيش على مطبخ بلد واحدة لبقية حياتي؟',
      options: ['المطبخ المصري والشرقي 🧆', 'المطبخ الإيطالي 🍝', 'المطبخ الياباني والآسيوي 🍣', 'المطبخ المكسيكي والتورتيلا 🌮'],
    },
    en: {
      question: 'If I had to eat from only one global cuisine forever:',
      options: ['Middle Eastern / Egyptian comfort 🧆', 'Italian pasta & wood-fired cuisine 🍝', 'Japanese & East Asian 🍣', 'Mexican tacos & bold flavors 🌮'],
    },
  },
  {
    id: 'gm-38',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['chemistry', 'first-impression'],
    ar: {
      question: 'تفتكر أول انطباع أخدته عنك كان إيه؟',
      options: ['شخصية كاريزما وواثقة من نفسها 😎', 'شخصية هادية ولطيفة ومريحة 🌿', 'شخصية ذكية وبتلقطها وهي طايرة 🧠', 'شخصية شقية ودمها خفيف جدا 😂'],
    },
    en: {
      question: 'Guess what my genuine first impression of you was:',
      options: ['Naturally magnetic & confident 😎', 'Gentle, warm & easygoing 🌿', 'Super sharp & observant 🧠', 'Playful & hilarious 😂'],
    },
  },
  {
    id: 'gm-39',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['communication', 'dating'],
    ar: {
      question: 'حاجة لو حد عملها وهو بيتكلم معايا تكسب قلبي فورًا؟',
      options: ['يبص في عيني بتركيز ويسمع بجد 👀', 'يفتكر تفصيلة صغيرة قولتها من أسبوع 📝', 'يضحك على نكتي وإيفيهاتي من قلبه 😂', 'يتكلم بحماس وشغف عن حاجة بيحبها 🔥'],
    },
    en: {
      question: 'Something someone can do in a conversation that completely wins me over:',
      options: ['Hold engaging eye contact & truly listen 👀', 'Remember a tiny offhand detail from last week 📝', 'Laugh wholeheartedly at my jokes 😂', 'Speak with passionate fire about what they love 🔥'],
    },
  },
  {
    id: 'gm-40',
    mode: 'guess-me',
    type: 'guess-me',
    level: 4,
    tags: ['vibes', 'synergy'],
    ar: {
      question: 'لو هنوصف الـVibe بيننا دلوقتي بكلمة واحدة، أنا هختار إيه؟',
      options: ['كيمياء عالية وتفاهم سريع 🔥', 'راحة وهدوء كأننا عارفين بعض من زمان 😌', 'ضحك وهزار ملوش آخر 😂', 'فضول وحابين نعرف أكتر ✨'],
    },
    en: {
      question: 'If I had to label the vibe between us right now in one phrase:',
      options: ['Electric chemistry & instant rhythm 🔥', 'Comfortable like we’ve known each other forever 😌', 'Unstoppable laughter & teasing 😂', 'Intriguing mutual curiosity ✨'],
    },
  },
];
