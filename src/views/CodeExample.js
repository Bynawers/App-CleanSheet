import React, { useState } from 'react';
import { StyleSheet, Text, View , ScrollView, TouchableOpacity} from 'react-native';
import firestore from '../database/firestore.js'
import Header from '../shared/Header.js';
import { AntDesign } from '@expo/vector-icons';

export default function CodeExample() {

  return (
    <View style={styles.container}>
      <Header name='Code Example'/>
      <ScrollView style={styles.container}>
        <CodeContainer name='Sorting'/>
        <CodeContainer name='Tree'/>
      </ScrollView>
    </View>
  );
}

const CodeContainer = (props) => {

  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity style={{alignItems: 'center'}}
    onPress={() => {setVisible(!visible);}}>
      <View style={styles.titleCode}>
        <View style={{flex: 1}}/>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text>{props.name}</Text>
          </View>
        <View style={{flex: 1, alignItems: 'flex-end', right: 20}}>
          <AntDesign name={visible ? 'down' : 'right'} color='black' size={20}/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleCode: {
    height: 50,
    backgroundColor: '#F6F6F6',
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});