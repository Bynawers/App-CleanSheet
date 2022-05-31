import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Animated } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';

import themeContext from '../../config/themeContext';

import DataBase from '../database/firestore.js';
import ReactNativeComponents from '../components/CodeExample/ReactNativeComponents.js';
import CodeContainer from '../components/CodeExample/CodeContainer';

export default function CodeExample({navigation}) {

  const scrollPosition = useRef(new Animated.Value(0)).current;

  const minHeaderHeight = 0
  const maxHeaderHeight = 100

  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 400],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });

  const theme = useContext(themeContext);

  const [visibleAlgo, setVisibleAlgo] = useState(false);
  const [visibleReact, setVisibleReact] = useState(false);

  const [onceUse, setOnceUse] = useState(false);
  const [data, setData] = useState([]);

  const toogleVisibilityAlgo = () => {
    setVisibleAlgo(!visibleAlgo);
  }
  const toogleVisibilityReact = () => {
    setVisibleReact(!visibleReact);
  }

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
    <View style={{flex: 1}}>
      <Animated.View style={[styles.header, { height: headerHeight, backgroundColor: theme.surface}]}>
        <View style={{ flex: 1 }}/>
        <Text style={{ fontSize: 20, color: theme.text }}>Code Example</Text> 
        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', right: 25 }}
          onPress={() => {
            EventRegister.emit("changeTheme", theme.name === 'light' ? true : false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}>
            <Feather name={theme.name === 'light' ? 'sun' : 'moon'} size={30} color={theme.name === 'light' ? 'black' : 'white'}/>
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView style={{flex: 1, backgroundColor: theme.background}}
      contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
        {useNativeDriver: false},
      )}>

        <CodeExampleComponent name='Algorithms' toogleVisibility={toogleVisibilityAlgo} theme={theme}/>
        {visibleAlgo && data.map((item, index) => {
          return(
          <React.Fragment key={index}>
            <CodeContainer name={item.name} data={data} index={index} navigation={navigation} theme={theme}/>
          </React.Fragment>);
        })}

        <CodeExampleComponent name='React Native Components' toogleVisibility={toogleVisibilityReact} theme={theme}/>
        {visibleReact && <ReactNativeComponents theme={theme}/>}

      </Animated.ScrollView>
    </View>
  );
}

const CodeExampleComponent = (props) => {
  return(
    <TouchableOpacity style={[styles.CodeExampleComponent, {
      marginTop: 20,
      backgroundColor: props.theme.surface, 
      shadowColor: props.theme.name === "light" ? '#5A5A5A' : null
    }]}
    onPress={ props.toogleVisibility }>
      <Text style={{fontSize: 20, color: props.theme.text}}>{props.name}</Text>
    </TouchableOpacity>
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
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  CodeExampleComponent: {
    height: 70,
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
  whiteLine: {
    backgroundColor: 'white',
    height: 1,
    width: '100%'
  }
});