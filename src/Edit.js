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


class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            interval: "",
            date: "",
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add new todo',
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

    addTodo() {
        if(!this.state.name || !this.state.interval || !this.state.date) {
            return;
        }
            
        var todo = { name: this.state.name, 
                    interval: this.state.interval, 
                    date: moment(this.state.date).format("YYYY-MM-DD") 
                };
        this.props.onAddTodo(todo,
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            }))
        );
    }

 

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View style={styles.container}>
                <View style={styles.navigationbar}>
                    <TouchableOpacity
                        onPress={() => navigate('Home')}
                        style={styles.navigate}
                    >
                        <Text style={styles.navigateBtn}>My todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navigate}
                    >
                        <Text style={styles.navigateCurrentBtn}>Add todo</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                   // scrollEnabled={true}
                    enableOnAndroid={ true }
                    style={styles.inputContainer}
                    extraScrollHeight={ 5 }
                >
                <View >
                    <Text style={styles.labels}>Todo: </Text>
                    <TextInput
                        onChangeText={(name) => this.setState({ name: name })}
                        placeholder="..."
                        underlineColorAndroid="transparent"
                        style={styles.inputField}
                        ref="input"
                    />                
                    <Text style={styles.labels}>Interval (days): </Text>
                    <TextInput
                        onChangeText={(interval) => this.setState({ interval: interval })}
                        placeholder="..."
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        style={styles.inputField}
                        ref="input"
                    />
                    <Text style={styles.labels}>Begin: </Text>
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
                        <Text style={styles.addBtnText}>Add</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAwareScrollView>
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
        color: "deepskyblue",
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
    },
    inputField: {
        marginTop: 5,
        padding: 5,
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'darkgrey',
        backgroundColor: "#fff",
        alignSelf: 'stretch',
    },
    addBtn: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "deepskyblue",
        alignItems: "center",
        alignSelf: 'stretch',
        width: 340,
    },
    addBtnText: {
        padding: 5,
        fontSize: 20,
        color: '#fff',
        textAlignVertical: 'center'
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (todo) => dispatch({ type: 'ADD_TODO', todo })
    }
}

module.exports = connect(
    null,
    mapDispatchToProps
)(Edit)