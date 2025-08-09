import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';
type MoodTheme = 'default' | 'peaceful' | 'joyful' | 'melancholy' | 'thoughtful';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => Promise<void>;
  isLoading: boolean;
  colors: ThemeColors;
}

interface ThemeColors {
  primary: string;
  primaryMuted: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  card: string;
  cardMuted: string;
}

const themes: Record<ThemeMode, Record<MoodTheme, ThemeColors>> = {
  light: {
    default: {
      primary: '#2D1B69',
      primaryMuted: '#392677',
      background: '#2D1B69',
      surface: '#392677',
      text: '#FFFFFF',
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      textMuted: 'rgba(255, 255, 255, 0.6)',
      accent: '#9D8CE3',
      card: '#392677',
      cardMuted: '#453088'
    },
    peaceful: {
      primary: '#4A90E2',
      primaryMuted: '#63B3ED',
      background: '#F0F7FF',
      surface: '#E1EFFF',
      text: '#2C5282',
      textSecondary: '#4A5568',
      textMuted: '#718096',
      accent: '#63B3ED',
      card: '#FFFFFF',
      cardMuted: '#F7FAFC'
    },
    joyful: {
      primary: '#F6AD55',
      primaryMuted: '#F6AD55',
      background: '#FFFAF0',
      surface: '#FEEBC8',
      text: '#C05621',
      textSecondary: '#7B341E',
      textMuted: '#C05621',
      accent: '#ED8936',
      card: '#FFFFFF',
      cardMuted: '#FFFAF0'
    },
    melancholy: {
      primary: '#718096',
      primaryMuted: '#A0AEC0',
      background: '#F7FAFC',
      surface: '#EDF2F7',
      text: '#2D3748',
      textSecondary: '#4A5568',
      textMuted: '#718096',
      accent: '#A0AEC0',
      card: '#FFFFFF',
      cardMuted: '#F7FAFC'
    },
    thoughtful: {
      primary: '#805AD5',
      primaryMuted: '#9F7AEA',
      background: '#FAF5FF',
      surface: '#E9D8FD',
      text: '#553C9A',
      textSecondary: '#6B46C1',
      textMuted: '#805AD5',
      accent: '#9F7AEA',
      card: '#FFFFFF',
      cardMuted: '#FAF5FF'
    }
  },
  dark: {
    default: {
      primary: '#2C1E43',
      primaryMuted: '#4A3B63',
      background: '#1A1424',
      surface: '#362360',
      text: '#FFFFFF',
      textSecondary: '#CBD5E0',
      textMuted: '#A0AEC0',
      accent: '#8A7AB0',
      card: '#2C1E43',
      cardMuted: '#362360'
    },
    peaceful: {
      primary: '#2C5282',
      primaryMuted: '#4299E1',
      background: '#1A365D',
      surface: '#2A4365',
      text: '#EBF8FF',
      textSecondary: '#BEE3F8',
      textMuted: '#90CDF4',
      accent: '#4299E1',
      card: '#2A4365',
      cardMuted: '#2C5282'
    },
    joyful: {
      primary: '#C05621',
      primaryMuted: '#ED8936',
      background: '#7B341E',
      surface: '#9C4221',
      text: '#FFFAF0',
      textSecondary: '#FEEBC8',
      textMuted: '#FBD38D',
      accent: '#ED8936',
      card: '#9C4221',
      cardMuted: '#C05621'
    },
    melancholy: {
      primary: '#2D3748',
      primaryMuted: '#4A5568',
      background: '#1A202C',
      surface: '#2D3748',
      text: '#F7FAFC',
      textSecondary: '#E2E8F0',
      textMuted: '#A0AEC0',
      accent: '#718096',
      card: '#2D3748',
      cardMuted: '#4A5568'
    },
    thoughtful: {
      primary: '#553C9A',
      primaryMuted: '#6B46C1',
      background: '#44337A',
      surface: '#553C9A',
      text: '#FAF5FF',
      textSecondary: '#E9D8FD',
      textMuted: '#D6BCFA',
      accent: '#805AD5',
      card: '#553C9A',
      cardMuted: '#6B46C1'
    }
  }
};

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => Promise<void>;
  colors: ThemeColors;
  setMoodTheme: (mood: MoodTheme) => Promise<void>;
  currentMoodTheme: MoodTheme;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(systemColorScheme || 'light');
  const [currentMoodTheme, setCurrentMoodTheme] = useState<MoodTheme>('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedMoodTheme = await AsyncStorage.getItem('moodTheme');
      if (savedTheme) setTheme(savedTheme as ThemeMode);
      if (savedMoodTheme) setCurrentMoodTheme(savedMoodTheme as MoodTheme);
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setMoodTheme = async (mood: MoodTheme) => {
    try {
      await AsyncStorage.setItem('moodTheme', mood);
      setCurrentMoodTheme(mood);
    } catch (error) {
      console.error('Error saving mood theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      colors: themes[theme][currentMoodTheme],
      setMoodTheme,
      currentMoodTheme,
      isLoading
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
