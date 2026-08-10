export const siteUrl = (import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321').replace(/\/$/, '');

export const site = {
  title: 'Camino Tango Weekend',
  tagline: 'Carlos & Mirella Santos David',
  date: 'November 20–22, 2026',
  dateShort: 'Nov 20–22nd 2026',
  city: 'Novi Sad',
  country: 'Serbia',
  location: 'Novi Sad, Serbia',
  locationShort: 'Novi Sad, RS',
  registerUrl: '#register',
  contactEmail: 'hello@caminotango.com',
  contactPhone: '+381 63 000 0000',
  address: 'Petra Drapšina 35, Novi Sad',
  url: siteUrl,
} as const;

export const seo = {
  description:
    'A weekend of workshops, milongas, and performances with Carlos & Mirella Santos David in Novi Sad, Serbia.',
  ogImage: '/images/hero-dancers.png',
  twitterHandle: '',
  locale: 'en',
  themeColor: '#00acc1',
} as const;

export const event = {
  startDate: '2026-11-20',
  endDate: '2026-11-22',
  eventStatus: 'EventScheduled',
  attendanceMode: 'OfflineEventAttendanceMode',
  venueName: 'Camino Tango School',
  streetAddress: 'Petra Drapšina 35',
  addressLocality: 'Novi Sad',
  addressCountry: 'RS',
  organizer: {
    name: 'Camino Tango',
    email: 'hello@caminotango.com',
  },
  performers: ['Carlos Santos David', 'Mirella Santos David'],
} as const;

export const copy = {
  heroCtaWatchVideo: 'Watch video',
  heroCtaProgram: 'Program',
  heroCtaRegister: 'Register',
  saveTheDate: "Don't miss the early bird prices — secure your pass before they end.",
  scheduleIntroLines: [
    'Whether you want to solidify your basics,',
    'chisel your milonga and vals,',
    'enroll in once-in-a-lifetime Escenario masterclass,',
    'or just enjoy the tandas — we have you covered.',
  ],
  scheduleCta: 'Get a ticket',
  schedulePdfUrl: null as string | null,
  djsSubhead: 'Curated tandas every night — from golden age classics to modern nuevo.',
  registerHeadline: 'Register',
  registerIntro: 'Complete the form below to register for the weekend.',
  contactHeadline: 'Get in touch',
  contactIntro: "We'd love to hear from you!",
  contactCard: 'Ready to join us? Complete the registration form above.',
  contactCardCta: 'Go to registration',
  connectHeadline: 'Powered by Camino Tango',
  connectCta: 'Questions about the weekend, packages, or travel? Get in touch — we are happy to help.',
  connectCtaButton: 'Contact',
  footerCredit: 'Powered by Camino Tango',
} as const;

export const navLinks = [
  { label: 'Event info', href: '#artists' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'DJs', href: '#djs' },
  { label: 'Prices', href: '#tickets' },
  { label: 'Location', href: '#venue' },
  { label: 'Contact', href: '#contact' },
] as const;

export const artists = {
  headline: 'Carlos and Mirella 7 Time Mundial Finalists',
  names: 'Carlos & Mirella,',
  tagline: 'a truly unique tango couple,',
  credentials: 'seven-time finalists at the Mundial de Tango in Buenos Aires,',
  introBeforeEmphasis: 'European Champions ',
  introEmphasis: 'IN BOTH',
  introAfterEmphasis: ' Tango de Pista and Tango Escenario, are coming to Serbia for the very first time!',
  calloutEmphasis: 'THEY WILL',
  calloutRest: ' generously share their extraordinary knowledge and deep experience!',
  paragraphs: [
    'Renowned for their elegance, musicality, and captivating performances, they have shared the stage with Andrea Bocelli, appeared on national television, and served as judges at international tango competitions.',
    'As teachers, they combine technical excellence with a warm, engaging approach, inspiring dancers around the world through performances, workshops, and a deep commitment to the art of Argentine tango.',
  ],
  body: `Carlos & Mirella, a truly unique tango couple, seven-time finalists at the Mundial de Tango in Buenos Aires, European Champions IN BOTH Tango de Pista and Tango Escenario, are coming to Serbia for the very first time! THEY WILL generously share their extraordinary knowledge and deep experience!

Renowned for their elegance, musicality, and captivating performances, they have shared the stage with Andrea Bocelli, appeared on national television, and served as judges at international tango competitions.

As teachers, they combine technical excellence with a warm, engaging approach, inspiring dancers around the world through performances, workshops, and a deep commitment to the art of Argentine tango.`,
  gala: 'Artist Show: Gala Milonga Sunday Nov. 22nd',
  videoUrl: 'https://www.youtube.com/embed/MzWXSPkNs48?start=9',
} as const;

export const djs = [
  {
    name: 'DJ Carlos',
    role: 'The Golden Age',
    image: '/images/dj-1.png',
    bio: 'DJ Carlos reads the energy of the room instantly, using sophisticated orchestration to keep couples deeply connected and inspired.',
  },
  {
    name: 'DJ Marco Kang',
    role: 'Master of pacing',
    image: '/images/dj-2.png',
    bio: 'A master of pacing, he builds a seamless, hypnotic wave across tandas, ensuring dancers never want to leave the floor.',
  },
  {
    name: 'DJ Shone',
    role: 'Pure groove and precision',
    image: '/images/dj-3.png',
    bio: 'Pure groove and precision, he locks into a tight, vibrant pulse that gives dancers total confidence in every step.',
  },
] as const;

export const schedule = [
  {
    title: 'Welcome milonga',
    time: '20:00–00:00',
    day: 'Friday, Nov 20th',
    tag: 'DJ Carlos',
    details: [
      'Immerse yourself in the sounds of The Golden Age!',
      'DJ Carlos reads the energy of the room instantly, using sophisticated orchestration to keep couples deeply connected and inspired.',
    ],
  },
  {
    title: 'Key Knowledge workshop',
    time: '11:00–12:15',
    day: 'Saturday, Nov 21st',
    tag: 'All levels',
    details: [
      'Key Knowledge: A tango must-have!',
      'Tips for a comfortable embrace, stable walk, good connection, and posture (All Levels)',
    ],
  },
  {
    title: 'Tango Vals workshop',
    time: '12:30–13:45',
    day: 'Saturday, Nov 21st',
    tag: 'Level: Int/Adv',
    details: [
      'Get carried away with Cadenas! The chained circular movement that will bring you a beautiful Vals flow.',
    ],
  },
  {
    title: 'Escenario Masterclass 1',
    subtitle: 'Introductory: From Salon to Stage',
    time: '14:00–15:15',
    day: 'Saturday, Nov 21st',
    tag: 'Masterclass',
    details: [
      'First approach, using the elements we already know and adding up intention and attitude. Learn how to translate your salon tango for the stage by shifting your intention. We will explore how to amplify familiar movements and add the clarity, projection, and dynamic range that make stage tango come alive.',
    ],
  },
  {
    title: 'Milonga',
    time: '20:00–00:00',
    day: 'Saturday, Nov 21st',
    tag: 'DJ Marco Kang',
    details: [
      'A master of pacing, he builds a seamless, hypnotic wave across tandas, ensuring dancers never want to leave the floor.',
    ],
  },
  {
    title: 'Complex Salon Sequences workshop',
    time: '11:00–12:15',
    day: 'Sunday, Nov 22nd',
    tag: 'Level: Adv',
    details: [
      'A real treat for seasoned tangueros!',
      'Combining Sacadas, Boleos & Barridas.',
    ],
  },
  {
    title: 'Milonga workshop',
    time: '12:30–13:45',
    day: 'Sunday, Nov 22nd',
    tag: 'Level: Int/Adv',
    details: ['The craft of fun!', 'Fun & Playful Combinations.'],
  },
  {
    title: 'Escenario Masterclass 2',
    subtitle: 'The Stage elements',
    time: '14:00–15:15',
    day: 'Sunday, Nov 22nd',
    tag: 'Masterclass',
    details: [
      'Poses, lines, tricks and music. Build on your foundation with stage-specific vocabulary, such as poses, extended lines, effect steps, and putting those to music.',
      'In this workshop, we will structure movement into dynamic phrases that tell a story, using the music to create moments of power, tension, and visual clarity.',
    ],
  },
  {
    title: 'Gala milonga and show',
    time: '20:00–00:00',
    day: 'Sunday, Nov 22nd',
    tag: 'DJ Shone',
    details: [
      'Pure groove and precision, he locks into a tight, vibrant pulse that gives dancers total confidence in every step.',
    ],
  },
] as const;

export const venue = {
  headline: 'Venue Location',
  workshops: {
    title: 'Workshops',
    body: 'Camino Tango School — Petra Drapšina 35, Novi Sad. Spacious studios with sprung floors, mirrors, and air conditioning.',
  },
  milongas: {
    title: 'Milongas',
    body: 'Camino Tango School — Petra Drapšina 35, Novi Sad. Professional lighting, quality sound, and the Sunday gala show with Carlos & Mirella.',
  },
} as const;

export const pricing = {
  headline: 'Select Your Experience',
  subheadline: "Don't miss the early bird prices!",
  deadline: 'Super Early Bird ends on 01/Aug/26 · Early Bird ends on 16/Aug/26',
  tiers: [
    {
      name: 'Full Pass',
      price: '€90',
      featured: true,
      features: ['All workshops', 'All milongas', 'Gala show entry'],
    },
    {
      name: 'Milonga Pass',
      price: '€70',
      featured: false,
      features: ['All milongas', 'Gala show entry'],
    },
    {
      name: 'Workshop Pass',
      price: '€55',
      featured: false,
      features: ['Saturday or Sunday workshops'],
    },
    {
      name: 'Premium Pass',
      price: '€150',
      featured: true,
      features: ['All-inclusive package', 'All workshops', 'All milongas', 'Gala show entry'],
    },
  ],
} as const;

export const testimonials = [
  {
    quote:
      'An impeccably organized weekend. The workshops were deep, the milongas had incredible energy, and Carlos & Mirella were generous teachers throughout.',
    name: 'Elena R.',
    role: 'Milonga Organiser, Lisbon',
  },
  {
    quote:
      'Best tango event I have attended in years. The venue, the music, and the community made every tanda memorable.',
    name: 'Thomas K.',
    role: 'Dancer, Berlin',
  },
  {
    quote:
      'We came for one night and stayed for the whole weekend. Already counting down to the next Camino Tango.',
    name: 'Maria & Paolo',
    role: 'Couple, Milan',
  },
] as const;

/** @deprecated Not shown on the previous site layout */
export const stats = [
  { value: '3', suffix: '', label: 'Days of tango immersion' },
  { value: '6', suffix: '', label: 'Workshops with the maestros' },
  { value: '3', suffix: '', label: 'Milongas including gala night' },
] as const;

/** @deprecated Not shown on the previous site layout */
export const glance = [
  { title: 'Workshops', body: 'Technique, embrace, and musicality with world-class maestros.' },
  { title: 'Milongas', body: 'Three nights of curated tandas from our resident DJs.' },
  { title: 'Gala Show', body: 'Saturday gala milonga with artist show at midnight.' },
  { title: 'Community', body: 'Dancers from Serbia and across the region in one welcoming space.' },
] as const;
