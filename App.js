import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import Test from "./src/test";
import List from "./src/List";
import Edit from './src/Edit';
import Reducer from './src/Reducer';
import {addTodo} from './src/Actions';

// provide actions to reducers
// procide reducers to store
let todoStore = createStore(Reducer)


// connect components to store
// provide store to components


const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: (todo) => {
      dispatch(addTodo(todo))
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    todos: state.todos
  }
}

const AddTodo = connect(
  null,
  mapDispatchToProps
)(Edit)

const TodoList = connect(
  mapStateToProps,
)(List)

const AppNavigation = StackNavigator({
  Home: { screen: TodoList },
  Edit: { screen: AddTodo },
});

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <Provider store={todoStore}>
        <AppNavigation/>
      </Provider>
      
    );
  }
}


