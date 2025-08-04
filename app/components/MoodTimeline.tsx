import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { MoodEntry, StorageService } from '../services/StorageService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

type MoodTimelineProps = {
  onPressItem?: (item: MoodEntry) => void;
};

export function MoodTimeline({ onPressItem }: MoodTimelineProps) {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const moodEntries = await StorageService.getMoodEntries();
    setEntries(moodEntries);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <StyledView className="mt-4">
      <StyledText className="text-white text-lg font-semibold mb-4">Your Mood Timeline</StyledText>
      
      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        {entries.map((entry) => (
          <StyledTouchableOpacity
            key={entry.id}
            className="mr-4 bg-white/10 rounded-xl p-4 min-w-[120px]"
            onPress={() => onPressItem?.(entry)}
          >
            <StyledText className="text-4xl mb-2">{entry.mood.emoji}</StyledText>
            <StyledText className="text-white font-semibold mb-1">
              {entry.mood.label}
            </StyledText>
            <StyledText className="text-white/60 text-sm">
              {formatDate(entry.date)}
            </StyledText>
            {entry.reflection && (
              <StyledView className="mt-2 bg-white/10 rounded px-2 py-1">
                <StyledText className="text-white/80 text-xs">
                  {entry.reflection.substring(0, 30)}...
                </StyledText>
              </StyledView>
            )}
          </StyledTouchableOpacity>
        ))}
        {entries.length === 0 && (
          <StyledView className="flex items-center justify-center min-w-[200px]">
            <StyledText className="text-white/60 text-sm text-center">
              No mood entries yet. Start tracking your mood!
            </StyledText>
          </StyledView>
        )}
      </StyledScrollView>
    </StyledView>
  );
}
