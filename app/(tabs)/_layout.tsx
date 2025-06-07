import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { useProducts } from '@/contexts/ProductsContext';

const TabIcon = ({ name, focused, icon }:any) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Text style={{ fontSize: 20 }}>{icon}</Text>
      <Text 
        style={{ 
          fontSize: 12, 
          color: focused ? '#8B5CF6' : '#666',
          fontWeight: focused ? '600' : '400'
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const CartTabIcon = ({ focused }:any) => {
  const { getCartItemsCount } = useProducts();
  const cartCount = getCartItemsCount();

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <View style={{ position: 'relative' }}>
        <Text style={{ fontSize: 20 }}>🛒</Text>
        {cartCount > 0 && (
          <View 
            style={{
              position: 'absolute',
              right: -8,
              top: -8,
              backgroundColor: '#FF4444',
              borderRadius: 10,
              minWidth: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {cartCount > 99 ? '99+' : cartCount}
            </Text>
          </View>
        )}
      </View>

    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingTop: 10,
          paddingBottom: 3,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          
          tabBarShowLabel:false,
          tabBarIcon: ({ focused }) => (
            <TabIcon  focused={focused} icon="🏠" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        
        options={{
          
          tabBarShowLabel:false,
         
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{

          // title: 'Wishlist',
          tabBarShowLabel:false,
          tabBarIcon: ({ focused }) => (
            <TabIcon  focused={focused} icon="❤️" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{

                    tabBarShowLabel:false,
          tabBarIcon: ({ focused }) => (
            <TabIcon  focused={focused} icon="👤" />
          ),
        }}
      />
    </Tabs>
  );
}
