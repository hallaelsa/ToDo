import React, { Component } from 'react';
import {Text, View, ListView, TouchableOpacity, TextInput, Button, StyleSheet, AsyncStorage} from 'react-native';
import Item from './Item';
import Edit from './Edit';
import { StackNavigator } from 'react-navigation';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});



class List extends Component {        
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            dataList : ds.cloneWithRows([])
        }
    }

    static navigationOptions = {
        title: 'My Todo list',
        headerTitleStyle: {
            alignSelf: 'center',
            color: 'white',
            fontSize: 30
        },
        headerStyle: {
        backgroundColor: '#7A917B',
        },
          
      };

    componentDidMount() {
        this.loadInitialData();
    } 

  

    render() {
        const { navigate } = this.props.navigation;

        return(
            <View style={styles.outerContainer}>
                <Button 
                    onPress={() => navigate('Edit')}
                    title="Add new todo"
                    
                />
                <View style = {styles.topContainer}>
                    
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

        AsyncStorage.getItem("title").then((value)=> {
            if (value !== null) {
                var data = [
                    {name: value}
                ];
                this.setState({data : data});
            }
        }).done();

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

};


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    listContainer: {
        marginTop: 10,
        //backgroundColor: '#C46C50',
    },
    addBtn: {
        backgroundColor: "#7A917B",
    },

    

});

module.exports = List;
