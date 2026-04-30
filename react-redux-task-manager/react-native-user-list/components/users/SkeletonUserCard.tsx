import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

function ShimmerBar({ width, height }: { width: `${number}%` | number; height: number }) {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.bar,
        { width, height, opacity },
      ]}
    />
  );
}

export function SkeletonUserCard() {
  return (
    <View style={styles.card}>
      <View style={styles.avatar} />
      <View style={styles.col}>
        <ShimmerBar width="55%" height={16} />
        <ShimmerBar width="75%" height={12} />
        <ShimmerBar width="90%" height={12} />
      </View>
      <View style={styles.right}>
        <ShimmerBar width={56} height={22} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
  },
  col: {
    flex: 1,
    gap: 8,
    minWidth: 0,
  },
  bar: {
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    maxWidth: '100%',
  },
  right: {
    marginLeft: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
