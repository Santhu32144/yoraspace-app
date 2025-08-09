import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { sessions } from '../../data/reconnectData';
import { Session } from '../../types/reconnect';
import { useTheme } from '../../theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const SessionCard = ({ item }: { item: Session }) => {
  const { colors } = useTheme();

  const getIconForType = (type: Session['type']) => {
    switch (type) {
      case 'Meditation':
        return '🧘';
      case 'Masterclass':
        return '🎓';
      case 'Conversation':
        return '💬';
      default:
        return '✨';
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={[colors.card, colors.cardMuted]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <Text style={styles.icon}>{getIconForType(item.type)}</Text>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.with, { color: colors.textMuted }]}>{item.with}</Text>
            <Text style={[styles.duration, { color: colors.textMuted }]}>
              {item.duration} min • {item.type}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Join Session</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.wisdomButton, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
            <Text style={[styles.wisdomButtonText, { color: colors.textMuted }]}>Save to Wisdom</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const SessionsTab = () => {
  return (
    <FlatList
      data={sessions}
      renderItem={({ item }) => <SessionCard item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  with: {
    fontSize: 14,
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  wisdomButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wisdomButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SessionsTab;
