import { View, Text, Image, Animated, Easing, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { styled } from 'nativewind';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);

export function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Fade in and scale up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
      // Fade out animation before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }).start(() => {
        navigation.replace('Auth');
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <StyledSafeAreaView className="flex-1 bg-primary">
      <StyledView className="flex-1 justify-center items-center">
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
            { alignItems: 'center' }
          ]}
        >
          <StyledImage
            source={require('../../assets/splash-icon.png')}
            className="w-32 h-32 mb-4"
            resizeMode="contain"
          />
          <StyledText className="text-white text-3xl font-bold tracking-wide mb-2">
            YoraSpace
          </StyledText>
          <StyledText className="text-white/80 text-lg">
            Your mindful social space
          </StyledText>
        </Animated.View>
      </StyledView>
    </StyledSafeAreaView>
  );
}
