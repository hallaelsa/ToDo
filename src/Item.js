import React, { Component } from 'react';
import {
    Text, 
    View, 
    ListView, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
/////kun midlertidig!!!
var time = 0;

class Item extends Component {
    constructor(props) {
        super(props);

        this.state ={
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
                {daysLeft == 0 && <TouchableOpacity style={styles.repeatBtn} onPress={() => this.repeat()}>
                    <Icon name="cycle" size={30} color={'#fff'}/>
                </TouchableOpacity>}
                </View>
                <View style={daysLeft > 0 ? styles.Greenbar : styles.Redbar}></View>
                <TouchableOpacity 
                    style={styles.itemText}
                    onPress={() => this.update()}
                 >
                    <Text style={styles.itemMainText}>{this.props.data.name}</Text> 
                    <Text style={styles.itemSmallText}> {daysLeft} days left</Text> 
                </TouchableOpacity>       
            </View>
        );
    }


    repeat() {
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
    repeatBtn: {
        flexDirection: 'row',
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'crimson',
        elevation: 3,
        alignItems: 'center',
        justifyContent:'center',
    },
    btnText: {
        fontSize: 12,
        alignSelf: 'center',
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