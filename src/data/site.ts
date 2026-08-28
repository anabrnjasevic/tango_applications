import { resolveSiteUrl } from '../lib/site-url';

export const siteUrl = resolveSiteUrl();

export const site = {
  title: 'Camino Tango Weekend',
  tagline: 'Carlos & Mirella',
  date: 'November 20–22, 2026',
  dateShort: 'Nov 20–22nd 2026',
  city: 'Novi Sad',
  country: 'Serbia',
  location: 'Novi Sad, Serbia',
  locationShort: 'Novi Sad, Serbia',
  registerUrl: '#register',
  contactEmail: 'camino.serbia@gmail.com',
  contactPhone: '+381691372707',
  address: 'Petra Drapšina 35, Novi Sad',
  url: siteUrl,
} as const;

export const seo = {
  description:
    'Camino Tango Weekend with Carlos & Mirella Santos David — November 20–22, 2026 in Novi Sad, Serbia. Workshops, milongas, and a Sunday gala show.',
  ogImage: '/images/hero-dancers.png',
  ogImageAlt: 'Carlos and Mirella dancing tango at Camino Tango Weekend in Novi Sad',
  ogImageWidth: 1024,
  ogImageHeight: 844,
  twitterHandle: '',
  locale: 'en_US',
  themeColor: '#00acc1',
  googleSiteVerification: (import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '').trim(),
} as const;

export const event = {
  startDate: '2026-11-20T20:00:00+01:00',
  endDate: '2026-11-23T00:00:00+01:00',
  eventStatus: 'EventScheduled',
  attendanceMode: 'OfflineEventAttendanceMode',
  venueName: 'Camino Tango School',
  streetAddress: 'Petra Drapšina 35',
  addressLocality: 'Novi Sad',
  addressCountry: 'RS',
  organizer: {
    name: 'Camino Tango',
    email: 'camino.serbia@gmail.com',
  },
  performers: ['Carlos Santos David', 'Mirella Santos David'],
} as const;

export const copy = {
  heroCtaWatchVideo: 'Maestros',
  heroCtaProgram: 'Program',
  heroCtaRegister: 'Register',
  comparePricesBelow: 'Compare prices below',
  saveTheDate: "Don't miss the early bird prices — secure your pass before they end.",
  scheduleIntroLines: [
    'Whether you want to solidify your basics,',
    'chisel your milonga and vals,',
    'enroll in once-in-a-lifetime Escenario masterclass,',
    'or just enjoy the tandas — we have you covered.',
  ],
  scheduleCta: 'Register',
  schedulePdfUrl: null as string | null,
  milongaVenuesNote:
    'Friday and Saturday milongas are at SPENS (Sutjeska 2, Novi Sad). The Sunday Gala Milonga and artist show is at RTV in Petrovaradin — limited to 100 people; sales close once capacity is reached.',
  galaMilongaCapacityNote:
    'Limited to 100 people at RTV — registration for this milonga closes once capacity is reached.',
  djsSubhead: 'Curated tandas every night — from golden age classics to modern sound.',
  registerHeadline: 'Register',
  registerIntro: 'Complete the form below to register for the weekend.',
  registerSuccessHeadline: 'Your registration was successful!',
  registerSuccessBody: "We've received your application.",
  registerSuccessDoNotResubmit: 'Please do not submit the form again.',
  registerErrorHeadline: 'Registration could not be sent',
  registerContactHelp: 'If you are having trouble, contact us at',
  registrationNotOpenYet: 'Registration opens {date}. Compare prices above.',
  registrationClosedOnline:
    'Online registration has closed. Door registration is available at the event.',
  periodClosed: 'Closed',
  periodNotYetOpen: 'Not yet open',
  periodAtDoor: 'At the door',
  viewPrices: 'View prices',
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
  { label: 'Maestros', href: '#artists' },
  { label: 'DJs', href: '#djs' },
  { label: 'Venues', href: '#venue' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Prices', href: '#tickets' },
  { label: 'Registration', href: '#register' },
  { label: 'Novi Sad', href: '#novi-sad' },
  { label: 'Contact', href: '#contact' },
] as const;

export const artists = {
  headline: 'Carlos and Mirella 7 Time Mundial Finalists',
  fullNames: 'Carlos & Mirella Santos David',
  names: 'Carlos & Mirella,',
  tagline: 'a truly unique tango couple,',
  credentials: 'seven-time finalists at the Mundial de Tango in Buenos Aires',
  introBeforeEmphasis: 'European Champions ',
  introEmphasis: 'IN BOTH',
  introTangoDePista: 'Tango de Pista',
  introTangoEscenario: 'Tango Escenario',
  introAfterEmphasis: ', are coming to Serbia for the very first time!',
  callout: 'They will generously share their extraordinary knowledge and deep experience!',
  paragraphs: [
    'Renowned for their elegance, musicality, and captivating performances, they have shared the stage with Andrea Bocelli, appeared on national television, and served as judges at international tango competitions.',
    'As teachers, they combine technical excellence with a warm, engaging approach, inspiring dancers around the world through performances, workshops, and a deep commitment to the art of Argentine tango.',
  ],
  body: `Carlos & Mirella, a truly unique tango couple, seven-time finalists at the Mundial de Tango in Buenos Aires, European Champions IN BOTH Tango de Pista and Tango Escenario, are coming to Serbia for the very first time! THEY WILL generously share their extraordinary knowledge and deep experience!

Renowned for their elegance, musicality, and captivating performances, they have shared the stage with Andrea Bocelli, appeared on national television, and served as judges at international tango competitions.

As teachers, they combine technical excellence with a warm, engaging approach, inspiring dancers around the world through performances, workshops, and a deep commitment to the art of Argentine tango.`,
  gala: 'Artist Show: Sunday Gala Milonga at RTV · Nov. 22nd · limited to 100 people',
  websiteUrl: 'https://carlosymirella.com/en/',
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
    venue: 'SPENS — Stonoteniska dvorana, Sutjeska 2, Novi Sad',
    details: [
      'Reads the energy of the room instantly, using sophisticated orchestration to keep couples deeply connected and inspired.',
    ],
  },
  {
    title: 'Key Knowledge workshop',
    time: '11:00–12:15',
    day: 'Saturday, Nov 21st',
    tag: 'All levels',
    details: [
      'A tango must-have!',
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
    venue: 'SPENS — Stonoteniska dvorana, Sutjeska 2, Novi Sad',
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
    venue: 'RTV — Kamenički put 45, Petrovaradin',
    venueNote:
      'Limited to 100 people at RTV — registration for this milonga closes once capacity is reached.',
    details: [
      'Energetic, well-balanced tandas that simply won\'t let you sit down!',
      'Artist show with Carlos & Mirella — a historic evening recorded by RTV.',
    ],
  },
] as const;

export const venue = {
  headline: 'Venues',
  walkingNote:
    'Workshops are at Camino Tango in Novi Sad. Friday and Saturday milongas are at SPENS; the Sunday Gala Milonga is at RTV in Petrovaradin.',
  locations: [
    {
      title: 'Workshops',
      name: 'Camino Tango',
      address: ['Petra Drapšina 35', 'Novi Sad'],
      description:
        'Spacious studios with sprung floors and mirrors — home base for all workshops during the weekend.',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Petra+Drap%C5%A1ina+35,+Novi+Sad,+Serbia',
      image: '/images/petra-drapsina.png',
      imageAlt: 'Camino Tango studio interior at Petra Drapšina 35 in Novi Sad',
    },
    {
      title: 'Friday & Saturday Milongas',
      name: 'SPENS — Stonoteniska dvorana',
      address: ['Sutjeska 2', 'Novi Sad'],
      description:
        'The SPENS complex in Novi Sad is a legendary temple of sport and culture — spanning over 85,000 m² and hosting world championships, major concerts, and prestigious competitions. At its heart is the Table Tennis Hall: SPENS stands for Stonotenisko Prvenstvo Novi Sad, built for the historic 1981 World Table Tennis Championship. Spanning 900 m² of wooden floor, this vast hall is the perfect canvas for world-class dancing — and on this very floor, European Tango Champions Carlos & Mirella continue the venue\'s tradition of hosting the highest level of international mastery.',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=SPENS+Sutjeska+2+Novi+Sad+Serbia',
      image: '/images/spens.png',
      imageAlt: 'SPENS sports and business centre building in Novi Sad',
    },
    {
      title: 'Sunday Gala Milonga',
      name: 'RTV — Radio Televizija Vojvodine',
      address: ['Kamenički put 45', 'Petrovaradin'],
      description:
        'Radio Televizija Vojvodine (RTV) is the premier public broadcaster and cultural institution of the region. From its hillside vantage point in Petrovaradin, RTV hosts high-profile international events and preserves artistic heritage. The Sunday Gala Milonga with Carlos & Mirella\'s artist show takes place in this iconic space — and the evening will be recorded by RTV to preserve this historic moment.',
      capacityNote:
        'Limited to 100 people — sales for the Sunday Gala Milonga close once capacity is reached.',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=RTV+Kamenicki+put+45+Petrovaradin+Serbia',
      image: '/images/rtv.png',
      imageAlt: 'RTV Radio Televizija Vojvodine building in Petrovaradin',
    },
  ],
} as const;

/**
 * When true, individual tickets show as disabled before Regular registration starts.
 * When false, they are hidden until the date.
 */
export const showDisabledIndividualTickets = true;

export type IndividualTicketGroup = {
  category: string;
  price: string;
  items: string[];
};

export const pricing = {
  headline: 'Prices & Registration',
  subheadline: "Don't miss the early bird prices!",
  notes: [
    {
      text: 'For super early bird and early bird offers, you can only buy the proposed packages — not individual workshops, masterclasses, or milongas.',
    },
    {
      text: 'During regular registration and on the day of the event, you can buy packages or individual workshops, masterclasses, or milongas.',
    },
    {
      text: 'Escenario Masterclasses are not part of the Full Pass. Priority is given to dance instructors, performers, and experienced dancers. Due to limited capacity, the organizers reserve the right to accept or reject masterclass applications. You will be notified via email.',
    },
    {
      id: 'pricing-note-door',
      text: 'After November 15th, the registration will only be possible at the door of the event.',
    },
    {
      text: 'Sunday Gala Milonga at RTV (Petrovaradin) is limited to 100 people. Once capacity is reached, sales for that milonga close — including within packages that include it.',
    },
  ],
  periods: [
    {
      id: 'super-early',
      name: 'Super Early Bird',
      dates: '28/08 - 31/08',
      startDate: '2026-08-28',
      endDate: '2026-08-31',
      packages: [
        { name: 'Milonga Pass', description: '3 milongas', price: '€50', featured: false },
        { name: 'Workshop Pass', description: '4 workshops', price: '€70', featured: false },
        {
          name: 'Escenario Pass',
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
      individuals: [] as IndividualTicketGroup[],
    },
    {
      id: 'early',
      name: 'Early Bird',
      dates: '01/09 - 07/09',
      startDate: '2026-09-01',
      endDate: '2026-09-07',
      packages: [
        { name: 'Milonga Pass', description: '3 milongas', price: '€60', featured: false },
        { name: 'Workshop Pass', description: '4 workshops', price: '€80', featured: false },
        {
          name: 'Escenario Pass',
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
      individuals: [] as IndividualTicketGroup[],
    },
    {
      id: 'regular',
      name: 'Regular',
      dates: '08/09 - 15/11',
      startDate: '2026-09-08',
      endDate: '2026-11-15',
      packages: [
        { name: 'Milonga Pass', description: '3 milongas', price: '€70', featured: false },
        { name: 'Workshop Pass', description: '4 workshops', price: '€90', featured: false },
        {
          name: 'Escenario Pass',
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
        {
          category: 'Individual Milonga',
          price: '€25',
          items: [
            'Friday Welcome Milonga — SPENS',
            'Saturday Milonga — SPENS',
            'Sunday Gala Milonga and Show — RTV (max. 100)',
          ],
        },
        {
          category: 'Individual Workshops',
          price: '€25',
          items: ['Key Knowledge', 'Tango Vals', 'Complex Salon Sequences', 'Milonga'],
        },
        {
          category: 'Individual Masterclasses',
          price: '€30',
          items: ['Escenario 1: Introductory', 'Escenario 2: Stage elements'],
        },
      ],
    },
    {
      id: 'day-of',
      name: 'Day of Event',
      dates: '20/11-22/11',
      startDate: '2026-11-20',
      endDate: '2026-11-22',
      footnoteNoteId: 'pricing-note-door',
      packages: [
        { name: 'Milonga Pass', description: '3 milongas', price: '€80', featured: false },
        { name: 'Workshop Pass', description: '4 workshops', price: '€110', featured: false },
        {
          name: 'Escenario Pass',
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
        {
          category: 'Individual Milonga',
          price: '€30',
          items: [
            'Friday Welcome Milonga — SPENS',
            'Saturday Milonga — SPENS',
            'Sunday Gala Milonga and Show — RTV (max. 100)',
          ],
        },
        {
          category: 'Individual Workshops',
          price: '€30',
          items: ['Key Knowledge', 'Tango Vals', 'Complex Salon Sequences', 'Milonga'],
        },
        {
          category: 'Individual Masterclasses',
          price: '€35',
          items: ['Escenario 1: Introductory', 'Escenario 2: Stage elements'],
        },
      ],
    },
  ],
} as const;

export const noviSad = {
  headline: 'Novi Sad in November',
  subheadline: 'An Autumn Cultural Invitation',
  intro:
    'Step into Novi Sad this November, where Europe\'s former City of Culture wears the poetic colors of late autumn. Revered for centuries as the "Serbian Athens" due to its exceptionally vibrant intellectual and cultural life, the city invites you to explore its elegant pedestrian heart. You can easily plan a rich blend of art, historic architecture, and culinary traditions during your tango weekend visit.',
  image: '/images/novi-sad-petrovaradin.jpg',
  imageAlt:
    'Nighttime view of Petrovaradin Fortress in Novi Sad illuminated with golden lights reflecting on the Danube River.',
  highlights: [
    {
      title: 'Art in the Afternoon Chill',
      body: 'Seek warmth inside the grand Gallery of Matica Srpska to admire centuries of masterpieces, dive into regional history at the Museum of Vojvodina to discover its priceless golden Roman helmets, or cross the river to the City Museum of Novi Sad on the fortress to explore its brilliant, immersive "Mileva" multimedia exhibition.',
    },
    {
      title: "Vauban's Fortress Whispers",
      body: 'Walk the misty ramparts of the massive Petrovaradin Fortress — constructed using the highly advanced military bastion system of Sébastien de Vauban — where you can book a guided tour into its mysterious underground military galleries overlooking the beautiful river.',
    },
    {
      title: 'A Symphony of Cultures',
      body: "Discover the city's rich multicultural heritage and historic landmarks. Visit the grand Saint George's Orthodox Cathedral with its magnificent gilded iconostasis, the Neo-Gothic Catholic Name of Mary Church, and the architectural marvel of the Novi Sad Synagogue, which today serves as a premier venue for prestigious classical concerts and city cultural programs.",
    },
    {
      title: 'Danube Culinary Retreats',
      body: 'Watch the water slowly flow by from a cozy riverside čarda. Savor rich local wines and hot, traditional fish soup beside the fireplace at iconic spots like Čarda Aqua Doria or Piknik on Ribarsko Ostrvo.',
    },
  ],
  closing:
    'Let the poetic autumn beauty and famous hospitality of Novi Sad frame your November tango weekend memories!',
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
