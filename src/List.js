import React, { Component } from 'react';
import {Text, View, ListView, TouchableOpacity} from 'react-native';
import Item from './Item';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class List extends Component {        
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            dataList : ds.cloneWithRows([])
        }
    }

    componentDidMount() {
        this.loadInitialData();
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
            <ListView
                dataSource = {this.state.dataList}
                enableEmptySections={true}
                renderRow = { 
                    (rowData, sectionId, rowId) => 
                    <Item 
                        data={rowData} 
                        onDelete={() => this.onRowDelete(rowId)} /> 
                }
            />
                <TouchableOpacity onPress={() => this.add()}>
                    <Text>Legg til</Text>
                </TouchableOpacity>
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
            { name: "Item 1", price: 14},
            { name: "Item 2", price: 20}
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
};

module.exports = List;
