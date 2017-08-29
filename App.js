import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Test from "./src/test";
import List from "./src/List";
import Edit from './src/Edit';

const AppNavigation = StackNavigator({
  Home: { screen: List },
  Edit: { screen: Edit },
});

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <AppNavigation/>
    );
  }
}


