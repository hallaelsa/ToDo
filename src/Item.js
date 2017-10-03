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
/////kun midlertidig!!!
var time = 0;

class Item extends Component {
    constructor(props) {
        super(props);

        this.state ={
            isCollapsed: true,
            invisible: true,
            timecount:''
        }
    
    }

    /////////// Dette funker men er det greit...??
    componentDidMount() {
        this.timer = setInterval(() => {
            time++;
            this.setState({timecount: time})
        }, 5000);
    }
      
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        var today = moment().format("YYYY-MM-DD");
        var date = this.props.data.date;
        var timeDiff = moment(date).diff(today, 'days')
        var daysLeft = timeDiff < 0 ? 0 : timeDiff;

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                <TouchableOpacity style={this.state.invisible ? styles.invisible : styles.deleteBtn} onPress={() => this.update()}>
                    <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.invisible ? styles.invisible : styles.deleteBtn} onPress={() => this.repeat()}>
                    <Text style={styles.btnText}>Repeat</Text>
                </TouchableOpacity>
                </View>
                <View style={daysLeft > 0 ? styles.Greenbar : styles.Redbar}></View>
                <TouchableOpacity 
                    style={styles.itemText}
                    onPress={() => this.setState({isCollapsed : !this.state.isCollapsed, invisible : !this.state.invisible})}
                 >
                    <Text style={styles.itemMainText}>{this.props.data.name}</Text> 
                    <Text style={styles.itemSmallText}> {daysLeft} {this.state.timecount} days left</Text>
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


    repeat() {
        this.setState({invisible: true, isCollapsed: true});
        this.props.onRepeat && this.props.onRepeat();
    }

    update() {
        this.props.onUpdate();
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
        marginLeft: 8,
    },
    itemMainText: {
        fontSize: 20,
    },
    itemSmallText: {
        color: 'dimgrey',
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
        borderRadius: 50,
        textAlign: 'center',
        color: '#fff',
    },
    collapsible: {
       // flexDirection: 'row',
    },
    Redbar: {
        width: 5,
        backgroundColor: 'red',
    },
    Greenbar: {
        width: 5,
        backgroundColor: 'green',
    }
});

module.exports = Item;