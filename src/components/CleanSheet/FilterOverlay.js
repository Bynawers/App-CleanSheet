import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View , Button, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker }  from '@react-native-picker/picker';
import * as Haptics from 'expo-haptics';

import themeContext from '../../../config/themeContext';

import { Ionicons } from '@expo/vector-icons';

const FilterOverlay = (props) => {

  const theme = useContext(themeContext);

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
    onRequestClose={() => { props.setVisible(!props.visible)} }>

      <TouchableWithoutFeedback onPress={() => props.setVisible(!props.visible)}>
        <View style={styles.filterOverlay}/>
      </TouchableWithoutFeedback>

      <View style={[styles.filterContent, { backgroundColor: theme.surface }]}>
        <View style={[styles.filterTopContent, {backgroundColor: theme.subSurface }]}>
          <TouchableOpacity style={{left: '15%', flex: 1}}
            onPress={() => props.setVisible(!props.visible)}>
              <Ionicons name='close-outline' color={theme.text} size={40}/>
            </TouchableOpacity>
          <Text style={[styles.text, { color: theme.text }]}>Filtrer</Text>
          <View style={{ flex: 1, alignItems: 'flex-end'}}>
            <View style={{ flex: 1, justifyContent: 'center', marginRight: '15%'}}>
              <Button onPress={() => toggleSetFilter()} title="Apply"/>
            </View>
          </View>
        </View>

        <View style={[styles.separation, { backgroundColor: theme.darkSurface }]}/>

        <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 10}}>
          <SelectType name='Type' selectedType={selectedType} setSelectedType={setSelectedType} hasValue={(props.selectedValue !== 'none')} theme={theme}/>
          <SelectType name='Paradigme' selectedType={selectedType} setSelectedType={setSelectedType} hasValue={(props.selectedParadigme !== 'none')} theme={theme}/>
          <SelectType name='Years' selectedType={selectedType} setSelectedType={setSelectedType} hasValue={(props.selectedYears !== -1)} theme={theme}/>
          <SelectType name='Favorite' selectedType={selectedType} setSelectedType={setSelectedType} hasValue={(props.favorite.current.length !== 0)} theme={theme}/>
        </View>

        <View style={{width: '100%',top: '0%'}}>
          <View style={{width: '100%'}}>
          {selectedType === 'Type' &&
          <Picker
          selectedValue={selectedValueTemp}
          style={{ height: 0, width: '100%' }}
          onValueChange={(itemValue, itemIndex) => setSelectedValueTemp(itemValue)}>
            <Picker.Item label="None" value="none" color={theme.text}/>
            <Picker.Item label="BackHand" value="BackHand" color={theme.text}/>
            <Picker.Item label="FrontHand" value="FrontHand" color={theme.text}/>
            <Picker.Item label="FullStack" value="FullStack" color={theme.text}/>
          </Picker>}

          {selectedType === 'Paradigme' &&
          <Picker
          selectedValue={selectedParadigmeTemp}
          style={{ height: 0, width: '100%' }}
          onValueChange={(itemValue, itemIndex) => setSelectedParadigmeTemp(itemValue)}>
            <Picker.Item label="None" value="none" color={theme.text}/>
            <Picker.Item label="Orienté Objet" value="objet" color={theme.text}/>
            <Picker.Item label="Structurée" value="structuree" color={theme.text}/>
            <Picker.Item label="Procédurale" value="procedural" color={theme.text}/>
            <Picker.Item label="Fonctionnel" value="fonctionnel" color={theme.text}/>
            <Picker.Item label="Impératif" value="imperatif" color={theme.text}/>
            <Picker.Item label="Declarative" value="declarative" color={theme.text}/>
          </Picker>}

          {selectedType === 'Years' &&
          <View style={{alignSelf: 'center', alignItems: 'center', marginTop: '10%'}}>
            <Text style={{ color: theme.text }}>{selectedYearsTemp === -1 ? "No value" : selectedYearsTemp}</Text>
            <Slider
            style={{width: 200, height: 40}}
            minimumValue={1990}
            maximumValue={2022}
            value={props.selectedYears}
            onValueChange={(value) => setSelectedYearsTemp(parseInt(value))}
            minimumTrackTintColor={theme.primary}
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
      {backgroundColor: props.hasValue && props.selectedType === props.name ? '#1e71f5' : props.hasValue ? '#81B1FF' : props.selectedType === props.name ? props.theme.text : '#C6C6C6'}]}
    onPress={() => props.setSelectedType(props.name)}>
      <Text style={[styles.whiteText, { color: props.theme.background }]}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  filterType: {
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

export default FilterOverlay;