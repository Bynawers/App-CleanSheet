import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View , ScrollView, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';
import DataBase from '../database/firestore.js';
import { AntDesign } from '@expo/vector-icons';

import ReactNativeComponents from '../components/CodeExample/ReactNativeComponents.js';

export default function CodeExample({navigation}) {

  const scrollPosition = useRef(new Animated.Value(0)).current;

  const minHeaderHeight = 0
  const maxHeaderHeight = 100

  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });

  const [visible, setVisible] = useState(false);
  const [visibleReact, setVisibleReact] = useState(false);

  const [onceUse, setOnceUse] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const readData = async () => {
      setData(await (DataBase.getCodeData('Code')))
      this.console.log('DATA SET')
    }
    const firstCall = () => {
      if (!onceUse){
        setOnceUse(true);
        readData();
      }
    }
    firstCall();
  }, []);

  return (
    <View style={ styles.container }>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Text style={{ fontSize: 20 }}>Code Example</Text> 
      </Animated.View>

      <Animated.ScrollView style={styles.container}
      contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
        {useNativeDriver: false},
      )}>

        <TouchableOpacity style={[styles.titleCode, {height: 70, backgroundColor: '#FCFCFC', shadowColor: '#5A5A5A',}]}
        onPress={() => setVisible(!visible)}>
          <Text style={{fontSize: 20}}>Algorithms</Text>
        </TouchableOpacity>

        {visible && data.map((item, index) => {
          return(
          <React.Fragment key={index}>
            <CodeContainer name={item.name} data={data} index={index} navigation={navigation}/>
          </React.Fragment>);
        })}

        
        <TouchableOpacity style={[styles.titleCode, {height: 70, backgroundColor: '#FCFCFC', shadowColor: '#5A5A5A',}]}
        onPress={() => {setVisibleReact(!visibleReact)}}>
          <Text style={{fontSize: 20}}>React Native Components</Text>
        </TouchableOpacity>

        {visibleReact && <ReactNativeComponents/>}

      </Animated.ScrollView>
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
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