import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert, ScrollView, Button, SafeAreaView, TextInput } from 'react-native';

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            sec: 0,
            msec: 0,
            contractions: [],
        }

        this.interval = null;
    }

    handleStartBtn = () => {
        //Update start button 
        this.setState({ start : !this.state.start}, () => this.handleStart())
    }

    handleStart = () => {
        //Start timer
        if (this.state.start) {
            this.interval = setInterval(() => { //setInterval allows to use milliseconds to time response
                //1 second = 100 milliseconds 
                //1 minute = 60 seconds
                if (this.state.msec !== 99) {
                    this.setState({
                        msec: this.state.msec + 1
                    });
                } else if (this.state.sec !== 59) {
                    this.setState({
                        msec: 0,
                        sec: ++this.state.sec
                    });
                } else {
                    this.setState({
                        msec: 0,
                        sec: 0,
                        min: ++this.state.min
                    });
                }
            }, 1);

        } else {
            //Add contraction to the list
            
            //make a copy of the array
            var copy = this.state.contractions
            
            //get currenmt time
            var hours = new Date().getHours();
            var min = new Date().getMinutes();
            
            //formulate contraction data
            copy.push({ time: hours+':'+min, length: this.state.min+':'+this.state.sec })
            
            //update the array with new contraction
            this.setState({ contractions: copy })
            //reset the timer
            this.setState({
                min: 0,
                sec: 0,
                msec: 0,
                start: false
            });
            clearInterval(this.interval);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.startBtn} onPress={this.handleStartBtn}>
                    <Text style={styles.btnText}>
                        {!this.state.start ? 'Start' : 'Stop'}
                        {/* Add Colour change */}
                    </Text>
                </TouchableOpacity>

                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{padToTwo(this.state.min) + ' : '}</Text>
                    <Text style={styles.time}>{padToTwo(this.state.sec) + ' : '}</Text>
                    <Text style={styles.time}>{padToTwo(this.state.msec)}</Text>
                </View>

                <ScrollView style={styles.listContainer}>
                    <FlatList
                        data={this.state.contractions}
                        inverted={true}
                        renderItem={({ item, index }) =>
                            <Text style={styles.contractionData} key={index}>
                                {`${index + 1}`}        {item.time}     {item.length}
                            </Text>}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    startBtn: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 90,
        height: 180,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    btnText: {
        fontSize: 40,
        color: '#fff'
    },

    timeContainer: {
        display: "flex",
        flexDirection: "row",
        borderWidth:1,
        borderRadius: 80,
        borderColor: "#000",
        backgroundColor: '#fff',
        paddingLeft: "8%",
        paddingRight: "8%",
        paddingTop: ".5%",
        paddingBottom: ".5%",
        marginBottom: 20,
    },
     
    time: {
      fontSize: 40,
      color: "#000",
    },

    listContainer: {
        borderWidth:1,
        width: 350,
        maxHeight: 300,
        backgroundColor: 'blue',
        padding: 10,
        paddingBottom: '50%',
    },

    contractionData: {
        fontSize: 30,
        textAlign: 'center',
        backgroundColor: '#fff',
        marginBottom: 20,
        
    },
});