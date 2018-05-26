import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

import { Label } from 'native-base';

export default class StartRecordingComponent extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            timerId: null
        };
    }

    componentDidMount() {
        this.setState({
            counter: 3,
            timerId: setInterval(() => {
                this.setState({
                    counter: this.state.counter - 1
                });

                if(this.state.counter == 0) {
                    clearInterval(this.state.timerId);
                    this.props.OnCounterFinished();
                    return;
                }
            }, 1000)
        });
    }

    componentWillUnmount() {
        if(this.state.timerId != null) {
            clearInterval(this.state.timerId);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Label style={styles.labelStyle}>{this.state.counter}</Label>
            </View>
        );
    }
}
AppRegistry.registerComponent('StartRecordingComponent', () => StartRecordingComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(225, 225, 225, 0)'
    },
    labelStyle: {
        fontSize: 230,
        color: '#A40505'
    }
});