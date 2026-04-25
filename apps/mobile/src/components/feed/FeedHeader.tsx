import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, palette } from '../../theme/tokens';

export function FeedHeader() {
  return (
    <View style={styles.row}>
      <View style={styles.wordmark}>
        <Text style={styles.wordmarkBig}>Share</Text>
        <Text style={styles.wordmarkSmall}>a beer</Text>
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.iconBtn} hitSlop={6}>
          <Feather name="search" size={20} color="rgba(255,255,255,0.85)" />
        </Pressable>
        <Pressable style={styles.iconBtn} hitSlop={6}>
          <Feather name="bell" size={20} color="rgba(255,255,255,0.85)" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
  },
  wordmark: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  wordmarkBig: {
    fontFamily: fonts.serif.italic,
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
    letterSpacing: 0.3,
  },
  wordmarkSmall: {
    fontFamily: fonts.serif.italic,
    color: palette.accent,
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 0.18,
  },
  actions: {
    flexDirection: 'row',
    gap: 6,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
