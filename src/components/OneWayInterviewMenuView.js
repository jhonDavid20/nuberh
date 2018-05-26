import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image,AsyncStorage,BackHandler } from 'react-native';

import { Container, Content, Button, Text, Icon, Item } from 'native-base';

export default class OneWayInterviewMenuView extends Component {
    constructor() {
        super();
    }

    OnStartInterviewEvent() {
        // Here will go all of the validations if necessary...

        this.props.navigation.navigate('OneWayInterview');
    }

    OnAnotherTimeEvent() {
        BackHandler.exitApp();
    }

   
    render () {
        return (<Container style={styles.containerStyle}>
                    <Item>
                        <Image source={require('../resources/images/logo.png')} style={styles.logoStyle}/>
                    </Item>
                    <Button info full rounded iconLeft style={styles.buttonStyle} onPress={this.OnStartInterviewEvent.bind(this)}>
                        <Icon android='md-checkmark' ios='ios-checkmark' style={styles.buttonIconStyle}/>
                        <Text style={styles.buttonTextStyle}>START INTERVIEW NOW</Text>
                    </Button>
                    <Button info full rounded iconLeft style={styles.buttonStyle} onPress={this.OnAnotherTimeEvent.bind(this)}>
                        <Icon name='clock' style={styles.buttonIconStyle} />
                        <Text style={styles.buttonTextStyle}>IN ANOTHER TIME</Text>
                    </Button>
                </Container>);
    }
}
AppRegistry.registerComponent('OneWayInterviewMenuView', () => OneWayInterviewMenuView);

const styles = StyleSheet.create({
    logoStyle: {
        marginBottom: 30
    },
    buttonStyle: {
        marginTop: 30,
        marginBottom: 30
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    buttonIconStyle: {

    },
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 60,
        marginRight: 60
    }
});