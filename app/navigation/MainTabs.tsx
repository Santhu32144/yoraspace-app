import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import ReconnectScreen from '../screens/main/ReconnectScreen';
import { WallScreen } from '../screens/main/WallScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#251A3B',
    borderTopWidth: 0,
    height: 90,
    paddingBottom: 30,
  },
  tabBarActiveTintColor: '#FFFFFF',
  tabBarInactiveTintColor: '#A1A1A1',
};

const tabIcon = (name: string) => ({ focused }: { focused: boolean }) => {
  let iconName;
  switch (name) {
    case 'Home':
      iconName = '☀️';
      break;
    case 'Reconnect':
      iconName = '🔄';
      break;
    case 'Wall':
      iconName = '🌊';
      break;
    case 'Profile':
      iconName = '👤';
      break;
    default:
      iconName = '';
  }
  return <Text style={{ fontSize: 28, opacity: focused ? 1 : 0.6 }}>{iconName}</Text>;
};

export function MainTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarIcon: tabIcon('Home') }} 
      />
      <Tab.Screen 
        name="Reconnect" 
        component={ReconnectScreen} 
        options={{ tabBarIcon: tabIcon('Reconnect') }} 
      />
      <Tab.Screen 
        name="Wall" 
        component={WallScreen} 
        options={{ tabBarIcon: tabIcon('Wall') }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: tabIcon('Profile') }} 
      />
    </Tab.Navigator>
  );
}
