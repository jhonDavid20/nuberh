import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

import { Text } from 'native-base';

export default class TimerComponent extends Component {
    constructor() {
        super();
        this.state = {
            minutes: 0,
            seconds: 0,
            timerId: null
        }
    }

    render() {
        return (
            <View>
                <Text>
                    <Text style={this.props.style}>{this.state.minutes < 10 ? '0' + this.state.minutes.toString() : this.state.minutes.toString()}</Text>
                    <Text style={this.props.style}>:</Text>
                    <Text style={this.props.style}>{this.state.seconds < 10 ? '0' + this.state.seconds.toString() : this.state.seconds.toString()}</Text>
                </Text>
            </View>
        );
    }

    componentDidMount() {
        this.setState({
            minutes : this.props.minutes,
            seconds : this.props.seconds,
            timerId : setInterval(() => {  
                if(this.props.paused) {
                    return;
                }

                if(this.state.seconds === 0) {
                    this.setState({
                        seconds: 60,
                        minutes: this.state.minutes - 1
                    });
                }

                this.setState({
                    seconds: this.state.seconds - 1
                });

                if(this.state.minutes === 0 && this.state.seconds === 0) {
                    clearInterval(this.state.timerId);
                    this.props.OnTimerEnd();
                }
            }, 1000)
        });
    }

    componentWillReceiveProps(props) {
        // This prop "shouldUpdate" is used when trying to render the component to record.
        // Since for some weird reason this method is called multiple times when that component is rendered.
        if(props.shouldUpdate) {
            this.setState({
                minutes : props.minutes,
                seconds : props.seconds
            });        
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
    }
}
AppRegistry.registerComponent('TimerComponent', () => TimerComponent);

const styles = StyleSheet.create({

});