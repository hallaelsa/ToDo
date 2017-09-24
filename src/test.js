import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, TextInput, Button, StyleSheet, StatusBar } from 'react-native';
import Item from './Item';
import Edit from './Edit';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Test extends Component {
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
        };
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.outerContainer}>
                <View style={styles.navigationbar}>
                    <TouchableOpacity
                        style={styles.navigate}
                        title="Add new todo"
                    >
                        <Text style={styles.navigateCurrentBtn}>List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('Edit')}
                        style={styles.navigate}
                        title="Add new todo"
                    >
                        <Text style={styles.navigateBtn}>Add new</Text>
                    </TouchableOpacity>
                </View>
                
            
                <View style={styles.listContainer}>
                    <ListView
                        dataSource={this.state.dataList}
                        enableEmptySections={true}
                        renderRow={
                            (rowData, sectionId, rowId) =>
                                <Item
                                    data={rowData}
                                    onDelete={() => this.onDelete(rowId)}
                                />
                        }
                    />
                </View>
            </View>
        )
    }

    onDelete(index) {
        this.props.onDelete(index)
        this.setState({ dataList: ds.cloneWithRows(this.props.todos) });
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
    },
    navigateBtn: {
        textAlign: 'center',
        fontSize: 20
    },
    navigateCurrentBtn: {
        textAlign: 'center',
        fontSize: 20,
        borderBottomWidth: 5,
        borderBottomColor: "#000"
    },
    listContainer: {
        marginTop: 10,
        //backgroundColor: '#C46C50',
    },
    addBtn: {
        backgroundColor: "#7A917B",
    },
});

const mapStateToProps = (state, props) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (index) => dispatch({ type: 'DELETE_TODO', index })
    }
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Test)