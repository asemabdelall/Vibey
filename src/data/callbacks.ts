export interface CallbackTemplate {
  id: string;
  type: string;
  ar: string;
  en: string;
}

export const CALLBACK_TEMPLATES: CallbackTemplate[] = [
  {
    id: 'cb_beach_city',
    type: 'choice_disagreement',
    ar: 'وبالمناسبة… موضوع البحر ولا المدينة لسه متحلش بينكم 💀',
    en: 'By the way… that whole beach vs city debate remains unresolved 💀',
  },
  {
    id: 'cb_coffee_tea',
    type: 'choice_disagreement',
    ar: 'لحد دلوقتي مش عارفين نتخطى خلاف الشاي والقهوة اللي في الأول ☕',
    en: 'Still mentally recovering from the tea vs coffee divide earlier ☕',
  },
  {
    id: 'cb_first_diff',
    type: 'choice_disagreement',
    ar: 'فاكرين أول خلاف في القعدة؟ لسه سايب أثره في الـVibe 😂',
    en: 'Remember your very first disagreement? The tension still lingers 😂',
  },
  {
    id: 'cb_more_likely_targeted',
    type: 'more_likely_targeted',
    ar: 'التهمة اللي لبست في {{playerA}} في Who’s More Likely لسه معلمة 🎯',
    en: 'The nomination {{playerA}} took earlier in Who’s More Likely is still legendary 🎯',
  },
  {
    id: 'cb_guess_streak',
    type: 'guess_streak',
    ar: 'بعد لقطات التخمين الصح دي، واضح إن مفيش أسرار مستخبية خالص 👀',
    en: 'After those accurate guesses earlier, clearly zero secrets are safe here 👀',
  },
  {
    id: 'cb_skips_cluster',
    type: 'skips_cluster',
    ar: 'الأسئلة اللي عديتوها في الأول لسه بتسأل نفسها انتوا خفتوا من إيه 🌚',
    en: 'Those skipped questions from earlier are still wondering what you were dodging 🌚',
  },
  {
    id: 'cb_plot_twist',
    type: 'plot_twist',
    ar: 'التحدي اللي فات أثبت إنكم لما بتتفاجئوا بتطلعوا طاقة تانية خالص 🎲',
    en: 'That spontaneous challenge proved you two handle surprises with unmatched chaos 🎲',
  },
  {
    id: 'cb_travel',
    type: 'choice_disagreement',
    ar: 'لو سافرتوا سوا بعد الخلافات دي، احتمال تتخانقوا على الشنط في المطار ✈️',
    en: 'If you two ever travel together, luggage claim is going to be a battlefield ✈️',
  },
  {
    id: 'cb_music',
    type: 'choice_match',
    ar: 'الاتفاق على الأغاني والمود اللي كان في الأول لسه مكمل معانا 🎵',
    en: 'That playlist synchronization from the start is still carrying the session 🎵',
  },
  {
    id: 'cb_nightowl',
    type: 'choice_match',
    ar: 'واضح إن نظام السهر وعادات الليل عندكم نسخة كربون من بعض 🦉',
    en: 'Your shared night-owl habits are suspiciously well matched 🦉',
  },
  {
    id: 'cb_spending',
    type: 'choice_disagreement',
    ar: 'كل واحد لسه مستغرب التاني بيصرف فلوسه في إيه 💸',
    en: 'Still processing how differently you both allocate financial priorities 💸',
  },
  {
    id: 'cb_general_match',
    type: 'choice_match',
    ar: 'الاتفاق اللي بدأ بهزار في الأول طلع مبدأ ثابت عندكم ✨',
    en: 'That casual agreement from early on seems to be an enduring habit ✨',
  },
  {
    id: 'cb_awkward_laugh',
    type: 'category_focus',
    ar: 'الضحك اللي طلع في نص الأسئلة كسر كل الحواجز رسميًا 🤝',
    en: 'The laughs mid-session officially obliterated all conversational friction 🤝',
  },
  {
    id: 'cb_deep_turn',
    type: 'category_focus',
    ar: 'من أسئلة سريعة لكلام عميق… التحول ده حصل بسلاسة غريبة 🌙',
    en: 'From light trivia to 2 AM philosophy… that transition was suspiciously smooth 🌙',
  },
  {
    id: 'cb_point_at_fallout',
    type: 'choice_disagreement',
    ar: 'نظرة الصدمة لما شاورتوا على بعض لسه معلقة في الجو 👀',
    en: 'The shock when you pointed fingers at each other is still floating in the air 👀',
  },
];
