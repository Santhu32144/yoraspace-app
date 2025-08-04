import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
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

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigation.replace('Login');
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-[#362360]">
      <StyledView className="px-6 py-4">
        <StyledText className="text-white text-xl font-bold">Profile</StyledText>
      </StyledView>

      <StyledScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <StyledView className="items-center py-6">
          <StyledView className="w-20 h-20 bg-white/10 rounded-full items-center justify-center mb-4">
            <StyledText className="text-4xl">👤</StyledText>
          </StyledView>
          <StyledText className="text-white text-xl font-semibold mb-1">Anonymous User</StyledText>
          <StyledText className="text-white/60">Joined August 2025</StyledText>
        </StyledView>

        {/* Settings */}
        <StyledView className="bg-white/10 rounded-xl p-4 mb-4">
          <StyledText className="text-white text-lg font-semibold mb-4">Settings</StyledText>
          
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-white">Dark Theme</StyledText>
            <StyledSwitch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#rgba(255,255,255,0.1)', true: '#rgba(255,255,255,0.3)' }}
              thumbColor={theme === 'dark' ? '#fff' : '#f4f3f4'}
            />
          </StyledView>

          <StyledView className="flex-row justify-between items-center">
            <StyledText className="text-white">Private Profile</StyledText>
            <StyledSwitch
              value={isPrivateProfile}
              onValueChange={setIsPrivateProfile}
              trackColor={{ false: '#rgba(255,255,255,0.1)', true: '#rgba(255,255,255,0.3)' }}
              thumbColor={isPrivateProfile ? '#fff' : '#f4f3f4'}
            />
          </StyledView>
        </StyledView>

        {/* Account Actions */}
        <StyledView className="bg-white/10 rounded-xl p-4 mb-4">
          <StyledText className="text-white text-lg font-semibold mb-4">Account</StyledText>
          
          <StyledTouchableOpacity 
            className="py-2"
            onPress={() => {/* TODO: Export data */}}
          >
            <StyledText className="text-white">Export Journal Data</StyledText>
          </StyledTouchableOpacity>
          
          <StyledTouchableOpacity 
            className="py-2"
            onPress={handleLogout}
          >
            <StyledText className="text-red-400">Logout</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledText className="text-white/40 text-center mb-6">
          YoraSpace v1.0.0
        </StyledText>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
