import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import Reducer from './src/Reducer';
import List from "./src/List";
import Add from './src/Edit';
import Test from "./src/test";

const AppNavigation = StackNavigator({
  Home: { screen: List },
  Edit: { screen: Add },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(Reducer)}>
        <AppNavigation />
      </Provider>
    );
  }
}