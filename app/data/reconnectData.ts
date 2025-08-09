import { Trail, Project, Session, ConnectRoom, FeedItem } from '../types/reconnect';

export const trails: Trail[] = [
  {
    id: '1',
    icon: '🌿',
    title: 'Mindful Morning',
    description: 'Start your day with clarity and focus.',
    progress: 2,
    totalSteps: 7,
  },
  {
    id: '2',
    icon: '🧘',
    title: 'Anxiety Relief',
    description: 'Find calm and peace in moments of stress.',
    progress: 5,
    totalSteps: 10,
  },
   {
    id: '3',
    icon: '💖',
    title: 'Gratitude Journey',
    description: 'Cultivate a positive mindset.',
    progress: 0,
    totalSteps: 5,
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Build a Habit Tracker',
    description: 'A personal project to track daily habits and goals.',
    category: 'Personal Growth',
    steps: [
      { title: 'Define Habits', completed: true },
      { title: 'Design UI', completed: true },
      { title: 'Develop Backend', completed: false },
      { title: 'Test Application', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Learn to Meditate',
    description: 'A 30-day challenge to build a consistent meditation practice.',
    category: 'Mindfulness',
    steps: [
        { title: 'Day 1-5: Guided Sessions', completed: true },
        { title: 'Day 6-15: Timed Sessions', completed: true },
        { title: 'Day 16-30: Unguided Sessions', completed: false },
    ]
  }
];

export const sessions: Session[] = [
  {
    id: '1',
    title: 'Guided Meditation',
    with: 'with Sarah',
    duration: 15,
    type: 'Meditation',
  },
  {
    id: '2',
    title: 'The Art of Stillness',
    with: 'with Pico Iyer',
    duration: 45,
    type: 'Masterclass',
  },
  {
    id: '3',
    title: 'Mindful Conversation',
    with: 'with Community',
    duration: 30,
    type: 'Conversation',
  },
];

export const connectRooms: ConnectRoom[] = [
  {
    id: '1',
    title: 'Gratitude Circle',
    description: 'Share what you\'re thankful for.',
    members: 12,
    capacity: 20,
    recentMessages: [
        {user: 'Alex', message: 'Thankful for a sunny day!', timestamp: '5m ago'},
        {user: 'Maria', message: 'Grateful for my family.', timestamp: '2m ago'},
    ]
  },
   {
    id: '2',
    title: 'Mindful Hobbyists',
    description: 'Discuss hobbies that promote mindfulness.',
    members: 8,
    capacity: 15,
    recentMessages: [
        {user: 'Jian', message: 'Knitting is my go-to.', timestamp: '10m ago'},
        {user: 'Chloe', message: 'Anyone into mindful photography?', timestamp: '3m ago'},
    ]
  },
];

export const feedItems: FeedItem[] = [
    {
        id: '1',
        quote: 'The best way to capture moments is to pay attention. This is how we cultivate mindfulness.',
        author: 'Jon Kabat-Zinn'
    },
    {
        id: '2',
        quote: 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.',
        author: 'Buddha'
    }
]
st feed = [
  // Add feed data here
];
