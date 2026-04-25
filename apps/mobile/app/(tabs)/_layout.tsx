import { Tabs } from 'expo-router';

import { TabBar } from '../../src/components/TabBar';
import { bg } from '../../src/theme/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: bg.base },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Feed' }} />
      <Tabs.Screen name="session" options={{ title: 'Session' }} />
      <Tabs.Screen
        name="capture"
        options={{ title: 'Capture', tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
