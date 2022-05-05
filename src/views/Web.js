import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

import Header from '../shared/Header.js'

export default function Web({route, navigation}) {

  const { name } = route.params;

  let html = '';

  const request = {
    langage: {
      javascript: 'http://www.developer-cheatsheets.com/es6',
      css: 'https://devhints.io/css',
      html: 'https://devhints.io/css',
      reactnative: 'http://www.developer-cheatsheets.com/react',
      c: 'https://developerinsider.co/c-programming-language-cheat-sheet/',
      cplus: 'https://www.educba.com/c-programming-language-basics/',
      csharp: 'https://www.educba.com/c-programming-language-basics/',
      python: 'https://devhints.io/python',
      rust: 'https://cheats.rs/',
      shell: 'https://cheatography.com/davechild/cheat-sheets/linux-command-line/',
      java: 'https://cheatography.com/son9912/cheat-sheets/java-oop-concept/',
      r: 'https://www.rstudio.com/resources/cheatsheets/',
      git: 'https://training.github.com/downloads/github-git-cheat-sheet/',
      typescript: 'https://devhints.io/typescript',
      redux: 'http://www.developer-cheatsheets.com/redux',
      angular: 'https://angular.io/guide/cheatsheet',
      node: 'https://devhints.io/nodejs',
      json: 'https://cheatography.com/mackan90096/cheat-sheets/json/'
    }
  }

  switch (name) {
    case 'js':
      html = html = 'http://www.developer-cheatsheets.com/es6';
      break;
    case 'css':
      html = 'https://devhints.io/css';
      break;
    case 'html':
      html = 'https://devhints.io/html';
      break;
    case 'rn':
      html = 'http://www.developer-cheatsheets.com/react';
      break;
    case 'c':
      html = 'https://developerinsider.co/c-programming-language-cheat-sheet/';
      break;
    case 'c-plus':
      html = 'https://www.educba.com/c-programming-language-basics/';
      break;
    case 'c-sharp':
      html = 'https://www.educba.com/c-programming-language-basics/';
      break;
    case 'py':
      html = 'https://devhints.io/python';
      break;
    case 'rust':
      html = 'https://cheats.rs/';
      break;
    case 'sh':
      html = 'https://cheatography.com/davechild/cheat-sheets/linux-command-line/';
      break;
    case 'java':
      html = 'https://cheatography.com/son9912/cheat-sheets/java-oop-concept/'
      break;
    case 'r':
      html = 'https://www.rstudio.com/resources/cheatsheets/'
      break;
    case 'git':
      html = 'https://training.github.com/downloads/github-git-cheat-sheet/';
      break;
    case 'ts':
      html = 'https://devhints.io/typescript';
      break;
    case 'redux':
      html = 'http://www.developer-cheatsheets.com/redux';
      break;
    case 'angular':
      html = 'https://angular.io/guide/cheatsheet';
      break;
    case 'node':
      html = 'https://devhints.io/nodejs';
      break;
    case 'json':
      html = 'https://cheatography.com/mackan90096/cheat-sheets/json/';
      break;
    default:
      html = 'http://www.developer-cheatsheets.com/es6';
      break;
  }
  return (
    <View style={styles.container}>
      <Header navigation={navigation} name='Web View' backVisible={true}/>
      <WebView source={{uri: request.langage[name]}} style={{flex: 1}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
