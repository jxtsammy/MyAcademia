import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Screen components
const HomeScreen = () => (
  <View style={styles.center}>
    <Text>Home Screen</Text>
  </View>
);
const CalendarScreen = () => (
  <View style={styles.center}>
    <Text>Calendar Screen</Text>
  </View>
);
const ChecklistScreen = () => (
  <View style={styles.center}>
    <Text>Checklist Screen</Text>
  </View>
);
const ChatScreen = () => (
  <View style={styles.center}>
    <Text>Chat Screen</Text>
  </View>
);
const ProfileScreen = () => (
  <View style={styles.center}>
    <Text>Profile Screen</Text>
  </View>
);

// Custom Icon without animation
const Icon = ({ name, focused }) => (
  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
    <FontAwesome5 name={name} size={24} color={focused ? '#fff' : '#01796F'} />
  </View>
);

// Custom Tab Bar
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const iconName = options.tabBarIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <Icon name={iconName} focused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: 'home' }} // Home icon
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ tabBarIcon: 'calendar-alt' }} // Calendar icon
        />
        <Tab.Screen
          name="Checklist"
          component={ChecklistScreen}
          options={{ tabBarIcon: 'clipboard-check' }} // Checklist icon
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{ tabBarIcon: 'paper-plane' }} // Chat icon
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarIcon: 'user' }} // Profile icon
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30, // Adjusted radius for curved edges
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 20, // Reduced length of the tab bar
    bottom: 50
  },
  tabItem: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  activeIconContainer: {
    backgroundColor: '#01796F',
  },
});