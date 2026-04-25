import { Feather } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { bg, fonts, palette } from '../theme/tokens';
import { CapturePill } from './CapturePill';

type IconName = 'home' | 'clock' | 'user';

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const currentName = state.routes[state.index]?.name;

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <LinearGradient colors={['rgba(0,0,0,0)', bg.base]} style={StyleSheet.absoluteFill} />
      <View style={styles.row}>
        <TabButton
          label="Feed"
          icon="home"
          active={currentName === 'index'}
          onPress={() => navigation.navigate('index')}
        />
        <TabButton
          label="Session"
          icon="clock"
          active={currentName === 'session'}
          onPress={() => navigation.navigate('session')}
        />
        <View style={styles.fabSpacer} />
        <TabButton
          label="Profile"
          icon="user"
          active={currentName === 'profile'}
          onPress={() => navigation.navigate('profile')}
        />
      </View>

      <CapturePill onPress={() => navigation.navigate('capture')} />

      {insets.bottom === 0 && <View style={styles.homeIndicator} />}
    </View>
  );
}

type ButtonProps = {
  label: string;
  icon: IconName;
  active: boolean;
  onPress: () => void;
};

function TabButton({ label, icon, active, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.btn} hitSlop={4}>
      <Feather name={icon} size={22} color={active ? palette.accent : 'rgba(255,255,255,0.42)'} />
      <Text style={[styles.label, { color: active ? palette.accent : 'rgba(255,255,255,0.42)' }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 18,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  fabSpacer: {
    width: 84,
  },
  spacer: {
    width: 0,
  },
  label: {
    fontSize: 9.5,
    fontFamily: fonts.sans.semibold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  homeIndicator: {
    alignSelf: 'center',
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
    bottom: 8,
  },
});
