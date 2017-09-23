import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput, StyleSheet, AsyncStorage, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { NavigationActions } from 'react-navigation'
import Item from './Item';
import List from './List';

class Edit extends Component {  
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        let name;
        let time;
        let addTodo;

        if(navigation.state.params){
            name = navigation.state.params.name
            time = navigation.state.params.time;
      
            if(navigation.state.params.addTodo){
              addTodo = navigation.state.params.addTodo;
            }
        }
        return {
            title: 'Add new todo', 
            headerRight: <Button title="Add" disabled={(!name || !time)} onPress={() =>
                addTodo({name: name, time: time},
                    navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home'})]
                  }))
              )}/>
        }


    };

    componentDidMount(){
        this.props.navigation.setParams({addTodo: this.props.onAddTodo})
    }

    onChangeName(name){
        this.setState({name:name});
        this.props.navigation.setParams({name:name})
      }
    
    onChangeTime(time){
        this.setState( {time: time} );
        this.props.navigation.setParams( {time:time} )
    }


    clearInputField() {
        this.refs.input.setNativeProps({text: ""});
    }    

    render() {
        

        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText = { (name) => this.onChangeName(name) }
                    placeholder = "What to do..."
                    underlineColorAndroid = "transparent"
                    style = {styles.inputField}
                    ref = "input"
                />
                <TextInput
                    onChangeText = { (time) => this.onChangeTime(time) }
                    placeholder = "When..."
                    underlineColorAndroid = "transparent"
                    style = {styles.inputField2}
                    ref = "input"
                />
                {/* <TouchableOpacity 
                    onPress={() => this.onSave()}
                    style = {styles.addBtn}>
                    <Text style = {styles.addBtnText}>Add</Text>
                </TouchableOpacity> */}
            
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

module.exports = Edit;