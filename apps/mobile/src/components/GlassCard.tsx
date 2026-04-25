import { BlurView } from 'expo-blur';
import type { ReactNode } from 'react';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';

import { radii } from '../theme/tokens';

type Props = {
  children: ReactNode;
  intensity?: 'light' | 'med' | 'strong';
  radius?: number;
  style?: ViewStyle | ViewStyle[];
};

export function GlassCard({ children, intensity = 'med', radius = radii.card, style }: Props) {
  const blur = intensity === 'strong' ? 28 : intensity === 'light' ? 12 : 18;

  // BlurView on web is a no-op; fall back to a tinted surface there.
  if (Platform.OS === 'web') {
    return <View style={[styles.fallback, { borderRadius: radius }, style]}>{children}</View>;
  }

  return (
    <View style={[styles.wrapper, { borderRadius: radius }, style]}>
      <BlurView
        intensity={blur * 4}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />
      <View style={[styles.tint, { borderRadius: radius }]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,18,14,0.55)',
  },
  fallback: {
    backgroundColor: 'rgba(20,18,14,0.78)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
});
