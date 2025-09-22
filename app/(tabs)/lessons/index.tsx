import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';

const PRIMARY_50 = '#fef7f8';
const PRIMARY_100 = '#fdeff1';
const PRIMARY_600 = '#ef8f9f';
const SECONDARY_600 = '#87646a';
const TEXT_900 = '#171112';

interface LessonItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: LessonItem[];
}

const rawSections: Section[] = [
  {
    id: '1',
    title: 'Bölüm 1: Yeni Bir Başlangıç: Gizli Takıntı Felsefesi',
    lessons: [
      { id: '1.1', title: 'Ders 1.1: Oyunun Kurallarını Yeniden Yazmak', description: '', duration: '', completed: false },
      { id: '1.2', title: 'Ders 1.2: Bu Bir Kitap Değil, Bir Zihin Programıdır', description: '', duration: '', completed: false },
      { id: '1.3', title: 'Ders 1.3: Bu Dönüşüm Yolculuğunda Seni Neler Bekliyor?', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Bölüm 2: Erkek Zihninin Derinlikleri',
    lessons: [
      { id: '2.1', title: 'Ders 2.1: Erkek ve Kadın Beyni Neden Farklı Çalışır?', description: '', duration: '', completed: false },
      { id: '2.2', title: 'Ders 2.2: Bir Erkeği Gerçekten Ne Motive Eder?', description: '', duration: '', completed: false },
      { id: '2.3', title: 'Ders 2.3: İlişkilerde Sık Yapılan İletişim Hataları', description: '', duration: '', completed: false },
      { id: '2.4', title: 'Ders 2.4: Onun Çözüm Odaklılığı ve Senin Anlaşılma İhtiyacın', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Bölüm 3: Karşı Konulmaz Bağlılığın Anahtarı',
    lessons: [
      { id: '3.1', title: 'Ders 3.1: Kahraman İçgüdüsü: Erkeklerin Gizli İşletim Sistemi', description: '', duration: '', completed: false },
      { id: '3.2', title: 'Ders 3.2: Onu Kahramanın Yapacak Güçlü Hamleler', description: '', duration: '', completed: false },
      { id: '3.3', title: 'Ders 3.3: Kahraman İçgüdüsünü Baltalayan İyi Niyetli Hatalar', description: '', duration: '', completed: false },
      { id: '3.4', title: 'Ders 3.4: Vazgeçilmezlik Prensibi ve Bağlanma Psikolojisi', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '4',
    title: 'Bölüm 4: Sarsılmaz Özgüven ve Çekicilik Aurası',
    lessons: [
      { id: '4.1', title: 'Ders 4.1: "Yeterince İyi Değilim" İnancını Yıkmak', description: '', duration: '', completed: false },
      { id: '4.2', title: 'Ders 4.2: Çekicilik Fizik Değil, Enerjidir: Auranı Nasıl Parlatırsın?', description: '', duration: '', completed: false },
      { id: '4.3', title: 'Ders 4.3: Beden Dilinin Gizli Gücü: Özgüveni Yansıtmak', description: '', duration: '', completed: false },
      { id: '4.4', title: 'Ders 4.4: Onsuz da Mutlu Olan Kadının Karşı Konulmazlığı', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '5',
    title: 'Bölüm 5: İletişim Ustalığı',
    lessons: [
      { id: '5.1', title: 'Ders 5.1: Dırdır Etmek Yerine İlham Vermek: İsteklerini İletme Sanatı', description: '', duration: '', completed: false },
      { id: '5.2', title: 'Ders 5.2: Tartışmaları Yapıcı Sohbetlere Dönüştürmek', description: '', duration: '', completed: false },
      { id: '5.3', title: 'Ders 5.3: Aktif Dinleme: Sadece Duymak Değil, Anlamak', description: '', duration: '', completed: false },
      { id: '5.4', title: 'Ders 5.4: Merak Uyandıran ve Bağ Kuran Mesajlar', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '6',
    title: 'Bölüm 6: Sınırlar ve Güçlü Duruş',
    lessons: [
      { id: '6.1', title: 'Ders 6.1: Sınırlar Neden Zayıflık Değil, En Büyük Güçtür?', description: '', duration: '', completed: false },
      { id: '6.2', title: 'Ders 6.2: Kırmızı Bayrakları Tanıma Rehberi', description: '', duration: '', completed: false },
      { id: '6.3', title: 'Ders 6.3: Suçluluk Duymadan "Hayır" Deme Sanatı', description: '', duration: '', completed: false },
      { id: '6.4', title: 'Ders 6.4: Toksik İlişki Döngüsünü Kırmak', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '7',
    title: 'Bölüm 7: Eski Sevgilini Geri Döndür: Yol Haritası',
    lessons: [
      { id: '7.1', title: 'Ders 7.1: Ayrılık Sonrası Erkek Psikolojisi ve Geri Dönüş Sinyalleri', description: '', duration: '', completed: false },
      { id: '7.2', title: 'Ders 7.2: Stratejik Sessizlik ve Gücünü Geri Toplama', description: '', duration: '', completed: false },
      { id: '7.3', title: 'Ders 7.3: İlk Temas: Görünmez Kancayı Atmak', description: '', duration: '', completed: false },
      { id: '7.4', title: 'Ders 7.4: Pişmanlık Fısıltısı ve Doğru Zamanlama', description: '', duration: '', completed: false },
      { id: '7.5', title: 'Ders 7.5: Peki Ya Yeni Bir Sevgilisi Varsa?', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '8',
    title: 'Bölüm 8: Mevcut İlişkini Kurtar ve Canlandır: Yol Haritası',
    lessons: [
      { id: '8.1', title: 'Ders 8.1: Monotonluk Canavarını Anlamak', description: '', duration: '', completed: false },
      { id: '8.2', title: 'Ders 8.2: Tartışmaları Anında Bitiren Yaklaşımlar', description: '', duration: '', completed: false },
      { id: '8.3', title: 'Ders 8.3: O İlk Günkü Tutkuyu Yeniden Alevlendirmek', description: '', duration: '', completed: false },
      { id: '8.4', title: 'Ders 8.4: Cepteki Kadından Kraliçeye Yükselmek', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '9',
    title: 'Bölüm 9: Yeni Bir Aşk Yarat: Yol Haritası',
    lessons: [
      { id: '9.1', title: 'Ders 9.1: Çekim Stratejisi ve Doğru Zihniyet', description: '', duration: '', completed: false },
      { id: '9.2', title: 'Ders 9.2: Psikolojik Filtreleme ile Yanlış Erkekleri Tanıma', description: '', duration: '', completed: false },
      { id: '9.3', title: 'Ders 9.3: Kaliteli Erkeklerle Nerede ve Nasıl Tanışılır?', description: '', duration: '', completed: false },
      { id: '9.4', title: 'Ders 9.4: İlk Buluşmadan Kalıcı Bağlılığa Giden Yol', description: '', duration: '', completed: false },
    ],
  },
  {
    id: '10',
    title: 'Bölüm 10: Ustalık Taktikleri: Hızlı Başvuru Rehberi',
    lessons: [
      { id: '10.1', title: 'Ders 10.1: Pişmanlık Fısıltısının Derin Analizi', description: '', duration: '', completed: false },
      { id: '10.2', title: 'Ders 10.2: Sosyal Medyayı Zekice Kullanma Sanatı', description: '', duration: '', completed: false },
      { id: '10.3', title: 'Ders 10.3: Kahraman İçgüdüsü Tetikleyicileri', description: '', duration: '', completed: false },
      { id: '10.4', title: 'Ders 10.4: Yatırım Etkisi: Ona Daha Fazla Emek Vermesini Sağlamak', description: '', duration: '', completed: false },
      { id: '10.5', title: 'Ders 10.5: Kıskançlık Krizlerini Yönetme Sanatı', description: '', duration: '', completed: false },
    ],
  },
];

export default function LessonsScreen() {
  const insets = useSafeAreaInsets();

  const sections = useMemo(() => rawSections, []);

  const handleLessonPress = useCallback((lesson: LessonItem) => {
    console.log('[Lessons] Lesson pressed:', lesson.id, lesson.title);
    router.push({ pathname: '/(tabs)/lessons/[lessonId]', params: { lessonId: lesson.id, title: lesson.title } });
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
