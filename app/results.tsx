import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CheckCircle2, AlertTriangle } from 'lucide-react-native';

interface ScoreCard {
  title: string;
  score: 'İYİ' | 'GELİŞTİRİLMESİ GEREK';
  description: string;
}

interface AvatarResult {
  title: string;
  diagnosis: string;
  cards: ScoreCard[];
  solution: string;
}

const avatarResults: Record<string, AvatarResult> = {
  eski: {
    title: 'İlişki Analiz Raporun Hazır!',
    diagnosis: 'Analiz Sonucun: "Umutla Bekleyen". Eski ilişkini özlüyorsun ve muhtemelen onunla tekrar barışmak istiyorsun. Onu geri kazanma şansın hala var ama şu an yaptıkların onu senden daha da uzaklaştırıyor olabilir',
    cards: [
      {
        title: 'SEVGİ BAĞI',
        score: 'İYİ',
        description: 'Aranızdaki sevgi ve geçmiş anılar hala çok güçlü. Bu, senin en büyük kozun. Onun bilinçaltı hala sana ait anılarla dolu ve bu bağı yeniden alevlendirmek için doğru bir temel var.'
      },
      {
        title: 'İLETİŞİM STRATEJİSİ',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'Ayrılık sonrası kurduğun iletişim (veya kuramadığın sessizlik), onu geri kazanmak yerine paniğe kapıldığını ve çaresiz olduğunu gösteriyor. Bu, onu senden daha da uzaklaştırıyor.'
      },
      {
        title: 'PSİKOLOJİK ÇEKİM',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'Şu anki enerjin ve duruşun, onda bir "kaybetme korkusu" veya "merak" uyandırmıyor. Çekim gücünü yeniden aktive etmen ve onun gözünde tekrar o "ulaşılamaz" kadına dönüşmen gerekiyor.'
      },
      {
        title: 'ERKEK ZİHNİNİ ANLAMA',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'Onun neden uzaklaştığını, gururunun arkasında aslında ne yattığını ve hangi psikolojik tetikleyicilerin onu harekete geçireceğini henüz tam olarak çözememişsin.'
      }
    ],
    solution: `Gördüğün gibi, umutsuz değilsin ama doğru bir yol haritasına acilen ihtiyacın var.

İyi haber şu ki, zayıf olarak görünen o 3 alanı ("İletişim", "Psikolojik Çekim" ve "Erkek Zihnini Anlama") güçlendirdiğinde, zaten "İYİ" olan sevgi bağın, onu sana geri getirecek en büyük silaha dönüşecek.

Peki bu 3 alanı nasıl güçlendireceksin?

İşte 'Gizli Takıntı' uygulaması, tam da bu 'geliştirilmesi gereken' noktalar için tasarlanmış, adım adım bir "ilişki onarım" rehberidir. Bu uygulama sana:

Doğru İletişim Stratejisini kurmayı...
O karşı konulmaz Psikolojik Çekimi yeniden yaratmayı...
Ve Erkek Zihninin sırlarını çözerek onu sana geri döndürecek doğru hamleleri yapmayı...

...net ve kanıtlanmış yöntemlerle öğretecek.`,
  },
  mevcut: {
    title: 'İlişki Analiz Raporun Hazır!',
    diagnosis: 'Analiz Sonucun: "Sessiz Fırtına". İlişkiniz dışarıdan iyi görünüyor olabilir ama içerideki monotonluk, artan tartışmalar ve duygusal mesafe, ilişkinizi bitirebilecek bir fırtınanın habercisi.',
    cards: [
      {
        title: 'İÇSEL SEVGİ ve GEÇMİŞ',
        score: 'İYİ',
        description: 'Aranızdaki temel sevgi bağı ve birlikte inşa ettiğiniz geçmiş hala çok sağlam. Bu, üzerine yeni ve daha güçlü bir ilişki kurabileceğiniz en önemli temeliniz. Umutsuz değilsiniz.'
      },
      {
        title: 'TUTKU & HEYECAN',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'İlişkinizdeki o ilk günlerdeki kıvılcım ve heyecan, yerini tehlikeli bir monotonluğa bırakmış. Partneriniz sizi artık "cepte" görüyor ve o eski tutkuyu yeniden alevlendirecek adımları atmıyorsunuz.'
      },
      {
        title: 'ETKİLİ İLETİŞİM',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'Konuşmalarınız ya yüzeysel kalıyor yada hızla birer "suçlama oyununa" dönüşüyor. Birbirinizi anlamak yerine, haklı çıkmaya çalışıyorsunuz. Bu, aranızdaki en büyük duvar.'
      },
      {
        title: 'ERKEK PSİKOLOJİSİNİ ANLAMA',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'Partnerinizin ilgisizliğinin veya sinirliliğinin altında yatan temel psikolojik ihtiyaçları ("Kahraman İçgüdüsü" gibi) henüz tam olarak çözememişsin. Bu yüzden çabaların genellikle ters tepiyor.'
      }
    ],
    solution: `Gördüğün gibi, ilişkinizin temeli hala sağlam ama onu ayakta tutan kolonlar ("Tutku", "İletişim", "Anlayış") ciddi şekilde zayıflamış durumda.

İyi haber şu ki, bu zayıf alanları güçlendirdiğinizde, o sağlam temel sayesinde ilişkiniz eskisinden bile daha sarsılmaz ve mutlu bir hale gelecek.

Peki bu 3 alanı nasıl onaracaksınız?

İşte 'Gizli Takıntı' uygulaması, tam da bu 'geliştirilmesi gereken' noktalar için tasarlanmış, adım adım bir "ilişki canlandırma" rehberidir. Bu uygulama sana:

O sönmüş Tutku ve Heyecanı yeniden nasıl alevlendireceğini...
Tartışmaları bitiren, anlayışa dayalı Etkili İletişim şifrelerini...
Ve Erkek Psikolojisinin sırlarını çözerek onun size yeniden hayranlıkla bağlanmasını sağlayacak doğru hamleleri...

...kanıtlanmış ve uygulaması kolay yöntemlerle öğretecek.`,
  },
  yeni: {
    title: 'Aşk Hayatı Analiz Raporun Hazır!',
    diagnosis: 'Analiz Sonucun: "Görünmez Kalkan". Farkında bile olmadığınız bazı korkularınız ve alışkanlıklarınız, doğru erkeğin size yaklaşmasını engelliyor ve sizi bir yalnızlık döngüsüne hapsetmiş olabilir.',
    cards: [
      {
        title: 'KALİTELİ ARAYIŞ',
        score: 'İYİ',
        description: 'Sadece bir sevgili değil, gerçekten doğru, sağlıklı ve size değer veren bir partner arıyorsun. Bu bilinçli arayış, mutlu bir ilişkiye giden yolun en önemli ve en doğru ilk adımıdır.'
      },
      {
        title: 'ÇEKİCİLİK AURASI',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'Şu anki enerjin ve duruşun, kaliteli erkekleri bir mıknatıs gibi çekmek yerine, seni "arkadaş" kategorisine sokuyor veya tamamen "görünmez" kılıyor olabilir. Karşı konulmaz bir çekim alanı yaratman gerekiyor.'
      },
      {
        title: 'İÇSEL ÖZGÜVEN',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'Geçmişteki hayal kırıklıkları veya "yeterince iyi değilim" gibi yanlış inançlar, farkında bile olmadan beden dilini ve enerjini olumsuz etkiliyor. Bu, erkeklerin anında hissettiği bir sinyaldir.'
      },
      {
        title: 'PSİKOLOJİK FİLTRELEME',
        score: 'GELİŞTİRİLMESİ GEREK',
        description: 'Neden hep "yanlış" erkekleri çektiğini hiç düşündün mü? Çünkü "doğru" ve "kaliteli" erkeği daha en başından tanıyacak ve onu hayatına dahil edecek psikolojik bir radarın henüz aktif değil.'
      }
    ],
    solution: `Gördüğün gibi, harika bir niyetin ve doğru bir arayışın var ama bunu sonuca ulaştıracak doğru araçlara ve stratejiye ihtiyacın var.

İyi haber şu ki, zayıf olarak görünen o 3 alanı ("Çekicilik Aurası", "İçsel Özgüven" ve "Psikolojik Filtreleme") güçlendirdiğinde, zaten "İYİ" olan niyetin, hayalindeki ilişkiyi gerçeğe dönüştürecek en büyük gücün olacak.

Peki bu 3 alanı nasıl inşa edeceksin?

İşte 'Gizli Takıntı' uygulaması, tam da bu 'geliştirilmesi gereken' noktalar için tasarlanmış, adım adım bir "çekim gücü yaratma" rehberidir. Bu uygulama sana:

O karşı konulmaz Çekicilik Aurasını nasıl yaratacağını...
Kökleri sağlam, sarsılmaz bir İçsel Özgüven inşa etmeyi...
Ve Erkek Psikolojisinin sırlarını çözerek doğru erkeği anında tanımanı sağlayacak o Psikolojik Filtreyi nasıl kullanacağını...

...kanıtlanmış ve uygulaması kolay yöntemlerle öğretecek.`,
  }
};

export default function ResultsScreen() {
  const params = useLocalSearchParams();
  const resultType = (params.type as string) || 'yeni';
  const eip = parseInt((params.eip as string) || '0');
  const mip = parseInt((params.mip as string) || '0');
  const yip = parseInt((params.yip as string) || '0');

  const result = avatarResults[resultType];

  const mainLabel = useMemo<string>(() => {
    try {
      const match = result?.diagnosis.match(/\"([^\"]+)\"/);
      return match?.[1] ?? '';
    } catch (e) {
      console.log('parse main label error', e);
      return '';
    }
  }, [result?.diagnosis]);

  const handleContinue = () => {
    console.log('Navigating to paywall with scores:', { eip, mip, yip, type: resultType });
    router.push(`/paywall?type=${resultType}&eip=${eip}&mip=${mip}&yip=${yip}`);
  };

  const renderScoreCard = (card: ScoreCard, index: number) => {
    const isGood = card.score === 'İYİ';
    
    return (
      <View key={index} style={[styles.scoreCard, isGood ? styles.scoreCardGood : styles.scoreCardNeedsWork]} testID={`score-card-${index}`}>
        <View style={styles.scoreHeader}>
          <View style={styles.scoreHeaderLeft}>
            {isGood ? (
              <CheckCircle2 color={Colors.accentPink} size={20} />
            ) : (
              <AlertTriangle color={Colors.accentYellow} size={20} />
            )}
            <Text style={[styles.scoreTitle, isGood ? styles.scoreTitleGood : styles.scoreTitleNeedsWork]}>
              {card.title}
            </Text>
          </View>
          <View style={[styles.scoreBadge, isGood ? styles.scoreBadgeGood : styles.scoreBadgeNeedsWork]}>
            <Text style={[styles.scoreText, isGood ? styles.scoreTextGood : styles.scoreTextNeedsWork]}>
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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{result.title}</Text>

          <View style={styles.resultBadge} testID="result-badge">
            <Text style={styles.resultBadgeLabel}>Sonuç</Text>
            <Text style={styles.resultBadgeValue}>{mainLabel}</Text>
          </View>
          
          <View style={styles.diagnosisContainer}>
            <Text style={styles.diagnosisText}>{result.diagnosis}</Text>
          </View>

          <View style={styles.cardsContainer}>
            <Text style={styles.cardsTitle}>Puan Kartın</Text>
            {result.cards.map((card, index) => renderScoreCard(card, index))}
          </View>

          <View style={styles.solutionContainer}>
            <Text style={styles.solutionTitle}>Ne Yapmalısın?</Text>
            <Text style={styles.solutionText}>{result.solution}</Text>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 24,
  },
  diagnosisContainer: {
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  resultBadge: {
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  resultBadgeLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  resultBadgeValue: {
    marginTop: 6,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  diagnosisText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
    textAlign: 'center',
  },
  cardsContainer: {
    marginBottom: 32,
  },
  cardsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  scoreCardGood: {
    backgroundColor: Colors.softBackground,
    borderColor: Colors.accentPink,
    borderWidth: 1,
  },
  scoreCardNeedsWork: {
    backgroundColor: Colors.white,
    borderColor: Colors.accentYellow,
    borderWidth: 1,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 8,
    color: Colors.textPrimary,
  },
  scoreTitleGood: {
    color: Colors.textPrimary,
  },
  scoreTitleNeedsWork: {
    color: Colors.textPrimary,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 12,
  },
  scoreBadgeGood: {
    backgroundColor: Colors.accentPink,
  },
  scoreBadgeNeedsWork: {
    backgroundColor: Colors.accentYellow,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreTextGood: {
    color: Colors.textPrimary,
  },
  scoreTextNeedsWork: {
    color: Colors.textPrimary,
  },
  scoreDescription: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  solutionContainer: {
    backgroundColor: Colors.softBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  solutionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  solutionText: {
    fontSize: 17,
    color: Colors.textPrimary,
    lineHeight: 26,
    textAlign: 'left',
  },
  continueButton: {
    width: '100%',
    marginTop: 16,
  },
});
