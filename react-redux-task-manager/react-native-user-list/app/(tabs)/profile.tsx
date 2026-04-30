import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { UserDirectoryHeader } from '@/components/users/UserDirectoryHeader';

const AVATAR = 'https://i.pravatar.cc/120?img=12';

export default function ProfileScreen() {
  return (
    <View style={styles.root}>
      <UserDirectoryHeader title="Profile" />
      <View style={styles.body}>
        <Image source={{ uri: AVATAR }} style={styles.avatar} accessibilityLabel="Profile photo" />
        <Text style={styles.name}>Account</Text>
        <Text style={styles.sub}>Signed-in preview — wire authentication here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#e5e7eb',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 280,
  },
});
