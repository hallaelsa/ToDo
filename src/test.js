import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        AsyncStorage.getItem("outputKey").then((value)=> {
            this.setState({"outputKey" : value});
        }).done();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textOutput}>
                    {this.state.outputKey}
                </Text>
                <TextInput
                onChangeText={(text)=>this.saveData(text)}
                placeholder="skriv noe..."
                style={styles.textInput}/>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontxt}>
                        SAVE
                    </Text>
                </TouchableOpacity>
            
            </View>
        )
    }

    saveData(input) {
        AsyncStorage.setItem("outputKey", input);
        this.setState({"outputKey": input});
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 20,

    },
    textOutput: {
        color: "#000",
        fontSize: 20,
        height: 30
    },
    textInput: {
        height: 40,
        marginTop: 10,
        backgroundColor: "#ddd"
    },
    button: {
        marginTop: 10,
        height:25,
        backgroundColor: "#333"
    },
    buttontxt: {
        textAlign: "center",
        color: "#fff"
    }


});
