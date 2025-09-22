import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, CheckCircle } from 'lucide-react-native';
import { sections, PRIMARY_50, PRIMARY_100, PRIMARY_600, SECONDARY_600, TEXT_900, LessonItem } from '@/constants/lessons';

export default function LessonsScreen() {
  const insets = useSafeAreaInsets();

  const handleLessonPress = useCallback((lesson: LessonItem) => {
    if (!lesson?.id || !lesson?.title) {
      console.log('[Lessons] Invalid lesson payload');
      return;
    }
    console.log('[Lessons] Lesson pressed:', lesson.id, lesson.title);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Dersler</Text>
            <Text style={styles.subtitle}>İlişki dinamiklerini adım adım öğren</Text>
          </View>

          {sections.map((section) => (
            <View key={section.id} style={styles.section} testID={`section-${section.id}`}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.lessonsContainer}>
                {section.lessons.map((lesson) => (
                  <TouchableOpacity
                    key={lesson.id}
                    style={styles.lessonCard}
                    onPress={() => handleLessonPress(lesson)}
                    activeOpacity={0.7}
                    testID={`lesson-${lesson.id}`}
                  >
                    <View style={styles.lessonIconContainer}>
                      {lesson.completed ? (
                        <CheckCircle color={PRIMARY_600} size={24} />
                      ) : (
                        <BookOpen color={PRIMARY_600} size={24} />
                      )}
                    </View>

                    <View style={styles.lessonContent}>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      {lesson.description ? (
                        <Text style={styles.lessonDescription}>{lesson.description}</Text>
                      ) : null}
                      {lesson.duration ? (
                        <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: TEXT_900,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: SECONDARY_600,
    lineHeight: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_900,
    marginBottom: 12,
  },
  lessonsContainer: {
    gap: 16,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  lessonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PRIMARY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_900,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: SECONDARY_600,
    lineHeight: 20,
    marginBottom: 8,
  },
  lessonDuration: {
    fontSize: 12,
    color: SECONDARY_600,
  },
});