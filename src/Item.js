import React, { Component } from 'react';
import {Text, View, ListView, TouchableOpacity, StyleSheet} from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.item}>
            <Text style={styles.itemText}>{this.props.data.name} ({this.props.data.price},-)</Text>
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
        marginTop: 5,
        backgroundColor: '#ff9933',
    },
    itemText: {
        fontSize: 30,
    },
    deleteBtn: {
        left: 20,
        padding: 2,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#cc0000',
    },
    btnText: {
        fontSize: 30,
    }
});

module.exports = Item;