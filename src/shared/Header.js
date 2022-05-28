import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const Header = (props) => {

  const handleBackButtonClick = () => {
    props.navigation.navigate('CleanSheetStack');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  return (
    <View style={[styles.container, { height: 100}]}>

      <View style={[styles.headerText, {flex: 1}]}>
        { props.backVisible && 
          <TouchableOpacity  style={{left:'10%'}}
          onPress={handleBackButtonClick}>
            <AntDesign name={'back'} size={30} color='#007aff' />
          </TouchableOpacity>
        }
      </View>

      <Text style={styles.text}>{props.name}</Text>

      <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', right: '30%' }}>
        <Ionicons name='sunny-outline' color='black' size={40} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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

export default Header;