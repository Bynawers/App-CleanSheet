import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, FlatList, Dimensions, Image, Button, BackHandler} from 'react-native';
import Header from '../shared/Header.js';
import { Ionicons } from '@expo/vector-icons';

export default function Favorite({ route, navigation, setVisible }) {

  const dataLangage = require("../data/Langage.json");

  const { image, toggleVisible } = route.params;

  const [getFavorite, setFavorite] = useState([]);

  const handleBackButtonClick = () => {
    navigation.navigate('CleanSheetStack');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const handleInputChange = React.useCallback(event => {
    console.log('-----------------test----------')
    setVisible(true)
  }, [setVisible])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} name='Favorite' backVisible={true}/>
      <View style={styles.container}>
        <FlatList
        data={dataLangage.Langage}
        numColumns={4}
        contentContainerStyle={{alignSelf: 'flex-start'}}
        renderItem={({item, index}) => <Langage color={item.color} name={item.name.toLowerCase()} navigation={navigation} image={image} setFavorite={setFavorite} getFavorite={getFavorite}/>}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <ButtonApply toggleVisible={toggleVisible} handleBackButtonClick={handleBackButtonClick} handleInputChange={handleInputChange}/>}
        />
      </View>
      
    </View>
  );
}

const ButtonApply = (props) => { 
  return(
    <View style={{marginTop: 20}}>
      <Button
      onPress={() => {props.handleBackButtonClick();}}
      title="Apply"
      />
    </View>
  );
}


const Langage = (props) => {

  let nameL = props.name.toLowerCase();
  let edgeSize = Dimensions.get('window').width/4;

  const toggleAddFavorite = (value) => {

    const index = props.getFavorite.indexOf(nameL);
    if ( index !== -1) { props.setFavorite(props.getFavorite.filter(item => item !== nameL) ); return; }
    props.setFavorite(oldArray => [...oldArray, value]);
  }

  return(
    <View style={{opacity: props.getFavorite.includes(nameL) ? 1 : .3}}>
      <TouchableOpacity style={[styles.langageContainer, {backgroundColor: props.color, height: edgeSize, width: edgeSize}]}
      onPress={() => { toggleAddFavorite( nameL ); } }>
        <View style={styles.star}>
          <Ionicons name={ props.getFavorite.includes(nameL) ? 'ios-checkmark-circle-sharp' : 'ios-checkmark-circle-outline'} color='white' size={30}/>
        </View> 
        <Image style={{ width: '90%', flex: 1}} source={props.image.langage[props.name]}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  langageContainer: {
    alignItems: 'center',
    height: 100,
    width: 100, 
  },
  star : { 
    position: 'absolute', 
    height: '100%',
    zIndex: 1,
    alignSelf: 'flex-end'
}
});