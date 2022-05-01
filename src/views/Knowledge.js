import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ScrollView} from 'react-native';
import Header from '../shared/Header.js';

export default function Knowledge() {
  return (
    <>
      <Header name='Knowledge'/>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});