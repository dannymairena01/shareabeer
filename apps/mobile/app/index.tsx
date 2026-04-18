import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍺</Text>
      <Text style={styles.title}>Share a Beer — v0</Text>
      <Text style={styles.subtitle}>The social network for beer.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5a623',
    padding: 24,
  },
  emoji: { fontSize: 72, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', color: '#1c1c1e', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#1c1c1e', opacity: 0.8 },
});
