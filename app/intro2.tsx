import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Pressable, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';

export default function Intro2Screen() {
  const handleBack = () => {
    console.log('[Intro2] Back pressed');
    if (router.canGoBack()) router.back();
  };

  const handleContinue = () => {
    console.log('[Intro2] Navigating to /quiz');
    router.push('/quiz');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="intro2-scroll"
        >
          <View style={styles.header}>
            <Pressable onPress={handleBack} hitSlop={12} testID="intro2-back-button" style={styles.backBtn}>
              <Text style={styles.backIcon}>{Platform.OS === 'web' ? '‹' : '‹'}</Text>
            </Pressable>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>AURA'nın yapay zekası</Text>
            <Text style={styles.body}>
              AURA'nın yapay zekası, ilişkilerinizi ve kendinize olan güveninizi artırmak için tasarlanmıştır. Size özel tavsiyeler sunar, geliştirmeniz gereken alanları belirler ve sizi destekler.
            </Text>
          </View>

          <View style={styles.cardWrap}>
            <Image
              source={{ uri: 'https://i.ibb.co/fVDz7psy/2.png' }}
              style={styles.hero}
              resizeMode="cover"
              testID="intro2-hero-image"
              accessibilityLabel="AURA AI görseli"
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            title="Devam Et"
            onPress={handleContinue}
            style={styles.cta}
            testID="intro2-continue-button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textPrimary,
  },
  headerSpacer: {
    flex: 1,
  },
  textBlock: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'left',
    lineHeight: 34,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  cardWrap: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  hero: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 16,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: Colors.background,
  },
  cta: {
    width: '100%',
  },
});