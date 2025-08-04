import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTextInput = styled(TextInput);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList> & 
    NativeStackNavigationProp<RootStackParamList>;
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleLogin = () => {
    // TODO: Implement actual login logic
    navigation.replace('Main');
  };

  const handleAnonymousLogin = () => {
    // TODO: Implement anonymous login
    navigation.replace('Main');
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-[#362360]">
      <StyledKeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <StyledView className="flex-1 px-6 py-8">
          <StyledText className="text-white text-3xl font-bold mb-8">Welcome Back</StyledText>
          
          <StyledView className="flex-1 justify-center">
            {showForm ? (
              <>
                <StyledTextInput
                  className="bg-white/10 p-4 rounded-xl mb-4 text-white"
                  placeholder="Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <StyledTextInput
                  className="bg-white/10 p-4 rounded-xl mb-6 text-white"
                  placeholder="Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <StyledTouchableOpacity 
                  className="bg-white p-4 rounded-xl mb-4"
                  onPress={handleLogin}
                >
                  <StyledText className="text-[#362360] text-center font-semibold">Login</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity 
                  onPress={() => setShowForm(false)}
                >
                  <StyledText className="text-white text-center">Back</StyledText>
                </StyledTouchableOpacity>
              </>
            ) : (
              <>
                <StyledTouchableOpacity 
                  className="bg-white/10 p-4 rounded-xl mb-4"
                  onPress={() => setShowForm(true)}
                >
                  <StyledText className="text-white text-center font-semibold">Continue with Email</StyledText>
                </StyledTouchableOpacity>

                <StyledTouchableOpacity 
                  className="bg-white/10 p-4 rounded-xl"
                  onPress={handleAnonymousLogin}
                >
                  <StyledText className="text-white text-center font-semibold">Continue Anonymously</StyledText>
                </StyledTouchableOpacity>
              </>
            )}
          </StyledView>

          <StyledView className="flex-row justify-center">
            <StyledText className="text-white/60">Don't have an account? </StyledText>
            <StyledTouchableOpacity onPress={() => navigation.navigate('Register')}>
              <StyledText className="text-white font-semibold">Sign Up</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
