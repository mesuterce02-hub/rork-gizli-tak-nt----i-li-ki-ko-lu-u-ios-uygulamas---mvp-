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
  '1.1': { id: '1.1', title: 'Ders 1.1: Oyunun Kurallarını Yeniden Yazmak', content: 'Bölüm 1: Yeni Bir Başlangıç: Gizli Takıntı Felsefesi\n\nDers 1.1: Oyunun Kurallarını Yeniden Yazmak\n\nGiriş: Tanıdık Bir Kırılma Anı\n\nMerhaba ve yeni yolculuğuna hoş geldin.\n\nBu uygulamayı açtıysan, muhtemelen kendini aşk oyununda kaybetmiş hissediyorsun. Belki kalbin kırıldı ve unutamadığın birini geri istiyorsun. Belki de tutkusu sönmüş, ilgisiz bir ilişkinin içinde fark edilmeyi bekliyorsun. Ya da belki de doğru kişiyi bulma umudunu yitirmiş, flört dünyasının yorucu kurallarından bıkmış durumdasın.\n\nDurumun ne olursa olsun, ortak bir gerçek var: Seni yoran, kıran ve belki de bitiren bir şeyler oldu.\n\nBir zamanlar her şeyin yolunda olduğunu sandığın bir hikâyenin içindeydin. Ama sonra, bir anda olmasa da, yavaş yavaş bir şeyler değişti. Belki eskisi gibi sevilmediğini hissettin, belki de aranızdaki o sihir kayboldu. Sen bu durumu anlamak ve düzeltmek için, içgüdüsel olarak bildiğin tek şeyi yaptın: Daha çok sevdin, daha çok konuştun, daha çok çabaladın. Ve muhtemelen, tam da orada gücünü kaybettin.\n\nAma artık o sayfa kapandı. Çünkü bu dersle birlikte sadece ne yapman gerektiğini öğrenmeyeceksin; oyunun kurallarını temelden değiştireceksin. Artık kaybetmeyeceksin.\n\n\nEski Kurallar: Neden Şimdiye Kadar İşe Yaramadı?\n\nŞimdiye kadar ilişkilerde sana öğretilen veya içgüdüsel olarak doğru sandığın bazı kurallar vardı. Bu kurallar, aslında enerjini tüketen ve gücünü karşı tarafa teslim eden hamlelerdi. Gel, bu kuralları ve neden hedefine ulaşmanı engellediklerini dürüstçe inceleyelim:\n\nEski Kural 1: "Daha çok seversem, o da beni daha çok sever."\nSenin Hamlen: Bir erkeğin (eski sevgilin, mevcut partnerin veya yeni flörtün) ilgisi azaldığında, sen sevgini artırdın. Fedakarlık yaptın, zamanının ve sabrının tamamını ona adadın.\nNeden İşe Yaramadı?: Erkek psikolojisi, sürekli ve koşulsuz sunulan sevgiyi bir "garanti" olarak görür. Sen sevgini artırdıkça, onun için "zaten cepte olan" ve çaba göstermesi gerekmeyen biri haline geldin. Erkekler aşık olmaz; bağlanırlar. Ve bağlanmaları için, bir şeyi kaybetme ihtimalini hissetmeleri gerekir.\n\nEski Kural 2: "Daha çok konuşursam, sorunları çözerim."\nSenin Hamlen: Aranızdaki soğukluğu fark ettiğinde, bunu konuşarak çözmeye çalıştın. "Neden böylesin?", "Seninle böyle olmamalıydı" gibi cümlelerle durumu anlamlandırmaya ve onu konuşturmaya çabaladın. Unutulmamak için daha çok konuştun.\nNeden İşe Yaramadı?: Erkek zihni, duygusal baskı altında yavaşlar ve içe kapanır. Senin "konuşalım" çaban, onun zihninde "yine sorun çıkarıyor" olarak kodlanır. Bir kadın sessizliğiyle ortadan kaybolduğunda, erkek ilk defa "kaybetmiş" gibi hisseder. Konuşmaların ise sadece anlık bir stres yaratır ve sonra unutulur.\n\nEski Kural 3: "Onun için daha çok çabalarsam, ne kadar değerli olduğumu anlar."\nSenin Hamlen: İlişkiyi ayakta tutmak için tek başına mücadele ettin. Onun hayatını kolaylaştırdın, arkasını topladın, onun için koşturdun.\nNeden İşe Yaramadı?: Bir erkek, bir kadın için çaba harcadığında ona yatırım yapmış olur ve yatırım yaptığı şeye bağlanır. Sen onun yerine çabaladığında, bu denklemi tersine çevirdin. O, senin değerini anlamak yerine, senin bu çabaya "mecbur" olduğunu düşündü ve rahat bir konfor alanına yerleşti.\n\n\nYeni Kurallar: Gücünü Geri Alma Sanatı\n\n"Gizli Takıntı Felsefesi" bir erkeği manipüle etme sanatı değildir. Bu, kadınlığının doğasında var olan o "karanlık ama kutsal gücü" uyandırma sanatıdır. Bu güç, kovalamayı bırakıp çekim merkezi olmayı seçtiğinde ortaya çıkar.\n\nİşte oyunu lehine çevirecek yeni kuralların:\n\nYeni Kural 1: Sevgini Vermek Değil, Geri Çekmek Bağ Kurar.\nYeni Felsefe: Değerin, ne kadar verdiğinle değil, yokluğunda ne kadar hissedildiğinle ölçülür. Bazı kadınlar kendini verirken, bazıları kendini geri çeker. Ve erkekler, daima geri çekilenin peşinden gider.\nUygulama: Enerjini ona odaklamak yerine, bilinçli olarak kendine yönelteceksin. Onun hayatının merkezi olmaya çalışmak yerine, kendi hayatının merkezine döneceksin.\n\nYeni Kural 2: Konuşmak Değil, Sessizlik Merak Uyandırır.\nYeni Felsefe: Bir erkek, senin yokluğunu ancak sen sustuğunda fark eder. Cevapların değil, cevapsız bıraktığın sorular onun zihninde yer eder.\nUygulama: Tepki vermemeyi öğreneceksin. Uzun mesajlar atmak yerine, sessiz kalmanın zihinsel bir üstünlük olduğunu keşfedeceksin. Bırak o senin ne düşündüğünü, ne hissettiğini merak etsin.\n\nYeni Kural 3: Çabalamak Değil, Kendi Değerini Bilmek Çekim Yaratır.\nYeni Felsefe: Sen bir ödülsün ve ödüller kimsenin peşinden koşmaz. Erkek beyni, "elde edilebilir" olanı değil, çözülmesi ve kazanılması gerekeni arzular.\nUygulama: Bir erkeği veya ilişkiyi kurtarmaya çalışmayı bırakacaksın. Bunun yerine kendi hayatını, kendi enerjini ve kendi mutluluğunu inşa etmeye odaklanacaksın. Sen hayatına devam ettikçe, o yerinde kalamaz.\n\nİlk Adım: Farkındalık Egzersizi\n\nBu dersi bitirmeden önce bir an dur ve düşün.\nGözlerini kapat ve ilişkilerdeki en son hayal kırıklığını hatırla. Bu bir ayrılık, mevcut partnerinle yaşadığın bir tartışma veya yolunda gitmeyen bir flört olabilir. O an, yukarıda listelenen "Eski Kurallar"dan hangisini uygulamıştın?\n\n- Daha çok sevgi mi gösterdin?\n- Durumu konuşarak çözmeye mi çalıştın?\n- Onun için daha fazla mı çabaladın?\n\nSonuç ne oldu? Bu hamlen seni istediğin yere getirdi mi?\nCevabını bir yere not almana gerek yok. Sadece bu anıyla yüzleş. Çünkü neyin işe yaramadığını anladığın an, gücünü geri kazanmaya başladığın andır.\n\n\nDers Özeti:\n\n- Eski Oyun: Daha çok sevmek, daha çok konuşmak ve daha çok çabalamak, hangi durumda olursan ol, seni değerli kılmak yerine kaybettirdi.\n- Temel Hata: Kendi değerini bir erkeğe kanıtlamaya çalışarak, gücünü kendi ellerinle ona teslim ettin.\n- Yeni Oyun: Gerçek güç; enerjini geri çekmekte, stratejik sessizlikte ve odağını ondan alıp kendi hayatına vermekte yatar.\n- Nihai Hedef: Bu yolculukta amaç sadece bir erkeği elde etmek veya bir ilişkiyi düzeltmek değil; kendini kaybetmiş olan o kadını, yani *seni*, sana geri kazandırmaktır. Bunu başardığında, istediğin ilişki dinamiği zaten sana doğru çekilecektir.' },
  '1.2': { id: '1.2', title: 'Ders 1.2: Bu Bir Kitap Değil, Bir Zihin Programıdır', content: 'Ders 1.2: Bu Bir Kitap Değil, Bir Zihin Programıdır — placeholder içerik. content: "..."' },
  '1.3': { id: '1.3', title: 'Ders 1.3: Bu Dönüşüm Yolculuğunda Seni Neler Bekliyor?', content: 'Ders 1.3: Bu Dönüşüm Yolculuğunda Seni Neler Bekliyor? — placeholder içerik. content: "..."' },
  '2.1': { id: '2.1', title: 'Ders 2.1: Erkek ve Kadın Beyni Neden Farklı Çalışır?', content: 'Ders 2.1: Erkek ve Kadın Beyni Neden Farklı Çalışır? — placeholder içerik. content: "..."' },
  '2.2': { id: '2.2', title: 'Ders 2.2: Bir Erkeği Gerçekten Ne Motive Eder?', content: 'Ders 2.2: Bir Erkeği Gerçekten Ne Motive Eder? — placeholder içerik. content: "..."' },
  '2.3': { id: '2.3', title: 'Ders 2.3: İlişkilerde Sık Yapılan İletişim Hataları', content: 'Ders 2.3: İlişkilerde Sık Yapılan İletişim Hataları — placeholder içerik. content: "..."' },
  '2.4': { id: '2.4', title: 'Ders 2.4: Onun Çözüm Odaklılığı ve Senin Anlaşılma İhtiyacın', content: 'Ders 2.4: Onun Çözüm Odaklılığı ve Senin Anlaşılma İhtiyacın — placeholder içerik. content: "..."' },
  '3.1': { id: '3.1', title: 'Ders 3.1: Kahraman İçgüdüsü: Erkeklerin Gizli İşletim Sistemi', content: 'Ders 3.1: Kahraman İçgüdüsü: Erkeklerin Gizli İşletim Sistemi — placeholder içerik. content: "..."' },
  '3.2': { id: '3.2', title: 'Ders 3.2: Onu Kahramanın Yapacak Güçlü Hamleler', content: 'Ders 3.2: Onu Kahramanın Yapacak Güçlü Hamleler — placeholder içerik. content: "..."' },
  '3.3': { id: '3.3', title: 'Ders 3.3: Kahraman İçgüdüsünü Baltalayan İyi Niyetli Hatalar', content: 'Ders 3.3: Kahraman İçgüdüsünü Baltalayan İyi Niyetli Hatalar — placeholder içerik. content: "..."' },
  '3.4': { id: '3.4', title: 'Ders 3.4: Vazgeçilmezlik Prensibi ve Bağlanma Psikolojisi', content: 'Ders 3.4: Vazgeçilmezlik Prensibi ve Bağlanma Psikolojisi — placeholder içerik. content: "..."' },
  '4.1': { id: '4.1', title: 'Ders 4.1: "Yeterince İyi Değilim" İnancını Yıkmak', content: 'Ders 4.1: "Yeterince İyi Değilim" İnancını Yıkmak — placeholder içerik. content: "..."' },
  '4.2': { id: '4.2', title: 'Ders 4.2: Çekicilik Fizik Değil, Enerjidir: Auranı Nasıl Parlatırsın?', content: 'Ders 4.2: Çekicilik Fizik Değil, Enerjidir: Auranı Nasıl Parlatırsın? — placeholder içerik. content: "..."' },
  '4.3': { id: '4.3', title: 'Ders 4.3: Beden Dilinin Gizli Gücü: Özgüveni Yansıtmak', content: 'Ders 4.3: Beden Dilinin Gizli Gücü: Özgüveni Yansıtmak — placeholder içerik. content: "..."' },
  '4.4': { id: '4.4', title: 'Ders 4.4: Onsuz da Mutlu Olan Kadının Karşı Konulmazlığı', content: 'Ders 4.4: Onsuz da Mutlu Olan Kadının Karşı Konulmazlığı — placeholder içerik. content: "..."' },
  '5.1': { id: '5.1', title: 'Ders 5.1: Dırdır Etmek Yerine İlham Vermek: İsteklerini İletme Sanatı', content: 'Ders 5.1: Dırdır Etmek Yerine İlham Vermek: İsteklerini İletme Sanatı — placeholder içerik. content: "..."' },
  '5.2': { id: '5.2', title: 'Ders 5.2: Tartışmaları Yapıcı Sohbetlere Dönüştürmek', content: 'Ders 5.2: Tartışmaları Yapıcı Sohbetlere Dönüştürmek — placeholder içerik. content: "..."' },
  '5.3': { id: '5.3', title: 'Ders 5.3: Aktif Dinleme: Sadece Duymak Değil, Anlamak', content: 'Ders 5.3: Aktif Dinleme: Sadece Duymak Değil, Anlamak — placeholder içerik. content: "..."' },
  '5.4': { id: '5.4', title: 'Ders 5.4: Merak Uyandıran ve Bağ Kuran Mesajlar', content: 'Ders 5.4: Merak Uyandıran ve Bağ Kuran Mesajlar — placeholder içerik. content: "..."' },
  '6.1': { id: '6.1', title: 'Ders 6.1: Sınırlar Neden Zayıflık Değil, En Büyük Güçtür?', content: 'Ders 6.1: Sınırlar Neden Zayıflık Değil, En Büyük Güçtür? — placeholder içerik. content: "..."' },
  '6.2': { id: '6.2', title: 'Ders 6.2: Kırmızı Bayrakları Tanıma Rehberi', content: 'Ders 6.2: Kırmızı Bayrakları Tanıma Rehberi — placeholder içerik. content: "..."' },
  '6.3': { id: '6.3', title: 'Ders 6.3: Suçluluk Duymadan "Hayır" Deme Sanatı', content: 'Ders 6.3: Suçluluk Duymadan "Hayır" Deme Sanatı — placeholder içerik. content: "..."' },
  '6.4': { id: '6.4', title: 'Ders 6.4: Toksik İlişki Döngüsünü Kırmak', content: 'Ders 6.4: Toksik İlişki Döngüsünü Kırmak — placeholder içerik. content: "..."' },
  '7.1': { id: '7.1', title: 'Ders 7.1: Ayrılık Sonrası Erkek Psikolojisi ve Geri Dönüş Sinyalleri', content: 'Ders 7.1: Ayrılık Sonrası Erkek Psikolojisi ve Geri Dönüş Sinyalleri — placeholder içerik. content: "..."' },
  '7.2': { id: '7.2', title: 'Ders 7.2: Stratejik Sessizlik ve Gücünü Geri Toplama', content: 'Ders 7.2: Stratejik Sessizlik ve Gücünü Geri Toplama — placeholder içerik. content: "..."' },
  '7.3': { id: '7.3', title: 'Ders 7.3: İlk Temas: Görünmez Kancayı Atmak', content: 'Ders 7.3: İlk Temas: Görünmez Kancayı Atmak — placeholder içerik. content: "..."' },
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
  '10.1': { id: '10.1', title: 'Ders 10.1: Pişmanlık Fısıltısının Derin Analizi', content: 'Ders 10.1: Pişmanlık Fısıltısının Derin Analizi — placeholder içerik. content: "..."' },
  '10.2': { id: '10.2', title: 'Ders 10.2: Sosyal Medyayı Zekice Kullanma Sanatı', content: 'Ders 10.2: Sosyal Medyayı Zekice Kullanma Sanatı — placeholder içerik. content: "..."' },
  '10.3': { id: '10.3', title: 'Ders 10.3: Kahraman İçgüdüsü Tetikleyicileri', content: 'Ders 10.3: Kahraman İçgüdüsü Tetikleyicileri — placeholder içerik. content: "..."' },
  '10.4': { id: '10.4', title: 'Ders 10.4: Yatırım Etkisi: Ona Daha Fazla Emek Vermesini Sağlamak', content: 'Ders 10.4: Yatırım Etkisi: Ona Daha Fazla Emek Vermesini Sağlamak — placeholder içerik. content: "..."' },
  '10.5': { id: '10.5', title: 'Ders 10.5: Kıskançlık Krizlerini Yönetme Sanatı', content: 'Ders 10.5: Kıskançlık Krizlerini Yönetme Sanatı — placeholder içerik. content: "..."' },
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
