import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, palette } from '../theme/tokens';

type Props = {
  liked: boolean;
  likes: number;
  comments: number;
  onLike: () => void;
};

export function ActionRow({ liked, likes, comments, onLike }: Props) {
  const scale = useRef(new Animated.Value(liked ? 1.1 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: liked ? 1.1 : 1,
      useNativeDriver: true,
      friction: 4,
      tension: 180,
    }).start();
  }, [liked, scale]);

  return (
    <View style={styles.row}>
      <Pressable onPress={onLike} style={styles.btn} hitSlop={6}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? palette.accent : 'rgba(255,255,255,0.85)'}
          />
        </Animated.View>
        <Text style={[styles.count, liked && { color: palette.accent }]}>{likes}</Text>
      </Pressable>
      <Pressable style={styles.btn} hitSlop={6}>
        <Feather name="message-circle" size={22} color="rgba(255,255,255,0.85)" />
        <Text style={styles.count}>{comments}</Text>
      </Pressable>
      <Pressable style={[styles.btn, styles.shareBtn]} hitSlop={6}>
        <Feather name="share" size={22} color="rgba(255,255,255,0.85)" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 4,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shareBtn: {
    marginLeft: 'auto',
  },
  count: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontFamily: fonts.sans.semibold,
    fontVariant: ['tabular-nums'],
  },
});
