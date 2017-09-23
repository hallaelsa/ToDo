import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput, StyleSheet, AsyncStorage, Button, StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { NavigationActions } from 'react-navigation'
import Item from './Item';
import List from './List';
import { connect } from 'react-redux';
import {addTodo} from './Actions';

class Edit extends Component {  
    constructor(props) {
        super(props);
        
        this.state = {
            name : "",
            time: ""
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Add new todo',
            headerStyle: {
                backgroundColor: '#7A917B',
                height: 56 + StatusBar.currentHeight,
                paddingTop: StatusBar.currentHeight
            }
        };
    };

    addTodo() {
        var todo = {name: this.state.name, time: this.state.time};
        this.props.onAddTodo(todo,
            this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home'})]
          })));
    }
    
    render() {
        

        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText = { (name) => this.setState({name:name}) }
                    placeholder = "What to do..."
                    underlineColorAndroid = "transparent"
                    style = {styles.inputField}
                    ref = "input"
                />
                <TextInput
                    onChangeText = { (time) => this.setState({time: time}) }
                    placeholder = "When..."
                    underlineColorAndroid = "transparent"
                    style = {styles.inputField2}
                    ref = "input"
                />
                <TouchableOpacity 
                    onPress={this.addTodo.bind(this)}
                    style = {styles.addBtn}>
                    <Text style = {styles.addBtnText}>Add</Text>
                </TouchableOpacity>
            
            </View>
        )
    }



}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'center',
        marginTop: 50,
        height: 40

    },
    inputField: {
        width: 300,
        paddingLeft: 2,
        color: "#1F3227",
        fontSize: 20,
        backgroundColor: "#A19E82",
    },
    inputField2: {
        width: 300,
        paddingLeft: 2,
        color: "#1F3227",
        fontSize: 20,
        backgroundColor: "#A19E82",
    },
    addBtn: {
        padding: 2,
        borderWidth: 1,
        borderColor: '#1F3227',
        backgroundColor: "#7A917B",
        marginLeft: 5,
        width: 80,
        alignItems: "center"
    },
    addBtnText: {
        fontSize: 20,
        textAlignVertical: 'center'
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
      onAddTodo: (todo) => {
        dispatch(addTodo(todo))
      }
    }
  }
  
  const AddTodo = connect(
    null,
    mapDispatchToProps
  )(Edit)

module.exports = AddTodo;