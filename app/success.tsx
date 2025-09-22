import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView
} from 'react-native';
import { router } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function SuccessScreen() {
  const handleContinue = () => {
    console.log('Navigating to main app content');
    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={80} color={Colors.primary} fill={Colors.primary} />
        </View>
        
        <Text style={styles.title}>Hoşgeldin!</Text>
        <Text style={styles.subtitle}>
          Aboneliğin başarıyla başlatıldı. Şimdi tüm içeriklere erişebilirsin.
        </Text>
        
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Artık bunlara erişimin var:</Text>
          <Text style={styles.benefitItem}>✓ Tüm eğitim içerikleri</Text>
          <Text style={styles.benefitItem}>✓ Kişiselleştirilmiş yol haritaları</Text>
          <Text style={styles.benefitItem}>✓ Yeni içerikler ve güncellemeler</Text>
          <Text style={styles.benefitItem}>✓ Çevrimdışı okuma</Text>
        </View>

        <PrimaryButton
          title="Başlayalım!"
          onPress={handleContinue}
          style={styles.continueButton}
          testID="success-continue-button"
        />
        
        <Text style={styles.reminder}>
          İstediğin zaman ayarlardan aboneliğini iptal edebilirsin.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  benefitsContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    width: '100%',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  benefitItem: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: 8,
  },
  continueButton: {
    width: '100%',
    marginBottom: 16,
  },
  reminder: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});