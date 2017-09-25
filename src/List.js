import React, { Component } from 'react';
import { 
    Text, 
    View, 
    ListView, 
    TouchableOpacity,  
    Button, 
    StyleSheet, 
    StatusBar } from 'react-native';
import Item from './Item';
import Edit from './Edit';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.outerContainer}>
                <View style={styles.navigationbar}>
                    <TouchableOpacity
                        style={styles.navigate}
                    >
                        <Text style={styles.navigateCurrentBtn}>My todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('Edit')}
                        style={styles.navigate}
                    >
                        <Text style={styles.navigateBtn}>Add todo</Text>
                    </TouchableOpacity>
                </View>
                
            
                <View style={styles.listContainer}>
                    <ListView
                        style={styles.listview}
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
        marginTop: 20,
    },
    listview: {
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
)(List)