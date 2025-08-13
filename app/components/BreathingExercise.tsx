import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useState, useRef, useEffect } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const breathingPatterns = {
  calm: {
    name: 'Square Breathing',
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 4,
    description: 'Inhale, hold, exhale, and rest for equal counts of 4'
  },
  energize: {
    name: '4-7-8 Breathing',
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 0,
    description: 'Inhale for 4, hold for 7, exhale for 8'
  },
  sleep: {
    name: 'Deep Relaxation',
    inhale: 4,
    hold: 0,
    exhale: 6,
    rest: 2,
    description: 'Long exhales help calm the nervous system'
  }
};

type BreathingExerciseProps = {
  pattern?: keyof typeof breathingPatterns;
  onComplete?: () => void;
};

export function BreathingExercise({ 
  pattern = 'calm',
  onComplete 
}: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  
  const selectedPattern = breathingPatterns[pattern];

  useEffect(() => {
    if (!isActive) return;

    const animationConfig: Record<
      'inhale' | 'hold' | 'exhale' | 'rest',
      { toValue: number; duration: number; phase: 'inhale' | 'hold' | 'exhale' | 'rest' }
    > = {
      inhale: {
        toValue: 1,
        duration: selectedPattern.inhale * 1000,
        phase: 'hold'
      },
      hold: {
        toValue: 1,
        duration: selectedPattern.hold * 1000,
        phase: 'exhale'
      },
      exhale: {
        toValue: 0,
        duration: selectedPattern.exhale * 1000,
        phase: 'rest'
      },
      rest: {
        toValue: 0,
        duration: selectedPattern.rest * 1000,
        phase: 'inhale'
      }
    };

    const config = animationConfig[phase];
    
    Animated.timing(animation, {
      toValue: config.toValue,
      duration: config.duration,
      useNativeDriver: true
    }).start(() => {
      if (phase === 'rest') {
        setCycleCount(c => c + 1);
      }
      setPhase(config.phase);
    });

    if (cycleCount >= 3) {
      setIsActive(false);
      onComplete?.();
    }
  }, [phase, isActive, cycleCount]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5]
  });

  return (
    <StyledView className="items-center py-6">
      <StyledText className="text-white text-lg font-semibold mb-4">
        {selectedPattern.name}
      </StyledText>
      
      <StyledText className="text-white/60 text-center mb-9 px-4">
        {selectedPattern.description}
      </StyledText>

      <Animated.View
        style={[{
          transform: [{ scale }]
        }]}
      >
        <StyledView className="w-32 h-32 rounded-full bg-white/20 items-center justify-center">
          <StyledText className="text-white text-xl">
            {phase === 'inhale' ? 'Breathe In' :
             phase === 'hold' ? 'Hold' :
             phase === 'exhale' ? 'Breathe Out' : 'Rest'}
          </StyledText>
        </StyledView>
      </Animated.View>

      {!isActive ? (
        <StyledTouchableOpacity 
          className="mt-8 bg-white/10 px-6 py-3 rounded-xl"
          onPress={() => setIsActive(true)}
        >
          <StyledText className="text-white font-semibold">Begin Exercise</StyledText>
        </StyledTouchableOpacity>
      ) : (
        <StyledText className="text-white/60 mt-8">
          Cycle {cycleCount + 1} of 3
        </StyledText>
      )}
    </StyledView>
  );
}
