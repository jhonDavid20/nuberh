/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import LoginView from './src/components/LoginView';
import IntroView from './src/components/IntroView';
import OneWayInterviewMenuView from './src/components/OneWayInterviewMenuView';
import OneWayInterviewView from './src/components/OneWayInterviewView';
import LiveInterviewLobby from './src/components/LiveInterviewLobby';
import TermsAndConditionsComponent from './src/components/TermsAndConditionsView';
//import GoodbyeView from './src/components/GoodbyeView';
import PasswordRecoveryView from './src/components/PasswordRecoveryView';

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppNavigator = StackNavigator({
  Login: {
    screen: LoginView
  },
  Intro: {
    screen: IntroView
  },
  OneWayInterviewMenuView: {
    screen: OneWayInterviewMenuView
  },
  OneWayInterview: {
    screen: OneWayInterviewView
  },
  LiveInterviewLobby: {
    screen: LiveInterviewLobby
  },
  TermsAndConditionsComponent: {
    screen: TermsAndConditionsComponent
  },
  /*GoodbyeView: {
    screen: GoodbyeView
  }*/PasswordRecoveryView:{
    screen:PasswordRecoveryView
  }
}, {
  initialRouteName: 'Login',
  headerMode: 'none'
});