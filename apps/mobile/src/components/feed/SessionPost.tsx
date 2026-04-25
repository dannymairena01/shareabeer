import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import type { FeedPost } from '../../data/mockFeed';
import { fonts, palette } from '../../theme/tokens';
import { ActionRow } from '../ActionRow';
import { Avatar } from '../Avatar';

type Props = {
  post: Extract<FeedPost, { kind: 'session' }>;
  onLike: () => void;
};

export function SessionPost({ post, onLike }: Props) {
  const stats = [
    { v: post.session.duration, l: 'Time' },
    { v: String(post.session.beers), l: 'Beers' },
    { v: String(post.session.friends), l: 'Friends' },
    { v: String(post.session.miles), l: 'Miles' },
  ];

  return (
    <View style={styles.article}>
      <View style={styles.header}>
        <Avatar letter={post.user.avatar} tone={post.user.avatarTone} size={36} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{post.user.name}</Text>
          <Text style={styles.subtitle}>ended a session · {post.when}</Text>
        </View>
      </View>
      <View style={styles.cardWrap}>
        <LinearGradient colors={['#1A1610', '#0A0806']} style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={[`${palette.accent}33`, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.7, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.eyebrow}>SESSION</Text>
            <Text style={styles.venue}>{post.where}</Text>
          </View>
          <Feather name="flag" size={22} color={palette.accent} />
        </View>
        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View key={s.l} style={styles.statCell}>
              <Text style={styles.statValue}>{s.v}</Text>
              <Text style={styles.statLabel}>{s.l}</Text>
            </View>
          ))}
        </View>
      </View>
      <ActionRow liked={post.liked} likes={post.likes} comments={post.comments} onLike={onLike} />
    </View>
  );
}

const styles = StyleSheet.create({
  article: {
    marginHorizontal: 14,
    marginBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 13.5,
    fontFamily: fonts.sans.semibold,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11.5,
    fontFamily: fonts.sans.regular,
  },
  cardWrap: {
    position: 'relative',
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10.5,
    letterSpacing: 1.7,
    fontFamily: fonts.sans.semibold,
  },
  venue: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.sans.semibold,
    letterSpacing: -0.18,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCell: {
    flex: 1,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.sans.thin,
    letterSpacing: -0.54,
    fontVariant: ['tabular-nums'],
  },
  statLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 10,
    letterSpacing: 1,
    fontFamily: fonts.sans.semibold,
    marginTop: 2,
    textTransform: 'uppercase',
  },
});
