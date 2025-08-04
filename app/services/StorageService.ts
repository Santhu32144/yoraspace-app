import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MoodEntry {
  id: string;
  date: string;
  mood: {
    emoji: string;
    label: string;
  };
  reflection?: string;
  isPrivate: boolean;
}

export interface UserStats {
  checkIns: number;
  entries: number;
  dayStreak: number;
  lastCheckIn: string;
}

const STORAGE_KEYS = {
  MOOD_ENTRIES: 'mood_entries',
  USER_STATS: 'user_stats',
  LAST_CHECK_DATE: 'last_check_date'
};

export const StorageService = {
  saveMoodEntry: async (entry: MoodEntry) => {
    try {
      // Get existing entries
      const entriesJson = await AsyncStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
      const entries: MoodEntry[] = entriesJson ? JSON.parse(entriesJson) : [];
      
      // Add new entry
      entries.unshift(entry);
      
      // Save updated entries
      await AsyncStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(entries));

      // Update user stats
      await updateUserStats();

      return true;
    } catch (error) {
      console.error('Error saving mood entry:', error);
      return false;
    }
  },

  getMoodEntries: async (): Promise<MoodEntry[]> => {
    try {
      const entriesJson = await AsyncStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
      return entriesJson ? JSON.parse(entriesJson) : [];
    } catch (error) {
      console.error('Error getting mood entries:', error);
      return [];
    }
  },

  getUserStats: async (): Promise<UserStats> => {
    try {
      const statsJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATS);
      return statsJson ? JSON.parse(statsJson) : {
        checkIns: 0,
        entries: 0,
        dayStreak: 0,
        lastCheckIn: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return {
        checkIns: 0,
        entries: 0,
        dayStreak: 0,
        lastCheckIn: new Date().toISOString()
      };
    }
  }
};

async function updateUserStats() {
  try {
    const stats = await StorageService.getUserStats();
    const today = new Date().toISOString().split('T')[0];
    const lastCheckIn = new Date(stats.lastCheckIn).toISOString().split('T')[0];

    // Update check-ins and streak
    stats.checkIns += 1;
    if (lastCheckIn === today) {
      // Already checked in today
    } else if (isYesterday(new Date(stats.lastCheckIn))) {
      // Checked in yesterday, increment streak
      stats.dayStreak += 1;
    } else {
      // Streak broken
      stats.dayStreak = 1;
    }

    stats.lastCheckIn = new Date().toISOString();
    await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Error updating user stats:', error);
  }
}

function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
}
