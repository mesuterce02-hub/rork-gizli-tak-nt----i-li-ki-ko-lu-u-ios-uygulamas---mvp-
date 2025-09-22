import React from 'react';
import { Stack } from 'expo-router';

export default function LessonStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="[lessonId]" options={{ headerShown: true, title: 'Ders' }} />
    </Stack>
  );
}
