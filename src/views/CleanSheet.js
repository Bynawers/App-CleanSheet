import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Button, TouchableOpacity, Modal, TouchableWithoutFeedback, Image, FlatList, Dimensions } from 'react-native';
import { Picker }  from '@react-native-picker/picker'
import * as Haptics from 'expo-haptics';
import Slider from '@react-native-community/slider';

import Header from '../shared/Header.js';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

function CleanSheet({navigation}) {

  const dataLangage = require("../data/Langage.json");

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
    <View style={styles.container}>
      <Header navigation={navigation} name='Clean Sheet'/>

      <View style={styles.scrollContainer}>

        <View style={styles.lineContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex:1}}/>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Langage</Text>
            </View>
            <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
            onPress={() => {setVisible(!visible); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);}}>
              <Ionicons name='filter-outline' color='black' size={30}/>
              <View style={{right: 10, bottom: 7}}>
                <FontAwesome name='circle' color='#32ade6' size={10} 
                style={{opacity: (selectedParadigme === 'none' && selectedValue === 'none' && selectedYears === -1 && favorite.current.length === 0) ? 0 : 1}}/>
              </View>
              
            </TouchableOpacity>
          </View>
          <View style={styles.line}/>
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

const FilterOverlay = (props) => {

  const [selectedType, setSelectedType] = useState("Type");

  const [selectedParadigmeTemp, setSelectedParadigmeTemp] = useState("none");
  const [selectedValueTemp, setSelectedValueTemp] = useState("none");
  const [selectedYearsTemp, setSelectedYearsTemp] = useState(-1);

  const toggleSetFilter = () => {
  
    props.setSelectedYears(selectedYearsTemp)
    props.setSelectedParadigme(selectedParadigmeTemp)
    props.setSelectedValue(selectedValueTemp)
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

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
          <TouchableOpacity style={{left: '15%', flex: 1}}
            onPress={() => props.setVisible(!props.visible)}>
              <Ionicons name='close-outline' color='black' size={40}/>
            </TouchableOpacity>
          <Text style={styles.text}>Filtrer</Text>
          <View style={{ flex: 1, alignItems: 'flex-end'}}>
            <View style={{ flex: 1, justifyContent: 'center', marginRight: '15%'}}>
              <Button onPress={() => toggleSetFilter()} title="Apply"/>
            </View>
          </View>
        </View>

        <View style={styles.separation}/>

        <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 10}}>
          <SelectType name='Type' selectedType={selectedType} setSelectedType={setSelectedType} hasValue={(props.selectedValue !== 'none')}/>
          <SelectType name='Paradigme' selectedType={selectedType} setSelectedType={setSelectedType} hasValue={(props.selectedParadigme !== 'none')}/>
          <SelectType name='Years' selectedType={selectedType} setSelectedType={setSelectedType} hasValue={(props.selectedYears !== -1)} />
          <SelectType name='Favorite' selectedType={selectedType} setSelectedType={setSelectedType} hasValue={(props.favorite.current.length !== 0)} />
        </View>

        <View style={{width: '100%',top: '0%'}}>
          <View style={{width: '100%'}}>
          {selectedType === 'Type' &&
          <Picker
          selectedValue={selectedValueTemp}
          style={{ height: 0, width: '100%' }}
          onValueChange={(itemValue, itemIndex) => setSelectedValueTemp(itemValue)}>
            <Picker.Item label="None" value="none" />
            <Picker.Item label="BackHand" value="BackHand" />
            <Picker.Item label="FrontHand" value="FrontHand"/>
            <Picker.Item label="FullStack" value="FullStack" />
          </Picker>}

          {selectedType === 'Paradigme' &&
          <Picker
          selectedValue={selectedParadigmeTemp}
          style={{ height: 0, width: '100%' }}
          onValueChange={(itemValue, itemIndex) => setSelectedParadigmeTemp(itemValue)}>
            <Picker.Item label="None" value="none" />
            <Picker.Item label="Orienté Objet" value="objet" />
            <Picker.Item label="Structurée" value="structuree"/>
            <Picker.Item label="Procédurale" value="procedural"/>
            <Picker.Item label="Fonctionnel" value="fonctionnel"/>
            <Picker.Item label="Impératif" value="imperatif"/>
            <Picker.Item label="Declarative" value="declarative"/>
          </Picker>}

          {selectedType === 'Years' &&
          <View style={{alignSelf: 'center', alignItems: 'center', marginTop: '10%'}}>
            <Text>{selectedYearsTemp === -1 ? "No value" : selectedYearsTemp}</Text>
            <Slider
            style={{width: 200, height: 40}}
            minimumValue={1990}
            maximumValue={2022}
            value={props.selectedYears}
            onValueChange={(value) => setSelectedYearsTemp(parseInt(value))}
            minimumTrackTintColor="#242426"
            maximumTrackTintColor="white"
            />
            <Button
            onPress={() => setSelectedYearsTemp(-1)}
            title="Reset"
            />
          </View>}

          {selectedType === 'Favorite' &&
            <TouchableOpacity style={styles.buttonAdd}
            onPress={() => {
              props.navigation.push('FavoriteStack', {image: props.image, favorite: props.favorite}); 
              props.setVisible(false);
              props.leaveOpenFilter.current = true;
            }}>
              <Ionicons name='md-add-outline' color='black' size={35}/>
            </TouchableOpacity>}

          </View>

        </View>

      </View>

    </Modal>
  );
}

const SelectType = (props) => {

  return(
    <TouchableOpacity style={[styles.filterType, 
      {backgroundColor: props.hasValue && props.selectedType === props.name ? '#1e71f5' : props.hasValue ? '#81B1FF' : props.selectedType === props.name ? '#242426' : '#C6C6C6'}]}
    onPress={() => props.setSelectedType(props.name)}>
      <Text style={styles.whiteText}>{props.name}</Text>
    </TouchableOpacity>
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