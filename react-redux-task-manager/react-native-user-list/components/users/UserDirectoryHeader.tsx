import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Props = {
  title?: string;
  onMenuPress?: () => void;
};

const AVATAR =
  'https://i.pravatar.cc/100?img=12';

export function UserDirectoryHeader({ title = 'User Directory', onMenuPress }: Props) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <View style={[styles.row, { paddingTop: Math.max(insets.top, 12), borderBottomColor: palette.icon + '33' }]}>
      <Pressable
        onPress={onMenuPress}
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        hitSlop={10}
        style={styles.side}>
        <Ionicons name="menu" size={26} color={palette.text} />
      </Pressable>
      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      <View style={styles.side}>
        <Image source={{ uri: AVATAR }} style={styles.avatar} accessibilityLabel="Your profile photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e5e7eb',
  },
});
