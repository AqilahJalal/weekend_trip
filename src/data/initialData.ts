import { TripDetails, TripStop, TripExpense, RouteLeg, UserProfile } from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Afiq',
    role: 'Trip Lead & Driver',
    color: 'emerald',
    avatarBg: 'bg-emerald-600',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  {
    id: 'user-2',
    name: 'Sarah',
    role: 'Foodie & Researcher',
    color: 'amber',
    avatarBg: 'bg-amber-600',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  {
    id: 'user-3',
    name: 'Wei Jian',
    role: 'Navigator & Photos',
    color: 'indigo',
    avatarBg: 'bg-indigo-600',
    textColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  },
];

export const COLOR_PALETTES = [
  {
    color: 'emerald',
    avatarBg: 'bg-emerald-600',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  {
    color: 'amber',
    avatarBg: 'bg-amber-600',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  {
    color: 'indigo',
    avatarBg: 'bg-indigo-600',
    textColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  },
  {
    color: 'rose',
    avatarBg: 'bg-rose-600',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
  },
  {
    color: 'sky',
    avatarBg: 'bg-sky-600',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
  },
  {
    color: 'violet',
    avatarBg: 'bg-violet-600',
    textColor: 'text-violet-700',
    badgeBg: 'bg-violet-50 border-violet-200 text-violet-800',
  },
];

export const INITIAL_TRIP_DETAILS: TripDetails = {
  title: 'Ipoh Heritage & Old Town Food Escape',
  destination: 'Ipoh, Perak, Malaysia',
  startDate: 'Saturday, 11 Oct 2026',
  endDate: 'Sunday, 12 Oct 2026',
  travelersCount: 3,
};

export const INITIAL_STOPS: TripStop[] = [
  {
    id: 'stop-1',
    name: 'Concubine Lane & Restoran Thean Chun',
    location: 'Ipoh Old Town, Perak',
    timing: 'Day 1 · 10:00 AM',
    category: 'Food',
    notes: 'Sip authentic white coffee, taste Kai See Hor Fun and traditional caramel custard.',
  },
  {
    id: 'stop-2',
    name: 'Perak Cave Temple (Gua Perak)',
    location: 'Jalan Kuala Kangsar, Ipoh',
    timing: 'Day 1 · 2:30 PM',
    category: 'Culture & Heritage',
    notes: 'Walk through historic limestone caverns with colourful Buddhist frescoes and cliff viewpoints.',
  },
  {
    id: 'stop-3',
    name: "Kellie's Castle & Estate Grounds",
    location: 'Batu Gajah, Perak',
    timing: 'Day 2 · 10:30 AM',
    category: 'Nature & Sight',
    notes: 'Photograph the unfinished colonial Scottish castle, hidden tunnels, and rooftop garden.',
  },
];

export const INITIAL_EXPENSES: TripExpense[] = [
  {
    id: 'exp-1',
    title: 'ETS Gold Train Return Tickets (KL Sentral ↔ Ipoh)',
    category: 'Transport',
    amountMYR: 140,
    paidById: 'user-1', // Afiq paid
    splitWithIds: ['user-1', 'user-2', 'user-3'],
    notes: 'Afiq pre-booked return train tickets for all 3',
  },
  {
    id: 'exp-2',
    title: 'Old Town Dim Sum, White Coffee & Pasar Malam Food',
    category: 'Food',
    amountMYR: 135,
    paidById: 'user-2', // Sarah paid
    splitWithIds: ['user-1', 'user-2', 'user-3'],
    notes: 'Sarah covered the shared food & street stall snacks',
  },
  {
    id: 'exp-3',
    title: 'Heritage Shophouse Boutique Stay (1 Night)',
    category: 'Stay',
    amountMYR: 215,
    paidById: 'user-3', // Wei Jian paid
    splitWithIds: ['user-1', 'user-2', 'user-3'],
    notes: 'Wei Jian booked the loft room in Ipoh historic centre',
  },
];

export const INITIAL_LEGS: RouteLeg[] = [
  {
    id: 'leg-1',
    fromStopId: 'stop-1',
    toStopId: 'stop-2',
    fromName: 'Concubine Lane & Restoran Thean Chun',
    toName: 'Perak Cave Temple (Gua Perak)',
    distanceKm: 8,
  },
  {
    id: 'leg-2',
    fromStopId: 'stop-2',
    toStopId: 'stop-3',
    fromName: 'Perak Cave Temple (Gua Perak)',
    toName: "Kellie's Castle & Estate Grounds",
    distanceKm: 24,
  },
];

export interface PresetTrip {
  id: string;
  label: string;
  location: string;
  details: TripDetails;
  stops: TripStop[];
  expenses: TripExpense[];
  legs: RouteLeg[];
}

export const TRIP_PRESETS: PresetTrip[] = [
  {
    id: 'ipoh',
    label: 'Ipoh Old Town & Heritage',
    location: 'Perak',
    details: INITIAL_TRIP_DETAILS,
    stops: INITIAL_STOPS,
    expenses: INITIAL_EXPENSES,
    legs: INITIAL_LEGS,
  },
  {
    id: 'melaka',
    label: 'Melaka UNESCO Weekend Stroll',
    location: 'Melaka',
    details: {
      title: 'Melaka Historical Stroll & Jonker Night Market',
      destination: 'Melaka City, Malaysia',
      startDate: 'Saturday, 18 Oct 2026',
      endDate: 'Sunday, 19 Oct 2026',
      travelersCount: 3,
    },
    stops: [
      {
        id: 'melaka-1',
        name: 'The Stadthuys & Christ Church Red Square',
        location: 'Bandar Hilir, Melaka',
        timing: 'Day 1 · 11:00 AM',
        category: 'Culture & Heritage',
        notes: 'Walk around the iconic Dutch colonial terracotta landmarks and Saint Paul hill.',
      },
      {
        id: 'melaka-2',
        name: 'Jonker Walk & Baba Charlie Nyonya Delights',
        location: 'Jonker Street, Melaka',
        timing: 'Day 1 · 5:30 PM',
        category: 'Food',
        notes: 'Sample authentic Nyonya kuih, chicken rice balls, and laksa along the lively night market.',
      },
      {
        id: 'melaka-3',
        name: 'Melaka River Cruise & Kampung Morten',
        location: 'Taman Rempah Jetty, Melaka',
        timing: 'Day 2 · 10:00 AM',
        category: 'Leisure',
        notes: 'Scenic 45-minute river boat ride admiring riverside mural art and traditional Malay village.',
      },
    ],
    expenses: [
      {
        id: 'm-exp-1',
        title: 'Highway Tolls & Petrol (Klang Valley ↔ Melaka)',
        category: 'Transport',
        amountMYR: 85,
        paidById: 'user-1',
        splitWithIds: ['user-1', 'user-2', 'user-3'],
        notes: 'Estimated PLUS highway tolls & fuel',
      },
      {
        id: 'm-exp-2',
        title: 'Nyonya Feast, Satay Celup & Street Snacks',
        category: 'Food',
        amountMYR: 160,
        paidById: 'user-2',
        splitWithIds: ['user-1', 'user-2', 'user-3'],
        notes: 'Estimated dinner, lunch & refreshing cendol',
      },
      {
        id: 'm-exp-3',
        title: 'Riverside Boutique Hotel (1 Night)',
        category: 'Stay',
        amountMYR: 190,
        paidById: 'user-3',
        splitWithIds: ['user-1', 'user-2', 'user-3'],
        notes: 'Estimated cozy river-view heritage room',
      },
    ],
    legs: [
      {
        id: 'm-leg-1',
        fromStopId: 'melaka-1',
        toStopId: 'melaka-2',
        fromName: 'The Stadthuys & Christ Church Red Square',
        toName: 'Jonker Walk & Baba Charlie Nyonya Delights',
        distanceKm: 2,
      },
      {
        id: 'm-leg-2',
        fromStopId: 'melaka-2',
        toStopId: 'melaka-3',
        fromName: 'Jonker Walk & Baba Charlie Nyonya Delights',
        toName: 'Melaka River Cruise & Kampung Morten',
        distanceKm: 4,
      },
    ],
  },
  {
    id: 'penang',
    label: 'Penang Island Heritage & Hawker Trail',
    location: 'Penang',
    details: {
      title: 'Penang Island Heritage & Hawker Food Crawl',
      destination: 'George Town, Penang, Malaysia',
      startDate: 'Saturday, 25 Oct 2026',
      endDate: 'Sunday, 26 Oct 2026',
      travelersCount: 3,
    },
    stops: [
      {
        id: 'penang-1',
        name: 'George Town Street Art & Armenian Street',
        location: 'George Town, Penang',
        timing: 'Day 1 · 9:30 AM',
        category: 'Culture & Heritage',
        notes: 'Explore Ernest Zacharevic murals, clan jetties, and artisan craft shops.',
      },
      {
        id: 'penang-2',
        name: 'Penang Hill Funicular & The Habitat',
        location: 'Air Itam, Penang',
        timing: 'Day 1 · 3:00 PM',
        category: 'Nature & Sight',
        notes: 'Ride the fast hillside tram to the rainforest canopy walkway and panoramic sea view.',
      },
      {
        id: 'penang-3',
        name: 'Gurney Drive & Chulia Street Hawker Stalls',
        location: 'George Town, Penang',
        timing: 'Day 2 · 11:30 AM',
        category: 'Food',
        notes: 'Savour char kway teow with duck egg, asam laksa, and oyster omelette.',
      },
    ],
    expenses: [
      {
        id: 'p-exp-1',
        title: 'North-South Highway Petrol & Penang Bridge Toll',
        category: 'Transport',
        amountMYR: 130,
        paidById: 'user-1',
        splitWithIds: ['user-1', 'user-2', 'user-3'],
        notes: 'Estimated car travel and bridge crossing',
      },
      {
        id: 'p-exp-2',
        title: 'Penang Hawker Food & Cendol Crawl',
        category: 'Food',
        amountMYR: 180,
        paidById: 'user-2',
        splitWithIds: ['user-1', 'user-2', 'user-3'],
        notes: 'Estimated multiple tasting rounds across George Town',
      },
      {
        id: 'p-exp-3',
        title: 'Colonial Heritage Hotel in George Town (1 Night)',
        category: 'Stay',
        amountMYR: 260,
        paidById: 'user-3',
        splitWithIds: ['user-1', 'user-2', 'user-3'],
        notes: 'Estimated preserved Sino-Portuguese suite',
      },
    ],
    legs: [
      {
        id: 'p-leg-1',
        fromStopId: 'penang-1',
        toStopId: 'penang-2',
        fromName: 'George Town Street Art & Armenian Street',
        toName: 'Penang Hill Funicular & The Habitat',
        distanceKm: 9,
      },
      {
        id: 'p-leg-2',
        fromStopId: 'penang-2',
        toStopId: 'penang-3',
        fromName: 'Penang Hill Funicular & The Habitat',
        toName: 'Gurney Drive & Chulia Street Hawker Stalls',
        distanceKm: 8,
      },
    ],
  },
];
