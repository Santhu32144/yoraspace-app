import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connectRooms } from '../../data/reconnectData';
import { ConnectRoom } from '../../types/reconnect';
import { useTheme } from '../../hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';

const ConnectCard = ({ item }: { item: ConnectRoom }) => {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.card, colors.cardMuted]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.members, { color: colors.textMuted }]}>{item.members}/{item.capacity} members</Text>
      </View>
      <Text style={[styles.description, { color: colors.textMuted }]}>{item.description}</Text>
      <View style={styles.recentMessages}>
        {item.recentMessages.map((msg, index) => (
          <Text key={index} style={[styles.message, { color: colors.textMuted }]}>
            <Text style={{ fontWeight: 'bold' }}>{msg.user}:</Text> {msg.message}
          </Text>
        ))}
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={[styles.buttonText, { color: colors.background }]}>Enter Room</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const ConnectTab = () => {
  return (
    <FlatList
      data={connectRooms}
      renderItem={({ item }) => <ConnectCard item={item} />}
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
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  members: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  recentMessages: {
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 12,
  },
  message: {
    fontSize: 12,
    marginBottom: 4,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConnectTab;
