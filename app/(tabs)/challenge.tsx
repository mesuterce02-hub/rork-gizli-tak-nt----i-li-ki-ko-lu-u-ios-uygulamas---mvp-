import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flag, Lock, CheckCircle2 } from 'lucide-react-native';

const PRIMARY_50 = '#fef7f8';
const PRIMARY_100 = '#fdeff1';
const PRIMARY_600 = '#ef8f9f';
const SECONDARY_600 = '#87646a';
const TEXT_900 = '#171112';
const BORDER = '#e5dcdd';

interface ChallengeDef {
  id: string;
  title: string;
  description: string;
  days: number; // always 15 for now
}

interface ProgressMap {
  [challengeId: string]: boolean[]; // length === days, true if completed
}

const CHALLENGES: ChallengeDef[] = [
  {
    id: 'get-ex-back',
    title: 'Eski İlişkini Geri Getirme Challenge',
    description: 'Eski partnerinle iletişimi stratejik ve sağlıklı şekilde yeniden başlat.',
    days: 15,
  },
  {
    id: 'fix-current',
    title: 'Mevcut İlişkide Sorun Çözme Challenge',
    description: 'İletişimi güçlendir, anlaşmazlıkları çözen ritüeller oluştur.',
    days: 15,
  },
  {
    id: 'new-love',
    title: 'Yeni İlişkiye Yelken Açma Challenge',
    description: 'Kendini hazırlayıp doğru eşleşmeleri hayatına çek.',
    days: 15,
  },
];

const STORAGE_KEY = 'challenge-progress-v1';

export default function ChallengeScreen() {
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<ProgressMap>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        console.log('[Challenge] Loading progress from storage');
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as ProgressMap;
          setProgress(parsed ?? {});
        } else {
          const initial: ProgressMap = {};
          CHALLENGES.forEach((c) => {
            initial[c.id] = Array.from({ length: c.days }, () => false);
          });
          setProgress(initial);
        }
      } catch (e) {
        console.log('[Challenge] Load error', (e as Error)?.message);
        const fallback: ProgressMap = {};
        CHALLENGES.forEach((c) => {
          fallback[c.id] = Array.from({ length: c.days }, () => false);
        });
        setProgress(fallback);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const save = useCallback(async (next: ProgressMap) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.log('[Challenge] Save error', (e as Error)?.message);
      if (Platform.OS === 'web') {
        Alert.alert('Kaydedilemedi', 'Tarayıcı depolaması sınırlı olabilir. Değişiklikler kaybolabilir.');
      }
    }
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleDayPress = useCallback((challengeId: string, dayIdx: number) => {
    setProgress((prev) => {
      const current = prev[challengeId] ?? [];
      const days = current.slice();
      const firstLockedIndex = days.findIndex((done) => !done);
      const isLocked = firstLockedIndex !== -1 && dayIdx > firstLockedIndex;
      if (isLocked) {
        console.log('[Challenge] Locked day tap', { challengeId, dayIdx });
        return prev;
      }
      const nextVal = !days[dayIdx];
      // En fazla ardışık günler açık kalsın: bir günü geri alırsan sonraki günleri kilitle.
      days[dayIdx] = nextVal;
      if (!nextVal) {
        for (let i = dayIdx + 1; i < days.length; i += 1) {
          days[i] = false;
        }
      }
      const next: ProgressMap = { ...prev, [challengeId]: days };
      void save(next);
      return next;
    });
  }, [save]);

  const cards = useMemo(() => CHALLENGES, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Flag color={PRIMARY_600} size={24} />
          <Text style={styles.title}>Challenge</Text>
        </View>
        <Text style={styles.subtitle}>Her challenge 15 gün. İlk gün açık; her gün bir önceki tamamlanınca açılır.</Text>

        {cards.map((c) => {
          const arr = progress[c.id] ?? Array.from({ length: c.days }, () => false);
          const completedCount = arr.filter(Boolean).length;
          const pct = Math.round((completedCount / c.days) * 100);
          const expanded = expandedId === c.id;
          return (
            <View key={c.id} style={styles.card} testID={`challenge-card-${c.id}`}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpanded(c.id)} activeOpacity={0.8} testID={`challenge-toggle-${c.id}`}>
                <View style={styles.cardTitleCol}>
                  <Text style={styles.cardTitle}>{c.title}</Text>
                  <Text style={styles.cardDesc}>{c.description}</Text>
                </View>
                <View style={styles.progressPill}>
                  <Text style={styles.progressText}>{pct}%</Text>
                </View>
              </TouchableOpacity>

              {expanded && (
                <View style={styles.daysGrid}>
                  {arr.map((done, idx) => {
                    const firstIncomplete = arr.findIndex((d) => !d);
                    const isLocked = firstIncomplete !== -1 && idx > firstIncomplete;
                    const dayNum = idx + 1;
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[styles.dayCell, done ? styles.dayDone : undefined, isLocked ? styles.dayLocked : undefined]}
                        onPress={() => handleDayPress(c.id, idx)}
                        activeOpacity={0.8}
                        disabled={isLocked || isLoading}
                        testID={`day-${c.id}-${dayNum}`}
                      >
                        {done ? (
                          <CheckCircle2 color={'white'} size={18} />
                        ) : isLocked && firstIncomplete !== idx ? (
                          <Lock color={SECONDARY_600} size={18} />
                        ) : (
                          <Text style={[styles.dayLabel, isLocked ? styles.dayLabelLocked : undefined]}>{dayNum}</Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_50,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: TEXT_900,
  },
  subtitle: {
    fontSize: 14,
    color: SECONDARY_600,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitleCol: { flex: 1 },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_900,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: SECONDARY_600,
  },
  progressPill: {
    backgroundColor: PRIMARY_600,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
  },
  progressText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  daysGrid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dayCell: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_100,
  },
  dayDone: {
    backgroundColor: PRIMARY_600,
    borderColor: PRIMARY_600,
  },
  dayLocked: {
    backgroundColor: '#f7f4f5',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_900,
  },
  dayLabelLocked: {
    color: SECONDARY_600,
  },
});
