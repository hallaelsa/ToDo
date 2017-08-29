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
        padding: 20,

    }
});

module.exports = Edit;