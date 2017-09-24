import React, { Component } from 'react';
import {
    Text, 
    View, 
    ListView, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemText}>
                    <Text style={styles.itemMainText}>{this.props.data.name}</Text>
                    <Text style={styles.itemSmallText}> {this.props.data.time} days left</Text>
                </View>
                
                <TouchableOpacity style={styles.deleteBtn} onPress={() => this.delete()}>
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>);
    }

    delete() {
        this.props.onDelete && this.props.onDelete();
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        backgroundColor: 'white'
    },
    itemText: {
        flexDirection: 'column',
        flex: 3,
        padding: 5
    },
    itemMainText: {
        fontSize: 20,
        textAlign:'center',
    },
    itemSmallText: {
        textAlign:'center',
    },
    deleteBtn: {
        flex: 1,
        alignSelf: "center"
    },
    btnText: {
        marginRight: 5,
        fontSize: 20,
        width: 80,
        padding: 5,
        backgroundColor: 'crimson',
        borderRadius: 10,
        textAlign: 'center',
        color: '#fff',
    }
});

module.exports = Item;