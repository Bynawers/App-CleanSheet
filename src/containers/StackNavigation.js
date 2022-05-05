import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Web from '../views/Web.js';
import Favorite from '../views/Favorite.js'
import CleanSheet from '../views/CleanSheet.js';
import CodeExample from '../views/CodeExample.js';
import Knowledge from "../views/Knowledge.js";

const Stack = createStackNavigator();

const screenOptionStyle = {
	headerShown: false,
  reactNativeScreen: false,
};

const CleanSheetStackNavigator = ({navigation}) => {
  navigation.setOptions({ tabBarVisible: false })
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="CleanSheetStack" component={CleanSheet}/>
      <Stack.Screen name="FavoriteStack" component={Favorite}/>
    </Stack.Navigator>
  );
}

const CodeExampleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="KnowledgeStack" component={CodeExample}/>
    </Stack.Navigator>
  );
}

const KnowledgeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="KnowledgeStack" component={Knowledge}/>
    </Stack.Navigator>
  );
}

export { CleanSheetStackNavigator, CodeExampleStackNavigator, KnowledgeStackNavigator };