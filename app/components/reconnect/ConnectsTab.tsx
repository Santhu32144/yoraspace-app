import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connectRooms } from '../../data/reconnectData';
import { ConnectRoom } from '../../types/reconnect';
import { useTheme } from '../../theme/ThemeContext';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
  membersContainer: {
    marginBottom: 16,
  },
  membersCount: {
    fontSize: 12,
  },
  messageContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  messageQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 20,
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageUser: {
    fontSize: 12,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

type ConnectCardProps = {
  item: ConnectRoom;
};

const ConnectCard: React.FC<ConnectCardProps> = ({ item }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.card, { backgroundColor: colors.cardMuted }]}>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>
            {item.description}
          </Text>
          <View style={styles.membersContainer}>
            <Text style={[styles.membersCount, { color: colors.accent }]}>
              {item.members}/{item.capacity} members
            </Text>
          </View>
          {item.recentMessages.map((message, index) => (
            <View 
              key={index} 
              style={[styles.messageContainer, { backgroundColor: 'rgba(157, 140, 227, 0.1)' }]}
            >
              <Text style={[styles.messageQuote, { color: colors.text }]}>
                "{message.message}"
              </Text>
              <View style={styles.messageInfo}>
                <Text style={[styles.messageUser, { color: colors.accent }]}>
                  {message.user}
                </Text>
                <Text style={[styles.messageTime, { color: colors.textMuted }]}>
                  {message.timestamp}
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.accent }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
              Enter Room
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ConnectsTab: React.FC = () => {
  return (
    <FlatList
      data={connectRooms}
      renderItem={({ item }) => <ConnectCard item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ConnectsTab;
