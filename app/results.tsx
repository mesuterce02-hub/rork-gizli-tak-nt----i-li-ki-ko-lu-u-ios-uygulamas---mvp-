import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// --- GÖRSEL İYİLEŞTİRME 1: İkonlar ve Gradient ---
// Uygulamaya görsel zenginlik katmak için ikonlar ve gradient arka plan ekliyoruz.
// Bunlar Expo projesinde zaten mevcuttur veya kolayca eklenebilir.
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
// ----------------------------------------------------

// Projenin kendi component'larını ve renklerini kullandığını varsayıyorum
import { Colors } from '@/constants/colors'; // Renklerimizi burada daha sofistike hale getireceğiz
import { PrimaryButton } from '@/components/PrimaryButton';

// Kart arayüzüne ikon ekliyoruz
interface ScoreCard {
  title: string;
  score: 'İYİ' | 'GELİŞTİRİLMESİ GEREK';
  description: string;
  icon: keyof typeof Feather.glyphMap; // İkonları taşımak için
}

interface AvatarResult {
  title: string;
  diagnosis: string;
  cards: ScoreCard[];
  solutionTitle: string;
  solution: string;
  solutionPoints: string[];
}

// --- COPYWRITING İYİLEŞTİRMESİ 1: Metinleri Güçlendirme ---
// Tüm metinleri daha empatik, daha güçlü ve daha vaat odaklı hale getiriyoruz.
const avatarResults: Record<string, AvatarResult> = {
  eski: {
    title: 'İlişki Analiz Raporun Hazır!',
    diagnosis: 'Analiz Sonucun: "Kırık Pusula". Kalbin hala onu gösteriyor ama şu anki adımların seni ondan daha da uzaklaştırıyor. Pusulanı yeniden ayarlama ve aşk hayatının kontrolünü tamamen eline alma zamanı.',
    cards: [
      {
        title: 'SEVGİ BAĞI',
        score: 'İYİ',
        icon: 'heart',
        description: 'Aranızdaki güçlü anılar ve sevgi bağı, hala en büyük kozun. Bu, üzerine yeni ve daha güçlü bir başlangıç inşa edebileceğin sağlam bir temel.'
      },
      {
        title: 'İLETİŞİM STRATEJİSİ',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'message-circle',
        description: 'Ayrılık sonrası sessizliğin veya attığın mesajlar, gücünü göstermek yerine paniğini yansıtıyor. Bu, aranızdaki görünmez duvarı her gün bir tuğla daha yükseltiyor.'
      },
      {
        title: 'PSİKOLOJİK ÇEKİM',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'magnet',
        description: 'Şu anki enerjin, onda bir "kaybetme korkusu" veya "merak" uyandırmıyor. Onun gözünde tekrar o "ulaşılmaz" ve "değerli" kadına dönüşmen gerekiyor.'
      },
      {
        title: 'ERKEK ZİHNİNİ ANLAMA',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'cpu',
        description: 'Onun gururunun ve sessizliğinin ardındaki asıl psikolojik nedenleri henüz tam olarak çözememişsin. Bu da çabalarını boşa çıkarıyor.'
      }
    ],
    solutionTitle: "Peki Bu 3 Alanı Nasıl Güçlendireceksin?",
    solution: "İşte 'Gizli Takıntı' uygulaması, sana sadece onu geri getirecek değil, aynı zamanda AŞK HAYATININ KONTROLÜNÜ tamamen eline almanı sağlayacak bir rehberdir. Bu uygulama sana:",
    solutionPoints: [
      "İster onu, bu kez senin kurallarınla geri kazanmak, ister bu acıyı atlatıp hayatına çok daha iyi birini çekmek için gereken Doğru İletişim Stratejisini...",
      "Tüm kaliteli erkekleri etkileyen o karşı konulmaz Psikolojik Çekimi...",
      "Ve Erkek Zihninin sırlarını çözerek bir daha asla bu duruma düşmemeni sağlayacak o değerli bilgileri...",
    ]
  },
  mevcut: {
    title: 'İlişki Analiz Raporun Hazır!',
    diagnosis: 'Analiz Sonucun: "Sessiz Fırtına". İlişkiniz dışarıdan iyi görünüyor olabilir ama içerideki monotonluk ve duygusal mesafe, onu bitirebilecek bir fırtınanın habercisi.',
    cards: [
      {
        title: 'SEVGİ BAĞI VE GEÇMİŞ',
        score: 'İYİ',
        icon: 'archive',
        description: 'Aranızdaki temel sevgi bağı ve birlikte inşa ettiğiniz geçmiş hala çok sağlam. Bu, üzerine yeni ve daha güçlü bir ilişki kurabileceğiniz en önemli temeliniz.'
      },
      {
        title: 'TUTKU & HEYECAN',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'zap-off',
        description: 'O ilk günlerdeki kıvılcım, yerini tehlikeli bir alışkanlığa bırakmış. Partneriniz sizi artık "cepte" görüyor ve tutkuyu yeniden alevlendirecek adımları atmıyorsunuz.'
      },
      {
        title: 'ETKİLİ İLETİŞİM',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'shield-off',
        description: 'Konuşmalarınız ya yüzeysel kalıyor ya da hızla birer "suçlama oyununa" dönüşüyor. Birbirinizi anlamak yerine, haklı çıkmaya çalışıyorsunuz.'
      },
      {
        title: 'ERKEK PSİKOLOJİSİNİ ANLAMA',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'cpu',
        description: 'Partnerinizin ilgisizliğinin altında yatan temel psikolojik ihtiyaçları ("Kahraman İçgüdüsü" gibi) henüz tam olarak çözememişsin. Bu yüzden çabaların boşa gidiyor.'
      }
    ],
    solutionTitle: "Peki Bu 3 Alanı Nasıl Onaracaksınız?",
    solution: "İşte 'Gizli Takıntı' uygulaması, size sadece mevcut sorunları çözecek değil, aynı zamanda bir daha ASLA bu monotonluğa veya kavga döngüsüne düşmemenizi sağlayacak bir rehberdir. Bu uygulama sana:",
    solutionPoints: [
      "O sönmüş Tutku ve Heyecanı, eskisinden bile daha güçlü bir yangına dönüştürmeyi...",
      "Partnerinizin sadece sizi duymasını değil, sizi ANLAMASINI sağlayacak Etkili İletişim şifrelerini...",
      "Ve Erkek Psikolojisinin sırlarını çözerek onun size yeniden hayranlıkla, sarsılmaz bir sevgiyle bağlanmasını sağlayacak doğru hamleleri...",
    ]
  },
  yeni: {
    title: 'Aşk Hayatı Analiz Raporun Hazır!',
    diagnosis: 'Analiz Sonucun: "Görünmez Kalkan". Farkında bile olmadığınız bazı korkularınız ve alışkanlıklarınız, doğru erkeğin size yaklaşmasını engelliyor ve sizi bir yalnızlık döngüsüne hapsetmiş.',
    cards: [
      {
        title: 'KALİTELİ ARAYIŞ',
        score: 'İYİ',
        icon: 'award',
        description: 'Sadece bir sevgili değil, gerçekten doğru ve sağlıklı bir partner arıyorsun. Bu bilinçli arayış, mutlu bir ilişkiye giden yolun en doğru ilk adımıdır.'
      },
      {
        title: 'ÇEKİCİLİK AURASI',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'radio',
        description: 'Şu anki enerjin, kaliteli erkekleri bir mıknatıs gibi çekmek yerine, seni "arkadaş" kategorisine sokuyor veya tamamen "görünmez" kılıyor olabilir.'
      },
      {
        title: 'İÇSEL ÖZGÜVEN',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'shield',
        description: 'Geçmişteki hayal kırıklıkları, farkında bile olmadan beden dilini ve enerjini olumsuz etkiliyor. Bu, erkeklerin anında hissettiği bir sinyaldir.'
      },
      {
        title: 'PSİKOLOJİK FİLTRELEME',
        score: 'GELİŞTİRİLMESİ GEREK',
        icon: 'filter',
        description: 'Neden hep "yanlış" erkekleri çektiğini hiç düşündün mü? Çünkü "doğru" erkeği daha en başından tanıyacak psikolojik bir radarın henüz aktif değil.'
      }
    ],
    solutionTitle: "Peki Bu 3 Alanı Nasıl İnşa Edeceksin?",
    solution: "İşte 'Gizli Takıntı' uygulaması, sana sadece yeni bir sevgili bulduracak değil, aynı zamanda AŞK HAYATININ DİREKSİYONUNA geçmeni sağlayacak bir rehberdir. Bu uygulama sana:",
    solutionPoints: [
      "Sadece erkeklerin değil, KALİTELİ erkeklerin dikkatini çeken o karşı konulmaz Çekicilik Aurasını nasıl yaratacağını...",
      "Bir daha asla reddedilmekten veya yalnız kalmaktan korkmamanı sağlayacak o sarsılmaz İçsel Özgüveni inşa etmeyi...",
      "Ve 'yanlış' adamları daha hayatına girmeden elemeni sağlayacak o güçlü Psikolojik Filtreyi nasıl kullanacağını...",
    ]
  }
};

export default function ResultsScreen() {
  const params = useLocalSearchParams();
  const resultType = (params.type as string) || 'yeni';
  const result = avatarResults[resultType];

  const handleContinue = () => {
    router.push(`/paywall?type=${resultType}`);
  };
  
  // --- GÖRSEL İYİLEŞTİRME 2: Kart Component'ini Zenginleştirme ---
  // Kart render fonksiyonunu, yeni ikonlar ve daha iyi bir görsel hiyerarşi ile güncelliyoruz.
  const renderScoreCard = (card: ScoreCard, index: number) => {
    const isGood = card.score === 'İYİ';
    
    return (
      <View key={index} style={[styles.scoreCard, isGood ? styles.scoreCardGood : styles.scoreCardNeedsWork]}>
        <View style={styles.scoreHeader}>
          <Feather name={card.icon} size={24} color={isGood ? Colors.goodDark : Colors.needsWorkDark} />
          <Text style={[styles.scoreTitle, isGood ? styles.scoreTitleGood : styles.scoreTitleNeedsWork]}>
            {card.title}
          </Text>
          <View style={[styles.scoreBadge, isGood ? styles.scoreBadgeGood : styles.scoreBadgeNeedsWork]}>
            <Text style={styles.scoreText}>
              {card.score}
            </Text>
          </View>
        </View>
        <Text style={styles.scoreDescription}>{card.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, '#FDFCFB']} // Hafif bir gradient
        style={StyleSheet.absoluteFill}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{result.title}</Text>
          
          <View style={styles.diagnosisContainer}>
            <Ionicons name="bulb-outline" size={28} color={Colors.primary} style={{alignSelf: 'center', marginBottom: 12}} />
            <Text style={styles.diagnosisText}>{result.diagnosis}</Text>
          </View>

          <View style={styles.cardsContainer}>
            <Text style={styles.cardsTitle}>İlişki Puan Kartın</Text>
            {result.cards.map((card, index) => renderScoreCard(card, index))}
          </View>

          <View style={styles.solutionContainer}>
            <Text style={styles.solutionTitle}>{result.solutionTitle}</Text>
            <Text style={styles.solutionText}>{result.solution}</Text>
            {result.solutionPoints.map((point, index) => (
              <View key={index} style={styles.solutionPoint}>
                <Feather name="check-circle" size={18} color={Colors.goodDark} style={{marginRight: 10}}/>
                <Text style={styles.solutionPointText}>{point}</Text>
              </View>
            ))}
          </View>

          <PrimaryButton
            title="Tam Yol Haritamı Gör ve Başla"
            onPress={handleContinue}
            style={styles.continueButton}
            testID="results-continue-button"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- GÖRSEL İYİLEŞTİRME 3: Stilleri ve Renkleri Güncelleme ---
// Daha sofistike bir renk paleti ve daha modern bir tasarım dili uyguluyoruz.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold', // Örnek font
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  diagnosisContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  diagnosisText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
    lineHeight: 26,
    textAlign: 'center',
  },
  cardsContainer: {
    marginBottom: 32,
  },
  cardsTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  scoreCardGood: {
    backgroundColor: Colors.goodLight,
    borderColor: Colors.good,
  },
  scoreCardNeedsWork: {
    backgroundColor: Colors.needsWorkLight,
    borderColor: Colors.needsWork,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 12,
    flex: 1,
  },
  scoreTitleGood: {
    color: Colors.goodDark,
  },
  scoreTitleNeedsWork: {
    color: Colors.needsWorkDark,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreBadgeGood: {
    backgroundColor: Colors.good,
  },
  scoreBadgeNeedsWork: {
    backgroundColor: Colors.needsWork,
  },
  scoreText: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: Colors.white,
    lineHeight: 16,
  },
  scoreDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  solutionContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderColor: Colors.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  solutionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  solutionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: Colors.textSecondary,
    lineHeight: 26,
    marginBottom: 20,
  },
  solutionPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  solutionPointText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  continueButton: {
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 18 : 14,
  },
});

// Örnek Renk Paleti (constants/colors.ts dosyanızda olabilir)
/*
export const Colors = {
  background: '#F9F9F9',
  white: '#FFFFFF',
  textPrimary: '#2C2C2C',
  textSecondary: '#5A5A5A',
  primary: '#D98B9C', // Dusty Rose
  border: '#EAEAEA',
  good: '#4CAF50',
  goodLight: '#EDF7ED',
  goodDark: '#2E7D32',
  needsWork: '#FF9800',
  needsWorkLight: '#FFF8E1',
  needsWorkDark: '#E65100',
};
*/
