import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View , Button, TouchableOpacity, Modal, TouchableWithoutFeedback, Image, FlatList, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';

import themeContext from '../../config/themeContext';

import Header from '../shared/Header.js';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import FilterOverlay from '../components/CleanSheet/FilterOverlay.js';

function CleanSheet({navigation}) {

  const dataLangage = require("../data/Langage.json");

  const theme = useContext(themeContext);

  const image = {
    langage: {
      javascript: require('../../assets/langage/javaScript.png'),
      css: require('../../assets/langage/css.png'),
      html: require('../../assets/langage/html.png'),
      reactnative: require('../../assets/langage/react-native.jpg'),
      c: require('../../assets/langage/C.png'),
      cplus: require('../../assets/langage/c-plus.png'),
      csharp: require('../../assets/langage/c-sharp.png'),
      python: require('../../assets/langage/python.png'),
      rust: require('../../assets/langage/rust.png'),
      shell: require('../../assets/langage/terminal.png'),
      java: require('../../assets/langage/java.png'),
      r: require('../../assets/langage/R.png'),
      git: require('../../assets/langage/git.png'),
      typescript: require('../../assets/langage/typescript.png'),
      redux: require('../../assets/langage/redux.png'),
      angular: require('../../assets/langage/angular.png'),
      node: require('../../assets/langage/node.png'),
      json: require('../../assets/langage/json.png')
    }
  }

  const [selectedParadigme, setSelectedParadigme] = useState("none");
  const [selectedValue, setSelectedValue] = useState("none");
  const [selectedYears, setSelectedYears] = useState(-1);
  const favorite = useRef([]);

  const [visible, setVisible] = useState(false);
  const leaveOpenFilter = useRef(false);

  const numberOfColumn = 4;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      if (leaveOpenFilter.current) {
        setVisible(true);
        leaveOpenFilter.current = false;
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} name='Clean Sheet'/>

      <View style={[styles.scrollContainer, {backgroundColor: theme.background}]}>

        <View style={styles.lineContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex:1}}/>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: theme.text}}>Langage</Text>
            </View>
            <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
            onPress={() => {setVisible(!visible); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);}}>
              <Ionicons name='filter-outline' color={theme.text} size={30}/>
              <View style={{right: 10, bottom: 7}}>
                <FontAwesome name='circle' color='#32ade6' size={10} 
                style={{opacity: (selectedParadigme === 'none' && selectedValue === 'none' && selectedYears === -1 && favorite.current.length === 0) ? 0 : 1}}/>
              </View>
              
            </TouchableOpacity>
          </View>
          <View style={[styles.line, {backgroundColor: theme.text}]}/>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          
          <FlatList
          data={ dataLangage.Langage.filter( function(item) { 
            if (selectedValue !== 'none' && selectedValue !== item.type) { return false; }
            else if (selectedParadigme !== 'none' && !item.paradigme.includes(selectedParadigme)) { return false; }
            else if (selectedYears !== -1 && selectedYears < item.years) { return false; }
            else if (favorite.current.length !== 0 && !favorite.current.includes(item.name.toLowerCase())) { return false; }
            else { return true; }
          })}
          numColumns={numberOfColumn}
          contentContainerStyle={{alignSelf: 'flex-start', paddingBottom: '50%'}}
          renderItem={({item, index}) => <Langage color={item.color} name={item.name.toLowerCase()} navigation={navigation} numberOfColumn={numberOfColumn} image={image}/>}
          keyExtractor={(item, index) => index.toString()}
          />
        </View>

      </View>
      <FilterOverlay 
      visible={visible} setVisible={setVisible} 
      selectedParadigme={selectedParadigme} setSelectedParadigme={setSelectedParadigme} 
      selectedValue={selectedValue} setSelectedValue={setSelectedValue} 
      selectedYears={selectedYears} setSelectedYears={setSelectedYears}
      navigation={navigation}
      image={image}
      leaveOpenFilter={leaveOpenFilter}
      favorite={favorite}
      />
    </View>
  );
}

const Langage = (props) => {

  let edgeSize = Dimensions.get('window').width/props.numberOfColumn;

  return(
    <TouchableOpacity style={[styles.langageContainer, {backgroundColor: props.color, height: edgeSize, width: edgeSize}]}
    onPress={() => props.navigation.push('WebStack', {name: props.name})}>
      <Image style={{ width: '90%', flex: 1}} source={props.image.langage[props.name]}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 100, 
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
    height: '14%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    fontSize: 20,
    color: 'black'
  },
  whiteText: {
    fontSize: 15,
    color: 'white'
  },
  langageContainer: {
    alignItems: 'center',
    height: 100,
    width: 100, 
  },
  filterType: {
    backgroundColor: '#242426',
    height: 35,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
  },
  addFilterButton: {
    backgroundColor: '#242426',
    height: 35,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
  },
  buttonAdd: {
    alignSelf: 'center', 
    marginTop: '20%', 
    marginBottom: '10%',
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    padding: 5
  }
});

export default CleanSheet;