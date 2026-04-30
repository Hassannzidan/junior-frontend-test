import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ErrorBanner } from '@/components/users/ErrorBanner';
import { SearchBar } from '@/components/users/SearchBar';
import { SkeletonUserCard } from '@/components/users/SkeletonUserCard';
import { UserCard } from '@/components/users/UserCard';
import { UserDirectoryHeader } from '@/components/users/UserDirectoryHeader';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import {
  clearError,
  fetchUsersPage,
  selectFilteredUsers,
  selectHasMore,
  selectUsersError,
  selectUsersStatus,
  setSearchQuery,
} from '@/store/usersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { DisplayUser } from '@/types/user';

type Props = {
  autoFocusSearch?: boolean;
};

export function UsersList({ autoFocusSearch = false }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme === 'dark' ? 'dark' : 'light'].tint;

  const filtered = useAppSelector(selectFilteredUsers);
  const hasMore = useAppSelector(selectHasMore);
  const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);
  const searchQuery = useAppSelector((s) => s.users.searchQuery);
  const idsLen = useAppSelector((s) => s.users.ids.length);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearchInput = useDebouncedValue(searchInput, 300);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchInput !== searchQuery) {
      dispatch(setSearchQuery(debouncedSearchInput));
    }
  }, [debouncedSearchInput, dispatch, searchQuery]);

  useEffect(() => {
    if (idsLen === 0) {
      dispatch(fetchUsersPage({ append: false }));
    }
  }, [dispatch, idsLen]);

  const onRefresh = useCallback(() => {
    dispatch(fetchUsersPage({ append: false }));
  }, [dispatch]);

  const onRetry = useCallback(() => {
    dispatch(fetchUsersPage({ append: false }));
  }, [dispatch]);

  const onDismissError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSearchChange = useCallback(
    (text: string) => {
      setSearchInput(text);
    },
    []
  );

  const onLoadMorePress = useCallback(() => {
    if (status === 'loading' || status === 'loadingMore' || !hasMore) return;
    dispatch(fetchUsersPage({ append: true }));
  }, [dispatch, hasMore, status]);

  const handleCardPress = useCallback(
    (user: DisplayUser) => {
      setSelectedId(user.id);
      router.push(`/user/${user.id}`);
    },
    [router]
  );

  const keyExtractor = useCallback((item: DisplayUser) => String(item.id), []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<DisplayUser>) => (
      <UserCard user={item} selected={selectedId === item.id} onPress={handleCardPress} />
    ),
    [handleCardPress, selectedId]
  );

  const refreshing = status === 'loading' && idsLen > 0;

  const footer = useMemo(() => {
    const showSpinner = status === 'loadingMore';
    const showBtn = hasMore && idsLen > 0;
    if (!showSpinner && !showBtn) return null;
    return (
      <View style={styles.footer}>
        {showSpinner && (
          <View style={styles.footerRow}>
            <ActivityIndicator />
            <Text style={styles.footerHint}>Loading more…</Text>
          </View>
        )}
        {showBtn && !showSpinner && (
          <Pressable
            onPress={onLoadMorePress}
            style={({ pressed }) => [styles.loadMore, pressed && styles.loadMorePressed]}
            accessibilityRole="button"
            accessibilityLabel="Load more users">
            <Text style={styles.loadMoreText}>Load More</Text>
            <Ionicons name="chevron-down" size={18} color="#fff" />
          </Pressable>
        )}
      </View>
    );
  }, [hasMore, idsLen, onLoadMorePress, status]);

  const showInitialSkeleton = status === 'loading' && idsLen === 0;

  return (
    <View style={styles.root}>
      <UserDirectoryHeader />
      <SearchBar value={searchInput} onChangeText={onSearchChange} autoFocus={autoFocusSearch} />
      {error && (
        <ErrorBanner error={error} onDismiss={onDismissError} onRetry={onRetry} />
      )}

      {showInitialSkeleton ? (
        <ScrollView contentContainerStyle={styles.skeletonPad} keyboardShouldPersistTaps="handled">
          <SkeletonUserCard />
          <SkeletonUserCard />
          <SkeletonUserCard />
        </ScrollView>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListFooterComponent={filtered.length === 0 ? null : footer}
          ListEmptyComponent={
            <Text style={styles.empty}>No users match your filter.</Text>
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={tint} />
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={8}
          removeClippedSubviews={Platform.OS === 'android'}
          extraData={selectedId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  skeletonPad: {
    paddingBottom: 24,
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerHint: {
    color: '#64748b',
    fontSize: 13,
  },
  loadMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1e40af',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
    minWidth: 200,
  },
  loadMorePressed: {
    opacity: 0.9,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
