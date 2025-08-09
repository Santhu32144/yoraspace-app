import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '../types';

// Define color schemes for each theme
const lightColors = {
  background: '#ffffff',
  text: '#000000',
  textSecondary: '#666666',
  textMuted: '#999999',
  card: '#f5f5f5',
  cardMuted: '#e0e0e0',
  accent: '#007AFF',
};

const darkColors = {
  background: '#000000',
  text: '#ffffff',
  textSecondary: '#cccccc',
  textMuted: '#666666',
  card: '#1a1a1a',
  cardMuted: '#333333',
  accent: '#0A84FF',
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme as Theme);
      }
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

  // Get colors based on current theme
  const colors = theme === 'light' ? lightColors : darkColors;

  return { theme, toggleTheme, isLoading, colors };
}