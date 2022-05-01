import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CleanSheet from '../views/CleanSheet.js';
import CodeExample from '../views/CodeExample';
import Knowledge from '../views/Knowledge.js';

const Tab = createBottomTabNavigator();

function MyTabs() {

  return (
    <Tab.Navigator
      initialRouteName="CleanSheet"
      screenOptions={({ route }) =>({

        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "CleanSheet") {
              iconName = focused ? 'code-slash-outline' : 'code-outline';

            } else if (rn === "CodeExample") {
              iconName = focused ? 'terminal' : 'terminal-outline';

            } else if (rn === "Knowledge") {
              iconName = focused ? 'flask' : 'flask-outline';
            }
            return <Ionicons name={iconName} size={40} color={color} />;
        },
        headerTintColor: '#F6F6F6',
        headerShown: false,
        headerStyle: {
            backgroundColor: '#F6F6F6',
            borderBottomWidth: 0,
            elevation: 0, 
  	        shadowOpacity: 0,
          },
        tabBarActiveTintColor: '#151514',
        tabBarInactiveTintColor: '#151514',
        tabBarShowLabel: false,
        tabBarStyle: { 
          backgroundColor: '#F6F6F6',
          height: '11%',
          borderTopWidth: 0,
          position: 'absolute',
          overflow:'hidden',
        },})}>

      <Tab.Screen
        name="CleanSheet"
        component={ CleanSheet }
      />
       <Tab.Screen
        name="CodeExample"
        component={ CodeExample }
      />
      <Tab.Screen
        name="Knowledge"
        component={ Knowledge }
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

