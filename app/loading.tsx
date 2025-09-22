import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Animated
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const testimonials = [
  'çok beğendim ⭐⭐⭐⭐⭐',
  'süper uygulama ⭐⭐⭐⭐⭐',
  'harika tavsiyeler ⭐⭐⭐⭐⭐',
  'çok yardımcı oldu ⭐⭐⭐⭐⭐',
  'kesinlikle tavsiye ederim ⭐⭐⭐⭐⭐',
  'ilişkime seviye atlattı ⭐⭐⭐⭐⭐',
  'tam aradığım şey ⭐⭐⭐⭐⭐',
  'mükemmel bir app ⭐⭐⭐⭐⭐',
  'hayatımı değiştirdi ⭐⭐⭐⭐⭐',
  'çok faydalı ⭐⭐⭐⭐⭐',
  'aradığım her şey var ⭐⭐⭐⭐⭐',
  'inanılmaz! ⭐⭐⭐⭐⭐',
  'her kadına lazım ⭐⭐⭐⭐⭐',
  'teşekkürler gizli takıntı ⭐⭐⭐⭐⭐'
];

export default function LoadingScreen() {
  const params = useLocalSearchParams();
  const resultType = (params.type as string) || 'yeni';
  const eip = (params.eip as string) || '0';
  const mip = (params.mip as string) || '0';
  const yip = (params.yip as string) || '0';
  
  const [spinValue] = React.useState(new Animated.Value(0));
  const [scrollAnim1] = React.useState(new Animated.Value(0));
  const [scrollAnim2] = React.useState(new Animated.Value(0));

  useEffect(() => {
    // Spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    // Scrolling animations
    const scrollAnimation1 = Animated.loop(
      Animated.timing(scrollAnim1, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    const scrollAnimation2 = Animated.loop(
      Animated.timing(scrollAnim2, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();
    scrollAnimation1.start();
    scrollAnimation2.start();

    // Navigate to results after 3 seconds
    const timer = setTimeout(() => {
      router.replace(`/results?type=${resultType}&eip=${eip}&mip=${mip}&yip=${yip}`);
    }, 3000);

    return () => {
      spinAnimation.stop();
      scrollAnimation1.stop();
      scrollAnimation2.stop();
      clearTimeout(timer);
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateX1 = scrollAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1000],
  });

  const translateX2 = scrollAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [-1000, 0],
  });

  const renderTestimonialRow = (testimonialList: string[], animatedValue: Animated.AnimatedAddition<number>) => (
    <Animated.View style={[styles.testimonialRow, { transform: [{ translateX: animatedValue }] }]}>
      {testimonialList.concat(testimonialList).map((testimonial, index) => (
        <View key={index} style={styles.testimonialCard}>
          <Text style={styles.testimonialText}>{testimonial}</Text>
        </View>
      ))}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loadingContainer}>
          <View style={styles.spinnerContainer}>
            <View style={styles.outerRing} />
            <Animated.View style={[styles.innerRing, { transform: [{ rotate: spin }] }]}>
              <View style={styles.iconContainer}>
                <Heart size={64} color={Colors.primary} fill={Colors.primary} />
              </View>
            </Animated.View>
          </View>
          
          <Text style={styles.loadingTitle}>Analiziniz hazırlanıyor...</Text>
          <Text style={styles.loadingSubtitle}>Size özel sonuçlar oluşturuluyor...</Text>
        </View>

        <View style={styles.testimonialsSection}>
          <Text style={styles.testimonialsTitle}>Binlerce kişi Gizli Takıntı&apos;yı seçti</Text>
          
          <View style={styles.testimonialsContainer}>
            {renderTestimonialRow(testimonials.slice(0, 7), translateX1)}
            {renderTestimonialRow(testimonials.slice(7), translateX2)}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softBackground,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  spinnerContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  outerRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: Colors.cardBackground,
  },
  innerRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.primary,
    borderTopColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  testimonialsSection: {
    width: '100%',
  },
  testimonialsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 32,
  },
  testimonialsContainer: {
    height: 120,
    overflow: 'hidden',
  },
  testimonialRow: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  testimonialCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  testimonialText: {
    fontSize: 14,
    color: Colors.textSecondary,
    whiteSpace: 'nowrap' as any,
  },
});