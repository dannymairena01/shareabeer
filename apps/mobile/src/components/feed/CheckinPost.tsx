import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import type { FeedPost } from '../../data/mockFeed';
import { fonts, palette } from '../../theme/tokens';
import { ActionRow } from '../ActionRow';
import { Avatar } from '../Avatar';

type Props = {
  post: Extract<FeedPost, { kind: 'checkin' }>;
  onLike: () => void;
};

export function CheckinPost({ post, onLike }: Props) {
  return (
    <View style={styles.article}>
      <View style={styles.header}>
        <Avatar letter={post.user.avatar} tone={post.user.avatarTone} size={32} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{post.user.name}</Text>
          <Text style={styles.subtitle}>checked in · {post.when}</Text>
        </View>
        <View style={styles.ratingChip}>
          <Ionicons name="star" size={11} color="#000" />
          <Text style={styles.ratingChipText}>{post.beer.score.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.glassCol}>
          <LinearGradient
            colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0)', '#F2C95A', '#B07A14']}
            locations={[0, 0.08, 0.12, 1]}
            style={styles.glass}
          />
          <View style={styles.foam} />
        </View>
        <View style={styles.beerInfo}>
          <Text style={styles.beerName}>{post.beer.name}</Text>
          <Text style={styles.beerMeta}>
            {post.beer.brewery} · {post.beer.style} · {post.beer.abv}% ABV
          </Text>
          <Text style={styles.note}>"{post.note}"</Text>
          <Text style={styles.venue}>at {post.where}</Text>
        </View>
      </View>

      <ActionRow liked={post.liked} likes={post.likes} comments={post.comments} onLike={onLike} />
    </View>
  );
}

const styles = StyleSheet.create({
  article: {
    marginHorizontal: 14,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.025)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: '#fff',
    fontSize: 13,
    fontFamily: fonts.sans.semibold,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    fontFamily: fonts.sans.regular,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: palette.accent,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  ratingChipText: {
    color: '#000',
    fontSize: 11,
    fontFamily: fonts.sans.bold,
    fontVariant: ['tabular-nums'],
  },
  body: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  glassCol: {
    width: 44,
    height: 56,
    position: 'relative',
  },
  glass: {
    position: 'absolute',
    top: 4,
    left: 6,
    right: 6,
    bottom: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  foam: {
    position: 'absolute',
    top: 6,
    left: 8,
    right: 8,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 4,
    opacity: 0.7,
  },
  beerInfo: {
    flex: 1,
    minWidth: 0,
  },
  beerName: {
    color: '#fff',
    fontSize: 15,
    fontFamily: fonts.sans.semibold,
    letterSpacing: -0.15,
  },
  beerMeta: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    fontFamily: fonts.sans.regular,
    marginTop: 1,
  },
  note: {
    color: palette.cream,
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
    fontStyle: 'italic',
    fontFamily: fonts.sans.regular,
  },
  venue: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    marginTop: 6,
    fontFamily: fonts.sans.regular,
  },
});
