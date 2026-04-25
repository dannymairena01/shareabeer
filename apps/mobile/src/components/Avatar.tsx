import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '../theme/tokens';

type Props = {
  letter: string;
  tone: number;
  size?: number;
  ring?: string;
};

// Tone is a hue 0–360. We approximate the OKLCH gradient with two HSL stops.
function toneStops(tone: number): readonly [string, string] {
  const lightSat = 55;
  const darkSat = 60;
  return [`hsl(${tone}, ${lightSat}%, 65%)`, `hsl(${tone}, ${darkSat}%, 32%)`] as const;
}

export function Avatar({ letter, tone, size = 36, ring }: Props) {
  const [c1, c2] = toneStops(tone);
  const ringWidth = ring ? 1.5 : 0;
  const gap = ring ? 1.5 : 0;
  const outer = size + (ringWidth + gap) * 2;

  const inner = (
    <LinearGradient
      colors={[c1, c2]}
      start={{ x: 0.3, y: 0.25 }}
      end={{ x: 1, y: 1 }}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[styles.letter, { fontSize: size * 0.42 }]}>{letter}</Text>
    </LinearGradient>
  );

  if (!ring) return inner;
  return (
    <View
      style={{
        width: outer,
        height: outer,
        borderRadius: outer / 2,
        backgroundColor: '#000',
        padding: gap,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size + ringWidth * 2,
          height: size + ringWidth * 2,
          borderRadius: (size + ringWidth * 2) / 2,
          backgroundColor: ring,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {inner}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'rgba(0,0,0,0.7)',
    fontFamily: fonts.sans.bold,
  },
});
