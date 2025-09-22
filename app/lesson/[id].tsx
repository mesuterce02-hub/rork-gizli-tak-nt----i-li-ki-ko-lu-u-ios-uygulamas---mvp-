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
    '1.1': { id: '1.1', title: 'Bölüm 1: Yeni Bir Başlangıç: Gizli Takıntı Felsefesi\n\nDers 1.1: Oyunun Kurallarını Yeniden Yazmak\n\nGiriş: Tanıdık Bir Kırılma Anı\n\nMerhaba ve yeni yolculuğuna hoş geldin.\n\nBu uygulamayı açtıysan, muhtemelen kendini aşk oyununda kaybetmiş hissediyorsun. Belki kalbin kırıldı ve unutamadığın birini geri istiyorsun. Belki de tutkusu sönmüş, ilgisiz bir ilişkinin içinde fark edilmeyi bekliyorsun. Ya da belki de doğru kişiyi bulma umudunu yitirmiş, flört dünyasının yorucu kurallarından bıkmış durumdasın.\n\nDurumun ne olursa olsun, ortak bir gerçek var: Seni yoran, kıran ve belki de bitiren bir şeyler oldu.\n\nBir zamanlar her şeyin yolunda olduğunu sandığın bir hikâyenin içindeydin. Ama sonra, bir anda olmasa da, yavaş yavaş bir şeyler değişti. Belki eskisi gibi sevilmediğini hissettin, belki de aranızdaki o sihir kayboldu. Sen bu durumu anlamak ve düzeltmek için, içgüdüsel olarak bildiğin tek şeyi yaptın: Daha çok sevdin, daha çok konuştun, daha çok çabaladın. Ve muhtemelen, tam da orada gücünü kaybettin.\n\nAma artık o sayfa kapandı. Çünkü bu dersle birlikte sadece ne yapman gerektiğini öğrenmeyeceksin; oyunun kurallarını temelden değiştireceksin. Artık kaybetmeyeceksin.\n\n\nEski Kurallar: Neden Şimdiye Kadar İşe Yaramadı?\n\nŞimdiye kadar ilişkilerde sana öğretilen veya içgüdüsel olarak doğru sandığın bazı kurallar vardı. Bu kurallar, aslında enerjini tüketen ve gücünü karşı tarafa teslim eden hamlelerdi. Gel, bu kuralları ve neden hedefine ulaşmanı engellediklerini dürüstçe inceleyelim:\n\nEski Kural 1: "Daha çok seversem, o da beni daha çok sever."\nSenin Hamlen: Bir erkeğin (eski sevgilin, mevcut partnerin veya yeni flörtün) ilgisi azaldığında, sen sevgini artırdın. Fedakarlık yaptın, zamanının ve sabrının tamamını ona adadın.\nNeden İşe Yaramadı?: Erkek psikolojisi, sürekli ve koşulsuz sunulan sevgiyi bir "garanti" olarak görür. Sen sevgini artırdıkça, onun için "zaten cepte olan" ve çaba göstermesi gerekmeyen biri haline geldin. Erkekler aşık olmaz; bağlanırlar. Ve bağlanmaları için, bir şeyi kaybetme ihtimalini hissetmeleri gerekir.\n\nEski Kural 2: "Daha çok konuşursam, sorunları çözerim."\nSenin Hamlen: Aranızdaki soğukluğu fark ettiğinde, bunu konuşarak çözmeye çalıştın. "Neden böylesin?", "Seninle böyle olmamalıydı" gibi cümlelerle durumu anlamlandırmaya ve onu konuşturmaya çabaladın. Unutulmamak için daha çok konuştun.\nNeden İşe Yaramadı?: Erkek zihni, duygusal baskı altında yavaşlar ve içe kapanır. Senin "konuşalım" çaban, onun zihninde "yine sorun çıkarıyor" olarak kodlanır. Bir kadın sessizliğiyle ortadan kaybolduğunda, erkek ilk defa "kaybetmiş" gibi hisseder. Konuşmaların ise sadece anlık bir stres yaratır ve sonra unutulur.\n\nEski Kural 3: "Onun için daha çok çabalarsam, ne kadar değerli olduğumu anlar."\nSenin Hamlen: İlişkiyi ayakta tutmak için tek başına mücadele ettin. Onun hayatını kolaylaştırdın, arkasını topladın, onun için koşturdun.\nNeden İşe Yaramadı?: Bir erkek, bir kadın için çaba harcadığında ona yatırım yapmış olur ve yatırım yaptığı şeye bağlanır. Sen onun yerine çabaladığında, bu denklemi tersine çevirdin. O, senin değerini anlamak yerine, senin bu çabaya "mecbur" olduğunu düşündü ve rahat bir konfor alanına yerleşti.\n\n\nYeni Kurallar: Gücünü Geri Alma Sanatı\n\n"Gizli Takıntı Felsefesi" bir erkeği manipüle etme sanatı değildir. Bu, kadınlığının doğasında var olan o "karanlık ama kutsal gücü" uyandırma sanatıdır. Bu güç, kovalamayı bırakıp çekim merkezi olmayı seçtiğinde ortaya çıkar.\n\nİşte oyunu lehine çevirecek yeni kuralların:\n\nYeni Kural 1: Sevgini Vermek Değil, Geri Çekmek Bağ Kurar.\nYeni Felsefe: Değerin, ne kadar verdiğinle değil, yokluğunda ne kadar hissedildiğinle ölçülür. Bazı kadınlar kendini verirken, bazıları kendini geri çeker. Ve erkekler, daima geri çekilenin peşinden gider.\nUygulama: Enerjini ona odaklamak yerine, bilinçli olarak kendine yönelteceksin. Onun hayatının merkezi olmaya çalışmak yerine, kendi hayatının merkezine döneceksin.\n\nYeni Kural 2: Konuşmak Değil, Sessizlik Merak Uyandırır.\nYeni Felsefe: Bir erkek, senin yokluğunu ancak sen sustuğunda fark eder. Cevapların değil, cevapsız bıraktığın sorular onun zihninde yer eder.\nUygulama: Tepki vermemeyi öğreneceksin. Uzun mesajlar atmak yerine, sessiz kalmanın zihinsel bir üstünlük olduğunu keşfedeceksin. Bırak o senin ne düşündüğünü, ne hissettiğini merak etsin.\n\nYeni Kural 3: Çabalamak Değil, Kendi Değerini Bilmek Çekim Yaratır.\nYeni Felsefe: Sen bir ödülsün ve ödüller kimsenin peşinden koşmaz. Erkek beyni, "elde edilebilir" olanı değil, çözülmesi ve kazanılması gerekeni arzular.\nUygulama: Bir erkeği veya ilişkiyi kurtarmaya çalışmayı bırakacaksın. Bunun yerine kendi hayatını, kendi enerjini ve kendi mutluluğunu inşa etmeye odaklanacaksın. Sen hayatına devam ettikçe, o yerinde kalamaz.\n\nİlk Adım: Farkındalık Egzersizi\n\nBu dersi bitirmeden önce bir an dur ve düşün.\nGözlerini kapat ve ilişkilerdeki en son hayal kırıklığını hatırla. Bu bir ayrılık, mevcut partnerinle yaşadığın bir tartışma veya yolunda gitmeyen bir flört olabilir. O an, yukarıda listelenen "Eski Kurallar"dan hangisini uygulamıştın?\n\n- Daha çok sevgi mi gösterdin?\n- Durumu konuşarak çözmeye mi çalıştın?\n- Onun için daha fazla mı çabaladın?\n\nSonuç ne oldu? Bu hamlen seni istediğin yere getirdi mi?\nCevabını bir yere not almana gerek yok. Sadece bu anıyla yüzleş. Çünkü neyin işe yaramadığını anladığın an, gücünü geri kazanmaya başladığın andır.\n\n\nDers Özeti:\n\n- Eski Oyun: Daha çok sevmek, daha çok konuşmak ve daha çok çabalamak, hangi durumda olursan ol, seni değerli kılmak yerine kaybettirdi.\n- Temel Hata: Kendi değerini bir erkeğe kanıtlamaya çalışarak, gücünü kendi ellerinle ona teslim ettin.\n- Yeni Oyun: Gerçek güç; enerjini geri çekmekte, stratejik sessizlikte ve odağını ondan alıp kendi hayatına vermekte yatar.\n- Nihai Hedef: Bu yolculukta amaç sadece bir erkeği elde etmek veya bir ilişkiyi düzeltmek değil; kendini kaybetmiş olan o kadını, yani *seni*, sana geri kazandırmaktır. Bunu başardığında, istediğin ilişki dinamiği zaten sana doğru çekilecektir.' },
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

function generatePlaceholderContent(title: string): string {
  return title || 'Yer tutucu içerik';
}

export default function LessonDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id: rawId, title: rawTitle } = useLocalSearchParams<{ id?: string; title?: string }>();
  const id = (typeof rawId === 'string' ? rawId : '').trim();
  const providedTitle = (typeof rawTitle === 'string' ? rawTitle : '').trim();

  const metaMap = useLessonMeta();
  const meta = metaMap[id];
  const title = providedTitle || meta?.title || 'Ders';

  const placeholder = useMemo(() => generatePlaceholderContent(title), [title]);

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
        <Text style={styles.paragraph} testID="lesson-placeholder">{placeholder}</Text>
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
