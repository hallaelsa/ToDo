import React, { Component } from 'react';
import {Text, View, ListView, TouchableOpacity, StyleSheet} from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.item}>
            <Text style={styles.itemText}>{this.props.data.name} om {this.props.data.time} dager</Text>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => this.delete()}>
            <Text style={styles.btnText}>fjern</Text>
            </TouchableOpacity>
            </View>);
    }

    delete() {
        this.props.onDelete && this.props.onDelete();
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    itemText: {
        fontSize: 20,
        width: 300,
        backgroundColor: '#EAD7AC',
        paddingLeft: 5
    },
    deleteBtn: {
        padding: 2,
        borderWidth: 1,
        borderColor: '#1F3227',
        backgroundColor: '#C46C50',
        marginLeft: 5,
        width: 80,
        alignItems: "center"
    },
    btnText: {
        fontSize: 20,
    }
});

module.exports = Item;