import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ClockScreen from './screens/ClockScreen';
import AlarmScreen from './screens/AlarmScreen';
import StopwatchScreen from './screens/StopwatchScreen';
import TimerScreen from './screens/TimerScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Clock') {
              iconName = 'time';
            } else if (route.name === 'Alarm') {
              iconName = 'alarm';
            } else if (route.name === 'Stopwatch') {
              iconName = 'stopwatch';
            } else if (route.name === 'Timer') {
              iconName = 'timer';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Clock" component={ClockScreen} />
        <Tab.Screen name="Alarm" component={AlarmScreen} />
        <Tab.Screen name="Stopwatch" component={StopwatchScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
