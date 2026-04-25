import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CheckinPost } from '../../src/components/feed/CheckinPost';
import { FeedHeader } from '../../src/components/feed/FeedHeader';
import { FeedTabs, type FeedTab } from '../../src/components/feed/FeedTabs';
import { PhotoPost } from '../../src/components/feed/PhotoPost';
import { SessionPost } from '../../src/components/feed/SessionPost';
import { FEED, type FeedPost } from '../../src/data/mockFeed';
import { bg, fonts } from '../../src/theme/tokens';

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<FeedTab>('For you');
  const [posts, setPosts] = useState<FeedPost[]>(FEED);

  const toggleLike = (id: string) =>
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p,
      ),
    );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <FeedHeader />
      <FeedTabs active={tab} onChange={setTab} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {posts.map((p) => {
          if (p.kind === 'photo') {
            return <PhotoPost key={p.id} post={p} onLike={() => toggleLike(p.id)} />;
          }
          if (p.kind === 'checkin') {
            return <CheckinPost key={p.id} post={p} onLike={() => toggleLike(p.id)} />;
          }
          return <SessionPost key={p.id} post={p} onLike={() => toggleLike(p.id)} />;
        })}
        <Text style={styles.caughtUp}>── you're caught up ──</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: bg.base,
  },
  scroll: {
    paddingTop: 16,
    paddingBottom: 120,
  },
  caughtUp: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    letterSpacing: 1.3,
    fontFamily: fonts.sans.semibold,
    textAlign: 'center',
    paddingTop: 14,
    paddingBottom: 6,
    textTransform: 'uppercase',
  },
});
