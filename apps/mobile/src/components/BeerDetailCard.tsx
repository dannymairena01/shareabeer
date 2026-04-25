import { StyleSheet, Text, View } from 'react-native';

import type { Beer } from '../data/mockFeed';
import { fonts, palette } from '../theme/tokens';
import { GlassCard } from './GlassCard';
import { Stars } from './Stars';

type Props = { beer: Beer };

export function BeerDetailCard({ beer }: Props) {
  return (
    <GlassCard radius={18} style={styles.card}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {beer.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {beer.brewery} · {beer.style}
          </Text>
        </View>
        <View style={styles.abvChip}>
          <Text style={styles.abvNum}>{beer.abv.toFixed(1)}</Text>
          <Text style={styles.abvLabel}>ABV%</Text>
        </View>
      </View>
      <View style={styles.ratingRow}>
        <Stars value={beer.rating} size={11} />
        <Text style={styles.ratingNum}>{beer.rating.toFixed(1)}</Text>
        <Text style={styles.ratingCount}>· {beer.ratings.toLocaleString()} ratings</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: '#fff',
    fontSize: 15.5,
    fontFamily: fonts.sans.semibold,
    letterSpacing: -0.15,
    lineHeight: 18,
  },
  meta: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 11.5,
    fontFamily: fonts.sans.regular,
    marginTop: 2,
  },
  abvChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  abvNum: {
    color: palette.accent,
    fontFamily: fonts.sans.bold,
    fontSize: 13,
    lineHeight: 14,
    fontVariant: ['tabular-nums'],
  },
  abvLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 8.5,
    fontFamily: fonts.sans.semibold,
    letterSpacing: 0.7,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  ratingNum: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontFamily: fonts.sans.semibold,
    fontVariant: ['tabular-nums'],
  },
  ratingCount: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10.5,
    fontFamily: fonts.sans.regular,
    fontVariant: ['tabular-nums'],
  },
});
