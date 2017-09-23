import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import Test from "./src/test";
import List from "./src/List";
import Add from './src/Edit';
import Reducer from './src/Reducer';
import {addTodo, deleteTodo} from './src/Actions';

const AppNavigation = StackNavigator({
  Home: { screen: List },
  Edit: { screen: Add },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(Reducer)}>
        <AppNavigation/>
      </Provider>
    );
  }
}