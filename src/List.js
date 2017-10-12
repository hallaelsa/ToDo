import React, { Component } from 'react';
import { 
    Text, 
    View, 
    ListView, 
    TouchableOpacity,  
    Button, 
    TouchableHighlight,
    StyleSheet, 
    StatusBar } from 'react-native';
import Item from './Item';
import Edit from './Edit';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import moment from 'moment';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: ds.cloneWithRows(this.sortTodos()),
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Todo list',
            headerTitleStyle: {
                alignSelf: 'center',
                color: 'black',
                fontSize: 30
            },
            headerStyle: {
                height: 56 + StatusBar.currentHeight,
                paddingTop: StatusBar.currentHeight
            },
            headerLeft: null
        };
    };

    sortTodos(){
        let sortedTodos = this.props.todos.sort((a,b) => {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            return 0;
        });

        return sortedTodos;
    }
    

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.outerContainer}>
            
                <View style={styles.listContainer}>
                    <ListView
                        style={styles.listview}
                        dataSource={this.state.dataList}
                        enableEmptySections={true}
                        renderRow={
                            (rowData, sectionId, rowId) =>
                                <Item
                                    data={rowData}
                                    onRepeat={() => this.onRepeat(rowId)}
                                    onUpdate={() => this.onUpdate(rowId, navigate)}
                                />
                        }
                    />
                </View>
                <TouchableHighlight 
                    style={styles.addBtn}
                    underlayColor='darkred'
                    onPress={() => navigate('Edit')}
                  >
                    <Text style={styles.addBtnTxt}>+</Text>
                </TouchableHighlight>
            </View>
        )
    }

    onRepeat(index) {
        var todo = this.props.todos[index];
        todo.date = moment().add(todo.interval, 'd').format("YYYY-MM-DD");
        this.props.onUpdate(index, todo);
        this.setState({ dataList: ds.cloneWithRows(this.sortTodos()) });
    }

    onUpdate(id, navigate) {
        navigate('Edit', {index : id})
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
    navigationbar: {
        flexDirection: 'row',
    },
    navigate: {
        flex: 1,
        margin: 5
    },
    navigateBtn: {
        textAlign: 'center',
        fontSize: 20,
        color: 'dimgrey',
    },
    navigateCurrentBtn: {
        textAlign: 'center',
        fontSize: 20,
        borderBottomWidth: 5,
        borderBottomColor: "#000"
    },
    listContainer: {
        flex: 1,
    },
    listview: {
        //marginTop: 1,
    },
    addBtn: {
        backgroundColor: 'dodgerblue',
        height: 60,
        width: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right:20,
        elevation: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        }
    },
    addBtnTxt: {
        color: 'white',
        fontSize: 25,
    }
});

const mapStateToProps = (state, props) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (index, todo) => dispatch({ type: 'UPDATE_TODO', index, todo }),
    }
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(List)