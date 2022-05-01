import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import TabNavigation from './src/containers/TabNavigation.js'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={DarkTheme}>
        <TabNavigation/>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}