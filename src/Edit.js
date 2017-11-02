import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet, 
    Button, 
    StatusBar, 
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation'
import Item from './Item';
import List from './List';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';


class Edit extends Component {
    constructor(props) {
        super(props);
        
        if (this.props.navigation.state.params == null) {
            this.state = { name: "", interval: "", date: moment().format("YYYY-MM-DD")};
        }            
        else {
            var index = this.props.navigation.state.params.index;
            var todo = this.props.todos[index];
            this.state = {
                index,
                name: todo.name,
                interval: todo.interval,
                date: todo.date,
            }
        }         
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params != null ? 'Edit todo' : 'Add new todo',
            headerTitleStyle: {
                alignSelf: 'center',
                color: 'black',
                fontSize: 30
            },
            headerStyle: {
                height: 56 + StatusBar.currentHeight,
                paddingTop: StatusBar.currentHeight
            },
        };
    };

    navigateCallback() {
        return this.props.navigation.dispatch(NavigationActions.reset({
            index: 0, actions: [NavigationActions.navigate({ routeName: 'Home' })]
        }));        
    }    

    addTodo() {
        if(!this.state.name || !this.state.interval || !this.state.date) {
            return;
        }
            
        var todo = { 
            name: this.state.name, 
            interval: this.state.interval, 
            date: moment(this.state.date).format("YYYY-MM-DD") 
        };

        if (this.state.index != null) {
            this.props.onUpdateTodo(this.state.index, todo, this.navigateCallback());
        } else {
            this.props.onAddTodo(todo, this.navigateCallback());
        }        
    } 

    onDelete(index) {
        this.props.onDelete(index, this.navigateCallback());
    }

    onRepeat() {
        var index = this.props.navigation.state.params.index;
        var todo = this.props.todos[index];
        todo.date = moment().add(todo.interval, 'd').format("YYYY-MM-DD");
        this.props.onUpdateTodo(index, todo, this.navigateCallback());
    }

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                   // scrollEnabled={true}
                    enableOnAndroid={ true }
                    style={styles.inputContainer}
                    extraScrollHeight={ 5 }>
                <View >
                    <Text style={styles.labels}>Todo: </Text>
                    <TextInput
                        onChangeText={(name) => this.setState({ name: name })}
                        placeholder="..."
                        underlineColorAndroid="transparent"
                        style={styles.inputField}
                        value={this.state.name}
                    />                
                    <Text style={styles.labels}>Repeat every (days): </Text>
                    <TextInput
                        onChangeText={(interval) => this.setState({ interval: interval })}
                        placeholder="..."
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        style={styles.inputField}
                        value={this.state.interval.toString()}
                    />
                    <Text style={styles.labels}>First reminder: </Text>
                    <DatePicker
                        date={this.state.date}
                        onDateChange={(time) => {this.setState({date: time});}}
                        style={styles.datepicker}
                        customStyles={{
                            dateInput:{
                            borderWidth: 0,
                            }}}
                    />
                    <TouchableOpacity
                        onPress={this.addTodo.bind(this)}
                        style={styles.addBtn}>
                        <Text style={styles.addBtnText}> {this.state.index != null ? "Update" : "Add"} </Text>
                    </TouchableOpacity>
                    {this.state.index != null && <TouchableOpacity
                        onPress={() => this.onDelete(this.state.index)}
                        style={styles.deleteBtn}>
                        <Text style={styles.addBtnText}> Delete </Text>
                    </TouchableOpacity>}
                </View>
                </KeyboardAwareScrollView>
                {this.state.index != null && <TouchableOpacity 
                    style={styles.repeatBtn} 
                    onPress={() => this.onRepeat()}>
                    <Icon name="cycle" size={30} color={'#fff'}/>
                </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
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
    inputContainer: {
        flex: 1,
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    labels: {
        color: "#000",
        fontSize: 14,
        marginTop: 10,
    },
    datepicker: {
        marginTop: 5,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'darkgrey',
        width: 340,
        elevation: 2,
    },
    inputField: {
        marginTop: 5,
        padding: 5,
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'darkgrey',
        backgroundColor: "#fff",
        alignSelf: 'stretch',
        elevation: 2,
    },
    addBtn: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "deepskyblue",
        alignItems: "center",
        alignSelf: 'stretch',
        width: 340,
        elevation: 2,
    },
    deleteBtn: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "crimson",
        alignItems: "center",
        alignSelf: 'stretch',
        width: 340,
        elevation: 2,
    },
    addBtnText: {
        padding: 5,
        fontSize: 20,
        color: '#fff',
        textAlignVertical: 'center'
    },
    invisible: {
        display: 'none',
    },
    repeatBtn: {
        backgroundColor: 'crimson',
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
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (todo) => dispatch({ type: 'ADD_TODO', todo }),
        onUpdateTodo: (index, todo) => dispatch({ type: 'UPDATE_TODO', index, todo }),        
        onDelete: (index) => dispatch({ type: 'DELETE_TODO', index }),
    }
}

const mapStateToProps = (state, props) => {
    return {
        todos: state.todos
    }
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)