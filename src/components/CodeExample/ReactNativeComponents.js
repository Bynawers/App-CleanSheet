import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';

export default function ReactNativeComponents(props) {

  const data = require('../../data/ReactNativeComponents.json');

  return (
    <View style={{ flexDirection: 'row'}}>
      <ScrollView scrollEnabled={false} horizontal={true} style={{ width: "100%" }}>
      <FlatList
        data={data.components}
        renderItem={({ item }) => (
          <Component name={item.name} theme={props.theme}/>
        )}
        keyExtractor={item => item.id}
        numColumns={3}
      />
      </ScrollView>
    </View>
  );
}

const Component = (props) => {

  let edgeSize = Dimensions.get('window').width / 3;

  return(
    <TouchableOpacity style={[styles.reactShadowComponent, { height: edgeSize, width: edgeSize}]}>
      <View style={[styles.reactComponent, { backgroundColor: props.theme.subSurface }]}>
        <Image
        style={{ width: '80%', flex: .8, margin : 5, tintColor: props.theme.imageTint}}
        source={require('../../../assets/view/whiteReact.png')}/>
        <Text style={{position: 'absolute', color: props.theme.text}}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reactShadowComponent: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reactComponent: {
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    flex: 1, 
    margin: 5
  },
});