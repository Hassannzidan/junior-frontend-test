import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { DisplayUser } from '@/types/user';

type Props = {
  user: DisplayUser;
  selected?: boolean;
  onPress: (user: DisplayUser) => void;
};

export const UserCard = memo(function UserCard({ user, selected, onPress }: Props) {
  const isActive = user.status === 'Active';

  return (
    <Pressable
      onPress={() => onPress(user)}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${user.name}, ${user.status}`}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} recyclingKey={`u-${user.id}`} />
      <View style={styles.middle}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {user.email}
        </Text>
        <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
          {user.formattedAddress}
        </Text>
      </View>
      <View style={styles.right}>
        <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeOffline]}>
          <Text style={[styles.badgeText, isActive ? styles.badgeTextActive : styles.badgeTextOffline]}>
            {user.status}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" style={styles.chevron} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#2563eb',
  },
  pressed: {
    opacity: 0.92,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
  },
  middle: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#9ca3af',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-end',
  },
  badgeActive: {
    backgroundColor: '#dbeafe',
  },
  badgeOffline: {
    backgroundColor: '#f3f4f6',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  badgeTextActive: {
    color: '#1d4ed8',
  },
  badgeTextOffline: {
    color: '#4b5563',
  },
  chevron: {
    marginRight: -4,
  },
});
