import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { FeedPost } from '../../data/mockFeed';
import { fonts, palette } from '../../theme/tokens';
import { ActionRow } from '../ActionRow';
import { Avatar } from '../Avatar';
import { BeerDetailCard } from '../BeerDetailCard';
import { BeerPhotoBackground } from '../BeerPhotoBackground';

type Props = {
  post: Extract<FeedPost, { kind: 'photo' }>;
  onLike: () => void;
};

export function PhotoPost({ post, onLike }: Props) {
  return (
    <View style={styles.article}>
      <View style={styles.header}>
        <Avatar
          letter={post.user.avatar}
          tone={post.user.avatarTone}
          size={36}
          ring={palette.accent}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{post.user.name}</Text>
          <Text style={styles.where} numberOfLines={1}>
            {post.where} · {post.when}
          </Text>
        </View>
        <Pressable hitSlop={6}>
          <Feather name="more-horizontal" size={22} color="rgba(255,255,255,0.5)" />
        </Pressable>
      </View>

      <View style={styles.photoWrap}>
        <BeerPhotoBackground kind={post.photo} height={410} radius={22}>
          <View style={styles.detailWrap}>
            <BeerDetailCard beer={post.beer} />
          </View>
        </BeerPhotoBackground>
      </View>

      <ActionRow liked={post.liked} likes={post.likes} comments={post.comments} onLike={onLike} />
    </View>
  );
}

const styles = StyleSheet.create({
  article: {
    marginBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: '#fff',
    fontSize: 13.5,
    fontFamily: fonts.sans.semibold,
  },
  where: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11.5,
    fontFamily: fonts.sans.regular,
  },
  photoWrap: {
    marginHorizontal: 14,
    borderRadius: 22,
    overflow: 'hidden',
  },
  detailWrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
});
