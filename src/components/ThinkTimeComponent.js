import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';

import { Container, Text, Item, Button, Icon, Content } from 'native-base';

import TimerComponent from './TimerComponent';
import QuestionComponent from './QuestionComponent';

export default class ThinkTimeComponent extends Component {
    constructor() {
        super();

    }

    render() {
        return(
            <Container style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                    <Item style={[styles.upperText, {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}, styles.marginCells]}>
                        <QuestionComponent style={styles.textColor} Id={this.props.Id} Description={this.props.Description}/>
                    </Item>
            </View>
                <View style={styles.innerContainer}>
                    <View style={[styles.upperItem, {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}, styles.marginCells]}>
                        <Text style={styles.upperItemTitle}> Time Left </Text>
                    </View>

                    <View style={[styles.upperItem, {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}, styles.marginCells]}>
                        <Text style={styles.upperItemTitle}> Think Time </Text>
                    </View>

                    <View style={[styles.upperItem, {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}, styles.marginCells]}>
                        <Text style={styles.upperItemTitle}> Start </Text>
                    </View>
                </View>

                <View style={styles.innerContainer}> 
                    <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}, styles.marginCells]}>
                        <View style={[styles.circle]}></View>
                        <TimerComponent shouldUpdate={true} minutes={this.props.leftTime.minutes} seconds={this.props.leftTime.seconds} paused={this.props.timeLeftPaused} style={[styles.timerStyle]} OnTimerEnd={this.props.OnOverTimeLeft} />
                    </View>

                    <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}, styles.marginCells]}>
                        <TimerComponent shouldUpdate={true} minutes={this.props.thinkTime.minutes} seconds={this.props.thinkTime.seconds} paused={this.props.thinkTimePaused} style={styles.timerStyle} OnTimerEnd={this.props.OnOverThinkTime} />
                    </View>

                    <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}, styles.marginCells]}>
                        <TouchableHighlight underlayColor='#CFCFCF' onPress={this.props.OnStartAnswering} style={{bottom: 0, right: 0, top: 0, top: 0}}>
                            <Icon android='md-checkmark' ios='ios-checkmark' style={styles.buttonIconStyle}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 75
    },
    upperContainer:{
       color:'#000000',
       height: 75
    },textColor:{
        color:'#000000'
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marginCells: {
        marginRight: 4,
        marginLeft: 4,
        paddingTop: 1,
        paddingBottom: 1
    },upperText:{
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    upperItem: {
        backgroundColor: '#13A2F0'
    },
    upperItemTitle: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    buttonIconStyle: {
        color: '#13A2F0',
        fontSize: 35
    },
    circle: {
        width: 20,
        height: 20,
        backgroundColor: '#13A2F0',
        borderRadius: 50,
        marginRight: 10
    },
    timerStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3F3F3F'
    }
});