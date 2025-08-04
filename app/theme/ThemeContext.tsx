import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';
type MoodTheme = 'default' | 'peaceful' | 'joyful' | 'melancholy' | 'thoughtful';

interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
}

const themes: Record<ThemeMode, Record<MoodTheme, ThemeColors>> = {
  light: {
    default: {
      primary: '#362360',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#362360',
      textSecondary: '#666666',
      accent: '#8A7AB0'
    },
    peaceful: {
      primary: '#4A90E2',
      background: '#F0F7FF',
      surface: '#E1EFFF',
      text: '#2C5282',
      textSecondary: '#4A5568',
      accent: '#63B3ED'
    },
    joyful: {
      primary: '#F6AD55',
      background: '#FFFAF0',
      surface: '#FEEBC8',
      text: '#C05621',
      textSecondary: '#7B341E',
      accent: '#ED8936'
    },
    melancholy: {
      primary: '#718096',
      background: '#F7FAFC',
      surface: '#EDF2F7',
      text: '#2D3748',
      textSecondary: '#4A5568',
      accent: '#A0AEC0'
    },
    thoughtful: {
      primary: '#805AD5',
      background: '#FAF5FF',
      surface: '#E9D8FD',
      text: '#553C9A',
      textSecondary: '#6B46C1',
      accent: '#9F7AEA'
    }
  },
  dark: {
    default: {
      primary: '#2C1E43',
      background: '#1A1424',
      surface: '#362360',
      text: '#FFFFFF',
      textSecondary: '#CBD5E0',
      accent: '#8A7AB0'
    },
    peaceful: {
      primary: '#2C5282',
      background: '#1A365D',
      surface: '#2A4365',
      text: '#EBF8FF',
      textSecondary: '#BEE3F8',
      accent: '#4299E1'
    },
    joyful: {
      primary: '#C05621',
      background: '#7B341E',
      surface: '#9C4221',
      text: '#FFFAF0',
      textSecondary: '#FEEBC8',
      accent: '#ED8936'
    },
    melancholy: {
      primary: '#2D3748',
      background: '#1A202C',
      surface: '#2D3748',
      text: '#F7FAFC',
      textSecondary: '#E2E8F0',
      accent: '#718096'
    },
    thoughtful: {
      primary: '#553C9A',
      background: '#44337A',
      surface: '#553C9A',
      text: '#FAF5FF',
      textSecondary: '#E9D8FD',
      accent: '#805AD5'
    }
  }
};

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: ThemeColors;
  setMoodTheme: (mood: MoodTheme) => void;
  currentMoodTheme: MoodTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(systemColorScheme || 'light');
  const [currentMoodTheme, setCurrentMoodTheme] = useState<MoodTheme>('default');

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
      currentMoodTheme
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
