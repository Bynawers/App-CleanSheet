import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CleanSheetStackNavigator, CodeExampleStackNavigator, KnowledgeStackNavigator } from "./StackNavigation";

import themeContext from '../../config/themeContext';

import Web from '../views/Web.js';

const Tab = createBottomTabNavigator();

export default function MyTabs() {

  const theme = useContext(themeContext)

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
        headerShown: false,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.text,
        tabBarShowLabel: true,
        tabBarStyle: { 
          backgroundColor: theme.surface,
          height: '11%',
          borderTopWidth: 0,
          position: 'absolute',
          overflow:'hidden',
        },
        
        })}>

      <Tab.Screen
        name="CleanSheet"
        component={ CleanSheetStackNavigator }
      />
       <Tab.Screen
        name="CodeExample"
        component={ CodeExampleStackNavigator }
      />
      <Tab.Screen
        name="Knowledge"
        component={ KnowledgeStackNavigator }
      />
    </Tab.Navigator>
  );
}

