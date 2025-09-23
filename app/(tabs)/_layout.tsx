import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Home, BookOpen, MessageCircle, Flag } from 'lucide-react-native';

const PRIMARY_COLOR = '#f19eb2';
const SECONDARY_COLOR = '#9e868c';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: SECONDARY_COLOR,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Dersler',
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
          href: '/(tabs)/lessons',
        }}
      />
      <Tabs.Screen
        name="ai-coach"
        options={{
          title: 'AI Koçu',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: 'Challenge',
          tabBarIcon: ({ color, size }) => (
            <Flag color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: '#e5dcdd',
    paddingTop: 8,
    paddingBottom: 16,
    height: 80,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});