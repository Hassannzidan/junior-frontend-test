import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  autoFocus = false,
  placeholder = 'Filter users by name...',
}: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = Colors[isDark ? 'dark' : 'light'];

  const onChange = useCallback(
    (t: string) => {
      onChangeText(t);
    },
    [onChangeText]
  );

  return (
    <View style={[styles.wrap, { backgroundColor: isDark ? '#1f2937' : '#f1f5f9' }]}>
      <Ionicons name="search" size={20} color={palette.icon} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#9ca3af' : '#94a3b8'}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        style={[styles.input, { color: palette.text }]}
        accessibilityLabel="Filter users by name"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    minHeight: 24,
  },
});
