import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, View } from 'react-native';

import { Container, Text, Item, Icon } from 'native-base';

import TimerComponent from './TimerComponent';
import QuestionComponent from './QuestionComponent';

export default class RecordingFooterComponent extends Component {
    constructor() {
        super();
        this.state = {
            blinkingTimerId: null,
            showCircle: true
        }
    }

    componentDidMount() {
        this.setState({
            showCircle: true,
            blinkingTimerId: setInterval(() => {
                this.setState({
                    showCircle: !this.state.showCircle
                });
            }, 650)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.blinkingTimerId);
    }

    render() {
        let blinkingCircle = this.state.showCircle || this.props.shouldBlink ? <View style={[styles.circle]}></View> : <View style={[styles.transparentCircle]}></View>;

        return (<Container style={styles.mainContainer}>

                    <View style={styles.upperContainer}>
                        <Item style={[styles.upperText, {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}, styles.marginCells]}>
                            <QuestionComponent style={styles.upperContainer} Id={this.props.Id} Description={this.props.Description}/>
                        </Item>
                    </View>
                    <Container style={styles.innerContainer}>                
                        <Item style={[styles.upperItem, styles.singleContainer, styles.marginCells]}>
                            <Text style={styles.upperItemTitle}> Time Left </Text>
                        </Item>

                        <View style={[styles.upperItem, styles.singleContainer, styles.marginCells]}>
                            <Text style={styles.upperItemTitle}> Takes Left </Text>
                        </View>

                        <View style={[styles.upperItem, styles.singleContainer, styles.marginCells]}>
                            <Text style={styles.upperItemTitle}> Next Question </Text>
                        </View>
                    </Container>

                    <Container style={styles.innerContainer}>
                        <View style={[styles.singleContainer, styles.marginCells]}>
                            {blinkingCircle}
                            <TimerComponent shouldUpdate={false} minutes={this.props.leftTime.minutes} seconds={this.props.leftTime.seconds} paused={this.props.timeLeftPaused} style={[styles.timerStyle]} OnTimerEnd={this.props.OnOverTimeLeft}/>
                        </View>

                        <View style={[styles.singleContainer, styles.marginCells]}>
                            <TouchableHighlight underlayColor='#CFCFCF' onPress={this.props.OnTakesLeftPressed}>
                                <Icon android='md-videocam' ios='ios-videocam' style={styles.takesLeftIconStyle}/>
                            </TouchableHighlight>
                            <Text style={[styles.takesLeftLabelStyle, { position: 'absolute' }]} selectable onPress={this.props.OnTakesLeftPressed}>
                                {this.props.takesLeft}
                            </Text>
                        </View>

                        <View style={[styles.singleContainer, styles.marginCells]}>
                            <TouchableHighlight underlayColor='#CFCFCF' onPress={this.props.OnNextQuestion}>
                                <Icon android='md-checkmark' ios='ios-checkmark' style={styles.buttonIconStyle}/>
                            </TouchableHighlight>
                        </View>
                    </Container>
                </Container>);
    }
}
AppRegistry.registerComponent('RecordingFooterComponent', () => RecordingFooterComponent);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 0,
        height: 75,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },upperContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
    takesLeftIconStyle: {
        color: '#13A2F0',
        fontSize: 45
    },
    circle: {
        width: 20,
        height: 20,
        backgroundColor: '#C10A0A',
        borderRadius: 50,
        marginRight: 10
    },
    timerStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3F3F3F'
    },
    takesLeftLabelStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFFFF',
        paddingRight: 5
    },
    marginCells: {
        marginRight: 4,
        marginLeft: 4,
        paddingTop: 1,
        paddingBottom: 1
    },
    transparentCircle: {
        width: 20,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 50,
        marginRight: 10
    }
});