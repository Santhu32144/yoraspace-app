import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { styled } from 'nativewind';
import { StorageService, MoodEntry } from '../services/StorageService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Mood = {
  emoji: string;
  label: string;
};

const MOOD_OPTIONS: Mood[] = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😴', label: 'Tired' },
];

interface ReflectionFormProps {
  onSave?: () => void;
}

export function ReflectionForm({ onSave }: ReflectionFormProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [reflection, setReflection] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);

  const handleSubmit = async () => {
    if (!selectedMood) return;

    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: selectedMood,
      reflection: reflection.trim(),
      isPrivate,
    };

    const success = await StorageService.saveMoodEntry(entry);
    if (success) {
      setSelectedMood(null);
      setReflection('');
      setIsPrivate(true);
      onSave?.();
    }
  };

  return (
    <StyledView className="p-4 bg-white/10 rounded-xl">
      <StyledText className="text-white text-lg font-semibold mb-4">
        How are you feeling?
      </StyledText>
      
      <StyledView className="flex-row flex-wrap gap-4 mb-6">
        {MOOD_OPTIONS.map((mood) => (
          <StyledTouchableOpacity
            key={mood.label}
            onPress={() => setSelectedMood(mood)}
            className={`p-3 rounded-lg ${
              selectedMood?.label === mood.label 
                ? 'bg-primary' 
                : 'bg-white/10'
            }`}
          >
            <StyledText className="text-2xl">{mood.emoji}</StyledText>
          </StyledTouchableOpacity>
        ))}
      </StyledView>

      <StyledTextInput
        className="bg-white/10 rounded-lg p-4 text-white mb-4"
        placeholder="Share your thoughts... (optional)"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        multiline
        numberOfLines={4}
        value={reflection}
        onChangeText={setReflection}
      />

      <StyledView className="flex-row items-center justify-between mb-6">
        <StyledText className="text-white text-base">Keep this private</StyledText>
        <Switch
          value={isPrivate}
          onValueChange={setIsPrivate}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isPrivate ? '#f5dd4b' : '#f4f3f4'}
        />
      </StyledView>

      <StyledTouchableOpacity
        className={`rounded-lg p-4 ${
          selectedMood ? 'bg-primary' : 'bg-white/10'
        }`}
        onPress={handleSubmit}
        disabled={!selectedMood}
      >
        <StyledText 
          className={`text-center text-base font-semibold ${
            selectedMood ? 'text-white' : 'text-white/40'
          }`}
        >
          Save Entry
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}
