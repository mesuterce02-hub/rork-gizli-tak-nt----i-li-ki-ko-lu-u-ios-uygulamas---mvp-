import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Dimensions 
} from 'react-native';
import { router } from 'expo-router';
import { Star, Users, Edit3 } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { FeatureCard } from '@/components/FeatureCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScrollingTestimonials } from '@/components/ScrollingTestimonials';

const { height: screenHeight } = Dimensions.get('window');

export default function SplashScreen() {
  const handleContinue = () => {
    console.log('Navigating to intro1');
    router.push('/intro1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>İlişkilerdeki Gücünü Keşfet</Text>
            
            <View style={styles.featuresContainer}>
              <FeatureCard
                icon={<Star size={28} color={Colors.accentYellow} fill={Colors.accentYellow} />}
                title="4.9 Yıldız"
                subtitle="Yüksek Değerlendirme"
              />
              
              <FeatureCard
                icon={<Users size={28} color={Colors.accentPink} />}
                title="+10 Bin Kişinin Seçimi"
              />
              
              <FeatureCard
                icon={<Edit3 size={28} color={Colors.accentPurple} />}
                title="Kişiselleştirilmiş Uygulama"
              />
            </View>
          </View>

          <View style={styles.testimonialsSection}>
            <View style={styles.testimonialsContainer}>
              <ScrollingTestimonials />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.welcomeTitle}>Gizli Takıntı'ya Hoşgeldin!</Text>
        <Text style={styles.welcomeSubtitle}>Romantik İlişkilerinin Kontrolünü Eline Al</Text>
        
        <PrimaryButton
          title="Devam Et"
          onPress={handleContinue}
          style={styles.continueButton}
          testID="splash-continue-button"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: 64,
  },
  header: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 48,
  },
  featuresContainer: {
    width: '100%',
    maxWidth: 400,
  },
  testimonialsSection: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 200,
  },
  testimonialsContainer: {
    height: 120,
    overflow: 'hidden',
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
  },
  continueButton: {
    width: '100%',
    maxWidth: 400,
  },
});