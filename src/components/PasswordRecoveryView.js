import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View,BackHandler,AsyncStorage } from 'react-native';

import { Container, Content, Header, Item, Icon, InputGroup, Input, Button, Text, } from 'native-base';

import User from './UserModel';

const URL = "https://nuberh.com/api/password-forgot";
export default class PasswordRecoveryView extends Component {

    constructor() {

        super();
    
        this.state = {
          emailError: null,
          emailSuccess: null,
          passwordError: null,
          message: "Enter your email address for password recovery"
        };
    }

    OnSubmit(){
      AsyncStorage.setItem("email",User.email);
      BackHandler.exitApp();
      if(User.email == ''){
        this.setState({emailError: <Text style={styles.inputError}>Debe llenar este campo</Text>})
         return;
       }else if (!this.validateEmail(User.email)){
          this.setState({emailError: <Text style={styles.inputError}>Debe ingresar un email valido</Text>})
          return;
        }
        
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(User.email),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(res => res.text())
          .catch(error => this.errorMessage())
          .then(response => this.successMessage(this));
          
          
    }

    successMessage(){
        this.setState({emailSuccess: <Text style={styles.inputSuccess}>Recovery Password Successfully</Text>})
    }

    errorMessage(){
        this.setState({emailError: <Text style={styles.inputError}>Something went wrong</Text>})
    }
    validateEmail = (email) => { 
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        return re.test(email); 
    }; 
    setEmail(email){
      console.log(User.email);
      User.email = email;
    }

      render() {
        return (
          <Container>
            <Content contentContainerStyle={styles.containerContent}>
              <Item>
                <Image source={require('../resources/images/logo.png')} />
              </Item>
              <Item rounded style={styles.formInputItem}>
                <Icon active name='person' style={styles.inputIconItem}/>
                <Input placeholder='Email' placeholderTextColor='#FFFFFF' style={styles.inputItem} onChangeText={(email) => this.setEmail(email)} />    
              </Item>
              {this.state.emailError}
              <Text style={[styles.textContainerStyle, styles.elementStyle]}>
                <Text style={styles.textStyle}>{this.state.message }</Text> <Text >{'\n'} {'\n'}</Text>
              </Text>
              {this.state.emailSuccess}
              <Button dark full rounded style={styles.buttonItem} onPress={this.OnSubmit.bind()} disabled={this.state.bLogin}><Text>Send</Text></Button>
            </Content>
          </Container>
        );
        }
}
AppRegistry.registerComponent('PasswordRecoveryView', () => PasswordRecoveryView);

const styles = StyleSheet.create({
  formInputItem: {
    backgroundColor: '#45D5FF',
    marginTop: 20,
    marginBottom: 20
  },
  inputError: {
    color: 'red',
    marginTop: -22,
    marginBottom: 10
  },
  inputSuccess: {
    color: 'green',
    marginTop: -22,
    marginBottom: 10
  },
  inputItem: {
    color: '#FFFFFF'
  },
  inputIconItem: {
    color: '#FFFFFF'
  },
  buttonItem: {
    marginBottom: 20,
    marginTop: 20
  },
  containerContent: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'column',
    marginLeft: 50,
    marginRight: 50
  },
  termsText:{
    justifyContent:'center',
    paddingBottom: 50
  },
  submitButton: {
    position: 'absolute',
    bottom:0,
  },
  list: {
    padding: 5
  },
  textContainerStyle: {
    textAlign: 'center'
  },
  textStyle: {
    color: '#212121',
    fontSize: 18
  }
});