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
    title: 'Morning Grounding Meditation',
    with: 'with Sarah Chen',
    duration: 5,
    type: 'Meditation',
  },
  {
    id: '2',
    title: 'Moving Through Creative Blocks',
    with: 'with Marcus Rivera',
    duration: 12,
    type: 'Masterclass',
  },
  {
    id: '3',
    title: 'Bee-conversation: Finding Belonging',
    with: 'with Dr. Amara Okafor',
    duration: 15,
    type: 'Conversation',
  },
  {
    id: '4',
    title: 'From Overwhelm to Ease',
    with: 'with Jordan Walsh',
    duration: 8,
    type: 'Meditation',
  },
];

export const connectRooms: ConnectRoom[] = [
  {
    id: '1',
    title: 'Unlearning Hustle',
    description: 'Exploring rest, boundaries, and sustainable living',
    members: 8,
    capacity: 12,
    recentMessages: [
      {
        user: 'River Sodi',
        message: "I'm learning that saying no to others means saying yes to myself.",
        timestamp: "3h ago"
      }
    ]
  },
  {
    id: '2',
    title: 'Full Moon Feels',
    description: 'Honoring emotions and lunar cycles',
    members: 11,
    capacity: 12,
    recentMessages: [
      {
        user: 'Moonchild',
        message: "Letting go of the need to have everything figured out.",
        timestamp: "5h ago"
      }
    ]
  },
  {
    id: '3',
    title: 'Mindful Moments',
    description: 'Sharing daily mindfulness practices',
    members: 7,
    capacity: 12,
    recentMessages: [
      { user: 'Kira', message: 'Starting each day with 5 minutes of breath awareness', timestamp: '2h ago' }
    ]
  },
  {
    id: '4',
    title: 'Creative Flow',
    description: 'Supporting each other in creative expression',
    members: 9,
    capacity: 12,
    recentMessages: [
      { user: 'ArtSpirit', message: 'Remember, there are no mistakes in art, only happy accidents!', timestamp: '1h ago' }
    ]
  }
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
