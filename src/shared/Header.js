import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import themeContext from '../../config/themeContext';

const Header = (props) => {

  const theme = useContext(themeContext);

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
    <View style={[styles.container, { height: 100, backgroundColor: theme.surface }]}>

      <View style={[styles.headerText, {flex: 1}]}>
        { props.backVisible && 
          <TouchableOpacity  style={{left:'10%'}}
          onPress={handleBackButtonClick}>
            <AntDesign name={'back'} size={30} color='#007aff' />
          </TouchableOpacity>
        }
      </View>

      <Text style={[styles.text, { color: theme.text }]}>{props.name}</Text>

      <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', right: 25 }}
      onPress={() => { 
        EventRegister.emit("changeTheme", theme.name === 'light' ? true : false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }}>
        <Feather name={theme.name === 'light' ? 'sun' : 'moon'} size={30} color={theme.name === 'light' ? 'black' : 'white'}/>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#F6F6F6',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  text: {
    fontSize: 20,
  }
});

export default Header;