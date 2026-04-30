import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { loadUserById, selectUserById } from '@/store/usersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { AppError } from '@/types/errors';

export default function UserDetailScreen() {
  const navigation = useNavigation();
  const { id: idParam } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const numericId = Number(idParam);
  const user = useAppSelector(selectUserById(Number.isFinite(numericId) ? numericId : -1));
  const [loading, setLoading] = useState(() => !user);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!Number.isFinite(numericId)) {
      setLoading(false);
      setError({ message: 'Invalid user id' });
      return;
    }
    if (user) {
      setLoading(false);
      setError(null);
      return;
    }
    dispatch(loadUserById(numericId))
      .unwrap()
      .then(() => {
        if (!cancelled) setError(null);
      })
      .catch((e: AppError) => {
        if (!cancelled) setError(e ?? { message: 'Failed to load user' });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dispatch, numericId, user]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: user?.name ?? 'User' });
  }, [navigation, user?.name]);

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!loading && error && (
          <View style={styles.center}>
            <Text style={styles.errTitle}>Could not load user</Text>
            <Text style={styles.errBody}>{error.message}</Text>
            <Pressable
              onPress={() => {
                setError(null);
                setLoading(true);
                dispatch(loadUserById(numericId))
                  .unwrap()
                  .then(() => setError(null))
                  .catch((e: AppError) => setError(e ?? { message: 'Failed to load user' }))
                  .finally(() => setLoading(false));
              }}
              style={styles.retry}
              accessibilityRole="button">
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
            <Pressable onPress={() => router.back()} accessibilityRole="button">
              <Text style={styles.backLink}>Go back</Text>
            </Pressable>
          </View>
        )}
        {!loading && !error && user && (
          <View style={styles.card}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{user.formattedAddress}</Text>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{user.status}</Text>
          </View>
        )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f8fafc',
  },
  center: {
    paddingVertical: 32,
    alignItems: 'center',
    gap: 12,
  },
  errTitle: { fontWeight: '700', fontSize: 18, color: '#111827' },
  errBody: { color: '#6b7280', textAlign: 'center', paddingHorizontal: 16 },
  retry: {
    marginTop: 8,
    backgroundColor: '#1e40af',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: { color: '#fff', fontWeight: '600' },
  backLink: { color: '#2563eb', marginTop: 8, fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#111827',
    marginTop: 4,
  },
});
