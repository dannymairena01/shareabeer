import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, palette } from '../../theme/tokens';

const TABS = ['For you', 'Following', 'Nearby'] as const;
export type FeedTab = (typeof TABS)[number];

type Props = {
  active: FeedTab;
  onChange: (tab: FeedTab) => void;
};

export function FeedTabs({ active, onChange }: Props) {
  return (
    <View style={styles.row}>
      {TABS.map((t) => {
        const isActive = t === active;
        return (
          <Pressable key={t} onPress={() => onChange(t)} style={styles.tab} hitSlop={6}>
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {t}
            </Text>
            {isActive && <View style={styles.underline} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 22,
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  tab: {
    paddingVertical: 6,
    position: 'relative',
  },
  label: {
    fontSize: 13.5,
    letterSpacing: 0.13,
  },
  labelActive: {
    color: '#fff',
    fontFamily: fonts.sans.semibold,
  },
  labelInactive: {
    color: 'rgba(255,255,255,0.45)',
    fontFamily: fonts.sans.medium,
  },
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -8,
    height: 2,
    backgroundColor: palette.accent,
    borderRadius: 2,
  },
});
