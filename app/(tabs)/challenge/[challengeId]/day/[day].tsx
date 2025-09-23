import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY_50 = '#fef7f8';
const PRIMARY_100 = '#fdeff1';
const PRIMARY_600 = '#ef8f9f';
const SECONDARY_600 = '#87646a';
const TEXT_900 = '#171112';
const BORDER = '#e5dcdd';

interface ProgressMap {
  [challengeId: string]: boolean[];
}

const STORAGE_KEY = 'challenge-progress-v1';

export default function DayDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ challengeId?: string; day?: string }>();
  const challengeId = params.challengeId ?? '';
  const dayNum = Number(params.day ?? '1');
  const dayIndex = Math.max(0, dayNum - 1);

  const [days, setDays] = useState<boolean[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const map: ProgressMap = raw ? JSON.parse(raw) : {};
        const arr = map[challengeId] ?? [];
        setDays(arr);
      } catch (e) {
        setError('İlerleme yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [challengeId]);

  const firstIncomplete = useMemo(() => (days ? days.findIndex((d) => !d) : 0), [days]);
  const isLocked = useMemo(() => {
    if (!days) return true;
    return firstIncomplete !== -1 && dayIndex > firstIncomplete;
  }, [days, dayIndex, firstIncomplete]);

  const handleComplete = useCallback(async () => {
    try {
      if (!days) return;
      const next = [...days];
      next[dayIndex] = true;
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const map: ProgressMap = raw ? JSON.parse(raw) : {};
      map[challengeId] = next;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
      setDays(next);
      router.back();
    } catch (e) {
      Alert.alert('Hata', 'Kaydedilemedi.');
    }
  }, [days, dayIndex, challengeId, router]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!days) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Veri yok</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: 0 }]}> 
      <Stack.Screen options={{ title: `Gün ${dayNum}` }} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card} testID="day-placeholder">
          <Text style={styles.title}>Gün {dayNum}</Text>
          <Text style={styles.desc}>Bu gün için içerik/ödev yakında burada olacak. Şimdilik placeholder.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.primaryBtn, isLocked ? styles.btnDisabled : undefined]}
          onPress={handleComplete}
          activeOpacity={0.9}
          disabled={isLocked}
          testID="complete-day"
        >
          <Text style={styles.primaryLabel}>{isLocked ? 'Kilitli' : 'Tamamladım'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PRIMARY_50 },
  content: { padding: 20 },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },
  title: { fontSize: 20, fontWeight: '800', color: TEXT_900, marginBottom: 8 },
  desc: { fontSize: 14, color: SECONDARY_600 },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: BORDER, backgroundColor: '#fff' },
  primaryBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: PRIMARY_600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: '#cbb7bc',
  },
  primaryLabel: { color: 'white', fontSize: 16, fontWeight: '700' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: PRIMARY_50 },
  loadingText: { color: SECONDARY_600 },
  errorText: { color: '#b00020' },
});
