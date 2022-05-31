import React, { useContext } from 'react'
import { StyleSheet, Text, View , ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../shared/Header.js';

import themeContext from '../../config/themeContext';

export default function Knowledge({navigation}) {

  const theme = useContext(themeContext);

  return (
    <>
      <Header name='Knowledge'/>
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}>
        
        <Element name='Base De Donnée' image={require('../../assets/view/DataBase.png')} navigation={navigation} theme={theme}/>
        <Element name='Cybersécurité' image={require('../../assets/view/CyberSecurity.jpg')} navigation={navigation} theme={theme}/>
        <Element name='Réseau' image={require('../../assets/view/Network.jpg')} navigation={navigation}theme={theme}/>
        <Element name='Processing' image={require('../../assets/view/Computer.jpg')} navigation={navigation} theme={theme}/>
      </ScrollView>
    </>
  );
}

const Element = (props) => {
  return(

      <TouchableOpacity style={{alignItems: 'center'}}
      onPress={() => { props.navigation.navigate('ComingSoonStack'); }}>
        <View style={[styles.titleCode, { backgroundColor: props.theme.subSurface } ]}>
          <Text style={{ fontSize: 17, color: props.theme.text  }}>{props.name}</Text>
        </View>
        <View style={[styles.line, { backgroundColor: props.theme.background }]}/>

        <View style={[styles.titleCode, {height: 200, marginTop: 0, backgroundColor: '#FAFAFA' }]}>
          <Image
            style={{ width: '100%', height: 200, margin : 5}}
            source={props.image}/>
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
    backgroundColor: '#ECECEC',
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
  line: {
    height: 1,
    width: '100%'
  }
});