import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View , ScrollView, TouchableOpacity} from 'react-native';
import DataBase from '../database/firestore.js';
import Header from '../shared/Header.js';
import { AntDesign } from '@expo/vector-icons';

export default function CodeExample({navigation}) {

  const [onceUse, setOnceUse] = useState(false);
  const [data, setData] = useState([]);

  const readData = async () => {
    setData(await (DataBase.getCodeData('Code')));
  }

  useEffect(() => {
  }, [data]);

  const firstCall = () => {
    if (!onceUse){
      setOnceUse(true);
      readData();
    }
  }

  firstCall()

  return (
    <View style={styles.container}>
      <Header name='Code Example'/>
      <ScrollView style={styles.container}>
        <CodeContainer name='Sorting' data={data} index={0} navigation={navigation}/>
        <CodeContainer name='Tree' data={data} index={1} navigation={navigation}/>
      </ScrollView>
    </View>
  );
}

const CodeContainer = (props) => {

  const [visible, setVisible] = useState(false);

  return (
    <View>
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

      {visible && props.data[props.index].algo.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <View style={styles.whiteLine}/>
            <TouchableOpacity style={styles.algoCode}
            onPress={() => { props.navigation.push('WebStack', {name: props.name, https: item.https}); }}>
              <Text>- {item.name}</Text>
            </TouchableOpacity>
          </React.Fragment>
        );
      })
      }
    </View>
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
  },
  algoCode: {
    backgroundColor: '#F1F1F1',
    height: 50,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center',
    paddingLeft: 50
  },
  whiteLine: {
    backgroundColor: 'white',
    height: 1,
    width: '100%'
  }
});