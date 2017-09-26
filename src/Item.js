import React, { Component } from 'react';
import {
    Text, 
    View, 
    ListView, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state ={
            isCollapsed: true,
            invisible: true
        }
    
    }

    render() {
        var today = moment().format("YYYY-MM-DD");
        var date = this.props.data.date;
        var timeDiff = moment(date).diff(today, 'days')
        var daysLeft = timeDiff < 0 ? 0 : timeDiff;

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                <TouchableOpacity style={this.state.invisible ? styles.invisible : styles.deleteBtn} onPress={() => this.delete()}>
                    <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.itemText}
                    onPress={() => this.setState({isCollapsed : !this.state.isCollapsed, invisible : !this.state.invisible})}
                 >
                    <Text style={styles.itemMainText}>{this.props.data.name}</Text> 
                    <Text style={styles.itemSmallText}> {daysLeft} days left</Text>
                    <Collapsible 
                        collapsed={this.state.isCollapsed}
                        style={styles.collapsible}
                     >
                            <Text style={styles.itemSmallText}> Do it by: {this.props.data.date}</Text>
                            <Text style={styles.itemSmallText}> Interval: {this.props.data.interval} days</Text>
                    </Collapsible>     
                </TouchableOpacity>       
            </View>
        );
    }

    delete() {
        this.props.onDelete && this.props.onDelete();
    }

   
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //justifyContent: 'center',
        marginTop: 1,
        backgroundColor: 'white',
        padding: 8,
    },
    itemText: {
        flex: 4,
        flexDirection: 'column',
        alignSelf: 'stretch',
        //padding: 8,
    },
    itemMainText: {
        fontSize: 20,
        //textAlign:'center',
        //alignSelf:'center',
    },
    itemSmallText: {
        //textAlign:'center',
    },
    deleteBtn: {
        flex: 1,
    },
    invisible: {
        display: 'none',
    },
    btnText: {
        marginRight: 8,
        fontSize: 18,
        padding: 5,
        backgroundColor: 'crimson',
        borderRadius: 10,
        textAlign: 'center',
        color: '#fff',
    },
    collapsible: {
       // flexDirection: 'row',
    }
});

module.exports = Item;