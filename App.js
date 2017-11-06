import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './src/Reducer';
import List from "./src/List";
import Add from './src/Edit';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const AppNavigation = StackNavigator({
  Home: { screen: List },
  Edit: { screen: Add },
});

const store = createStore(reducers);
const persistor = persistStore(store);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}