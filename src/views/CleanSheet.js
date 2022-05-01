import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View , ScrollView, TouchableOpacity, Animated, Modal, TouchableWithoutFeedback} from 'react-native';

import Header from '../shared/Header.js';
import { Ionicons } from '@expo/vector-icons';

function CleanSheet() {

  const [visible, setVisible] = useState(false);
  const bounceValue = useRef(new Animated.Value(0)).current;

  const toggleFilter = () => {    
    
    let toValue = 10;

    if (visible) {
      toValue = 0;
    }
    Animated.spring(bounceValue, {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true,
      }
    ).start();
    setVisible(!visible);
  }

  return (
    <View style={styles.container}>
      <Header name='Clean Sheet'/>

      <ScrollView style={styles.scrollContainer}>

        <View style={styles.lineContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex:1}}/>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Back hand</Text>
            </View>
            <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() =>setVisible(!visible)}>
              <Ionicons name='filter-outline' color='black' size={30} />
            </TouchableOpacity>

          </View>
          <View style={styles.line}/>
        </View>

      </ScrollView>
      <FilterOverlay bounceValue={bounceValue} visible={visible} setVisible={setVisible} toggleFilter={toggleFilter}/>
    </View>
  );
}

const FilterOverlay = (props) => {

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={props.visible}
    onRequestClose={() => {props.setVisible(!props.visible)} }>

      <TouchableWithoutFeedback onPress={() => props.setVisible(!props.visible)}>
        <View style={styles.filterOverlay}/>
      </TouchableWithoutFeedback>

      <View style={styles.filterContent}>
        <View style={styles.filterTopContent}>
          <View style={{ flex: 1 }}/>

          <Text style={styles.text}>Filtrer</Text>
          <View style={{ flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity style={{right: '10%'}}
            onPress={() => props.setVisible(!props.visible)}>
              <Ionicons name='close-outline' color='black' size={40}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separation}/>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  lineContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 5
  },
  separation: {
    width: '100%',
    height: 1,
    backgroundColor: '#C6C6C6'
  },
  filterOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  filterContent: {
    flex: 1,
    marginTop: '100%',
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  filterTopContent: {
    backgroundColor: '#E3E3E3',
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
    flex: .15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    fontSize: 20,
    color: 'black'
  }
});

export default CleanSheet;