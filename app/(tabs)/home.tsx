import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, MessageCircle, User, Settings, HelpCircle, LogOut, Crown, Flag, CheckCircle2 } from 'lucide-react-native';

const PRIMARY_50 = '#fef7f8';
const PRIMARY_100 = '#fdeff1';
const PRIMARY_600 = '#ef8f9f';
const SECONDARY_600 = '#87646a';
const TEXT_900 = '#171112';
const BORDER = '#e5dcdd';

interface ChallengeDef {
  id: string;
  title: string;
  days: number;
}

interface ProgressMap {
  [challengeId: string]: boolean[];
}

const CHALLENGES: ChallengeDef[] = [
  { id: 'get-ex-back', title: 'Eski İlişkini Geri Getir', days: 15 },
  { id: 'fix-current', title: 'Sorunları Çöz', days: 15 },
  { id: 'new-love', title: 'Yeni İlişkiye Başla', days: 15 },
];

const STORAGE_KEY = 'challenge-progress-v1';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    const load = async () => {
      try {
        const { default: AS } = await import('@react-native-async-storage/async-storage');
        const raw = await AS.getItem(STORAGE_KEY);
        const parsed: ProgressMap = raw ? JSON.parse(raw) : {};
        const filled: ProgressMap = { ...parsed };
        CHALLENGES.forEach((c) => {
          if (!filled[c.id] || filled[c.id].length !== c.days) {
            filled[c.id] = Array.from({ length: c.days }, () => false);
          }
        });
        setProgress(filled);
      } catch {
        const fallback: ProgressMap = {};
        CHALLENGES.forEach((c) => {
          fallback[c.id] = Array.from({ length: c.days }, () => false);
        });
        setProgress(fallback);
      }
    };
    void load();
  }, []);
  
  const handleLessonsPress = useCallback(() => {
    router.push('/(tabs)/lessons');
  }, []);

  const handleAICoachPress = useCallback(() => {
    router.push('/(tabs)/ai-coach');
  }, []);

  const handleChallengePress = useCallback(() => {
    router.push('/(tabs)/challenge');
  }, []);



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

        <View style={styles.profileCard} testID="home-profile-card">
          <View style={styles.avatarContainer}>
            <User color={PRIMARY_600} size={32} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Elif</Text>
            <View style={styles.subscriptionBadge}>
              <Crown color={PRIMARY_600} size={16} />
              <Text style={styles.subscriptionText}>Premium Üye</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('[Home] Settings pressed')} activeOpacity={0.7} testID="home-settings">
            <View style={styles.menuIconContainer}>
              <Settings color={PRIMARY_600} size={24} />
            </View>
            <Text style={styles.menuText}>Ayarlar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('[Home] Help pressed')} activeOpacity={0.7} testID="home-help">
            <View style={styles.menuIconContainer}>
              <HelpCircle color={PRIMARY_600} size={24} />
            </View>
            <Text style={styles.menuText}>Yardım & Destek</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={() => console.log('[Home] Logout pressed')} activeOpacity={0.7} testID="home-logout">
            <View style={styles.menuIconContainer}>
              <LogOut color="#dc2626" size={24} />
            </View>
            <Text style={[styles.menuText, styles.logoutText]}>Çıkış Yap</Text>
          </TouchableOpacity>
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

        <View style={styles.qaHeaderRow}>
          <Flag color={PRIMARY_600} size={20} />
          <Text style={styles.qaTitle}>Challenge Hızlı Erişim</Text>
        </View>
        {CHALLENGES.map((c) => {
          const arr = progress[c.id] ?? Array.from({ length: c.days }, () => false);
          const completed = arr.filter(Boolean).length;
          const percentage = Math.round((completed / c.days) * 100);
          return (
            <TouchableOpacity key={c.id} style={styles.qaCard} onPress={handleChallengePress} activeOpacity={0.8} testID={`qa-${c.id}`}>
              <View style={styles.qaHeader}>
                <Text style={styles.qaCardTitle}>{c.title}</Text>
                <View style={styles.qaPill}><Text style={styles.qaPillText}>{percentage}%</Text></View>
              </View>
              <View style={styles.qaDaysRow}>
                {arr.map((done, idx) => (
                  <View key={`${c.id}-${idx}`} style={[styles.qaDay, done ? styles.qaDayDone : undefined]} testID={`qa-day-${c.id}-${idx+1}`}>
                    {done ? <CheckCircle2 color={'white'} size={14} /> : <Text style={styles.qaDayLabel}>{idx+1}</Text>}
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Gizli Takıntı v1.0.0</Text>
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
    marginTop: 8,
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

  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: BORDER,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PRIMARY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 'bold', color: TEXT_900, marginBottom: 8 },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PRIMARY_100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  subscriptionText: { fontSize: 14, fontWeight: '500', color: PRIMARY_600 },
  menuContainer: { gap: 12, marginBottom: 24 },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: BORDER,
  },
  logoutItem: { marginTop: 4 },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PRIMARY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: { fontSize: 16, fontWeight: '500', color: TEXT_900 },
  logoutText: { color: '#dc2626' },

  qaHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, marginBottom: 8 },
  qaTitle: { fontSize: 18, fontWeight: '700', color: TEXT_900 },
  qaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  qaHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  qaCardTitle: { fontSize: 16, fontWeight: '700', color: TEXT_900 },
  qaPill: { backgroundColor: PRIMARY_600, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, minWidth: 56, alignItems: 'center' },
  qaPillText: { color: 'white', fontWeight: '700', fontSize: 13 },
  qaDaysRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  qaDay: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: PRIMARY_100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaDayDone: { backgroundColor: PRIMARY_600, borderColor: PRIMARY_600 },
  qaDayLabel: { fontSize: 12, fontWeight: '700', color: TEXT_900 },

  versionContainer: { alignItems: 'center', paddingTop: 8, paddingBottom: 16 },
  versionText: { fontSize: 12, color: SECONDARY_600 },
});