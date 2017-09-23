import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, TextInput, Button, StyleSheet, StatusBar } from 'react-native';
import Item from './Item';
import Edit from './Edit';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { deleteTodo } from './Actions';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });



class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: ds.cloneWithRows(this.props.todos),
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Todo list',
            headerTitleStyle: {
                alignSelf: 'center',
                color: 'white',
                fontSize: 30
            },
            headerStyle: {
                backgroundColor: '#7A917B',
                height: 56 + StatusBar.currentHeight,
                paddingTop: StatusBar.currentHeight
            },
            //headerRight: <Button title="Lagre" disabled={false} onPress={() => navigation.state.params.onSave()}/>
        };
    };

    // save() {
    //     this.setState({tore: "Lagret!"});
    // }

    componentDidMount() {
        //this.props.navigation.setParams({onSave: this.save.bind(this)});
    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.outerContainer}>
                <Button
                    onPress={() => navigate('Edit')}
                    title="Add new todo"

                />
                <View style={styles.topContainer}>

                </View>
                <View style={styles.listContainer}>
                    <ListView
                        dataSource={this.state.dataList}
                        enableEmptySections={true}
                        renderRow={
                            (rowData, sectionId, rowId) =>
                                <Item
                                    data={rowData}
                                    onDelete={() => this.onRowDelete(rowId)}
                                />
                        }
                    />
                    <Text>{this.state.tore}</Text>
                </View>
            </View>
        )
    }

    onRowDelete(rowId) {
        this.props.onDeleteTodo(rowId)
        this.setState({ dataList: ds.cloneWithRows(this.props.todos) });
    }

    // loadInitialData(){
    //     // Last fra storage, http, etc ...

    //     let todos = {todos: this.props.todos}

    //     AsyncStorage.getItem("title").then((value)=> {
    //         if (value != null) {
    //             var data = [
    //                 {name: value}
    //             ];
    //             this.setState({data : data});
    //         }
    //     }).done();

    //     var data = [
    //         { name: "Vaske gulv", time: 14},
    //         { name: "Tørke støv", time: 20}
    //     ];

    //     this.setState({
    //         dataList: ds.cloneWithRows(todos)
    //     });

    // }

    // add() {
    //     var data = this.state.data;
    //     data.push({ name: "Item " + (data.length + 1), price: 25});

    //     this.setState({
    //         data: data,
    //         dataList: ds.cloneWithRows(data)
    //     });
    // }

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

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteTodo: (index) => {
            dispatch(deleteTodo(index))
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        todos: state.todos
    }
}

const TodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(List)

module.exports = TodoList;
