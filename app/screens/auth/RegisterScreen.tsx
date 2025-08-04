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

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList> &
    NativeStackNavigationProp<RootStackParamList>;
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      // TODO: Show error message
      return;
    }
    // TODO: Implement actual registration logic
    navigation.replace('Main');
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-[#362360]">
      <StyledKeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <StyledView className="flex-1 px-6 py-8">
          <StyledTouchableOpacity 
            className="mb-4"
            onPress={() => navigation.goBack()}
          >
            <StyledText className="text-white">← Back</StyledText>
          </StyledTouchableOpacity>

          <StyledText className="text-white text-3xl font-bold mb-8">Create Account</StyledText>
          
          <StyledView className="flex-1">
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
              className="bg-white/10 p-4 rounded-xl mb-4 text-white"
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <StyledTextInput
              className="bg-white/10 p-4 rounded-xl mb-6 text-white"
              placeholder="Confirm Password"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <StyledTouchableOpacity 
              className="bg-white p-4 rounded-xl"
              onPress={handleRegister}
            >
              <StyledText className="text-[#362360] text-center font-semibold">Create Account</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledText className="text-white/60 text-center text-sm px-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </StyledText>
        </StyledView>
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
