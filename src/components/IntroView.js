import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, StyleSheet } from 'react-native';

import { Container, Content, Item, Icon, Text } from 'native-base';

import Video from 'react-native-video';

export default class IntroView extends Component {
    constructor() {
        super();
        this.state = {
            VideoFinished: false
        };
    }

    OnSkip() {
        this.setState({
            VideoFinished: true
        });
        // Here will go the logic regarding to if the user will be redirected to either One way interview mode or live interview mode.

        this.props.navigation.navigate('OneWayInterviewMenuView');
    }

    OnReplay() {
        this.setState({
            VideoFinished : false
        });
    }

    OnVideoEnd() {
        this.setState({
            VideoFinished: true
        });

        this.videoComponent.seek(0);
    }

    render() {
        let WelcomeTitle = !this.state.VideoFinished ? 
                <Text style={styles.welcomeTitle}>Welcome Video</Text> 
            :   <Text style={styles.welcomeTitle} selectable onPress={this.OnReplay.bind(this)}>Play Again</Text>;

        return (
            <Container style={styles.mainContainer}>
                <Video 
                    source={require('../resources/videos/intro5.mp4')}
                    ref={(videoComponent) => this.videoComponent = videoComponent}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    repeat={false}
                    paused={this.state.VideoFinished}
                    style={styles.introVideo}
                    resizeMode="cover"
                    onEnd={this.OnVideoEnd.bind(this)}/>
                <Container style={styles.innerContainer}>
                    <Item>
                        <Icon active name="play" style={styles.iconStyle}/>
                        {WelcomeTitle}
                    </Item>
                    <Item>
                        <TouchableHighlight onPress={this.OnSkip.bind(this)} underlayColor='#393B3C'>
                            <Text style={styles.skipStyle}>Skip</Text>
                        </TouchableHighlight>
                    </Item>
                </Container>
            </Container>);
    }
}
AppRegistry.registerComponent('IntroView', () => IntroView);

const styles = StyleSheet.create({
    introVideo: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    mainContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    innerContainer: {
        backgroundColor: 'rgba(225, 225, 225, 0.9)',
        height: 130,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        color: '#0A75D5',
        fontSize: 55
    },
    welcomeTitle: {
        fontSize: 30,
        marginLeft: 15,
        color: '#1D1D1D'
    },
    skipStyle: {
        marginTop: 20,
        color: '#000000',
        fontWeight: 'bold'
    }
});