import React, { useRef, useContext, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Header from '../shared/Header.js';
import LottieView from 'lottie-react-native';

import themeContext from '../../config/themeContext';

export default function ComingSoon({navigation}) {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const offsetYAnim = useRef(new Animated.Value(0)).current;

  const theme = useContext(themeContext);
  const animationRef = useRef();

  Animated.loop( Animated.sequence([
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1780,
        useNativeDriver: true,
      }),
      Animated.timing(offsetYAnim, {
        toValue: 0,
        duration: 1780,
        useNativeDriver: true,
      })
    ]),
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1780,
        useNativeDriver: true,
      }),
      Animated.timing(offsetYAnim, {
        toValue: -10,
        duration: 1780,
        useNativeDriver: true,
      })
    ]),
  ])).start()

  useEffect(() => {
    animationRef.current.play();
    console.log(animationRef.current)
  }, []);

  return (
    <View>
      <Header name='...' navigation={navigation} backVisible={true}/>

      <View style={[ styles.lottieView, { backgroundColor: theme.background }]}>
        <LottieView
          source={require('../../assets/lottie/building.json')} 
          ref={animationRef}
          style={{ width: '100%' }}
          autoPlay={true}
          loop={true}
        />
        <Animated.Text style={{ fontSize: 30, color: theme.text, opacity: fadeAnim, transform: [{ translateY : offsetYAnim}] }}>Coming Soon</Animated.Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  lottieView: {
    alignItems: 'center', 
    height: '100%',
    paddingTop: '50%'
  }
});