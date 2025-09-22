import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Image,
  Dimensions 
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';

const { height: screenHeight } = Dimensions.get('window');

export default function Intro1Screen() {
  const handleContinue = () => {
    console.log('Navigating to intro2');
    router.push('/intro2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text style={styles.title}>İlişki Hayatını İstediğine Göre Şekillendir</Text>
          <Text style={styles.subtitle}>Öğreneceğin taktikler ile istediğin kişinin takıntısı ol!</Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              İster yeni bir ilişki, ister sallantıda ve hatta bitmiş bir ilişki, Gizli Takıntı ile ne yapman gerekeceğini öğren ve ne olursa olsun partnerinle olan ilişkinizi istediğin gibi şekillendir!
            </Text>
          </View>
          
          <PrimaryButton
            title="Devam Et"
            onPress={handleContinue}
            style={styles.continueButton}
            testID="intro1-continue-button"
          />
        </View>

        <View style={styles.imageSection}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp6ScE2r0aUL9jRoD2wpfLbNKVFPQB6m77o6Zp4H4qmQ_tzaNJXGv-rInGQCxcatt4chdEzLzgMQhP_NctzVyTzUW87PqIQp9TOujzsOgtZpRJIZBVvsFu5AgIZgPZHutzPSjTR4epM_8U9_XrsWumKVkBVljY3tqXqNVxVlrn_FQqBG4k9bXUcNT0BgpyBy2hj75TlW-s64lqgduKUcH7aKyWpNcnbW5O5gTUKW9BuvodJYVe1Kv61GJEGJfXTX2Qfick64xMH9E'
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
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
  },
  textSection: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
  },
  continueButton: {
    width: '100%',
  },
  imageSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '60%',
    maxHeight: screenHeight * 0.6,
  },
});