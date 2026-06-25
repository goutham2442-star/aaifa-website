// ============================================================
// AAIFA SITE CONSTANTS — Single Source of Truth
// All institute data verified from avighnaabhyasainstitute.in
// ============================================================

export const SITE_CONFIG = {
  name:       'Avighna Abhyasa Institute of Fine Arts',
  shortName:  'Avighna Abhyasa',
  tagline:    'Nurturing Artistic Excellence Through Tradition and Discipline',
  taglineSub: 'Dance with Devotion — Where Every Step Reflects the Soul',
  description:'Premier institute for Bharatanatyam, Carnatic Music, Mridangam and Drawing & Painting in Bengaluru, founded by Guru Smt. Haripriya Pettem.',
  founded:    2021,
  affiliation:'Bir Tikendrajit University, Manipur',
  url:        'https://avighnaabhyasainstitute.in',

  contact: {
    phone:    '+91 9742542993',
    phoneTel: 'tel:+919742542993',
    email:    'avighnaabhyasa@gmail.com',
    whatsapp: 'https://wa.me/919742542993',
  },

  address: {
    line1:   '6th Main Rd, Vinayaka Layout, Green Woods Layout',
    line2:   'Margondanahalli, Bengaluru, Karnataka 560036',
    full:    '6th Main Rd, Vinayaka Layout, Green Woods Layout, Margondanahalli, Bengaluru, Karnataka 560036',
    mapEmbed:'https://maps.google.com/maps?q=Avighna%20Abhyasa%20Institute%20of%20Fine%20Arts&t=m&z=14&output=embed&iwloc=near',
    mapLink: 'https://maps.google.com/maps?q=Avighna+Abhyasa+Institute+of+Fine+Arts',
  },

  social: {
    facebook:  'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp:  'https://wa.me/919742542993',
    youtube:   'https://youtube.com',
  },

  // Real logos from the existing website
  logos: {
    primary:  'https://avighnaabhyasainstitute.in/wp-content/uploads/2021/12/Untitled_design-removebg-preview.png',
    footer:   'https://avighnaabhyasainstitute.in/wp-content/uploads/2021/12/Untitled_design-removebg-preview.png',
    favicon:  'https://avighnaabhyasainstitute.in/wp-content/uploads/2021/12/cropped-Untitled_design-removebg-preview-270x270.png',
  },
} as const

// ─── Founder ───────────────────────────────────────────────
export const FOUNDER = {
  name:         'Guru Smt. Haripriya Pettem',
  shortName:    'Guru Haripriya Pettem',
  title:        'Co-Director, Avighna Abhyasa Institute of Fine Arts',
  qualifications:'M.F.A. (Annamalai University), M.C.A., M.Tech',
  dob:          '2nd August 1984',
  teachingExp:  '9+ years',
  learningExp:  '16+ years',
  priorRole:    'Assistant Professor, J.B. College, Tirupati (6 years)',
  university:   'Masters in Fine Arts from Annamalai University',
  photo:        'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.00.jpeg',
  gurus: [
    { name: 'Shri Suresh',                  art: 'Folk Dance' },
    { name: 'Smt. Dwaram Lakshmi',           art: 'Carnatic Music' },
    { name: 'Smt. Sujatha Ravi Subramanyam', art: 'Bharatanatyam' },
  ],
  quote: 'What I learnt from my gurus was a style, but as I internalized it, it became a language — a way to express my soul.',
  bio: `Born on 2nd August 1984, Guru Haripriya Pettem discovered her love for fine arts early in life. She trained under distinguished mentors — Shri Suresh (Folk Dance), Smt. Dwaram Lakshmi (Carnatic Music), and Smt. Sujatha Ravi Subramanyam (Bharatanatyam). Her journey began in Padmavati University, Tirupati, where she performed at Nadaneerajanam 2009 at Tirumala and the National Cultural Competition. She pursued her Masters in Fine Arts from Annamalai University. Having served as an Assistant Professor at J.B. College, Tirupati for six years, she established Avighna Abhyasa Institute of Fine Arts in 2021 with over 16 years of experience in Bharatanatyam and Carnatic Music.`,
} as const

// ─── Stats ─────────────────────────────────────────────────
export const STATS = [
  { value: 5,    suffix: '+', label: 'Years of Experience', sublabel: 'Est. 2021' },
  { value: 150,  suffix: '+', label: 'Active Students',     sublabel: 'India & abroad' },
  { value: 5,    suffix: '+', label: 'Programs Offered',    sublabel: 'Classical disciplines' },
  { value: 5000, suffix: '+', label: 'Classes Conducted',   sublabel: 'And counting' },
] as const

// ─── Navigation ────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'Contact',  href: '/contact' },
] as const

// ─── Programs ──────────────────────────────────────────────
export const PROGRAMS = [
  {
    slug:        'bharatanatyam',
    title:       'Bharatanatyam',
    subtitle:    'Classical Dance of South India',
    icon:        'Drama',
    minAge:      '6+',
    mode:        'hybrid' as const,
    description: 'A deeply expressive and disciplined art form rooted in tradition. Students receive structured training in adavus, mudras, abhinaya, margam, and advanced choreography. Suitable for beginners as well as advanced learners.',
    highlights:  ['Adavus & Footwork', 'Mudras & Expressions', 'Margam Choreography', 'Abhinaya Training', 'Arangetram Support'],
    featured:    true,
    color:       '#B91C1C',
  },
  {
    slug:        'carnatic-music',
    title:       'Carnatic Music',
    subtitle:    'South Indian Classical Vocal',
    icon:        'Music',
    minAge:      'All ages',
    mode:        'hybrid' as const,
    description: 'Vocal training rooted in South Indian tradition. Students are nurtured in ragas, talas, varnams and kritis, helping them develop voice control, rhythm, and emotional depth.',
    highlights:  ['Swara Foundation', 'Raga Training', 'Tala & Rhythm', 'Varnams & Kritis', 'Concert Readiness'],
    featured:    true,
    color:       '#D97706',
  },
  {
    slug:        'mridangam',
    title:       'Mridangam',
    subtitle:    'Classical Percussion',
    icon:        'Drum',
    minAge:      '8+',
    mode:        'offline' as const,
    description: 'Students are trained in the ancient percussion art under systematic guidance, focusing on korvais, eduppu, rhythm patterns, tempo control, and stage accompaniment.',
    highlights:  ['Basic Strokes', 'Korvais & Patterns', 'Eduppu Techniques', 'Rhythm Theory', 'Performance Accompaniment'],
    featured:    true,
    color:       '#92400E',
  },
  {
    slug:        'drawing-painting',
    title:       'Drawing & Painting',
    subtitle:    'Visual Arts',
    icon:        'Palette',
    minAge:      'All ages',
    mode:        'offline' as const,
    description: 'Explore creativity through colors, form, and texture. Covers sketching, color theory, mixed media, still life, portrait, and creative composition for all skill levels.',
    highlights:  ['Pencil Sketching', 'Color Theory', 'Mixed Media', 'Portrait Study', 'Creative Composition'],
    featured:    true,
    color:       '#7C3AED',
  },
  {
    slug:        'workshops',
    title:       'Workshops & Art Camps',
    subtitle:    'Short-Term Intensive Programs',
    icon:        'CalendarDays',
    minAge:      'All ages',
    mode:        'offline' as const,
    description: 'Special sessions during holidays and festivals offering intensive rhythm, abhinaya, and stagecraft modules with guest artists.',
    highlights:  ['Intensive Modules', 'Guest Artists', 'Thematic Choreography', 'Holiday Camps', 'Festival Programs'],
    featured:    false,
    color:       '#059669',
  },
  {
    slug:        'certification',
    title:       'Examinations & Certifications',
    subtitle:    'University-Affiliated',
    icon:        'GraduationCap',
    minAge:      'All ages',
    mode:        'hybrid' as const,
    description: 'Affiliated with Bir Tikendrajit University, our certification programs follow a structured syllabus for professional recognition and skill validation.',
    highlights:  ['University Affiliation', 'Structured Syllabus', 'Practical Exams', 'Theory Components', 'Official Certificate'],
    featured:    false,
    color:       '#0369A1',
  },
] as const

// ─── Program Levels ────────────────────────────────────────
export const PROGRAM_LEVELS = [
  {
    name:     'Beginner',
    duration: '6–12 months',
    focus:    'Foundation & Discipline',
    points:   ['Basics of posture, footwork and rhythm', 'Introductory repertoire and simple pieces', 'Regular practice routines and assessments'],
  },
  {
    name:     'Intermediate',
    duration: '12–24 months',
    focus:    'Technique & Expression',
    points:   ['Advanced adavus and medium-length margams', 'Introduction to abhinaya and interpretation', 'Performance workshops and small recitals'],
  },
  {
    name:     'Advanced',
    duration: 'Variable',
    focus:    'Mastery & Stagecraft',
    points:   ['Full margam preparation and solo repertoire', 'Individual coaching and choreography refinement', 'Arangetram and major stage production support'],
  },
  {
    name:     'Workshops',
    duration: '3–14 days',
    focus:    'Focused Learning',
    points:   ['Intensive rhythm and abhinaya modules', 'Guest sessions with senior artists', 'Thematic choreography and stagecraft workshops'],
  },
] as const

// ─── Timeline / Milestones ─────────────────────────────────
export const TIMELINE = [
  {
    year:        '2009',
    title:       'The Early Journey',
    description: 'Guru Haripriya presented her first major performance at Nadaneerajanam, Tirumala, marking the beginning of her artistic journey.',
    type:        'performance' as const,
  },
  {
    year:        '2010–2016',
    title:       'Academic Excellence',
    description: 'Served as Assistant Professor at J.B. College, Tirupati, while continuing training and performances in Bharatanatyam and Carnatic Music.',
    type:        'career' as const,
  },
  {
    year:        '2021',
    title:       'Foundation of Avighna Abhyasa',
    description: 'Established the Avighna Abhyasa Institute of Fine Arts in Bengaluru to provide structured, authentic classical arts education to students of all ages.',
    type:        'founding' as const,
  },
  {
    year:        '2022',
    title:       'Nationwide Expansion',
    description: 'Students from across India joined both online and offline programs, marking the start of global outreach.',
    type:        'growth' as const,
  },
  {
    year:        '2023–2025',
    title:       'Global Recognition',
    description: 'The institute reached over 150 students, with active participation in national festivals and temple performances across Tirumala, Kanchi, Kolhapur, Shiridi, and Kashi.',
    type:        'recognition' as const,
  },
] as const

// ─── Awards ────────────────────────────────────────────────
export const AWARDS = [
  { title: 'Natya Mayuri Award',                 year: 2022 },
  { title: 'IWM Art and Culture Award',          year: 2022, subtitle: 'Mompreneur' },
  { title: 'Natya Keerthi Award',                year: 2023 },
  { title: 'Guru Ratna Award',                   year: 2023 },
  { title: 'Sathir Narthaki Award',              year: 2023 },
  { title: 'Laasya Sangama Award',               year: 2024 },
  { title: 'Guru Vriksha Award',                 year: 2024 },
  { title: 'Kala Shree Award',                   year: 2025 },
] as const

// ─── Testimonials ──────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id:       '1',
    author:   'Priya Sharma',
    role:     'Parent of Student',
    program:  'Bharatanatyam',
    rating:   5,
    content:  'My daughter has been learning dance here since 1 year and I am so happy with the Haripriya madam passion and dedication towards dance. The classes helped my daughter gain confidence and improve her dance skills. I also want to thank the teacher for giving wonderful opportunities and programs for my daughter to perform and showcase her talent. We truly feel blessed to have such a caring and inspiring mentor. Highly recommended.',
    initials: 'PS',
  },
  {
    id:       '2',
    author:   'Sunitha Rao',
    role:     'Parent of Students',
    program:  'Bharatanatyam',
    rating:   5,
    content:  'My kids are learning Bharatanatyam from Haripriya mam from couple of years. We are very happy with the way she teaches and cares my kids. Very patient, also she encourages us to give stage performances. My kids have given multiple performances in local and outstation. We are super happy with the overall teaching/guidance. Would highly recommend incase if you are looking for bharatanatyam courses around TC palya, kr puram. Also I believe she is flexible for online teaching as well.',
    initials: 'SR',
  },
  {
    id:       '3',
    author:   'Meera Krishnan',
    role:     'Parent of Student',
    program:  'Bharatanatyam',
    rating:   5,
    content:  'My daughter has been learning dance here and I\'m truly impressed with the Guru Haripriya madam dedication, patience, and passion for dance. We feel very lucky to have found such a wonderful mentor! Highly recommended for anyone looking for quality dance training.',
    initials: 'MK',
  },
  {
    id:       '4',
    author:   'Anand Kumar',
    role:     'Student / Parent',
    program:  'Bharatanatyam',
    rating:   5,
    content:  'School of dance for all age groups. Especially HariPriya mam has lot of patience and so responsible. She connects with each and every student such that the student feels as if she is the only good guide for them. Once again congratulations for the new branch mam.',
    initials: 'AK',
  },
] as const

// ─── Gallery Images (real institute photos) ────────────────
export const GALLERY_IMAGES = [
  {
    id:       'g1',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.41.30.jpeg',
    alt:      'Bharatanatyam performance at Avighna Abhyasa Institute',
    category: 'performances' as const,
  },
  {
    id:       'g2',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.41.30-1.jpeg',
    alt:      'Classical dance event at Avighna Abhyasa',
    category: 'performances' as const,
  },
  {
    id:       'g3',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.42.jpeg',
    alt:      'Students performing Bharatanatyam',
    category: 'performances' as const,
  },
  {
    id:       'g4',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.42-1.jpeg',
    alt:      'Dance recital at Avighna Abhyasa',
    category: 'events' as const,
  },
  {
    id:       'g5',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.41.jpeg',
    alt:      'Avighna Abhyasa cultural event',
    category: 'events' as const,
  },
  {
    id:       'g6',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.00.jpeg',
    alt:      'Guru Smt. Haripriya Pettem — Founder',
    category: 'classes' as const,
  },
  {
    id:       'g7',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.01-1.jpeg',
    alt:      'Classical arts training at Avighna Abhyasa',
    category: 'classes' as const,
  },
  {
    id:       'g8',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.01-2.jpeg',
    alt:      'Bharatanatyam class at Avighna Abhyasa',
    category: 'classes' as const,
  },
  {
    id:       'g9',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.01.jpeg',
    alt:      'Dance training session',
    category: 'classes' as const,
  },
  {
    id:       'g10',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.27.jpeg',
    alt:      'Avighna Abhyasa performance event',
    category: 'performances' as const,
  },
  {
    id:       'g11',
    url:      'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.40.jpeg',
    alt:      'Institute program showcase',
    category: 'events' as const,
  },
] as const

// ─── Tala Patterns (for RhythmLab) ────────────────────────
export const TALA_PATTERNS = {
  adi:    { name: 'Adi',    beats: 8, description: '8-beat cycle — most common tala' },
  rupaka: { name: 'Rupaka', beats: 3, description: '3-beat cycle — elegant and compact' },
  misra:  { name: 'Misra',  beats: 7, description: '7-beat cycle — complex and rhythmic' },
  kanda:  { name: 'Kanda',  beats: 5, description: '5-beat cycle — intermediate challenge' },
} as const

export type TalaKey = keyof typeof TALA_PATTERNS
