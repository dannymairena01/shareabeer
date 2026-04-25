import { StyleSheet, Text, View } from 'react-native';

import { bg, fonts, palette } from '../../src/theme/tokens';

export default function ProfileStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>PROFILE</Text>
      <Text style={styles.headline}>Coming next</Text>
      <Text style={styles.body}>Stats, weekly recap, trophy case go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bg.base,
    padding: 22,
  },
  eyebrow: {
    color: palette.accent,
    fontSize: 11,
    letterSpacing: 1.7,
    fontFamily: fonts.sans.bold,
    marginBottom: 12,
  },
  headline: {
    color: '#fff',
    fontSize: 28,
    fontFamily: fonts.sans.medium,
    letterSpacing: -0.5,
  },
  body: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13.5,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: fonts.sans.regular,
  },
});
