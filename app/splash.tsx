import React, { useMemo } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { Heart, Users, Smile, Info } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function SplashScreen() {
  const handleContinue = () => {
    console.log('Navigating to intro1');
    router.push('/intro1');
  };

  const featureItems = useMemo(
    () => [
      {
        id: 'improve',
        icon: <Heart size={28} color={palette.primary} fill={palette.primary} />,
        title: 'İlişkinizi geliştirin',
        subtitle: "İlişki hayatınızın zorluklarını nokta atış dersler ile çözelim",
      },
      {
        id: 'coach',
        icon: <Users size={28} color={palette.primary} />,
        title: '7/24 AI Koç Desteği Yanınızda',
        subtitle: "AI koçuna ilişkini analiz ettir, zor durumlarda soru sor, destek ve çözüm bul!",
      },
      {
        id: 'programs',
        icon: <Smile size={28} color={palette.primary} />,
        title: 'Adım Adım Programları Takip Edin',
        subtitle: "Challenge'larımıza katılarak 1 haftalık ilişki hedeflerini gerçekleştir!",
      },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.headerBar}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>AURA</Text>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => console.log('Info pressed')}
            style={styles.headerIconBtn}
            testID="header-info-button"
          >
            <Info size={24} color={palette.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>İlişki potansiyelinizin kilidini açın</Text>
          </View>

          <View style={styles.featuresGrid}>
            {featureItems.map((item) => (
              <View key={item.id} style={styles.featureCard} testID={`feature-${item.id}`}>
                <View style={styles.featureIcon}>{item.icon}</View>
                <View style={styles.featureTextWrap}>
                  <Text style={styles.featureTitle}>{item.title}</Text>
                  <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.testimonialsWrap}>
            <Text style={styles.sectionTitle}>Başkaları ne diyor</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.testimonialsRow}
            >
              {TESTIMONIALS.map((t) => (
                <View key={t.name} style={styles.testimonialCard} testID={`testimonial-${t.name}`}>
                  <Text style={styles.testimonialName}>{t.name}</Text>
                  <Text style={styles.testimonialText}>{t.text}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            title="Devam Et"
            onPress={handleContinue}
            style={styles.cta}
            testID="splash-continue-button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const palette = {
  primary: '#f042a7',
  background: Colors.background,
  cardBgLight: '#F8F6F7',
  border: '#E7CFDD',
  text: Colors.textPrimary,
  textMuted: '#9a4c79',
} as const;

const TESTIMONIALS = [
  { name: 'Ayşe', text: 'Bu uygulama ilişkimizdeki kavgaları bitirdi! Daha iyi iletişim kuruyoruz ve her zamankinden daha bağlı hissediyoruz.' },
  { name: 'Mehmet', text: 'İlk başta şüpheciydim ama kişiselleştirilmiş tavsiyeler inanılmaz derecede yardımcı oldu. Eski sevgilimle sonunda barıştık.' },
  { name: 'Zeynep', text: 'Kendime ve ilişkime olan güvenim çok arttı. Sanki cebimde bir koç var gibi.' },
] as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inner: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerSpacer: {
    width: 48,
    height: 48,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  headerIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  heroSection: {
    paddingTop: 24,
    paddingBottom: 8,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.cardBgLight,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  featureTextWrap: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  featureSubtitle: {
    fontSize: 14,
    color: palette.textMuted,
  },
  testimonialsWrap: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  testimonialsRow: {
    gap: 12,
    paddingRight: 12,
  },
  testimonialCard: {
    width: 280,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.cardBgLight,
    marginRight: 12,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  testimonialText: {
    fontSize: 14,
    color: palette.textMuted,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: Platform.OS === 'web' ? 0 : 0,
  },
  cta: {
    width: '100%',
  },
});