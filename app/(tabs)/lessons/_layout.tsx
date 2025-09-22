import { Stack } from 'expo-router';
import React from 'react';

export default function LessonsStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Dersler' }} />
      <Stack.Screen name="[lessonId]" options={{ title: 'Ders' }} />
    </Stack>
  );
}
