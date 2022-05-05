import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { CleanSheetStackNavigator, CodeExampleStackNavigator, KnowledgeStackNavigator } from "./StackNavigation";

import Web from '../views/Web.js';

const Stack = createStackNavigator();
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
        tabBarActiveTintColor: '#151514',
        tabBarInactiveTintColor: '#151514',
        tabBarShowLabel: true,
        tabBarStyle: { 
          backgroundColor: '#F6F6F6',
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

export default function Switch() {
  return (
      <Stack.Navigator
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={ MyTabs } />
        <Stack.Screen name="WebStack" component={ Web }/>
      </Stack.Navigator>
  );
}

