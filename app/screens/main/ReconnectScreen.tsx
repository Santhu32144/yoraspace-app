import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const activities = [
  {
    id: '1',
    category: 'Be',
    title: '5-Minute Breathing',
    description: 'Ground yourself with a simple breathing exercise',
  },
  {
    id: '2',
    category: 'Do',
    title: 'Creative Prompt',
    description: 'What small act of kindness did you witness today?',
  },
  {
    id: '3',
    category: 'Connect',
    title: 'Community Thread',
    description: "Share one thing you're grateful for today",
  },
];

export function ReconnectScreen() {
  return (
    <StyledSafeAreaView className="flex-1 bg-[#362360]">
      <StyledView className="px-6 py-4">
        <StyledText className="text-white text-xl font-bold">Reconnect</StyledText>
        <StyledText className="text-white/80">Find your center</StyledText>
      </StyledView>

      <StyledScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
      >
        {activities.map((activity) => (
          <StyledTouchableOpacity
            key={activity.id}
            className="bg-white/10 rounded-xl p-4 mb-4"
          >
            <StyledText className="text-white/60 text-sm mb-2">{activity.category}</StyledText>
            <StyledText className="text-white font-semibold text-lg mb-2">{activity.title}</StyledText>
            <StyledText className="text-white/80">{activity.description}</StyledText>
          </StyledTouchableOpacity>
        ))}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
