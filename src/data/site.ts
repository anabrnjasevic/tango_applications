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
  videoUrl: '/videos/carlos-mirella.mp4',
  image: '/images/artist-feature.png',
} as const;

export const djs = [
  {
    name: 'DJ Carlos Santos David',
    role: 'Sound. Emotion. Connection.',
    image: '/images/dj-carlos.png',
    bio: 'I am a DJ for the dancer, by a dancer. My sets are built on the pillars of the greatest orchestras—the sharp cuts of Biagi, the romanticism of Caló, the rhythmic punch of Tanturi, and the majestic, flowing sound of Carlos Di Sarli.',
    highlights: [
      'Traditional Roots: Specializing in the iconic, crowd-favorite sound of the Golden Age.',
      'Dynamic & Eclectic: I skillfully read the room to match the energy, mood, and needs of the dancers.',
      'Signature Tandas: Expect masterful sets featuring the elegance of Instrumental Di Sarli, the swing of Tanturi-Campos, the drama of Caló-Iriarte, and the fire of Biagi-Duval.',
      'The Experience: I don\'t just play music; I create an atmosphere that inspires movement, connection, and that "magic moment" on the floor.',
    ],
  },
  {
    name: 'DJ Marco Kang',
    role: 'Traditional with a modern touch',
    image: '/images/dj-marco-kang.png',
    bio: 'Raised and lived for 30+ years in Buenos Aires, learned about tango straight from its source. My style as a DJ is traditional, sometimes with a little touch of modern, looking for every feeling tango has and can give to you — looking for everyone to have a great time!',
    highlights: [] as string[],
  },
  {
    name: 'DJ Shone',
    role: 'Golden age energy from Niš',
    image: '/images/dj-shone.png',
    bio: 'My strong passion for tango and my interest in its therapeutic power led me to DJ-ing. Tango creates emotions from the first moment you play, listen and dance. That is what I would like to present with my DJ set.',
    highlights: [
      'Coming from Niš, we welcome TDJ Shone — a DJ with decades of experience whose reputation echoes across the Balkans and beyond.',
      'Highly respected from Bulgaria to Bosnia and throughout Europe, Shone is a master at reading the floor\'s energy with precision.',
      'His sets are energetic and well balanced, with a firm base in the golden age of tango — always in a fine compilation of tandas and cortinas.',
      'Get your dancing shoes ready for tandas that simply won\'t let you sit down!',
    ],
  },
] as const;

export const schedule = [
  {
    title: 'Welcome milonga',
    time: '20:00–00:00',
    day: 'Friday, Nov 20th',
    tag: 'DJ Carlos Santos David',
    details: [
      'Immerse yourself in the sounds of The Golden Age!',
      'A DJ for the dancer, by a dancer — built on the pillars of Biagi, Caló, Tanturi, and Di Sarli.',
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
      'Traditional tango straight from Buenos Aires — with a touch of modern when the room calls for it.',
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
      'Energetic, well-balanced golden age tandas — tandas that simply won\'t let you sit down!',
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
  headline: 'Prices & Registration',
  subheadline: "Don't miss the early bird prices!",
  notes: [
    'For super early bird and early bird offers, you can only buy the proposed packages — not individual workshops, masterclasses, or milongas.',
    'During regular registration and on the day of the event, you can buy packages or individual workshops, masterclasses, or milongas.',
    'Masterclasses are not part of the Full Pass. Priority is given to dance instructors, performers, and experienced dancers. Due to limited capacity, the organizers reserve the right to accept or reject masterclass applications. You will be notified via email.',
  ],
  periods: [
    {
      id: 'super-early',
      name: 'Super Early Bird',
      packages: [
        { name: 'Milonga Pass', description: '3 milongas', price: '€50', featured: false },
        { name: 'Workshop Pass', description: '4 workshops', price: '€70', featured: false },
        {
          name: 'Masterclass Pass',
          description: '2 masterclasses (not part of Full Pass)',
          price: '€40',
          featured: false,
        },
        {
          name: 'Full Pass',
          description: '4 workshops & 3 milongas',
          price: '€110',
          featured: true,
        },
      ],
      individuals: [] as { name: string; price: string }[],
    },
    {
      id: 'early',
      name: 'Early Bird',
      packages: [
        { name: 'Milonga Pass', description: '3 milongas', price: '€60', featured: false },
        { name: 'Workshop Pass', description: '4 workshops', price: '€80', featured: false },
        {
          name: 'Masterclass Pass',
          description: '2 masterclasses (not part of Full Pass)',
          price: '€50',
          featured: false,
        },
        {
          name: 'Full Pass',
          description: '4 workshops & 3 milongas',
          price: '€130',
          featured: true,
        },
      ],
      individuals: [] as { name: string; price: string }[],
    },
    {
      id: 'regular',
      name: 'Regular',
      packages: [
        { name: 'Milonga Pass', description: '3 milongas', price: '€70', featured: false },
        { name: 'Workshop Pass', description: '4 workshops', price: '€90', featured: false },
        {
          name: 'Masterclass Pass',
          description: '2 masterclasses (not part of Full Pass)',
          price: '€55',
          featured: false,
        },
        {
          name: 'Full Pass',
          description: '4 workshops & 3 milongas',
          price: '€150',
          featured: true,
        },
      ],
      individuals: [
        { name: 'Individual Milonga', price: '€25' },
        { name: 'Individual Workshop', price: '€25' },
        { name: 'Individual Masterclass', price: '€30' },
      ],
    },
    {
      id: 'day-of',
      name: 'Day of Event',
      packages: [
        { name: 'Milonga Pass', description: '3 milongas', price: '€80', featured: false },
        { name: 'Workshop Pass', description: '4 workshops', price: '€110', featured: false },
        {
          name: 'Masterclass Pass',
          description: '2 masterclasses (not part of Full Pass)',
          price: '€65',
          featured: false,
        },
        {
          name: 'Full Pass',
          description: '4 workshops & 3 milongas',
          price: '€180',
          featured: true,
        },
      ],
      individuals: [
        { name: 'Individual Milonga', price: '€30' },
        { name: 'Individual Workshop', price: '€30' },
        { name: 'Individual Masterclass', price: '€35' },
      ],
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
