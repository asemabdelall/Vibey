import type { ResultArchetypeId, SessionStats } from '../types/game';

export interface FinalWordTemplate {
  id: string;
  archetype?: ResultArchetypeId;
  condition?: (stats: SessionStats) => boolean;
  ar: string;
  en: string;
  priority: number;
}

export const FINAL_WORDS_TEMPLATES: FinalWordTemplate[] = [
  // High matches / Same Braincell
  {
    id: 'fw_high_matches',
    condition: (s) => s.matches >= 6 && s.matches > s.differences * 1.5,
    ar: '{{playerA}} و{{playerB}} وصلوا لمرحلة إن الاتفاق بقى مريب… شكلكم بتبصوا في ورقة بعض من غير ما تاخدوا بالكم 👀',
    en: '{{playerA}} and {{playerB}} reached a level of agreement that is officially suspicious. Telepathy or mutual cheating? 👀',
    priority: 10,
  },
  {
    id: 'fw_same_braincell_flawless',
    archetype: 'same-braincell',
    ar: 'بدأتوا باختيارات سريعة، وبعد نهاية القعدة بقينا مش عارفين مين بيقلد مين من كتر التوافق 😂',
    en: 'Started with rapid choices, ended up thinking in identical patterns across the board 😂',
    priority: 9,
  },

  // High differences / Opposites working
  {
    id: 'fw_high_differences',
    condition: (s) => s.differences >= 6 && s.differences > s.matches * 1.5,
    ar: 'مختلفين في كل اختيار تقريبًا… وكل خلاف وراه ضحك ونقاش أطول من السؤال نفسه. التضاد ده عامل طاقة جامدة ✨',
    en: 'Opposite picks on almost everything, yet every debate had laughter. Polar opposites creating real chemistry ✨',
    priority: 10,
  },
  {
    id: 'fw_opposites_banter',
    archetype: 'opposites-working',
    ar: 'ولا إجابة شبه التانية، بس ولا واحد فيكم حب يسكت. Vibey بيحيي مهاراتكم في الدفاع عن الإجابات الغريبة 🤝',
    en: 'Hardly a single matching answer, yet neither of you stopped talking. Vibey respects your debate stamina 🤝',
    priority: 9,
  },

  // High Guess accuracy
  {
    id: 'fw_guess_sniper',
    condition: (s) => s.guessTotal >= 2 && s.guessCorrect / s.guessTotal >= 0.75,
    ar: 'بالمناسبة… نسبة التخمين الصح عالية بشكل يرعب. أنتوا مذاكرين بعض كويس ولا ده استبصار؟ 🎯',
    en: 'By the way… that guess accuracy was startlingly high. Studying each other or genuine intuition? 🎯',
    priority: 8,
  },

  // Low Guess accuracy
  {
    id: 'fw_guess_clueless',
    condition: (s) => s.guessTotal >= 3 && s.guessCorrect <= 1,
    ar: 'لعبة Guess Me أثبتت رسميًا إن لسه قدامكم رحلة طويلة عشان تفهموا دماغ بعض 😂 بس الرحلة شكلها ممتعة.',
    en: 'Guess Me revealed you two have virtually zero ability to predict each other 😂 but the banter along the way was great.',
    priority: 8,
  },

  // Certified Yappers / High likes
  {
    id: 'fw_certified_yappers',
    archetype: 'certified-yappers',
    condition: (s) => s.liked >= 3,
    ar: 'الموبايل كان مجرد عذر عشان تفتحوا في مواضيع جانبية بالساعات. Vibey فخور بدوره كشماعة للرغي 🗣️',
    en: 'The phone was merely a polite excuse to dive into two-hour tangents. Vibey gladly accepts the facilitator role 🗣️',
    priority: 9,
  },

  // Chaotic Energy / Lots of plot twists
  {
    id: 'fw_chaotic_energy',
    archetype: 'chaotic-energy',
    condition: (s) => s.plotTwists >= 2,
    ar: 'القعدة دي كان فيها طاقة عشوائية ومفاجآت محترمة.. التحديات والضحك خلت الوقت يطير من غير ما نحس 🎲🔥',
    en: 'Pure spontaneous chaotic energy. The challenges and rapid laughs made time completely disappear 🎲🔥',
    priority: 9,
  },

  // Unexpectedly Deep
  {
    id: 'fw_unexpectedly_deep',
    archetype: 'unexpectedly-deep',
    ar: 'بدأتوا بهزار وخفة ووصلتوا لكلام ومشاعر بجد.. النوع ده من القعدات بيفضل معلم في الذاكرة 🌙✨',
    en: 'Began lighthearted and organically crossed into late-night honesty. An unforgettable conversation 🌙✨',
    priority: 9,
  },

  // Chill Chemistry
  {
    id: 'fw_chill_chemistry',
    archetype: 'chill-chemistry',
    ar: 'الفايب بينكم رايق وسلس ومريح من غير أي تكلف. اتنين قاعدين مرتاحين ومبسوطين بالوقت سوا 😌',
    en: 'Effortless, natural, and genuinely relaxed. Two people comfortable enjoying each other’s frequency 😌',
    priority: 8,
  },

  // Skips heavy
  {
    id: 'fw_many_skips',
    condition: (s) => s.skips >= 4,
    ar: 'عديتوا كروت كتير بس كملتوا القعدة بمزاجكم.. ده المهم، إنكم ترتاحوا والـVibe يفضل رايق 🛋️',
    en: 'Curated your own path with plenty of skips, keeping only the vibes that felt right. Pure comfort 🛋️',
    priority: 7,
  },

  // More likely consensus
  {
    id: 'fw_more_likely_consensus',
    condition: (s) => s.moreLikelyAgreements >= 2,
    ar: 'في كروت مين أكتر… اتفقوا بسرعة خيالية على مين اللي بيعمل المصايب 😂 التهم ثابتة بالشهود.',
    en: 'In Who’s More Likely, consensus was brutally fast on who causes the chaos 😂 unanimous agreement.',
    priority: 7,
  },

  // More likely split
  {
    id: 'fw_more_likely_split',
    condition: (s) => s.moreLikelyDisagreements >= 2,
    ar: 'الثقة المتبادلة في مين بيضيع ومين بيتأخر كانت معدومة تمامًا.. كل واحد شايف المصيبة في التاني 💀',
    en: 'Zero consensus on Who’s More Likely… each person wholeheartedly blamed the other. Iconic standoff 💀',
    priority: 7,
  },

  // Point at cards heavy
  {
    id: 'fw_point_at_master',
    condition: (s) => s.pointAtCardsCompleted >= 2,
    ar: 'كروت التشاور بالصوابع فضحت كل النوايا من غير كلمة واحدة.. العين كانت بتقول كل حاجة 👀',
    en: 'The pointing cards completely exposed the unspoken truths without uttering a single syllable 👀',
    priority: 7,
  },

  // General fallback 1
  {
    id: 'fw_general_balanced',
    ar: 'توازن مظبوط بين الضحك والفضول والنقاشات.. قعدة سابت وراها فايب أحلى بكتير من بدايتها ✨',
    en: 'A golden balance of laughs, honest curiosity, and banter. Left the room vibrating with much better energy ✨',
    priority: 3,
  },

  // General fallback 2
  {
    id: 'fw_general_unfiltered',
    ar: 'سواء اتفقتوا أو اختلفتوا.. الأكيد إنكم عرفتوا حاجات مكنتش هتتقال في قعدة عادية 🤝',
    en: 'Whether you agreed or debated… you definitely unlocked things that would never surface in polite small talk 🤝',
    priority: 2,
  },

  // General fallback 3
  {
    id: 'fw_general_vibey_stamp',
    ar: 'Vibey بيعتمد القعدة دي كـ قعدة ناجحة خالية من الأسئلة المملة والصمت المحرج 🚀',
    en: 'Vibey officially stamps this session as certified awkward-free and memorable 🚀',
    priority: 1,
  },
];
