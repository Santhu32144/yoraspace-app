import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledSwitch = styled(Switch);

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

interface AvatarOption {
  id: string;
  emoji: string;
}

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

// Memoized section card component to prevent unnecessary re-renders
const SectionCard = React.memo<SectionCardProps>(({ children, className = '' }) => (
  <StyledView className={`bg-white/10 rounded-xl p-4 mb-4 ${className}`}>
    {children}
  </StyledView>
));

// Memoized section header component
const SectionHeader = React.memo<{ emoji: string; title: string }>(({ emoji, title }) => (
  <StyledView className="flex-row items-center mb-1">
    <StyledText className="text-white/80 mr-2">{emoji}</StyledText>
    <StyledText className="text-white text-lg font-semibold">{title}</StyledText>
  </StyledView>
));

// Memoized avatar option component
const AvatarOptionButton = React.memo<{
  avatar: AvatarOption;
  isSelected: boolean;
  onPress: (id: string) => void;
}>(({ avatar, isSelected, onPress }) => (
  <StyledTouchableOpacity 
    className={`w-[18%] aspect-square mb-2 items-center justify-center rounded-lg ${
      isSelected ? 'bg-purple-700/60' : 'bg-white/10'
    }`}
    onPress={() => onPress(avatar.id)}
    activeOpacity={0.7}
  >
    <StyledText className="text-2xl">{avatar.emoji}</StyledText>
  </StyledTouchableOpacity>
));

// Memoized time interval button component
const TimeIntervalButton = React.memo<{
  interval: number;
  isSelected: boolean;
  onPress: (interval: number) => void;
}>(({ interval, isSelected, onPress }) => (
  <StyledTouchableOpacity 
    className={`w-[48%] py-2 mb-2 rounded-md items-center justify-center ${
      isSelected ? 'bg-purple-700' : 'bg-white/10'
    }`}
    onPress={() => onPress(interval)}
    activeOpacity={0.7}
  >
    <StyledText className="text-white">
      {interval === -1 ? "Never" : `${interval} minutes`}
    </StyledText>
  </StyledTouchableOpacity>
));

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('flower1');
  const [selectedTimeInterval, setSelectedTimeInterval] = useState(10);

  // Memoized avatar options to prevent recreation on every render
  const avatarOptions = useMemo<AvatarOption[]>(() => [
    { id: 'flower1', emoji: '🌸' },
    { id: 'flower2', emoji: '🌼' },
    { id: 'flower3', emoji: '🌻' },
    { id: 'flower4', emoji: '🌷' },
    { id: 'flower5', emoji: '🌹' },
    { id: 'plant1', emoji: '🌱' },
    { id: 'plant2', emoji: '🌿' },
    { id: 'plant3', emoji: '🌵' },
    { id: 'plant4', emoji: '🌴' },
    { id: 'plant5', emoji: '🌲' },
  ], []);

  // Memoized time intervals
  const timeIntervals = useMemo(() => [2, 5, 10, 15, 30, -1], []);

  // Memoized callbacks to prevent child re-renders
  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // TODO: Implement actual logout logic (clear tokens, etc.)
            navigation.replace('Login');
          }
        }
      ]
    );
  }, [navigation]);

  const handleAvatarSelection = useCallback((avatarId: string) => {
    setSelectedAvatar(avatarId);
    // TODO: Save avatar selection to backend/storage
  }, []);

  const handleTimeIntervalSelection = useCallback((interval: number) => {
    setSelectedTimeInterval(interval);
    // TODO: Save time interval preference to backend/storage
  }, []);

  const handleExportData = useCallback(() => {
    // TODO: Implement data export functionality
    Alert.alert('Export Data', 'Data export functionality coming soon!');
  }, []);

  const handleNavigateToShrine = useCallback(() => {
    navigation.navigate('Shrine'); // Assuming this route exists
  }, [navigation]);

  const handleNavigateToMonument = useCallback(() => {
    navigation.navigate('Monument'); // Assuming this route exists
  }, [navigation]);

  const handlePersonalizeShrine = useCallback(() => {
    navigation.navigate('PersonalizeShrine'); // Assuming this route exists
  }, [navigation]);

  // Switch colors configuration
  const switchColors = useMemo(() => ({
    false: 'rgba(255,255,255,0.1)',
    true: 'rgba(147, 51, 234, 0.8)' // More consistent with purple theme
  }), []);

  return (
    <StyledSafeAreaView className="flex-1 bg-[#362360]">
      {/* Header */}
      <StyledView className="px-6 py-4">
        <StyledText className="text-white text-xl font-bold">YoraSpace</StyledText>
        <StyledText className="text-white/60 text-sm">Your mindful social space</StyledText>
      </StyledView>

      <StyledScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Presence Shrine */}
        <SectionCard>
          <SectionHeader emoji="🌸" title="Presence Shrine" />
          <StyledText className="text-white/60 mb-3">
            Unlock rare stones and customize your sacred space
          </StyledText>
          <StyledTouchableOpacity 
            className="bg-purple-700/60 rounded-lg py-2 px-4 self-start"
            onPress={handlePersonalizeShrine}
            activeOpacity={0.7}
          >
            <StyledText className="text-white font-medium">Personalize Shrine</StyledText>
          </StyledTouchableOpacity>
        </SectionCard>

        {/* Inner Shrine */}
        <SectionCard>
          <SectionHeader emoji="🛕" title="Inner Shrine" />
          <StyledText className="text-white/60 mb-1">
            Your private sanctuary of earned stones and mindful moments
          </StyledText>
          <StyledText className="text-white/80 my-2">0 stones collected</StyledText>
          <StyledTouchableOpacity 
            className="bg-purple-700/60 rounded-lg py-2 px-4 self-start"
            onPress={handleNavigateToShrine}
            activeOpacity={0.7}
          >
            <StyledText className="text-white font-medium">Visit Shrine</StyledText>
          </StyledTouchableOpacity>
        </SectionCard>

        {/* Collective Monolith */}
        <SectionCard>
          <SectionHeader emoji="🛕" title="Collective Monolith" />
          <StyledText className="text-white/60 mb-3">
            A shared monument built stone by stone from our community's mindful moments
          </StyledText>
          
          <StyledView className="items-center my-3">
            <StyledText className="text-white text-2xl font-bold">11</StyledText>
            <StyledText className="text-white/60 text-sm">stones placed by the community</StyledText>
          </StyledView>
          
          <StyledView className="flex-row mb-4 justify-center items-center">
            <StyledText className="text-white/60 mr-2">Recent contributors:</StyledText>
            <StyledView className="bg-purple-500/60 w-5 h-5 rounded-full items-center justify-center mr-1">
              <StyledText className="text-white text-xs">TS</StyledText>
            </StyledView>
            <StyledView className="bg-purple-500/60 w-5 h-5 rounded-full items-center justify-center">
              <StyledText className="text-white text-xs">US</StyledText>
            </StyledView>
          </StyledView>
          
          <StyledTouchableOpacity 
            className="bg-purple-700/60 rounded-lg py-2 px-4 w-full items-center"
            onPress={handleNavigateToMonument}
            activeOpacity={0.7}
          >
            <StyledText className="text-white font-medium">View Monument</StyledText>
          </StyledTouchableOpacity>
        </SectionCard>

        {/* Posting Preferences */}
        <SectionCard className="bg-white/5">
          <StyledText className="text-white text-lg font-semibold mb-3">Posting Preferences</StyledText>
          
          <StyledText className="text-white/60 mb-2">Your Avatar:</StyledText>
          <StyledView className="flex-row flex-wrap justify-between mb-4">
            {avatarOptions.map((avatar) => (
              <AvatarOptionButton
                key={avatar.id}
                avatar={avatar}
                isSelected={selectedAvatar === avatar.id}
                onPress={handleAvatarSelection}
              />
            ))}
          </StyledView>

          {/* Reality Anchor Settings */}
          <StyledText className="text-white/60 mt-4 mb-2">Reality Anchor Settings</StyledText>
          <StyledText className="text-white/60 text-sm mb-2">
            Choose how often you want mindful interruptions while browsing:
          </StyledText>
          
          <StyledView className="flex-row flex-wrap justify-between mb-2">
            {timeIntervals.map((interval) => (
              <TimeIntervalButton
                key={interval}
                interval={interval}
                isSelected={selectedTimeInterval === interval}
                onPress={handleTimeIntervalSelection}
              />
            ))}
          </StyledView>
          
          {selectedTimeInterval > 0 && (
            <StyledView className="bg-purple-700/20 p-3 rounded-lg mb-2 flex-row">
              <StyledView className="w-1 bg-purple-700 mr-2 rounded-full" />
              <StyledText className="text-white/80 flex-1">
                You'll get gentle reminders every {selectedTimeInterval} minutes to stay present.
              </StyledText>
            </StyledView>
          )}
        </SectionCard>
        
        {/* Check-in History */}
        <SectionCard className="bg-white/5">
          <StyledText className="text-white text-lg font-semibold mb-2">Your Check-in History</StyledText>
          
          {/* Daily Streak */}
          <StyledView className="bg-white/10 rounded-xl p-4 mb-3">
            <StyledText className="text-white text-lg font-semibold mb-2">🔥 Daily Streak</StyledText>
            <StyledText className="text-white text-3xl font-bold mb-1">7</StyledText>
            <StyledText className="text-white/70 mb-2">You've checked in for 7 days in a row!</StyledText>
            <StyledTouchableOpacity 
              className="bg-purple-700/80 rounded-lg px-4 py-2 self-start"
              activeOpacity={0.7}
            >
              <StyledText className="text-white font-semibold">Keep the streak!</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          
          {/* Empty state for history */}
          <StyledView className="items-center py-4">
            <StyledText className="text-white/50">No recent check-ins to display</StyledText>
          </StyledView>
        </SectionCard>
        
        {/* Account Actions */}
        <SectionCard>
          <StyledText className="text-white text-lg font-semibold mb-4">Account</StyledText>
          
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-white">Private Profile</StyledText>
            <StyledSwitch
              value={isPrivateProfile}
              onValueChange={setIsPrivateProfile}
              trackColor={switchColors}
              thumbColor={isPrivateProfile ? '#fff' : '#f4f3f4'}
            />
          </StyledView>
          
          <StyledTouchableOpacity 
            className="py-2"
            onPress={handleExportData}
            activeOpacity={0.7}
          >
            <StyledText className="text-white">Export Journal Data</StyledText>
          </StyledTouchableOpacity>
          
          <StyledTouchableOpacity 
            className="py-2"
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <StyledText className="text-red-400">Logout</StyledText>
          </StyledTouchableOpacity>
        </SectionCard>

        <StyledView className="items-center mb-6">
          <StyledText className="text-white/40 text-center">
            YoraSpace v1.0.0
          </StyledText>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}