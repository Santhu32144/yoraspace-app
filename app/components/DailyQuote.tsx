import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useState, useEffect } from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const quotes = [
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "Thich Nhat Hanh"
  },
  {
    text: "You are the sky. Everything else is just the weather.",
    author: "Pema Chödrön"
  },
  {
    text: "Breath is the bridge which connects life to consciousness.",
    author: "Thich Nhat Hanh"
  },
  {
    text: "Within you there is a stillness and sanctuary to which you can retreat at any time.",
    author: "Hermann Hesse"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  }
];

export function DailyQuote() {
  const [quote, setQuote] = useState(quotes[0]);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    // In a real app, you'd want to store the last quote date
    // and only change it once per day
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  if (!showQuote) {
    return (
      <StyledTouchableOpacity 
        className="bg-white/10 rounded-xl p-4 mb-6"
        onPress={() => setShowQuote(true)}
      >
        <StyledText className="text-white text-center">
          Tap to reveal today's mindful quote
        </StyledText>
      </StyledTouchableOpacity>
    );
  }

  return (
    <StyledView className="bg-white/10 rounded-xl p-4 mb-6">
      <StyledText className="text-white text-center text-lg mb-3">
        {quote.text}
      </StyledText>
      <StyledText className="text-white/60 text-center">
        — {quote.author}
      </StyledText>
    </StyledView>
  );
}
