import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ErrorBoundary from '@/components/ErrorBoundary';

const PRIMARY_50 = '#fef7f8';
const TEXT_900 = '#171112';
const SECONDARY_600 = '#87646a';

interface LessonContentItem {
  id: string;
  title: string;
  content: string;
}

const lessonsContent: Record<string, LessonContentItem> = {
  '1.1': { id: '1.1', title: 'Ders 1.1: Oyunun Kurallarını Değil, Oyunu Anlamayı Öğrenmek', content: 'Ders 1.1: Oyunun Kurallarını Değil, Oyunu Anlamayı Öğrenmek — placeholder içerik. content: "..."' },
  '1.2': { id: '1.2', title: 'Ders 1.2: Bu Bir Taktik Kitabı Değil, Bir Anlayış Rehberidir', content: 'Ders 1.2: Bu Bir Taktik Kitabı Değil, Bir Anlayış Rehberidir — placeholder içerik. content: "..."' },
  '1.3': { id: '1.3', title: 'Ders 1.3: Bu Yolculukta Kendini ve İlişkilerini Keşfet', content: 'Ders 1.3: Bu Yolculukta Kendini ve İlişkilerini Keşfet — placeholder içerik. content: "..."' },
  '2.1': { id: '2.1', title: 'Ders 2.1: Farklılıklarımız Aslında Gücümüzdür', content: 'Ders 2.1: Farklılıklarımız Aslında Gücümüzdür — placeholder içerik. content: "..."' },
  '2.2': { id: '2.2', title: 'Ders 2.2: Bir Erkeği Gerçekten Ne Motive Eder?', content: 'Ders 2.2: Bir Erkeği Gerçekten Ne Motive Eder? — placeholder içerik. content: "..."' },
  '2.3': { id: '2.3', title: 'Ders 2.3: İlişkilerde Sık Yapılan İletişim Varsayımları', content: 'Ders 2.3: İlişkilerde Sık Yapılan İletişim Varsayımları — placeholder içerik. content: "..."' },
  '2.4': { id: '2.4', title: 'Ders 2.4: Onun Çözüm Odaklılığı ve Senin Anlaşılma İhtiyacın', content: 'Ders 2.4: Onun Çözüm Odaklılığı ve Senin Anlaşılma İhtiyacın — placeholder içerik. content: "..."' },
  '3.1': { id: '3.1', title: 'Ders 3.1: Kahraman İçgüdüsü: Bir Erkeğin En Derin Arzusu', content: 'Ders 3.1: Kahraman İçgüdüsü: Bir Erkeğin En Derin Arzusu — placeholder içerik. content: "..."' },
  '3.2': { id: '3.2', title: 'Ders 3.2: Onun Kahramanı Olmanızı Sağlayacak Güçlü Yaklaşımlar', content: 'Ders 3.2: Onun Kahramanı Olmanızı Sağlayacak Güçlü Yaklaşımlar — placeholder içerik. content: "..."' },
  '3.3': { id: '3.3', title: 'Ders 3.3: İyi Niyetle Yapılan ve Bağlılığı Zayıflatan Hatalar', content: 'Ders 3.3: İyi Niyetle Yapılan ve Bağlılığı Zayıflatan Hatalar — placeholder içerik. content: "..."' },
  '3.4': { id: '3.4', title: 'Ders 3.4: Vazgeçilmezlik Prensibi ve Sağlıklı Bağlanma', content: 'Ders 3.4: Vazgeçilmezlik Prensibi ve Sağlıklı Bağlanma — placeholder içerik. content: "..."' },
  '4.1': { id: '4.1', title: 'Ders 4.1: "Yeterince İyi Değilim" İnancını Yıkmak', content: 'Ders 4.1: "Yeterince İyi Değilim" İnancını Yıkmak — placeholder içerik. content: "..."' },
  '4.2': { id: '4.2', title: 'Ders 4.2: Çekicilik Fizik Değil, Enerjidir: Auranı Nasıl Parlatırsın?', content: 'Ders 4.2: Çekicilik Fizik Değil, Enerjidir: Auranı Nasıl Parlatırsın? — placeholder içerik. content: "..."' },
  '4.3': { id: '4.3', title: 'Ders 4.3: Beden Dilinin Gizli Gücü: Özgüveni Yansıtmak', content: 'Ders 4.3: Beden Dilinin Gizli Gücü: Özgüveni Yansıtmak — placeholder içerik. content: "..."' },
  '4.4': { id: '4.4', title: 'Ders 4.4: Onsuz da Mutlu Olan Kadının Karşı Konulmazlığı', content: 'Ders 4.4: Onsuz da Mutlu Olan Kadının Karşı Konulmazlığı — placeholder içerik. content: "..."' },
  '5.1': { id: '5.1', title: 'Ders 5.1: Şikayet Etmek Yerine İlham Vermek: İsteklerini İletme Sanatı', content: 'Ders 5.1: Şikayet Etmek Yerine İlham Vermek: İsteklerini İletme Sanatı — placeholder içerik. content: "..."' },
  '5.2': { id: '5.2', title: 'Ders 5.2: Tartışmaları Yapıcı Sohbetlere Dönüştürme Yolları', content: 'Ders 5.2: Tartışmaları Yapıcı Sohbetlere Dönüştürme Yolları — placeholder içerik. content: "..."' },
  '5.3': { id: '5.3', title: 'Ders 5.3: Aktif Dinleme: Sadece Duymak Değil, Anlamak', content: 'Ders 5.3: Aktif Dinleme: Sadece Duymak Değil, Anlamak — placeholder içerik. content: "..."' },
  '5.4': { id: '5.4', title: 'Ders 5.4: Merak Uyandıran ve Bağ Kuran Mesajlar', content: 'Ders 5.4: Merak Uyandıran ve Bağ Kuran Mesajlar — placeholder içerik. content: "..."' },
  '6.1': { id: '6.1', title: 'Ders 6.1: Sınırlar Neden Zayıflık Değil, En Büyük Güçtür?', content: 'Ders 6.1: Sınırlar Neden Zayıflık Değil, En Büyük Güçtür? — placeholder içerik. content: "..."' },
  '6.2': { id: '6.2', title: 'Ders 6.2: Kırmızı Bayrakları Tanıma Rehberi', content: 'Ders 6.2: Kırmızı Bayrakları Tanıma Rehberi — placeholder içerik. content: "..."' },
  '6.3': { id: '6.3', title: 'Ders 6.3: Suçluluk Duymadan "Hayır" Deme Sanatı', content: 'Ders 6.3: Suçluluk Duymadan "Hayır" Deme Sanatı — placeholder içerik. content: "..."' },
  '6.4': { id: '6.4', title: 'Ders 6.4: Toksik İlişki Döngüsünü Kırmak', content: 'Ders 6.4: Toksik İlişki Döngüsünü Kırmak — placeholder içerik. content: "..."' },
  '7.1': { id: '7.1', title: 'Ders 7.1: Ayrılık Sonrası Erkek Psikolojisi ve Geri Dönüş Sinyalleri', content: 'Ders 7.1: Ayrılık Sonrası Erkek Psikolojisi ve Geri Dönüş Sinyalleri — placeholder içerik. content: "..."' },
  '7.2': { id: '7.2', title: 'Ders 7.2: Stratejik Sessizlik ve Gücünü Geri Toplama', content: 'Ders 7.2: Stratejik Sessizlik ve Gücünü Geri Toplama — placeholder içerik. content: "..."' },
  '7.3': { id: '7.3', title: 'Ders 7.3: İlk Temas: Merak Uyandıran ve Sağlıklı Bir Başlangıç', content: 'Ders 7.3: İlk Temas: Merak Uyandıran ve Sağlıklı Bir Başlangıç — placeholder içerik. content: "..."' },
  '7.4': { id: '7.4', title: 'Ders 7.4: Pişmanlık Fısıltısı ve Doğru Zamanlama', content: 'Ders 7.4: Pişmanlık Fısıltısı ve Doğru Zamanlama — placeholder içerik. content: "..."' },
  '7.5': { id: '7.5', title: 'Ders 7.5: Peki Ya Yeni Bir Sevgilisi Varsa?', content: 'Ders 7.5: Peki Ya Yeni Bir Sevgilisi Varsa? — placeholder içerik. content: "..."' },
  '8.1': { id: '8.1', title: 'Ders 8.1: Monotonluk Canavarını Anlamak', content: 'Ders 8.1: Monotonluk Canavarını Anlamak — placeholder içerik. content: "..."' },
  '8.2': { id: '8.2', title: 'Ders 8.2: Tartışmaları Anında Bitiren Yaklaşımlar', content: 'Ders 8.2: Tartışmaları Anında Bitiren Yaklaşımlar — placeholder içerik. content: "..."' },
  '8.3': { id: '8.3', title: 'Ders 8.3: O İlk Günkü Tutkuyu Yeniden Alevlendirmek', content: 'Ders 8.3: O İlk Günkü Tutkuyu Yeniden Alevlendirmek — placeholder içerik. content: "..."' },
  '8.4': { id: '8.4', title: 'Ders 8.4: Cepteki Kadından Kraliçeye Yükselmek', content: 'Ders 8.4: Cepteki Kadından Kraliçeye Yükselmek — placeholder içerik. content: "..."' },
  '9.1': { id: '9.1', title: 'Ders 9.1: Çekim Stratejisi ve Doğru Zihniyet', content: 'Ders 9.1: Çekim Stratejisi ve Doğru Zihniyet — placeholder içerik. content: "..."' },
  '9.2': { id: '9.2', title: 'Ders 9.2: Psikolojik Filtreleme ile Yanlış Erkekleri Tanıma', content: 'Ders 9.2: Psikolojik Filtreleme ile Yanlış Erkekleri Tanıma — placeholder içerik. content: "..."' },
  '9.3': { id: '9.3', title: 'Ders 9.3: Kaliteli Erkeklerle Nerede ve Nasıl Tanışılır?', content: 'Ders 9.3: Kaliteli Erkeklerle Nerede ve Nasıl Tanışılır? — placeholder içerik. content: "..."' },
  '9.4': { id: '9.4', title: 'Ders 9.4: İlk Buluşmadan Kalıcı Bağlılığa Giden Yol', content: 'Ders 9.4: İlk Buluşmadan Kalıcı Bağlılığa Giden Yol — placeholder içerik. content: "..."' },
  '10.1': { id: '10.1', title: 'Ders 10.1: Merak Uyandıran Mesajlar: Detaylı Analiz', content: 'Ders 10.1: Merak Uyandıran Mesajlar: Detaylı Analiz — placeholder içerik. content: "..."' },
  '10.2': { id: '10.2', title: 'Ders 10.2: Sosyal Medyayı Zekice Kullanma Sanatı', content: 'Ders 10.2: Sosyal Medyayı Zekice Kullanma Sanatı — placeholder içerik. content: "..."' },
  '10.3': { id: '10.3', title: 'Ders 10.3: Kahraman İçgüdüsü Tetikleyicileri', content: 'Ders 10.3: Kahraman İçgüdüsü Tetikleyicileri — placeholder içerik. content: "..."' },
  '10.4': { id: '10.4', title: 'Ders 10.4: Yatırım Etkisi: Ona Daha Fazla Emek Vermesini Sağlamak', content: 'Ders 10.4: Yatırım Etkisi: Ona Daha Fazla Emek Vermesini Sağlamak — placeholder içerik. content: "..."' },
  '10.5': { id: '10.5', title: 'Ders 10.5: Kıskançlık Krizlerini Sağlıklı Yönetme Sanatı', content: 'Ders 10.5: Kıskançlık Krizlerini Sağlıklı Yönetme Sanatı — placeholder içerik. content: "..."' },
};

export default function LessonDetailScreen() {
  const params = useLocalSearchParams<{ lessonId?: string; title?: string }>();
  const insets = useSafeAreaInsets();

  const lesson = useMemo<LessonContentItem | null>(() => {
    const id: string | undefined = params?.lessonId;
    const item: LessonContentItem | undefined = id ? lessonsContent[id] : undefined;
    return item ?? null;
  }, [params?.lessonId]);

  if (!lesson) {
    console.log('[LessonDetail] Lesson not found for id', params?.lessonId);
    return (
      <View style={[styles.container, { paddingTop: insets.top }]} testID="lesson-not-found">
        <Text style={styles.title}>Ders bulunamadı</Text>
        <Text style={styles.contentText}>Lütfen tekrar deneyin.</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <View style={[styles.container, { paddingTop: insets.top }]}>      
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.inner}>
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.contentText} selectable testID={`lesson-content-${lesson.id}`}>
              {lesson.content}
            </Text>
          </View>
        </ScrollView>
      </View>
    </ErrorBoundary>
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
  inner: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_900,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 16,
    color: SECONDARY_600,
    lineHeight: 24,
  },
});
