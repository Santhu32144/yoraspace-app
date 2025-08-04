import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export function AuthScreen() {
  const navigation = useNavigation();

  return (
    <StyledView className="flex-1 bg-primary p-6">
      <StyledView className="flex-1 justify-center">
        <StyledText className="text-white text-4xl font-bold mb-8">
          Welcome to{'\n'}YoraSpace
        </StyledText>
        <StyledText className="text-white text-lg mb-12 opacity-90">
          Your mindful social space for authentic connections
        </StyledText>
        
        <StyledTouchableOpacity
          className="bg-white rounded-full py-4 mb-4 shadow-lg active:opacity-90"
          onPress={() => navigation.navigate('Home' as never)}
        >
          <StyledText className="text-primary text-center font-semibold text-lg">
            Get Started
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity className="border border-white rounded-full py-4 active:bg-white/10">
          <StyledText className="text-white text-center font-semibold text-lg">
            I already have an account
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}
