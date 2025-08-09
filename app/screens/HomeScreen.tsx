import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { styled } from "nativewind";
import { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoodTimeline } from '../components/MoodTimeline';
import { BreathingExercise } from '../components/BreathingExercise';
import { DailyQuote } from '../components/DailyQuote';
import { StorageService, MoodEntry } from '../services/StorageService';
import { useTheme } from '../theme/ThemeContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const moods = [
  { emoji: "😌", label: "Peaceful" },
  { emoji: "😊", label: "Joyful" },
  { emoji: "😔", label: "Melancholy" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "😫", label: "Tired" },
  { emoji: "✨", label: "Inspired" },
  { emoji: "🌱", label: "Growing" },
];

const tabs = [
  { icon: "☀️", label: "Anchor" },
  { icon: "🔄", label: "Reconnect" },
  { icon: "🌊", label: "Wall" },
  { icon: "👤", label: "Profile" },
];

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: {
    params?: {
      message?: string;
    };
  };
};

export function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  // Load mood history from storage
  useEffect(() => {
    const loadMoodHistory = async () => {
      const entries = await StorageService.getMoodEntries();
      // Sort entries by date in descending order
      entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setMoodHistory(entries);
    };
    loadMoodHistory();
  }, [route.params?.message]);

  useEffect(() => {
    if (route.params?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [route.params?.message]);

  return (
    <StyledView style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <StyledView
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}
      >
        <StyledText className="text-white text-xl font-bold mb-2">
          YoraSpace
        </StyledText>
        <StyledText className="text-white text-base opacity-80">
          Your mindful social space
        </StyledText>
      </StyledView>

      <StyledScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
      >
        <DailyQuote />

        {showMessage && (
          <StyledView className="bg-white/20 p-4 rounded-xl mb-4">
            <StyledText className="text-white text-center">{route.params?.message}</StyledText>
          </StyledView>
        )}

        {!showBreathing ? (
          <>
            <StyledText className="text-white text-xl font-bold mb-6">
              How are you feeling right now?
            </StyledText>

            <StyledView className="flex-row flex-wrap justify-between">
              {moods.map((mood, index) => (
                <StyledTouchableOpacity
                  key={index}
                  className={`w-[48%] ${
                    selectedMood === index ? "bg-white/20" : "bg-surface"
                  } 
                    rounded-xl p-4 mb-4 items-center active:scale-95 transition-all duration-200`}
                  style={{
                    backgroundColor: selectedMood === index ? 'rgba(255, 255, 255, 0.2)' : colors.surface
                  }}
                  onPress={() => {
                    setSelectedMood(index);
                    navigation.navigate('Reflection', { selectedMood: mood });
                  }}
                >
                  <StyledText className="text-4xl mb-2">{mood.emoji}</StyledText>
                  <StyledText className="text-white text-center">
                    {mood.label}
                  </StyledText>
                </StyledTouchableOpacity>
              ))}
            </StyledView>

            <MoodTimeline 
              onPressItem={(item) => {
                navigation.navigate('Reflection', { 
                  selectedMood: item.mood,
                  reflection: item.reflection,
                  isViewing: true
                });
              }}
            />

            <StyledTouchableOpacity
              className="p-4 rounded-xl mt-6 mb-4"
              style={{ backgroundColor: colors.surface }}
              onPress={() => setShowBreathing(true)}
            >
              <StyledText className="text-white text-center font-semibold">
                Take a Breathing Break
              </StyledText>
            </StyledTouchableOpacity>
          </>
        ) : (
          <BreathingExercise
            pattern="calm"
            onComplete={() => {
              setShowBreathing(false);
              navigation.navigate('Reflection', { 
                selectedMood: moods[0],
                prefilledText: "I took a moment to breathe and center myself..."
              });
            }}
          />
        )}
      </StyledScrollView>
    </StyledView>
  );
}
