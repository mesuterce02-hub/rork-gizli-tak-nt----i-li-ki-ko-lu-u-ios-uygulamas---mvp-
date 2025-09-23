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

export default function Intro2Screen() {
  const handleContinue = () => {
    console.log('Navigating to quiz');
    router.push('/quiz');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text style={styles.title}>Hadi Uygulamayı Senin İçin Kişiselleştirelim</Text>
          <Text style={styles.subtitle}>1 dakika süren quiz ile ilişki hayatının sırlarını öğren</Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Senin ihtiyaçlarını, durumunu ve ilişkinin temel hatlarını inceleyip sana ne yapman gerekeceğini söyleyen sonuçlar verelim
            </Text>
          </View>
          
          <PrimaryButton
            title="Devam Et"
            onPress={handleContinue}
            style={styles.continueButton}
            testID="intro2-continue-button"
          />
        </View>

        <View style={styles.imageSection}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbFaKy8TJ-Zoxi-n0tJVzbvJjCZGH_T0vyprtXnQTCdk742V8CoyBFVIFCARAwrN8bOGQ0sFU_y5u2MMxUQWiNj-ffX3c_N7B7RqImLAzooenWVewXqTHRYBbVmHhzHSz8timFGtzqmZ-D86Lqgr0He9r5_ytbEucz5F9SFCHdLrISve6nvWCv-NXTbs1XCtZ8qzN1SMAFkAIFXCMn9PdiyI74NK743FzY3yAud80P81ar3XUuRI1T9smClLX1CMnmz_69X6zd2Qk'
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