import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const samplePosts = [
  {
    id: '1',
    user: 'Sarah K.',
    avatar: '👩',
    moodTag: 'grateful',
    caption: 'Found a moment of peace in my morning coffee ritual today. Sometimes the smallest things ground us the most. ☕️',
    timestamp: '2h ago',
  },
  {
    id: '2',
    user: 'Michael R.',
    avatar: '👨',
    moodTag: 'reflective',
    caption: 'Taking a social media break helped me reconnect with my old hobbies. What activities make you lose track of time?',
    timestamp: '4h ago',
  },
];

export function WallScreen() {
  return (
    <StyledSafeAreaView className="flex-1 bg-[#362360]">
      <StyledView className="px-6 py-4 flex-row justify-between items-center">
        <StyledText className="text-white text-xl font-bold">Collective Wall</StyledText>
        <StyledTouchableOpacity 
          className="bg-white/10 px-4 py-2 rounded-full"
          onPress={() => {/* TODO: Navigate to create post */}}
        >
          <StyledText className="text-white">+ Share</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      <StyledScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
      >
        {samplePosts.map((post) => (
          <StyledView 
            key={post.id}
            className="bg-white/10 rounded-xl p-4 mb-4"
          >
            <StyledView className="flex-row items-center mb-3">
              <StyledText className="text-2xl mr-2">{post.avatar}</StyledText>
              <StyledView>
                <StyledText className="text-white font-semibold">{post.user}</StyledText>
                <StyledText className="text-white/60 text-sm">{post.timestamp}</StyledText>
              </StyledView>
            </StyledView>

            <StyledText className="text-white mb-3">{post.caption}</StyledText>
            
            <StyledView className="flex-row items-center">
              <StyledView className="bg-white/20 px-3 py-1 rounded-full">
                <StyledText className="text-white text-sm">#{post.moodTag}</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        ))}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
