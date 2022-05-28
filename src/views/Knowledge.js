import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ScrollView, TouchableOpacity, Image} from 'react-native';
import Header from '../shared/Header.js';

export default function Knowledge() {
  return (
    <>
      <Header name='Knowledge'/>
      <ScrollView style={styles.container}
      contentContainerStyle={{ paddingBottom: 100}}>
        
        <Element name='Base De Donnée' image={require('../../assets/view/DataBase.png')}/>
        <Element name='Cybersécurité' image={require('../../assets/view/CyberSecurity.jpg')}/>
        <Element name='Réseau' image={require('../../assets/view/Network.jpg')}/>
        <Element name='Processing' image={require('../../assets/view/Computer.jpg')}/>
      </ScrollView>
    </>
  );
}

const Element = (props) => {
  return(

      <TouchableOpacity style={{alignItems: 'center'}}
      onPress={() => {}}>
        <View style={styles.titleCode}>
          <Text style={{fontSize: 17}}>{props.name}</Text>
        </View>
        <View style={styles.whiteLine}/>

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
  whiteLine: {
    backgroundColor: 'white',
    height: 1,
    width: '100%'
  }
});