// All static data ported from the design handoff (Sacred Knowledge.dc.html `Component` class).
// Female teacher avatars are inline data-URI SVG monograms (deliberate — no immodest stock photos).

const monogram = (initials, color) =>
  `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='400'%20height='400'%3E%3Crect%20width='400'%20height='400'%20fill='%23${color}'/%3E%3Ctext%20x='200'%20y='205'%20font-family='Arial,sans-serif'%20font-size='170'%20font-weight='bold'%20fill='white'%20text-anchor='middle'%20dominant-baseline='central'%3E${initials}%3C/text%3E%3C/svg%3E`;

export const teachers = [
  {
    slug: 'ahmad', name: 'Sheikh Ahmad Al-Nouri', ar: 'أحمد النوري',
    title: 'Quran & Hadith Specialist · memorization, tajweed and the sciences of hadith',
    short: 'Quran & Hadith Specialist', country: 'Amman, Jordan', flag: '🇯🇴', rating: 4.9, reviews: 127,
    gender: 'male', track: 'student', languages: ['Arabic', 'English', 'French'], experience: '15+ years',
    price: 24, specialties: ['Quran Memorization', 'Tajweed', 'Hadith Studies', 'Tafsir'], subjects: ['Quran', 'Hadith'],
    featured: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    weekend: true,
    bio: 'Sheikh Ahmad has dedicated over 15 years to Islamic education, specializing in Quran memorization and Hadith studies. His approach combines traditional methods with modern techniques to make learning accessible to students of all backgrounds.',
    approach: [
      'Personalised memorisation plans with daily review targets',
      'Colour-coded tajweed correction in every session',
      'Connecting verses to their meanings and context',
    ],
    credentials: [
      { title: 'Ijazah in Hafs recitation', issuer: 'Al-Azhar University', year: '2008' },
      { title: 'BA in Islamic Sciences', issuer: 'University of Jordan', year: '2006' },
    ],
    reviewList: [
      { name: 'Ahmed S.', rating: 5, date: 'May 2023', body: 'The structured approach to memorization transformed my relationship with the Quran.' },
      { name: 'Fatima K.', rating: 5, date: 'April 2023', body: 'Patient and deeply knowledgeable. My tajweed improved within weeks.' },
    ],
    availability: ['Mon 7–9 PM', 'Wed 6–8 PM', 'Sat 10 AM–12 PM', 'Sun 4–6 PM'],
  },
  {
    slug: 'maryam', name: 'Ustadha Maryam Hassan', ar: 'مريم حسن',
    title: "Fiqh & Islamic Studies · women's fiqh and Arabic for sisters",
    short: 'Fiqh & Islamic Studies', country: 'London, UK', flag: '🇬🇧', rating: 4.8, reviews: 93,
    gender: 'female', track: 'student', languages: ['Arabic', 'English'], experience: '10+ years',
    price: 22, specialties: ['Fiqh', "Women's Fiqh", 'Arabic', 'Islamic Studies'], subjects: ['Fiqh', 'Arabic'],
    featured: true, photo: monogram('MH', '0F5C46'), weekend: true,
    bio: "Ustadha Maryam holds a Master's in Islamic Law and has been teaching Islamic studies for over 10 years with a focus on women's fiqh and accessible Arabic.",
    approach: ['A safe, respectful space for sisters', 'Practical fiqh grounded in classical sources', 'Step-by-step Arabic reading'],
    credentials: [
      { title: 'MA Islamic Law', issuer: 'SOAS, University of London', year: '2012' },
      { title: 'Ijazah in Fiqh', issuer: 'Various scholars', year: '2014' },
    ],
    reviewList: [{ name: 'Sarah M.', rating: 5, date: 'May 2023', body: 'Finding a female teacher specialising in fiqh was a blessing.' }],
    availability: ['Tue 11 AM–1 PM', 'Thu 7–9 PM', 'Sat 2–4 PM'],
  },
  {
    slug: 'ibrahim', name: 'Sheikh Ibrahim Malik', ar: 'إبراهيم مالك',
    title: 'Arabic & Tafsir · classical grammar (nahw) and Quranic exegesis',
    short: 'Arabic & Tafsir Teacher', country: 'Cairo, Egypt', flag: '🇪🇬', rating: 4.7, reviews: 85,
    gender: 'male', track: 'student', languages: ['Arabic', 'English'], experience: '12 years',
    price: 18, specialties: ['Arabic Grammar', 'Tafsir', 'Nahw', 'Balagha'], subjects: ['Arabic', 'Tafsir'],
    featured: true, photo: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&q=80&auto=format&fit=crop',
    weekend: false,
    bio: 'Sheikh Ibrahim is a graduate of Al-Azhar with deep expertise in classical Arabic grammar and the sciences of tafsir.',
    approach: ['Grammar through the Quran itself', 'Building toward reading classical texts unaided'],
    credentials: [{ title: 'Al-Azhar Faculty of Arabic', issuer: 'Al-Azhar University', year: '2010' }],
    reviewList: [{ name: 'Bilal R.', rating: 5, date: 'March 2023', body: 'Nahw finally makes sense to me.' }],
    availability: ['Mon 5–7 PM', 'Wed 5–7 PM', 'Fri 3–5 PM'],
  },
  {
    slug: 'aisha', name: 'Ustadha Aisha Zakariya', ar: 'عائشة زكريا',
    title: 'Quran & Tajweed · ijazah-certified recitation for all ages',
    short: 'Quran & Tajweed Teacher', country: 'Kuala Lumpur, Malaysia', flag: '🇲🇾', rating: 4.9, reviews: 112,
    gender: 'female', track: 'student', languages: ['Arabic', 'English', 'Malay'], experience: '9 years',
    price: 20, specialties: ['Quran Recitation', 'Tajweed', 'Ijazah', 'Kids Quran'], subjects: ['Quran'],
    featured: true, photo: monogram('AZ', '15795C'), weekend: true,
    bio: 'Ustadha Aisha holds an ijazah in Hafs recitation and specializes in patient, structured Quran instruction for children and adults.',
    approach: ['Gentle, child-friendly methods', 'Ijazah-track recitation for adults'],
    credentials: [{ title: 'Ijazah in Hafs', issuer: 'Darul Quran', year: '2014' }],
    reviewList: [{ name: 'Yusuf B.', rating: 5, date: 'June 2023', body: 'My daughter looks forward to every session.' }],
    availability: ['Sat 9–11 AM', 'Sun 9–11 AM', 'Wed 4–6 PM'],
  },
  {
    slug: 'yusuf', name: 'Sheikh Yusuf Abdullah', ar: 'يوسف عبدالله',
    title: 'Hadith & Seerah · mustalah al-hadith and prophetic biography',
    short: 'Hadith & Seerah Teacher', country: 'Medina, Saudi Arabia', flag: '🇸🇦', rating: 4.8, reviews: 76,
    gender: 'male', track: 'student', languages: ['Arabic', 'English', 'Turkish'], experience: '14 years',
    price: 26, specialties: ['Hadith Studies', 'Seerah', 'Mustalah', 'Aqeedah'], subjects: ['Hadith', 'Aqeedah'],
    featured: false, photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80&auto=format&fit=crop',
    weekend: false,
    bio: 'Sheikh Yusuf studied in Madinah and teaches the sciences of hadith and the prophetic biography with clarity and depth.',
    approach: ['Authentic chains and methodology', 'Seerah as a living model'],
    credentials: [{ title: 'BA Hadith Sciences', issuer: 'Islamic University of Madinah', year: '2009' }],
    reviewList: [{ name: 'Khalid T.', rating: 5, date: 'April 2023', body: 'Brings the seerah to life.' }],
    availability: ['Tue 6–8 PM', 'Thu 6–8 PM'],
  },
  {
    slug: 'omar', name: 'Ustadh Omar Farooq', ar: 'عمر فاروق',
    title: 'Islamic Finance & Ethics · muamalat, halal investing and business ethics',
    short: 'Islamic Finance & Ethics', country: 'Dubai, UAE', flag: '🇦🇪', rating: 4.6, reviews: 58,
    gender: 'male', track: 'student', languages: ['Arabic', 'English', 'Urdu'], experience: '11 years',
    price: 28, specialties: ['Islamic Finance', 'Muamalat', 'Business Ethics', 'Zakat'], subjects: ['Fiqh'],
    featured: false, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop',
    weekend: true,
    bio: 'Ustadh Omar advises individuals and businesses on Islamic finance and the fiqh of transactions (muamalat).',
    approach: ['Real-world halal investing cases', 'Fiqh of contracts made practical'],
    credentials: [{ title: 'CISI Islamic Finance Qualification', issuer: 'CISI', year: '2015' }],
    reviewList: [{ name: 'Imran S.', rating: 5, date: 'Feb 2023', body: 'Clear, practical, trustworthy.' }],
    availability: ['Mon 8–10 PM', 'Sat 11 AM–1 PM'],
  },
  {
    slug: 'khadija', name: 'Ustadha Khadija Benali', ar: 'خديجة بنعلي',
    title: 'Arabic Calligraphy & Islamic Art · Maghrebi script and the geometry of pattern',
    short: 'Calligraphy & Islamic Art', country: 'Fes, Morocco', flag: '🇲🇦', rating: 4.9, reviews: 64,
    gender: 'female', track: 'seeker', languages: ['Arabic', 'French', 'English'], experience: '8 years',
    price: 21, specialties: ['Arabic Calligraphy', 'Maghrebi Script', 'Islamic Art', 'Geometry'], subjects: ['Calligraphy & Art'],
    featured: true, photo: monogram('KB', '0C4A38'), weekend: true,
    bio: 'Ustadha Khadija is a master of traditional Maghrebi calligraphy and Islamic geometric art, welcoming learners of every background and faith.',
    approach: ['Hands-on practice from session one', 'The meaning behind the geometry'],
    credentials: [{ title: 'Diploma in Maghrebi Calligraphy', issuer: 'Fes Institute of Traditional Arts', year: '2016' }],
    reviewList: [{ name: 'Lucia P.', rating: 5, date: 'May 2023', body: 'A beautiful, calming, enriching class.' }],
    availability: ['Wed 3–5 PM', 'Sun 1–3 PM'],
  },
  {
    slug: 'hamza', name: 'Dr. Hamza Yilmaz', ar: 'حمزة يلماز',
    title: 'Islamic History & Civilization · Andalusia, the Ottomans and the world the Quran shaped',
    short: 'Islamic History & Civilization', country: 'Istanbul, Turkey', flag: '🇹🇷', rating: 4.8, reviews: 89,
    gender: 'male', track: 'seeker', languages: ['Arabic', 'English', 'Turkish'], experience: '13 years',
    price: 23, specialties: ['Islamic History', 'Ottoman Studies', 'Andalusia', 'Civilization'], subjects: ['Islamic History'],
    featured: true, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop',
    weekend: false,
    bio: 'Dr. Hamza brings Islamic history to life — from Cordoba to Istanbul — for curious minds of all backgrounds, with no agenda beyond understanding.',
    approach: ['Story-driven history', 'Primary sources and maps'],
    credentials: [{ title: 'PhD Ottoman History', issuer: 'Istanbul University', year: '2011' }],
    reviewList: [{ name: 'Daniel R.', rating: 5, date: 'March 2023', body: 'Fascinating every single week.' }],
    availability: ['Tue 7–9 PM', 'Fri 6–8 PM'],
  },
];

export const bundles = [
  { slug: 'juzamma', subject: 'Quran', name: 'Juz Amma Memorization', desc: 'Memorize the 30th part of the Quran with proper tajweed and a deep understanding of meanings.', weeks: 12, perWeek: 3, mins: 45, level: 'Beginner', price: 599, teacherSlug: 'ahmad', rating: 4.9, featured: true,
    curriculum: [
      { title: 'Weeks 1–3: Short surahs', detail: 'An-Nas to Al-Fil with tajweed foundations.' },
      { title: 'Weeks 4–8: Building fluency', detail: 'Al-Humazah to Al-Qadr, daily review system.' },
      { title: 'Weeks 9–12: Completion & revision', detail: 'Remaining surahs and full-juz consolidation.' },
    ],
    includes: ['36 live 1-on-1 sessions', 'Colour-coded tajweed PDFs', 'Audio recitation library', 'Progress tracking & certificate'],
    faq: [
      { q: 'Do I need prior memorisation?', a: 'No — this bundle starts from the basics and builds steadily.' },
      { q: 'What if I miss a session?', a: 'Sessions can be rescheduled with 24 hours notice.' },
    ] },
  { slug: 'tajweed', subject: 'Quran', name: 'Tajweed for Beginners', desc: 'Master the essential rules of Quranic recitation with correct pronunciation and application.', weeks: 8, perWeek: 2, mins: 60, level: 'Beginner', price: 399, teacherSlug: 'aisha', rating: 4.7, featured: true,
    curriculum: [
      { title: 'Makharij al-huruf', detail: 'Points of articulation for every letter.' },
      { title: 'Rules of noon & meem', detail: 'Idgham, ikhfa, iqlab and izhar.' },
      { title: 'Madd & application', detail: 'Elongation rules applied to real recitation.' },
    ],
    includes: ['16 live sessions', 'Practice recordings', 'Certificate of completion'],
    faq: [{ q: 'Is this suitable for kids?', a: 'Yes, the pace adapts to the learner.' }] },
  { slug: 'arabicquran', subject: 'Arabic', name: 'Arabic for Quran Understanding', desc: 'Learn Quranic Arabic to build a deeper connection with the Book through its own language.', weeks: 24, perWeek: 2, mins: 60, level: 'Beginner', price: 699, teacherSlug: 'maryam', rating: 4.8, featured: true,
    curriculum: [
      { title: 'Foundations', detail: 'Alphabet, reading and core vocabulary.' },
      { title: 'Grammar essentials', detail: 'Nahw and sarf through Quranic examples.' },
      { title: 'Reading the Quran', detail: 'Translate and parse selected surahs.' },
    ],
    includes: ['48 live sessions', 'Worksheets & vocabulary decks', 'Certificate'],
    faq: [{ q: 'Will I be able to read on my own?', a: 'By the end you will parse short surahs unaided, inshaAllah.' }] },
  { slug: 'nawawi', subject: 'Hadith', name: '40 Nawawi Hadith Explained', desc: "In-depth study of Imam Nawawi's collection of 40 foundational hadith with practical application.", weeks: 10, perWeek: 1, mins: 90, level: 'Intermediate', price: 349, teacherSlug: 'yusuf', rating: 4.8, featured: false,
    curriculum: [
      { title: 'Hadith 1–13', detail: 'Intention, Islam, ihsan and core principles.' },
      { title: 'Hadith 14–27', detail: 'Rights, character and community.' },
      { title: 'Hadith 28–40', detail: 'Taqwa, sincerity and the closing collection.' },
    ],
    includes: ['10 live sessions', 'Hadith notes per session', 'Certificate'],
    faq: [{ q: 'Do I need Arabic?', a: 'No — texts are studied in Arabic with English explanation.' }] },
  { slug: 'fiqhworship', subject: 'Fiqh', name: 'Fiqh of Worship', desc: 'Comprehensive study of Islamic jurisprudence on acts of worship across the major madhabs.', weeks: 16, perWeek: 1, mins: 90, level: 'Intermediate', price: 499, teacherSlug: 'maryam', rating: 4.9, featured: false,
    curriculum: [
      { title: 'Tahara', detail: 'Purification and its rulings.' },
      { title: 'Salah', detail: 'Prayer in depth across madhabs.' },
      { title: 'Zakat, Sawm, Hajj', detail: 'The remaining pillars in practice.' },
    ],
    includes: ['16 live sessions', 'Comparative fiqh notes', 'Certificate'],
    faq: [{ q: 'Which madhab is taught?', a: 'Rulings are compared across the four Sunni madhabs.' }] },
  { slug: 'aqeedah', subject: 'Aqeedah', name: 'Aqeedah Essentials', desc: 'Study the fundamentals of Islamic theology and creed based on authentic classical sources.', weeks: 12, perWeek: 1, mins: 90, level: 'All Levels', price: 449, teacherSlug: 'yusuf', rating: 4.9, featured: false,
    curriculum: [
      { title: 'Tawhid', detail: 'The categories of divine oneness.' },
      { title: 'Iman', detail: 'The six pillars of faith explained.' },
      { title: 'Common misconceptions', detail: 'Clarity grounded in classical texts.' },
    ],
    includes: ['12 live sessions', 'Creed reader', 'Certificate'],
    faq: [{ q: 'Is this beginner friendly?', a: 'Yes — it is suitable for all levels.' }] },
];

export const subjectsData = [
  { name: 'Quran', ar: 'ق', sub: 'Memorization · Tajweed · Tafsir', track: 'student' },
  { name: 'Hadith', ar: 'ح', sub: 'Collections · Methodology', track: 'student' },
  { name: 'Fiqh', ar: 'ف', sub: 'Jurisprudence · Madhabs', track: 'student' },
  { name: 'Aqeedah', ar: 'ع', sub: 'Theology · Creed', track: 'student' },
  { name: 'Arabic', ar: 'ع', sub: 'Grammar · Conversation', track: 'both' },
  { name: 'Calligraphy & Art', ar: 'خ', sub: 'Scripts · Geometry', track: 'seeker' },
  { name: 'Islamic History', ar: 'ت', sub: 'Civilization · Heritage', track: 'seeker' },
  { name: 'Seerah', ar: 'س', sub: 'The Prophetic biography', track: 'student' },
];

export const testimonialsData = [
  { quote: "The structured approach to memorization has transformed my relationship with the Quran. My teacher's patience helped me overcome challenges I faced for years.", name: 'Ahmed S.', role: 'Quran Memorization Student', initials: 'A' },
  { quote: 'Finding a female teacher who specializes in hadith sciences was a blessing. The respectful environment made continuing my studies possible despite a busy schedule.', name: 'Sarah M.', role: 'Hadith Studies Student', initials: 'S' },
  { quote: 'I signed my daughter up for weekend Quran classes. Her teacher is gentle and engaging — she actually looks forward to every session now.', name: 'Yusuf B.', role: 'Parent · London', initials: 'Y' },
];

export const services = [
  { slug: 'halal', icon: '✅', name: 'Halal Certification Advisory', cat: 'Compliance', desc: 'Guidance and audit support for food, cosmetics and pharma companies seeking halal certification.', from: 1200, providers: 24, deliver: '2–4 weeks',
    includes: ['Ingredient & supply-chain audit', 'Gap analysis & remediation plan', 'Certification body liaison', 'Final compliance report'] },
  { slug: 'zakat', icon: '📿', name: 'Zakat Calculation & Advisory', cat: 'Finance', desc: 'Accurate zakat assessment for businesses, trusts and high-net-worth individuals, per madhab.', from: 450, providers: 31, deliver: '3–7 days',
    includes: ['Asset & liability review', 'Madhab-specific calculation', 'Zakat statement & guidance'] },
  { slug: 'faraid', icon: '⚖️', name: 'Islamic Inheritance (Faraid)', cat: 'Legal', desc: 'Sharia-compliant estate distribution calculations and family advisory by qualified scholars.', from: 600, providers: 18, deliver: '1–2 weeks',
    includes: ['Heir identification', 'Share calculation per Quran & Sunnah', 'Written distribution report', 'Family advisory session'] },
  { slug: 'wills', icon: '📜', name: 'Wills & Wasiyyah Drafting', cat: 'Legal', desc: 'Draft and review Islamic wills that are both Sharia-valid and enforceable in your jurisdiction.', from: 350, providers: 22, deliver: '1 week',
    includes: ['Sharia-compliant will draft', 'Jurisdiction enforceability review', 'Executor guidance'] },
  { slug: 'nikah', icon: '💍', name: 'Nikah & Marriage Contracts', cat: 'Officiation', desc: 'Licensed officiants and bespoke, Sharia-compliant marriage contracts and pre-nuptial terms.', from: 300, providers: 40, deliver: 'On schedule',
    includes: ['Licensed officiant', 'Bespoke contract drafting', 'Pre-nuptial terms advisory'] },
  { slug: 'finance', icon: '🏦', name: 'Islamic Finance Compliance', cat: 'Finance', desc: 'Shariah audit and structuring for fintech products, sukuk, and investment funds.', from: 2500, providers: 12, deliver: '4–8 weeks',
    includes: ['Product Shariah review', 'Structuring & documentation', 'Shariah board liaison', 'Ongoing compliance support'] },
];

export const providers = [
  { slug: 'p1', name: 'Mufti Abdur-Rahman', firm: 'Aqsa Shariah Advisory', initials: 'AR', rating: 4.9, jobs: 142, country: '🇬🇧 UK', skills: ['Faraid', 'Wills', 'Zakat'], rate: 90 },
  { slug: 'p2', name: 'Dr. Layla Al-Amin', firm: 'Tayyib Compliance Group', initials: 'LA', rating: 4.8, jobs: 98, country: '🇦🇪 UAE', skills: ['Halal Cert', 'Finance'], rate: 120 },
  { slug: 'p3', name: 'Sheikh Bilal Othman', firm: 'Independent Scholar', initials: 'BO', rating: 5.0, jobs: 67, country: '🇨🇦 Canada', skills: ['Nikah', 'Wills', 'Faraid'], rate: 75 },
];

// Onboarding question configs (student / seeker pathways)
export const onbConfigs = {
  student: [
    { key: 'who', q: 'Who is this journey for?', sub: 'We tailor your matches and tone accordingly.', options: [
      { value: 'self', label: 'Myself', desc: 'I want to study', icon: '🧕' },
      { value: 'child', label: 'My child', desc: 'A teacher for my kid', icon: '🧒' },
      { value: 'family', label: 'Myself & family', desc: 'We learn together', icon: '👨‍👩‍👧' },
    ] },
    { key: 'subject', q: 'What would you like to study?', sub: 'Pick where you want to focus first — you can add more later.', options: [
      { value: 'Quran', label: 'Quran', desc: 'Memorization, tajweed, tafsir', icon: 'ق' },
      { value: 'Hadith', label: 'Hadith', desc: 'Collections & sciences', icon: 'ح' },
      { value: 'Aqeedah', label: 'Aqeedah', desc: 'Theology & creed', icon: 'ع' },
      { value: 'Fiqh', label: 'Fiqh', desc: 'Jurisprudence', icon: 'ف' },
      { value: 'Arabic', label: 'Arabic', desc: 'For understanding the texts', icon: 'ع' },
      { value: 'Seerah', label: 'Seerah', desc: 'The Prophetic biography', icon: 'س' },
    ] },
    { key: 'level', q: 'Where are you in this subject?', sub: 'Be honest — it helps us match the right teacher.', options: [
      { value: 'beginner', label: 'Complete beginner', desc: 'Starting from the basics', icon: '🌱' },
      { value: 'foundation', label: 'Some foundation', desc: 'I know a little already', icon: '📗' },
      { value: 'intermediate', label: 'Intermediate', desc: 'Comfortable, want to go deeper', icon: '📘' },
      { value: 'advanced', label: 'Advanced', desc: 'Refining and specialising', icon: '🎓' },
    ] },
    { key: 'goal', q: "What's your main goal?", sub: 'Your intention shapes the path you take.', options: [
      { value: 'memorize', label: 'Memorise the Quran', desc: 'Hifz — partial or complete', icon: '🕮' },
      { value: 'book', label: 'Study a specific book', desc: 'A classical text with a teacher', icon: '📖' },
      { value: 'curriculum', label: 'A structured curriculum', desc: 'Step by step over time', icon: '🧭' },
      { value: 'ijazah', label: 'Pursue an ijazah', desc: 'A certified chain of transmission', icon: '📜' },
      { value: 'general', label: 'General understanding', desc: 'Learn at my own pace', icon: '✨' },
    ] },
    { key: 'pace', q: 'How often would you like to learn?', sub: 'You can always adjust this later.', options: [
      { value: '1', label: 'Once a week', desc: 'Relaxed and steady', icon: '🌙' },
      { value: '2-3', label: '2–3 times a week', desc: 'Consistent progress', icon: '⭐' },
      { value: 'daily', label: 'Daily', desc: 'Immersive, fast-track', icon: '☀️' },
    ] },
    { key: 'gender', q: 'Any preference for your teacher?', sub: 'Many learners prefer a teacher of the same gender — entirely your choice.', options: [
      { value: 'all', label: 'No preference', desc: 'Match me with the best fit', icon: '🤝' },
      { value: 'male', label: 'A male teacher', desc: '', icon: '🧔' },
      { value: 'female', label: 'A female teacher', desc: '', icon: '🧕' },
    ] },
    { key: 'language', q: 'Which language for your sessions?', sub: 'Your teacher will be fluent in it.', options: [
      { value: 'English', label: 'English', icon: '🇬🇧' },
      { value: 'Arabic', label: 'Arabic', icon: '🇸🇦' },
      { value: 'both', label: 'English & Arabic', icon: '🌍' },
      { value: 'Urdu', label: 'Urdu', icon: '🇵🇰' },
      { value: 'French', label: 'French', icon: '🇫🇷' },
      { value: 'Malay', label: 'Malay', icon: '🇲🇾' },
    ] },
  ],
  seeker: [
    { key: 'interest', q: 'What draws you to explore?', sub: 'No commitment, no pressure — just follow your curiosity.', options: [
      { value: 'Arabic', label: 'Arabic language & dialects', desc: 'Speak, read, connect', icon: '🗣️' },
      { value: 'Calligraphy & Art', label: 'Calligraphy & Islamic art', desc: 'The beauty of the script', icon: '🖌️' },
      { value: 'Islamic History', label: 'Islamic history', desc: 'Andalusia, Ottomans & more', icon: '🏛️' },
      { value: 'culture', label: 'A specific culture', desc: 'Morocco, the Levant, South Asia…', icon: '🌍' },
      { value: 'architecture', label: 'Architecture & design', desc: 'Mosques, geometry, gardens', icon: '🕌' },
      { value: 'curiosity', label: 'General curiosity', desc: 'I just want to understand', icon: '✨' },
    ] },
    { key: 'self', q: 'How would you describe yourself?', sub: 'There are no wrong answers here — be at ease.', options: [
      { value: 'newcomer', label: 'A curious newcomer', desc: 'New to all of this', icon: '🌱' },
      { value: 'academic', label: 'Exploring academically', desc: 'Study, research, interest', icon: '📚' },
      { value: 'personal', label: 'Personally interested', desc: 'On my own quiet journey', icon: '🤍' },
      { value: 'browsing', label: 'Just browsing', desc: 'Show me what is here', icon: '👀' },
    ] },
    { key: 'pace', q: 'What pace feels right?', sub: 'This should feel enjoyable, never like a test.', options: [
      { value: 'relaxed', label: 'Relaxed & exploratory', desc: 'Wander and discover', icon: '🌿' },
      { value: 'light', label: 'Light structure', desc: 'A gentle thread to follow', icon: '🧵' },
      { value: 'deep', label: 'Deep dive', desc: 'I want to really get into it', icon: '🔭' },
    ] },
    { key: 'format', q: 'How do you like to learn?', sub: 'Choose whatever feels comfortable.', options: [
      { value: '1on1', label: 'One-to-one with a guide', desc: 'Personal and unhurried', icon: '👤' },
      { value: 'group', label: 'A small group', desc: 'Learn alongside others', icon: '👥' },
      { value: 'selfpaced', label: 'Self-paced with check-ins', desc: 'On my own time', icon: '🧭' },
    ] },
    { key: 'language', q: 'Which language suits you?', sub: 'Sessions will be held in it.', options: [
      { value: 'English', label: 'English', icon: '🇬🇧' },
      { value: 'French', label: 'French', icon: '🇫🇷' },
      { value: 'both', label: 'English & Arabic', icon: '🌍' },
      { value: 'Turkish', label: 'Turkish', icon: '🇹🇷' },
    ] },
  ],
};

export const scSteps = [
  { n: '١', icon: '📝', title: 'Post your brief', body: 'Describe what your organisation needs — halal certification, a zakat review, an inheritance calculation.' },
  { n: '٢', icon: '🤝', title: 'Get matched', body: 'Verified scholars and specialist firms respond with proposals, timelines and fixed quotes.' },
  { n: '٣', icon: '💼', title: 'Work with confidence', body: 'Collaborate securely with milestones, documents and messaging — Shariah-compliant throughout.' },
  { n: '٤', icon: '✅', title: 'Deliverables & sign-off', body: 'Receive certified deliverables, fatawa or reports, with an auditable record of the work.' },
];

// Dashboard / progress / journal / AI seed content (served to the logged-in demo user)
export const learningContent = {
  duas: [
    { ar: 'رَبِّ زِدْنِي عِلْمًا', tr: 'My Lord, increase me in knowledge', src: 'Surah Ta-Ha 20:114' },
    { ar: 'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي', tr: 'O Allah, benefit me with what You have taught me', src: 'Sunan Ibn Majah' },
    { ar: 'رَبِّ اشْرَحْ لِي صَدْرِي', tr: 'My Lord, expand for me my chest', src: 'Surah Ta-Ha 20:25' },
  ],
  progSubjects: [
    { name: 'Quran Memorization', pct: 68, delta: '+5%', accent: '#0F5C46', metrics: [{ l: 'Memorisation', v: 72 }, { l: 'Tajweed', v: 65 }, { l: 'Understanding', v: 58 }] },
    { name: 'Hadith Studies', pct: 42, delta: '+8%', accent: '#2C6FB8', metrics: [{ l: 'Memorisation', v: 45 }, { l: 'Chain analysis', v: 38 }, { l: 'Application', v: 52 }] },
    { name: 'Islamic Jurisprudence', pct: 25, delta: '+3%', accent: '#B8893B', metrics: [{ l: 'Principles', v: 30 }, { l: 'Rulings', v: 22 }, { l: 'Evidence', v: 18 }] },
  ],
  progActivity: [
    { score: 92, text: 'Completed memorisation of Surah Al-Mulk verses 15–20', date: 'June 12, 2023' },
    { score: 88, text: 'Reviewed Surah Al-Mulk verses 1–14', date: 'June 10, 2023' },
    { score: 85, text: 'Completed study of Hadith #5 from 40 Nawawi', date: 'June 10, 2023' },
    { score: 95, text: 'Completed memorisation of Surah Al-Mulk verses 10–14', date: 'June 8, 2023' },
    { score: 78, text: 'Completed lesson on Tahara (purification)', date: 'June 7, 2023' },
  ],
  progInsights: [
    { icon: 'ℹ️', title: 'Memorisation pattern analysis', body: 'You retain information best in 25-minute sessions with 5-minute breaks. Your retention is 32% higher when you review material within 48 hours.' },
    { icon: '🕐', title: 'Optimal learning times', body: 'Based on your performance, your peak hours are 7:00–9:00 AM and 4:00–6:00 PM. Consider scheduling important sessions then.' },
    { icon: '🛡️', title: 'Tajweed improvement areas', body: 'Your pronunciation of heavy letters (ض، ظ، ط، ق) has improved 18% this month. Focus next on the rules of madd (elongation).' },
  ],
  progCerts: [
    { name: 'Tajweed Foundations', issued: 'May 2023', teacher: 'Ustadha Aisha Zakariya', done: true },
    { name: 'Juz Amma — First Half', issued: 'April 2023', teacher: 'Sheikh Ahmad Al-Nouri', done: true },
    { name: '40 Nawawi Hadith', issued: 'In progress · 30%', teacher: 'Sheikh Yusuf Abdullah', done: false },
  ],
  progRecs: [
    { icon: '📖', title: 'Continue with Surah Al-Mulk', body: "You're 68% through. Two more sessions could complete the surah this week." },
    { icon: '🎯', title: 'Add a Tajweed refresher', body: 'A short bundle on madd rules would complement your current memorisation.' },
    { icon: '🧠', title: 'Try the AI revision cards', body: 'Generate flashcards from Hadith #5 to reinforce what you studied this week.' },
  ],
  enrolled: [
    { id: 'e1', subject: 'Quran', name: 'Quran Memorization Program', teacher: 'Sheikh Ahmad Al-Nouri', progress: 22, next: 'Monday, June 12', done: 8, total: 36 },
    { id: 'e2', subject: 'Hadith', name: '40 Nawawi Hadith Explained', teacher: 'Sheikh Yusuf Abdullah', progress: 30, next: 'Wednesday, June 14', done: 3, total: 10 },
    { id: 'e3', subject: 'Arabic', name: 'Arabic for Quran Understanding', teacher: 'Ustadha Maryam Hassan', progress: 12, next: 'Thursday, June 15', done: 6, total: 48 },
  ],
  upcoming: [
    { title: 'Quran Memorization Program', sub: 'Session 8 of 36 · Sheikh Ahmad Al-Nouri', date: 'Mon, June 12', time: '7:00 – 8:00 PM', live: true },
    { title: '40 Nawawi Hadith Explained', sub: 'Session 4 of 10 · Sheikh Yusuf Abdullah', date: 'Wed, June 14', time: '6:30 – 8:00 PM', live: false },
    { title: 'Arabic for Quran Understanding', sub: 'Session 7 of 48 · Ustadha Maryam Hassan', date: 'Fri, June 16', time: '11:00 AM – 12:00 PM', live: false },
  ],
  notifs: [
    { icon: '⏰', text: 'Your Quran Memorization session starts in 2 hours', time: '5:00 PM Today', unread: true },
    { icon: '📄', text: 'New study materials uploaded for 40 Nawawi Hadith', time: 'Yesterday', unread: true },
    { icon: '📅', text: 'Your Arabic session on Friday has been rescheduled to 11:00 AM', time: '2 days ago', unread: false },
  ],
  materials: [
    { icon: '📕', name: 'Surah Al-Mulk — Tajweed colour-coded PDF', sub: 'Quran Memorization · 2.4 MB', tag: 'PDF' },
    { icon: '🎧', name: 'Audio recitation — Verses 1–20', sub: 'Quran Memorization · 18 min', tag: 'Audio' },
    { icon: '📘', name: '40 Nawawi Hadith — Hadith #5 notes', sub: 'Hadith Studies · 1.1 MB', tag: 'PDF' },
    { icon: '📝', name: 'Arabic grammar worksheet — Lesson 6', sub: 'Arabic for Quran · 0.8 MB', tag: 'Doc' },
  ],
  aiSuggested: ["Explain the concept of bid'ah", 'Help me with tajweed in Surah Al-Mulk', 'Generate practice questions on Hadith #5', "What does khushu' mean?"],
  aiSummaries: [
    { title: 'Quran Memorization · Surah Al-Mulk (Session 8)', date: 'June 12, 2023', points: ['Reviewed verses 1–14 with focus on tajweed of heavy letters', 'Memorised verses 15–20 with their meanings', "Discussed the theme of Allah's dominion and accountability"] },
    { title: 'Hadith Studies · 40 Nawawi (Session 3)', date: 'June 10, 2023', points: ['Studied Hadith #5 on rejecting innovations in religion', 'Distinguished cultural practice from established sunnah', "Action point: research scholarly criteria for bid'ah"] },
  ],
  aiCards: [
    { front: 'What does "Tajweed" linguistically mean?', back: 'To improve or make better — reciting the Quran with correct articulation and rules.' },
    { front: 'Theme of Surah Al-Mulk', back: "Allah's sovereign dominion (mulk) over creation, and human accountability before Him." },
    { front: 'Hadith #5 of 40 Nawawi — core point', back: 'Innovations introduced into worship that are not from the religion are rejected.' },
    { front: 'Letters of tafkheem (heaviness) include…', back: "ض، ظ، ط، ق among the letters of isti'la, pronounced with a full, heavy mouth." },
  ],
};

// Demo learner seeded for instant login (email: amina@example.com / password: password123)
export const demoUser = {
  name: 'Amina Rahman',
  first: 'Amina',
  email: 'amina@example.com',
  password: 'password123',
  onboarding: { pathway: 'student', completed: true, answers: { subject: 'Quran', level: 'foundation', goal: 'memorize', gender: 'all', language: 'English' } },
};

export const demoJournal = [
  { date: 'June 12, 2023', session: 'Quran Memorization · Surah Al-Mulk (Session 8)', teacher: 'Sheikh Ahmad Al-Nouri', private: true, body: "Today's session on Surah Al-Mulk was deeply moving. The verse about Allah's knowledge of what's in our hearts (verse 13) made me reflect on my own intentions and actions.", tags: ['reflection', 'quran', 'intention'] },
  { date: 'June 10, 2023', session: 'Hadith Studies · 40 Nawawi (Session 3)', teacher: 'Ustadha Maryam Hassan', private: false, body: 'The hadith we studied today about innovations in religion has made me think more carefully about distinguishing between cultural practices and authentic Islamic teachings.', tags: ['question', 'hadith', 'fiqh'] },
  { date: 'June 7, 2023', session: 'Quran Memorization · Surah Al-Mulk (Session 7)', teacher: 'Sheikh Ahmad Al-Nouri', private: true, body: 'I struggled with memorization today. The verses seemed more difficult than usual. I need to work on my focus and perhaps memorize at a different time of day.', tags: ['challenge', 'quran', 'focus'] },
];
