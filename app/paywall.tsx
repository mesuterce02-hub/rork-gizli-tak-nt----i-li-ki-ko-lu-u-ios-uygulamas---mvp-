import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Check, Shield, Download, Zap } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function PaywallScreen() {
  const params = useLocalSearchParams();
  const resultType = (params.type as string) || 'yeni';
  const eip = parseInt((params.eip as string) || '0');
  const mip = parseInt((params.mip as string) || '0');
  const yip = parseInt((params.yip as string) || '0');

  const [selectedPlan, setSelectedPlan] = React.useState<'weekly' | 'monthly'>('weekly');

  const handleSubscribe = () => {
    console.log('Starting subscription:', { plan: selectedPlan, type: resultType, scores: { eip, mip, yip } });
    // Here you would integrate with your payment system
    // For now, we'll just navigate to a success screen
    router.push('/success');
  };

  const benefits = [
    {
      icon: <Check size={20} color={Colors.primary} />,
      text: 'Tüm "Gizli Takıntı" eğitim içeriğine sınırsız erişim.'
    },
    {
      icon: <Check size={20} color={Colors.primary} />,
      text: 'İlişkinizin her aşaması için adım adım yol haritaları.'
    },
    {
      icon: <Check size={20} color={Colors.primary} />,
      text: 'Yeni eklenecek tüm özel içeriklere ve güncellemelere erişim.'
    },
    {
      icon: <Check size={20} color={Colors.primary} />,
      text: 'Çevrimdışı okuma özelliği.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Tüm Sırları Açığa Çıkarın</Text>
          
          <View style={styles.benefitsContainer}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                {benefit.icon}
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.plansContainer}>
            <Text style={styles.plansTitle}>Abonelik Seçenekleri</Text>
            
            {/* Weekly Plan - Highlighted */}
            <TouchableOpacity
              style={[styles.planCard, styles.planCardHighlighted, selectedPlan === 'weekly' && styles.planCardSelected]}
              onPress={() => setSelectedPlan('weekly')}
              testID="weekly-plan"
            >
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>EN POPÜLER SEÇİM</Text>
              </View>
              
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>HAFTALIK PLAN</Text>
                <Zap size={24} color={Colors.primary} />
              </View>
              
              <Text style={styles.planOffer}>3 GÜN ÜCRETSİZ DENE</Text>
              <Text style={styles.planPrice}>Sonrasında sadece 49,99 TL / hafta</Text>
              <Text style={styles.planSubtext}>(İstediğin zaman iptal et)</Text>
            </TouchableOpacity>

            {/* Monthly Plan */}
            <TouchableOpacity
              style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardSelected]}
              onPress={() => setSelectedPlan('monthly')}
              testID="monthly-plan"
            >
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>AYLIK PLAN</Text>
              </View>
              
              <Text style={styles.planOffer}>3 GÜN ÜCRETSİZ DENE</Text>
              <Text style={styles.planPrice}>249,99 TL / ay</Text>
              <Text style={styles.planWarning}>(Haftalık 59 TL&apos;den daha pahalıya gelir!)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trustContainer}>
            <View style={styles.trustItem}>
              <Shield size={20} color={Colors.textSecondary} />
              <Text style={styles.trustText}>Güvenli Ödeme</Text>
            </View>
            <View style={styles.trustItem}>
              <Download size={20} color={Colors.textSecondary} />
              <Text style={styles.trustText}>İstediğin zaman iptal et</Text>
            </View>
          </View>

          <PrimaryButton
            title="Ücretsiz Olarak Başlat ve Dönüşüme Başla"
            onPress={handleSubscribe}
            style={styles.subscribeButton}
            testID="subscribe-button"
          />

          <Text style={styles.disclaimer}>
            Aboneliğiniz otomatik olarak yenilenecektir. İptal etmek için ayarlardan aboneliği iptal edebilirsiniz.
          </Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 32,
  },
  benefitsContainer: {
    marginBottom: 32,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  benefitText: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginLeft: 12,
    flex: 1,
  },
  plansContainer: {
    marginBottom: 32,
  },
  plansTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  planCardHighlighted: {
    borderColor: Colors.primary,
    backgroundColor: Colors.cardBackground,
    transform: [{ scale: 1.02 }],
  },
  planCardSelected: {
    borderColor: Colors.primary,
    borderWidth: 3,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  planOffer: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  planSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  planWarning: {
    fontSize: 14,
    color: '#E65100',
    fontWeight: '600',
  },
  trustContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    paddingVertical: 16,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  subscribeButton: {
    width: '100%',
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});