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
    title: 'Launch a Story Zine',
    description: 'Create a small collection of stories that matter to you',
    category: 'Creative',
    steps: [
      { title: 'Choose Your Theme', completed: false },
      { title: 'Write First Story', completed: false },
      { title: 'Add Visuals', completed: false },
      { title: 'Share Your Zine', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Create a Weekend Ritual',
    description: 'Design a meaningful practice for your weekends',
    category: 'Mindful',
    steps: [
      { title: 'Identify What You Need', completed: false },
      { title: 'Design Your Practice', completed: false },
      { title: 'Test Run', completed: false },
      { title: 'Refine and Commit', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Visual Gratitude Practice',
    description: 'Create art from appreciation',
    category: 'Creative',
    steps: [
      { title: 'Choose Your Medium', completed: false },
      { title: 'Daily Gratitude Captures', completed: false },
      { title: 'Create Collection', completed: false },
      { title: 'Share Practice', completed: false },
    ],
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
// st feed = [
//   // Add feed data here
// ];
