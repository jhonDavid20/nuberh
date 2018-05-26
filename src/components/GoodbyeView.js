import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image,BackHandler,AsyncStorage } from 'react-native';
import { Container, Text, Item, Button, Icon } from 'native-base';

export default class GoodbyeView extends Component {
    constructor() {
        super();
    }

    OnLogOut() {
        AsyncStorage.removeItem("CandidateId");
        AsyncStorage.removeItem("token");
        BackHandler.exitApp();
    }

    render() {
        return (
            <Container style={styles.container}>
                <Container style={{flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                    <Item style={styles.elementStyle}>
                        <Image source={require('../resources/images/logo.png')} />
                    </Item>
                    <Text style={[styles.textContainerStyle, styles.elementStyle]}>
                        <Text style={styles.textStyle}>Remember recruiters will be {'\n'}</Text>
                        <Text style={styles.textStyle}>contacting you once they have made {'\n'} </Text>
                        <Text style={styles.textStyle}>any decision regarding to your progress.</Text>
                    </Text>
                </Container>
                <Container style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                    <Button info full rounded iconLeft style={[styles.buttonStyle, styles.elementStyle]} onPress={this.OnLogOut.bind(this)}>
                        <Icon android='md-checkmark' ios='ios-checkmark' style={styles.buttonIconStyle}/>
                        <Text style={styles.buttonTextStyle}>Thank You !</Text>
                    </Button>
                </Container>
            </Container>
        );
    }
}
AppRegistry.registerComponent("GoodbyeView", () => GoodbyeView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    textContainerStyle: {
        textAlign: 'center'
    },
    textStyle: {
        color: '#212121',
        fontSize: 18
    },
    buttonIconStyle: {
        fontSize: 35
    },
    buttonStyle: {
        marginRight: 25,
        marginLeft: 25
    }, 
    buttonTextStyle: {
        fontSize: 16
    },
    elementStyle: {
        marginTop: 15,
        marginBottom: 15
    }
});