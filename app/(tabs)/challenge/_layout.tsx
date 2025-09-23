import { Stack } from 'expo-router';
import React from 'react';

export default function ChallengeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Challenge' }} />
      <Stack.Screen name="[challengeId]/day/[day]" options={{ title: 'Gün Detayı' }} />
    </Stack>
  );
}
