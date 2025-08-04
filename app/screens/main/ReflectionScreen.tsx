import { View, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoodTimeline } from '../../components/MoodTimeline';
import { ReflectionForm } from '../../components/ReflectionForm';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

type ReflectionScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export function ReflectionScreen({ navigation }: ReflectionScreenProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaveReflection = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handlePressItem = (item: any) => {
    if (!item.isPrivate) {
      navigation.navigate('Wall', {
        draft: {
          mood: item.mood.label,
          content: item.reflection
        }
      });
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-[#362360]">
      <StyledScrollView 
        className="flex-1 px-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StyledView className="py-6">
          <ReflectionForm onSave={handleSaveReflection} />
          <StyledView key={refreshKey} className="mt-6">
            <MoodTimeline onPressItem={handlePressItem} />
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}
