import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { bg, palette } from '../theme/tokens';

type Props = {
  onPress: () => void;
};

export function CapturePill({ onPress }: Props) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <Pressable onPress={onPress} style={styles.fabHit} hitSlop={6}>
        <View style={styles.ring}>
          <LinearGradient
            colors={[palette.accent2, palette.accent]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.fab}
          >
            <Feather name="camera" size={26} color="#000" />
          </LinearGradient>
        </View>
      </Pressable>
    </View>
  );
}

const FAB_SIZE = 60;
const RING_GAP = 5;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: -22,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fabHit: {
    width: FAB_SIZE + RING_GAP * 2,
    height: FAB_SIZE + RING_GAP * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: FAB_SIZE + RING_GAP * 2,
    height: FAB_SIZE + RING_GAP * 2,
    borderRadius: (FAB_SIZE + RING_GAP * 2) / 2,
    backgroundColor: bg.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.accent,
    shadowOpacity: 0.55,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 10,
  },
});
