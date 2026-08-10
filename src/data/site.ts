export const siteUrl = (import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321').replace(/\/$/, '');

export const site = {
  title: 'Camino Tango Weekend',
  tagline: 'Carlos & Mirella · Santos David',
  date: 'November 20–22, 2026',
  location: 'Barcelona, Spain',
  registerUrl: '#register',
  contactEmail: 'hello@caminotango.com',
  contactPhone: '+34 600 000 000',
  address: 'Carrer de la Dansa 12, Barcelona',
  url: siteUrl,
} as const;

export const seo = {
  description:
    'A weekend of workshops, milongas, and performances with Carlos & Mirella Santos David in Barcelona.',
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
  organizer: {
    name: 'Camino Tango',
    email: 'hello@caminotango.com',
  },
  performers: ['Carlos Santos David', 'Mirella Santos David'],
} as const;

export const navLinks = [
  { label: 'Artists', href: '#artists' },
  { label: 'DJs', href: '#djs' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Venue', href: '#venue' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'Contact', href: '#contact' },
] as const;

export const artists = {
  headline: 'Carlos and Mirella — 7× Mundial Finalists!',
  body: `Join world-renowned tango artists Carlos and Mirella Santos David for an unforgettable weekend of workshops, milongas, and performances. Their elegant style, musicality, and decades on the international stage make this a rare opportunity to learn from true masters of the dance.`,
  gala: 'Artist Show — Gala Milonga · Sunday Nov 22',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
} as const;

export const djs = [
  {
    name: 'DJ Luna',
    role: 'Golden Age & Tango Nuevo',
    image: '/images/dj-1.png',
  },
  {
    name: 'DJ Marco',
    role: 'Traditional Milonga',
    image: '/images/dj-2.png',
  },
  {
    name: 'DJ Sofia',
    role: 'Late Night Cortinas',
    image: '/images/dj-3.png',
  },
] as const;

export const stats = [
  { value: '3', suffix: '', label: 'Days of tango immersion' },
  { value: '12', suffix: '+', label: 'Workshops & practicas' },
  { value: '4', suffix: '', label: 'Milongas including gala night' },
] as const;

export const schedule = [
  {
    day: 'Friday · Nov 20',
    items: [
      { time: '6:00 PM', title: 'Doors Open & Registration', detail: 'Welcome drinks and shoe check at the main hall.' },
      { time: '7:30 PM', title: 'Opening Milonga', detail: 'Warm up the floor with DJs Luna and Marco.' },
      { time: '10:00 PM', title: 'Late Night Tanda', detail: 'Extended dancing until midnight.' },
    ],
  },
  {
    day: 'Saturday · Nov 21',
    items: [
      { time: '10:00 AM', title: 'Workshop I — Connection & Embrace', detail: 'With Carlos & Mirella. All levels welcome.' },
      { time: '2:00 PM', title: 'Workshop II — Musicality', detail: 'Advanced track. Prior workshop experience recommended.' },
      { time: '8:00 PM', title: 'Saturday Milonga', detail: 'Live cortinas and performance slot at 10 PM.' },
    ],
  },
  {
    day: 'Sunday · Nov 22',
    items: [
      { time: '11:00 AM', title: 'Practica & Q&A', detail: 'Open floor with the maestros.' },
      { time: '4:00 PM', title: 'Gala Milonga & Artist Show', detail: 'Featured performance by Carlos & Mirella Santos David.' },
      { time: '9:00 PM', title: 'Closing Tanda', detail: 'Final embrace before farewell.' },
    ],
  },
] as const;

export const venue = {
  headline: 'Venue Location',
  workshops: {
    title: 'Workshops',
    body: 'Spacious hardwood studios with sprung floors, mirrors, and air conditioning — ideal for long sessions of technique and connection.',
  },
  milongas: {
    title: 'Milongas',
    body: 'A grand ballroom with professional lighting, quality sound, and plenty of seating for a true milonga atmosphere every night.',
  },
} as const;

export const pricing = {
  headline: 'Select Your Experience',
  subheadline: "Don't miss the early bird prices!",
  deadline: 'Super Early Bird ends Aug 1 · Early Bird ends Aug 15',
  tiers: [
    {
      name: 'Weekend Pass',
      price: '€150',
      featured: true,
      features: ['All workshops', 'All milongas', 'Gala show entry', 'Practica access'],
    },
    {
      name: 'Milonga Pass',
      price: '€90',
      featured: false,
      features: ['All milongas', 'Gala show entry', 'Welcome drink', 'Shoe check service'],
    },
    {
      name: 'Workshop Day',
      price: '€70',
      featured: false,
      features: ['One full workshop day', 'Practica same day', 'Studio access', 'Water & breaks'],
    },
    {
      name: 'Single Milonga',
      price: '€55',
      featured: true,
      features: ['One milonga evening', 'Cloakroom included', 'DJ set access', 'Bar available'],
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

export const glance = [
  { title: 'Workshops', body: 'Technique, embrace, and musicality with world-class maestros.' },
  { title: 'Milongas', body: 'Four nights of curated tandas from our resident DJs.' },
  { title: 'Gala Show', body: 'Sunday performance and open-floor gala milonga.' },
  { title: 'Community', body: 'Dancers from across Europe in one welcoming space.' },
] as const;
