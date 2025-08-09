import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface TabsProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const tabs = ['Trails', 'Projects', 'Sessions', 'Connects', 'Feed'];

export function ReconnectTabs({ activeTab, onChangeTab }: TabsProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onChangeTab(tab)}
          style={[
            styles.tab,
            {
              backgroundColor: activeTab === tab ? '#9D8CE3' : 'transparent',
            },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === tab ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
              },
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 4,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
