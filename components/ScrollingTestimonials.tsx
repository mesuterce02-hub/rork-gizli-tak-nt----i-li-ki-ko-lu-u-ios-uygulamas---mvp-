import React, { useRef, useEffect } from 'react';
import { ScrollView, Animated, StyleSheet, Dimensions } from 'react-native';
import { TestimonialCard } from './TestimonialCard';

const { width: screenWidth } = Dimensions.get('window');

const testimonials = [
  {
    title: 'İletişim Harikası',
    content: 'Bu uygulama sayesinde ilişkimdeki iletişim sorunlarını aştım. Çok mutluyum!',
  },
  {
    title: 'Özgüvenim Tavan Yaptı',
    content: 'Kendime olan güvenim arttı ve artık daha sağlıklı sınırlar koyabiliyorum.',
  },
  {
    title: 'Yeniden Aşk',
    content: 'Eşimle aramızdaki o eski heyecanı yeniden yakaladık. Teşekkürler Gizli Takıntı!',
  },
  {
    title: 'Tavsiye Ederim',
    content: 'Kişiselleştirilmiş tavsiyeler gerçekten işe yarıyor. Herkese tavsiye ederim.',
  },
  {
    title: 'Sosyal Hayatım Canlandı',
    content: 'Sadece romantik ilişkimde değil, tüm sosyal ilişkilerimde olumlu etkilerini gördüm.',
  },
  {
    title: 'Hayat Değiştiren Uygulama',
    content: 'Bu uygulama hayatımı değiştirdi. Artık ne istediğimi biliyorum ve bunu elde ediyorum.',
  },
];

export const ScrollingTestimonials: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -testimonials.length * 276, // card width + margin
        duration: 60000,
        useNativeDriver: true,
      })
    );
    
    animation.start();

    return () => animation.stop();
  }, [scrollX]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: scrollX }] }]}>
      {[...testimonials, ...testimonials].map((testimonial, index) => (
        <TestimonialCard
          key={`${testimonial.title}-${index}`}
          title={testimonial.title}
          content={testimonial.content}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});