import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sections, placeholderContents } from '@/constants/lessons';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function LessonDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ lessonId?: string }>();
  const lessonId = params.lessonId ?? '';

  const lesson = useMemo(() => {
    for (const section of sections) {
      const found = section.lessons.find((l) => l.id === lessonId);
      if (found) return found;
    }
    return undefined;
  }, [lessonId]);

  const content = placeholderContents[lesson?.id ?? ''] ?? '[[PLACEHOLDER İÇERİK YOK]]';

  return (
    <ErrorBoundary>
      <View style={[styles.container, { paddingTop: insets.top }]}>        
        <Stack.Screen options={{
          title: lesson?.title ?? 'Ders',
        }} />
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text selectable style={styles.text} testID="lesson-content">
            {content}
          </Text>
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#171112',
  },
});
