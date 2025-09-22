import React, { useMemo } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY_50 = '#fef7f8';
const PRIMARY_100 = '#fdeff1';
const PRIMARY_600 = '#ef8f9f';
const SECONDARY_600 = '#87646a';
const TEXT_900 = '#171112';

interface LessonMeta {
  id: string;
  title: string;
}

function useLessonMeta(): Record<string, LessonMeta> {
  return useMemo(() => ({
    '1.1': { id: '1.1', title: 'Ders 1.1: Oyunun Kurallarını Yeniden Yazmak' },
    '1.2': { id: '1.2', title: 'Ders 1.2: Bu Bir Kitap Değil, Bir Zihin Programıdır' },
    '1.3': { id: '1.3', title: 'Ders 1.3: Bu Dönüşüm Yolculuğunda Seni Neler Bekliyor?' },
    '2.1': { id: '2.1', title: 'Ders 2.1: Erkek ve Kadın Beyni Neden Farklı Çalışır?' },
    '2.2': { id: '2.2', title: 'Ders 2.2: Bir Erkeği Gerçekten Ne Motive Eder?' },
    '2.3': { id: '2.3', title: 'Ders 2.3: İlişkilerde Sık Yapılan İletişim Hataları' },
    '2.4': { id: '2.4', title: 'Ders 2.4: Onun Çözüm Odaklılığı ve Senin Anlaşılma İhtiyacın' },
    '3.1': { id: '3.1', title: 'Ders 3.1: Kahraman İçgüdüsü: Erkeklerin Gizli İşletim Sistemi' },
    '3.2': { id: '3.2', title: 'Ders 3.2: Onu Kahramanın Yapacak Güçlü Hamleler' },
    '3.3': { id: '3.3', title: 'Ders 3.3: Kahraman İçgüdüsünü Baltalayan İyi Niyetli Hatalar' },
    '3.4': { id: '3.4', title: 'Ders 3.4: Vazgeçilmezlik Prensibi ve Bağlanma Psikolojisi' },
    '4.1': { id: '4.1', title: 'Ders 4.1: "Yeterince İyi Değilim" İnancını Yıkmak' },
    '4.2': { id: '4.2', title: 'Ders 4.2: Çekicilik Fizik Değil, Enerjidir: Auranı Nasıl Parlatırsın?' },
    '4.3': { id: '4.3', title: 'Ders 4.3: Beden Dilinin Gizli Gücü: Özgüveni Yansıtmak' },
    '4.4': { id: '4.4', title: 'Ders 4.4: Onsuz da Mutlu Olan Kadının Karşı Konulmazlığı' },
    '5.1': { id: '5.1', title: 'Ders 5.1: Dırdır Etmek Yerine İlham Vermek: İsteklerini İletme Sanatı' },
    '5.2': { id: '5.2', title: 'Ders 5.2: Tartışmaları Yapıcı Sohbetlere Dönüştürmek' },
    '5.3': { id: '5.3', title: 'Ders 5.3: Aktif Dinleme: Sadece Duymak Değil, Anlamak' },
    '5.4': { id: '5.4', title: 'Ders 5.4: Merak Uyandıran ve Bağ Kuran Mesajlar' },
    '6.1': { id: '6.1', title: 'Ders 6.1: Sınırlar Neden Zayıflık Değil, En Büyük Güçtür?' },
    '6.2': { id: '6.2', title: 'Ders 6.2: Kırmızı Bayrakları Tanıma Rehberi' },
    '6.3': { id: '6.3', title: 'Ders 6.3: Suçluluk Duymadan "Hayır" Deme Sanatı' },
    '6.4': { id: '6.4', title: 'Ders 6.4: Toksik İlişki Döngüsünü Kırmak' },
    '7.1': { id: '7.1', title: 'Ders 7.1: Ayrılık Sonrası Erkek Psikolojisi ve Geri Dönüş Sinyalleri' },
    '7.2': { id: '7.2', title: 'Ders 7.2: Stratejik Sessizlik ve Gücünü Geri Toplama' },
    '7.3': { id: '7.3', title: 'Ders 7.3: İlk Temas: Görünmez Kancayı Atmak' },
    '7.4': { id: '7.4', title: 'Ders 7.4: Pişmanlık Fısıltısı ve Doğru Zamanlama' },
    '7.5': { id: '7.5', title: 'Ders 7.5: Peki Ya Yeni Bir Sevgilisi Varsa?' },
    '8.1': { id: '8.1', title: 'Ders 8.1: Monotonluk Canavarını Anlamak' },
    '8.2': { id: '8.2', title: 'Ders 8.2: Tartışmaları Anında Bitiren Yaklaşımlar' },
    '8.3': { id: '8.3', title: 'Ders 8.3: O İlk Günkü Tutkuyu Yeniden Alevlendirmek' },
    '8.4': { id: '8.4', title: 'Ders 8.4: Cepteki Kadından Kraliçeye Yükselmek' },
    '9.1': { id: '9.1', title: 'Ders 9.1: Çekim Stratejisi ve Doğru Zihniyet' },
    '9.2': { id: '9.2', title: 'Ders 9.2: Psikolojik Filtreleme ile Yanlış Erkekleri Tanıma' },
    '9.3': { id: '9.3', title: 'Ders 9.3: Kaliteli Erkeklerle Nerede ve Nasıl Tanışılır?' },
    '9.4': { id: '9.4', title: 'Ders 9.4: İlk Buluşmadan Kalıcı Bağlılığa Giden Yol' },
    '10.1': { id: '10.1', title: 'Ders 10.1: Pişmanlık Fısıltısının Derin Analizi' },
    '10.2': { id: '10.2', title: 'Ders 10.2: Sosyal Medyayı Zekice Kullanma Sanatı' },
    '10.3': { id: '10.3', title: 'Ders 10.3: Kahraman İçgüdüsü Tetikleyicileri' },
    '10.4': { id: '10.4', title: 'Ders 10.4: Yatırım Etkisi: Ona Daha Fazla Emek Vermesini Sağlamak' },
    '10.5': { id: '10.5', title: 'Ders 10.5: Kıskançlık Krizlerini Yönetme Sanatı' },
  }), []);
}

function generatePlaceholderParagraphs(id: string): string[] {
  const base = '[PLACEHOLDER] Bu içerik yakında eklenecek. Bu bir yer tutucudur.';
  const count = 6;
  const parts: string[] = [];
  for (let i = 0; i < count; i += 1) {
    parts.push(`${base} (Bölüm ${id} – paragraf ${i + 1})`);
  }
  return parts;
}

export default function LessonDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id: rawId, title: rawTitle } = useLocalSearchParams<{ id?: string; title?: string }>();
  const id = (typeof rawId === 'string' ? rawId : '').trim();
  const providedTitle = (typeof rawTitle === 'string' ? rawTitle : '').trim();

  const metaMap = useLessonMeta();
  const meta = metaMap[id];
  const title = providedTitle || meta?.title || 'Ders';

  const paragraphs = useMemo(() => generatePlaceholderParagraphs(id || 'X'), [id]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title,
        }}
      />
      <ScrollView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]} contentContainerStyle={styles.content} testID="lesson-detail-scroll">
        <View style={styles.header}>
          <Text style={styles.badge} testID="lesson-id">{id ? `Ders ${id}` : 'Ders'}</Text>
          <Text style={styles.title} numberOfLines={2} testID="lesson-title">{title}</Text>
          <Text style={styles.subtitle} testID="lesson-subtitle">Yer tutucu içerik — detayları burada göstereceğiz.</Text>
        </View>
        {paragraphs.map((p, idx) => (
          <Text key={`p-${idx}`} style={styles.paragraph} testID={`paragraph-${idx}`}>{p}</Text>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
  },
  header: {
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: PRIMARY_100,
    color: PRIMARY_600,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: TEXT_900,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: SECONDARY_600,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: TEXT_900,
    marginTop: 16,
  },
});
