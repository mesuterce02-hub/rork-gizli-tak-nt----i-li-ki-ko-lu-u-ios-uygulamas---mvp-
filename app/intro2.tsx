import React, { useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ArrowLeft } from 'lucide-react-native';

export default function Intro2Screen() {
  const handleBack = useCallback(() => {
    console.log('[Intro2] Back pressed');
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }, []);

  const handleContinue = useCallback(() => {
    console.log('[Intro2] Continue -> intro3');
    router.push('/intro3');
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} testID="intro2-scroll">
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backBtn} testID="intro2-back-button" accessibilityRole="button" accessibilityLabel="Geri">
              <ArrowLeft color={Colors.textPrimary} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>AURA AI</Text>
            <View style={styles.headerRight} />
          </View>

          <View style={styles.sectionTitleWrap}>
            <Text style={styles.title} testID="intro2-title">Sana Özel Dersler</Text>
            <Text style={styles.paragraph} testID="intro2-paragraph">
              1 dakika süren kısa bir quiz ile ilişki dinamiklerini keşfet. İhtiyaçlarını, durumunu ve hedeflerini anlayıp sana net, uygulanabilir adımlar verelim.
            </Text>
          </View>

          <View style={styles.imageCard}>
            <View style={styles.imageAspect}> 
              <Image
                source={{ uri: 'https://i.hizliresim.com/tg6erdq.png' }}
                style={styles.image}
                contentFit="contain"
                transition={200}
                accessible
                accessibilityLabel="Kişiselleştirme görseli"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton title="Devam Et" onPress={handleContinue} style={styles.cta} testID="intro2-continue-button" />
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
    textAlign: 'left',
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
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'stretch',
    justifyContent: 'center',
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