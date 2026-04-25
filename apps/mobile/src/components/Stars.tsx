import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { palette } from '../theme/tokens';

const STAR_PATH = 'M12 2 15 9l7 .5-5.5 4.6 2 7L12 17l-6.5 4.1 2-7L2 9.5 9 9z';

type Props = {
  value: number;
  size?: number;
  color?: string;
};

export function Stars({ value, size = 11, color = palette.accent }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <View key={i} style={{ width: size, height: size }}>
            <Svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'absolute' }}>
              <Path d={STAR_PATH} fill="rgba(255,255,255,0.15)" />
            </Svg>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: size * fill,
                height: size,
                overflow: 'hidden',
              }}
            >
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path d={STAR_PATH} fill={color} />
              </Svg>
            </View>
          </View>
        );
      })}
    </View>
  );
}
