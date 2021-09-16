import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert, ScrollView, Button, SafeAreaView, TextInput, TouchableNativeFeedbackBase } from 'react-native';

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            min: 0,
            sec: 0,
            msec: 0,
            contractionsData: [],

            intervalMin: 0,
            intervalSec: 0,
            intervals: [],
        }

        this.contraction = null;
        this.interval = null;
    }

    handleStartBtn = () => {
        //Update start button 
       // this.setState({ start : !this.state.start}, () => this.switchStatement())
        this.setState(prevState => ({
            start: !prevState.start
        }), ()=>this.switchStatement(this.state.start));

        //console.log(this.state.start)

       // this.switchStatement()
    }

    switchStatement = (start) => {
        switch (this.state.start) {
            case true:
                this.handleContraction();
                break;
            case false:
                this.handleInterval();
        }

        this.addData();
    }

    handleContraction = () => {
        //---CLEAR INTERVAL TIMER---
        this.setState({
            intervalMin: 0,
            intervalSec: 0,
            start: true
        });
        clearInterval(this.interval);
        
        //---START CONTRACTION TIMER---
        this.contraction = setInterval(() => { 
            if (this.state.sec !== 59) {
                this.setState({ sec: ++this.state.sec });
                } else {
                    this.setState({
                        sec: 0,
                        min: ++this.state.min
                    });
                }
        }, 1000);
        
    //     //---ADD CONTRACTION TO THE ARRAY---

    //    // if (this.state.start === false) {
    //         //make a copy of the array
    //         var copy = this.state.contractions
            
    //         //get curent time
    //         var hours = new Date().getHours();
    //         var min = new Date().getMinutes();
            
    //         //formulate contraction data
    //         copy.push({ time: hours + ':' + min, length: padToTwo(this.state.min) + ':' + padToTwo(this.state.sec) })
            
    //         //update the array with new contraction
    //         this.setState({ contractions: copy })
    //  //   }
    }

    handleInterval = () => {
        //---CLEAR CONTRACTION TIMER---
        this.setState({
            min: 0,
            sec: 0,
            start: false
        });
        clearInterval(this.contraction);
        
        //---START INTERVAL TIMER---
        this.interval = setInterval(() => {

            if (this.state.intervalSec !== 59) {
                this.setState({ intervalSec: ++this.state.intervalSec })
            } else {
                this.setState({
                    intervalSec: 0,
                    intervalMin: ++this.state.intervalMin
                })
            }
        }, 1000);
        
    //     //---ADD INTERVAL TO THE ARRAY---

    //    // if (this.state.start === true) {
    //         //make a copy of the array
    //         var copy = this.state.intervals
            
    //         //get curent time
    //         var hours = new Date().getHours();
    //         var min = new Date().getMinutes();
            
    //         //formulate interval data
    //         copy.push({ time: hours + ':' + min, length: padToTwo(this.state.intervalMin) + ':' + padToTwo(this.state.intervalSec) })
            
    //         //update the array with new interval
    //         this.setState({ intervals: copy })
    //    // }
    }

    addData = () => {
        //---ADD CONTRACTION TO THE ARRAY---

       if (!this.state.start) {
        //make a copy of the array
        var copy = this.state.contractionsData
        //get curent time
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        //formulate contraction data
           copy.push({ contractions: [{ time: hours + ':' + min, length: padToTwo(this.state.min) + ':' + padToTwo(this.state.sec) }] })
        //update the array with new contraction
        this.setState({ contractionsData: copy })
        }

        //---ADD INTERVAL TO THE ARRAY---

       else{
            //make a copy of the array
            var copy = this.state.contractionsData
            
            //get curent time
            var hours = new Date().getHours();
            var min = new Date().getMinutes();
            
            //formulate interval data
           copy.push({ intervals: [{ time: hours + ':' + min, length: padToTwo(this.state.intervalMin) + ':' + padToTwo(this.state.intervalSec) }] })
            
            //update the array with new interval
            this.setState({ contractionsData: copy })
        }
        
        console.log(this.state.contractionsData)
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
                    <Text style={styles.time}>{padToTwo(this.state.sec)}</Text>
                </View>

                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{padToTwo(this.state.intervalMin) + ' : '}</Text>
                    <Text style={styles.time}>{padToTwo(this.state.intervalSec)}</Text>
                </View>

                {/* <ScrollView style={styles.listContainer}>
                    <FlatList
                        data={this.state.contractionsData}
                        // inverted={true}
                        renderItem={({ item, index }) =>
                            <Text style={styles.contractionData} key={index}>
                                {'Contraction'}        {item.time}     {item.length}
                            </Text>}
                    />
                </ScrollView> */}

                <ScrollView style={styles.listContainer}>
                    {this.state.contractionsData.map((item) => {
                        <View>
                            {item.map((contraction, index) => {
                                <View>
                                    <Text key={index}>{contraction.time}    {contraction.length}</Text>
                                </View>
                            })}
                        </View>
                    })}
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
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#fff',
        marginBottom: 20,
        
    },
});