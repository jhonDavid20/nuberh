import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image } from 'react-native';

import { Container, Content, Button, Text, Icon, Item, ListItem } from 'native-base';


import { RNCamera } from 'react-native-camera';

export default class LiveInterviewLobby extends Component {
    constructor() {
        super();
        this.cameraState = false;
        this.blinkMessage = true;
        /*setInterval(() => {
            this.setState( {
                blinkMessage: !blinkMessage
            });
          }, 
          // Define any blinking time.
          10000);*/
    }

    OnStartInterviewEvent() {
        
        this.props.navigation.navigate('OneWayInterview');
    }
   

    render () {
      let Message= this.blinkMessage ? <Text style={styles.buttonTextStyle}>Waiting for the recruiter to join the video conference</Text> : <Text></Text>;
      let Status = this.cameraState ? <Text style={styles.buttonTextStyle}>'ACTIVE'</Text> : <Text>'OFF'</Text>;

        return (<Container style={styles.containerStyle}>
                    <Item>
                        <Image source={require('../resources/images/logo.png')} style={styles.logoStyle}/>
                    </Item>
                    <Button info full rounded iconLeft onPress={this.OnStartInterviewEvent.bind(this)}>
                        <Icon android='md-checkmark' ios='ios-checkmark' style={styles.buttonIconStyle}/>
                        <Text style={styles.buttonTextStyle}>LIVE INTERVIEW LOBBY</Text>
                    </Button>
                    <RNCamera 
                        ref={(camera) => { this.camera = camera }}
                        permissionDialogTitle={"Permission to use camera"}
                        permissionDialogMessage={"In order to continue, we need your permission to use your camera."}
                        type={RNCamera.Constants.Type.front}
                        style={styles.cameraStyle}
                    />
                        <Item>
                            {Message}
                        </Item>
                </Container>);
    }
}
AppRegistry.registerComponent('LiveInterviewLobby', () => LiveInterviewLobby);

const styles = StyleSheet.create({
    logoStyle: {
        marginBottom: 30
    },buttonStyle: {
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
    },cameraStyle: {
        width: 250,
        height: 250,
        marginTop: 10,
        marginBottom:10
    }
});