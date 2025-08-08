import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { feedItems } from '../../data/reconnectData';
import { FeedItem } from '../../types/reconnect';
import { useTheme } from '../../hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';

const FeedCard = ({ item }: { item: FeedItem }) => {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.card, colors.cardMuted]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={[styles.quote, { color: colors.text }]}>“{item.quote}”</Text>
      <Text style={[styles.author, { color: colors.textMuted }]}>— {item.author}</Text>
    </LinearGradient>
  );
};

const FeedTab = () => {
  return (
    <FlatList
      data={feedItems}
      renderItem={({ item }) => <FeedCard item={item} />}
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
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 26,
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default FeedTab;
