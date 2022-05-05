import { StyleSheet, Text, View , ScrollView} from 'react-native';
import Header from '../shared/Header.js';

export default function CodeExample() {
  return (
    <View style={styles.container}>
      <Header name='Code Example'/>
      <ScrollView style={styles.container}>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});