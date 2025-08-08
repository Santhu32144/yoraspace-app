import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { sessions } from '../../data/reconnectData';
import { Session } from '../../types/reconnect';
import { useTheme } from '../../hooks/useTheme';
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
          <Text style={[styles.duration, { color: colors.textMuted }]}>{item.duration} min • {item.type}</Text>
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
          <Text style={[styles.buttonText, { color: colors.background }]}>Join</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const SessionsTab = () => {
  return (
    <FlatList
      data={sessions}
      renderItem={({ item }) => <SessionCard item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardContent: {
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  with: {
    fontSize: 14,
    marginTop: 2,
  },
  duration: {
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SessionsTab;
