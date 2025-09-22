import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, Clock, CheckCircle } from 'lucide-react-native';

const PRIMARY_50 = '#fef7f8';
const PRIMARY_100 = '#fdeff1';
const PRIMARY_600 = '#ef8f9f';
const SECONDARY_600 = '#87646a';
const TEXT_900 = '#171112';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Erkek Aklının Şifreleri',
    description: 'Erkeklerin nasıl düşündüğünü ve ne istediğini öğren',
    duration: '15 dk',
    completed: true,
  },
  {
    id: '2',
    title: 'Kahraman İçgüdüsünü Anlamak',
    description: 'Erkeklerin temel psikolojik ihtiyaçlarını keşfet',
    duration: '12 dk',
    completed: true,
  },
  {
    id: '3',
    title: 'Çekim Gücü Yaratma',
    description: 'Karşı konulmaz bir aura nasıl oluşturulur',
    duration: '18 dk',
    completed: false,
  },
  {
    id: '4',
    title: 'İletişim Sanatı',
    description: 'Etkili iletişim teknikleri ve aktif dinleme',
    duration: '20 dk',
    completed: false,
  },
  {
    id: '5',
    title: 'Sınır Koyma Teknikleri',
    description: 'Sağlıklı sınırlar nasıl kurulur ve korunur',
    duration: '16 dk',
    completed: false,
  },
];

export default function LessonsScreen() {
  const insets = useSafeAreaInsets();

  const handleLessonPress = (lesson: Lesson) => {
    console.log('Lesson pressed:', lesson.title);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Dersler</Text>
            <Text style={styles.subtitle}>
              İlişki dinamiklerini adım adım öğren
            </Text>
          </View>

          <View style={styles.lessonsContainer}>
            {lessons.map((lesson) => (
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
                  <Text style={styles.lessonDescription}>
                    {lesson.description}
                  </Text>
                  
                  <View style={styles.lessonMeta}>
                    <Clock color={SECONDARY_600} size={16} />
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                    {lesson.completed && (
                      <Text style={styles.completedText}>Tamamlandı</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    marginBottom: 32,
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
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
    fontSize: 18,
    fontWeight: 'bold',
    color: TEXT_900,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: SECONDARY_600,
    lineHeight: 20,
    marginBottom: 12,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lessonDuration: {
    fontSize: 14,
    color: SECONDARY_600,
  },
  completedText: {
    fontSize: 12,
    color: PRIMARY_600,
    fontWeight: '500',
    marginLeft: 8,
  },
});