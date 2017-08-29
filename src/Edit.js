import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput, StyleSheet, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Item from './Item';
import List from './List';

class Edit extends Component {  
    constructor(props) {
        super(props);
        this.state = { 
            textInput: ""
        };
    }

    static navigationOptions = {
        title: 'Add new todo',
      };

    

    render() {
        
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText = { (text)=>this.setState({textInput: text}) }
                    placeholder = "My task..."
                    underlineColorAndroid = "transparent"
                    style = {styles.inputField}
                    ref = "input"
                />
                <TouchableOpacity 
                    onPress={() => this.onSave()}
                    style = {styles.addBtn}>
                    <Text style = {styles.addBtnText}>Add</Text>
                </TouchableOpacity>
            
            </View>
        )
    }

    onSave() {
        AsyncStorage.setItem("title", this.state.textInput);
        this.props.navigation.goBack();
    }

    clearInputField() {
        this.refs.input.setNativeProps({text: ""});
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
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