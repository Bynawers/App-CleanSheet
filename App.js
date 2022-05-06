import { StatusBar } from 'expo-status-bar';
import { View, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import TabNavigation from './src/containers/TabNavigation.js'
import { ThemeProvider } from 'styled-components';

export default function App() {

  const darkTheme = {
    background: "#1A1A1A",
    foreground: "#FAFAFA"
  };
  
  const lightTheme = {
    background: "#FAFAFA",
    foreground: "#1A1A1A",
  };

  const scheme = useColorScheme();

  return (
    <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme} style={{ flex: 1 }}>
      <NavigationContainer theme={DarkTheme}>
        <TabNavigation/>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}