import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CodeContainer = (props) => {

  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={{alignItems: 'center'}}
      onPress={() => {setVisible(!visible);}}>
        <View style={[styles.CodeExampleComponent, { backgroundColor: props.theme.surface}]}>
          <View style={{flex: 1}}/>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{color: props.theme.text}}>{props.name}</Text>
            </View>
          <View style={{flex: 1, alignItems: 'flex-end', right: 20}}>
            <AntDesign name={visible ? 'down' : 'right'} color={props.theme.text} size={20}/>
          </View>
        </View>
      </TouchableOpacity>

      {visible && props.data[props.index].algo.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <View style={[styles.line, {backgroundColor: props.theme.backgroundColor}]}/>
            <TouchableOpacity style={[styles.algoCode, {backgroundColor: props.theme.subSurface}]}
            onPress={() => { props.navigation.push('ComingSoonStack', {name: props.name, https: item.https}); }}>
              <Text style={{color: props.theme.text}}>- {item.name}</Text>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  CodeExampleComponent: {
    height: 55,
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
  algoCode: {
    backgroundColor: '#F1F1F1',
    height: 50,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'center',
    paddingLeft: 50
  },
  line: {
    backgroundColor: 'white',
    height: 1,
    width: '100%'
  },
});

export default CodeContainer;