import { icons } from '@/constants';
import { cn } from '@/lib/utils';
import { Tabs } from 'expo-router';
import { Image, type ImageSourcePropType, Text, View } from 'react-native';

function TabIcon({
  focused,
  source,
  title,
}: Readonly<{ focused: boolean; source: ImageSourcePropType; title: string }>) {
  return (
    <View className={cn('h-full items-center justify-center')}>
      <Image
        source={source}
        className={cn('size-6', focused ? 'text-primary' : 'text-light-100')}
        tintColor={focused ? '#E7C9A5' : '#CDCDE0'}
        resizeMode="cover"
      />
      <Text
        className={cn(
          'w-full text-sm',
          focused ? 'font-bold text-primary' : 'text-light-100',
        )}
      >
        {title}
      </Text>
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#16191E',
          paddingBottom: 0,
          overflow: 'hidden',
          height: 80,
          position: 'absolute',
          borderColor: '#252933',
          borderTopWidth: 1
        },
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.tabBook} title="Library" />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              source={icons.favorites}
              title="Favorites"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
