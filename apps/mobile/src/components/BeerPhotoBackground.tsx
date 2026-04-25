import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { PHOTO_GRADIENTS, type PhotoKind } from '../data/mockFeed';

type Props = {
  kind: PhotoKind;
  height?: number;
  radius?: number;
  children?: ReactNode;
};

export function BeerPhotoBackground({ kind, height = 410, radius = 22, children }: Props) {
  const recipe = PHOTO_GRADIENTS[kind];
  return (
    <View
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: radius,
        overflow: 'hidden',
      }}
    >
      <LinearGradient
        colors={recipe.colors as unknown as readonly [string, string, ...string[]]}
        locations={
          (recipe.locations ?? null) as unknown as readonly [number, number, ...number[]] | null
        }
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {/* Soft top-left highlight */}
      <LinearGradient
        colors={['rgba(255,231,163,0.45)', 'rgba(255,231,163,0)']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.7, y: 0.6 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {/* Vignette */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
        start={{ x: 0.5, y: 0.3 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {children}
    </View>
  );
}
