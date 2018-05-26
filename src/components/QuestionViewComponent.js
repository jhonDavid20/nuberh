import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';

export default class QuestionViewComponent extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <View style={this.props.style}>
                <Text style={styles.fontStyle}>{this.props.question}</Text>
            </View>
        );
    }
}
AppRegistry.registerComponent('QuestionViewComponent', () => QuestionViewComponent);

const styles = StyleSheet.create({
    fontStyle: {
        fontSize: 15,
        color: '#3B3B3B'
    }
});