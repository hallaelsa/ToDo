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
        var today = new Date();
        var date = new Date(this.props.data.date);
        var daysLeft = 0;
        if(today < date) {
            var timeDiff = Math.abs(date.getTime() - today.getTime() );
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            daysLeft = diffDays;
        } else{
            daysLeft = 0;
        }

        return (
            <View style={styles.container}>

                <View style={styles.itemText}>
                    <Text style={styles.itemMainText}>{this.props.data.name}</Text>
                    <Text style={styles.itemSmallText}> startdate...{this.props.data.date}</Text>
                    <Text style={styles.itemSmallText}> {daysLeft} days left</Text>
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