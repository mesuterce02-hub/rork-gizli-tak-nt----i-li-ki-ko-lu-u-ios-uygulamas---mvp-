import React, { useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ArrowLeft } from 'lucide-react-native';


export default function Intro1Screen() {
  const handleBack = useCallback(() => {
    console.log('[Intro1] Back pressed');
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }, []);

  const handleContinue = useCallback(() => {
    console.log('[Intro1] Continue -> intro2');
    router.push('/intro2');
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} testID="intro1-scroll">
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backBtn} testID="intro1-back-button" accessibilityRole="button" accessibilityLabel="Geri">
              <ArrowLeft color={Colors.textPrimary} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>AURA AI</Text>
            <View style={styles.headerRight} />
          </View>

          <View style={styles.sectionTitleWrap}>
            <Text style={styles.title} testID="intro1-title">AURA&#39;nın yapay zekası</Text>
            <Text style={styles.paragraph} testID="intro1-paragraph">
              AURA&#39;nın yapay zekası, ilişkilerinizi ve kendinize olan güveninizi artırmak için tasarlanmıştır. Size özel tavsiyeler sunar, geliştirmeniz gereken alanları belirler ve sizi destekler.
            </Text>
          </View>

          <View style={styles.imageCard}>
            <View style={styles.imageAspect}>
              <Image
                source={{ uri: 'https://i.ibb.co/fVDz7psy/2.png' }}
                style={styles.image}
                resizeMode="cover"
                accessible
                accessibilityLabel="AURA AI görsel"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton title="Devam Et" onPress={handleContinue} style={styles.cta} testID="intro1-continue-button" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backBtn: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.textPrimary,
  },
  headerRight: {
    width: 44,
  },
  sectionTitleWrap: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textPrimary,
  },
  imageCard: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  imageAspect: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: Platform.OS === 'web' ? 'rgba(0,0,0,0.1)' : Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  cta: {
    width: '100%',
  },
});
