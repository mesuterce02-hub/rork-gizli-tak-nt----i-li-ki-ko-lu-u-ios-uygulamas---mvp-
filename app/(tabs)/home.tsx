import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, MessageCircle } from 'lucide-react-native';

const PRIMARY_50 = '#fef7f8';
const PRIMARY_100 = '#fdeff1';
const PRIMARY_600 = '#ef8f9f';
const SECONDARY_600 = '#87646a';
const TEXT_900 = '#171112';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  const handleLessonsPress = () => {
    router.push('/(tabs)/lessons');
  };

  const handleAICoachPress = () => {
    router.push('/(tabs)/ai-coach');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hoşgeldin Elif!</Text>
          <Text style={styles.subtitleText}>
            İlişkilerinde yeni bir sayfa açmaya hazır mısın?
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={handleLessonsPress}
            activeOpacity={0.7}
            testID="lessons-card"
          >
            <View style={styles.iconContainer}>
              <BookOpen color={PRIMARY_600} size={32} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Dersler</Text>
              <Text style={styles.cardDescription}>
                İlişki dinamiklerini öğren.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={handleAICoachPress}
            activeOpacity={0.7}
            testID="ai-coach-card"
          >
            <View style={styles.iconContainer}>
              <MessageCircle color={PRIMARY_600} size={32} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>AI Koçu</Text>
              <Text style={styles.cardDescription}>
                Kişisel yapay zeka koçunla sohbet et.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TEXT_900,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: SECONDARY_600,
    lineHeight: 24,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PRIMARY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    alignSelf: 'stretch',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_900,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: SECONDARY_600,
    lineHeight: 20,
  },
});