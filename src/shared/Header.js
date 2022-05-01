import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header(props){
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}/>
      <Text style={styles.text}>{props.name}</Text>
      <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', right: '30%' }}>
        <Ionicons name='sunny-outline' color='black' size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: '10%',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  }
});