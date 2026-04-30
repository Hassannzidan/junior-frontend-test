import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { AppError } from '@/types/errors';

type Props = {
  error: AppError;
  onDismiss: () => void;
  onRetry: () => void;
};

export function ErrorBanner({ error, onDismiss, onRetry }: Props) {
  return (
    <View style={styles.wrap} accessibilityRole="alert">
      <View style={styles.textCol}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>{error.message}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onRetry} style={styles.retry} accessibilityRole="button">
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
        <Pressable onPress={onDismiss} hitSlop={8} accessibilityLabel="Dismiss error">
          <Text style={styles.dismiss}>Dismiss</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textCol: { flex: 1, minWidth: 0 },
  title: { fontWeight: '600', color: '#991b1b', marginBottom: 4 },
  message: { color: '#7f1d1d', fontSize: 13 },
  actions: { alignItems: 'flex-end', gap: 8 },
  retry: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  dismiss: { color: '#64748b', fontSize: 13 },
});
