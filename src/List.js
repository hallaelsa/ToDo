import React, { Component } from 'react';
import {Text, View, ListView, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Item from './Item';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class List extends Component {        
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            dataList : ds.cloneWithRows([]),
            textInput: ""
        }
    }

    componentDidMount() {
        this.loadInitialData();
    }

    render() {
        return(
            <View style={styles.outerContainer}>
                <View style = {styles.topContainer}>
                    <TextInput
                        onChangeText = { (text)=>this.setState({textInput: text}) }
                        placeholder = "My task..."
                        underlineColorAndroid = "transparent"
                        style = {styles.inputField}
                        ref = "input"
                    />
                    <TouchableOpacity 
                        onPress={() => this.saveInput()}
                        style = {styles.addBtn}>
                        <Text style = {styles.addBtnText}>Legg til</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listContainer}>
                <ListView
                    dataSource = {this.state.dataList}
                    enableEmptySections={true}
                    renderRow = { 
                        (rowData, sectionId, rowId) => 
                        <Item 
                            data={rowData} 
                            onDelete={() => this.onRowDelete(rowId)} /> 
                    }
                />{/* 
                <TouchableOpacity onPress={() => this.add()}>
                    <Text>Legg til</Text>
                </TouchableOpacity> */}
                </View>
            </View>
        )
    }

    onRowDelete(rowId) {
        this.state.data.splice(rowId, 1);

        this.setState({
            data: this.state.data,
            dataList: ds.cloneWithRows(this.state.data)
        });
    }

    loadInitialData(){
        // Last fra storage, http, etc ...
        var data = [
            { name: "Vaske gulv", time: 14},
            { name: "Tørke støv", time: 20}
        ];

        this.setState({
            data: data,
            dataList: ds.cloneWithRows(data)
        });
    }

    add() {
        var data = this.state.data;
        data.push({ name: "Item " + (data.length + 1), price: 25});

        this.setState({
            data: data,
            dataList: ds.cloneWithRows(data)
        });
    }

    saveInput() {
        var input = this.state.textInput;
        var data = this.state.data;
        data.push({ name: input });

        this.clearInputField();

        this.setState({
            data: data,
            dataList: ds.cloneWithRows(data)
        });

        
    }

    clearInputField() {
        this.refs.input.setNativeProps({text: ""});
    }

};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    topContainer: {
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
    listContainer: {
        marginTop: 10,
        //backgroundColor: '#C46C50',
    }

    

});

module.exports = List;
