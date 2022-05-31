import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/containers/TabNavigation.js'
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext.js';
import theme from './config/theme.js';

export default function App() {

  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
      console.log(data)
    })
    return () => {
      EventRegister.removeEventListener(eventListener)
    }
  })

  return (
    <themeContext.Provider value={mode === true ? theme.darkTheme : theme.lightTheme} style={{ flex: 1 }}>
      <NavigationContainer>
        <TabNavigation/>
      </NavigationContainer>
      <StatusBar style="auto"/>
    </themeContext.Provider>
  );
}