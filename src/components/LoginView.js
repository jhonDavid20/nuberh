import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Image, View, AsyncStorage } from 'react-native';

import { Container, Content, Header, Item, Icon, InputGroup, Input, Button, Text, CheckBox, ListItem } from 'native-base';

import PasswordRecoveryView from './PasswordRecoveryView';
import User from './UserModel';

const URL = "https://nuberh.com/api/candidate-mobile/";

export default class LoginView extends Component {

  constructor() {

    super();

    this.state = {
      termsAndConditions: false,
      bLogin: false,
      emailError: null,
      passwordError: null
    };
    
  }
  
  componentDidMount(){
    AsyncStorage.getItem("CandidateId").then((value)=>{
      if(value != null)
      this.props.navigation.navigate('OneWayInterviewMenuView');
    })
  }

  validateEmail = (email) => { 
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
      return re.test(email); 
  }; 
 
  validatePassword = (password) => { 
    var rep = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;
      return rep.test(password); 
  }; 

  OnLogin() {
    // Up here will go all of the validations and stuff..
    
    this.setState({emailError: null})
    this.setState({passwordError: null})
    this.setState({bLogin: true});
    
   if(User.email == '' || User.password == ''){
     this.setState({bLogin: false});
     this.setState({emailError: <Text style={styles.inputError}>Debe llenar este campo</Text>})
     this.setState({passwordError: <Text style={styles.inputError}>Debe llenar este campo</Text>})
      return;
    }
    else if (!this.validateEmail(User.email) && !this.validatePassword(User.password)){
      this.setState({emailError: <Text style={styles.inputError}>Debe ingresar un email valido</Text>})
      this.setState({passwordError: <Text style={styles.inputError}>Debe ingresar una contraseña valida</Text>})
      this.setState({bLogin: false});
      return;
    }
    else if (!this.validateEmail(User.email)){
      this.setState({emailError: <Text style={styles.inputError}>Debe ingresar un email valido</Text>})
      this.setState({bLogin: false});
      return;
    }
    else if (!this.validatePassword(User.password)){
      this.setState({passwordError: <Text style={styles.inputError}>Debe ingresar una contraseña valida</Text>})
      this.setState({bLogin: false});
      return;
    }

    let user = {
      Email: User.email,
      Password: User.password
    }

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => this.saveSession(response));
    

    //this.props.navigation.navigate('Intro');
  }

  onPress(){
    this.props.navigation.navigate('TermsAndConditionsComponent');
  }
  
  saveSession(response){
    
    if(!response.Success){
      this.setState({emailError: <Text style={styles.inputError}>Invalid Password</Text>})
      console.log(response.Success);
      this.setState({bLogin: false});
      this.setState({emailError: null})
      this.setState({passwordError: null})
      return;
    }else{
      this.setState({bLogin: false});
      this.setState({emailError: null})
      this.setState({passwordError: null})
      console.log(response.Token);
      console.log(response.CandidateId);
      AsyncStorage.setItem("Token", response.Token);
      AsyncStorage.setItem("CandidateId", response.CandidateId);
      this.props.navigation.navigate('Intro');
    }
  }

  RecoverPassword(){
    this.props.navigation.navigate('PasswordRecoveryView');
  }
  setEmail(email){
    User.email = email;
  }
  setPassword(password){
    User.password = password;
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
          <Item>
          </Item>
          <Item rounded style={styles.formInputItem}>
            <Icon active name='md-lock' style={styles.inputIconItem}/>
            <Input placeholder='Password' placeholderTextColor='#FFFFFF' secureTextEntry={true} style={styles.inputItem} onChangeText={(password) => this.setPassword(password)}/>  
          </Item>
          {this.state.passwordError}
          <TouchableHighlight onPress={() => this.RecoverPassword(this)} underlayColor='#393B3C'>
            <Text style={{color: '#000000'}}>Forgot Password?</Text>
          </TouchableHighlight>
          <Button dark full rounded style={styles.buttonItem} onPress={this.OnLogin.bind(this)} disabled={!this.state.termsAndConditions || this.state.bLogin}><Text>Login</Text></Button>
          <ListItem>
            <CheckBox 
              checked={this.state.termsAndConditions} 
              onPress={() => this.setState({termsAndConditions: !this.state.termsAndConditions})}/>
              <Text>
                <Text> By checking this box you will be {'\n'} accepting the</Text>
                <Text style={{color: '#0864B0'}} selectable={true} onPress={() => {this.onPress(this);}}> Use of Terms</Text> 
                <Text> and {'\n'}</Text>
                <Text style={{color: '#0864B0'}} selectable={true} onPress={() => {this.onPress(this);}}> Terms of Policy</Text>
                <Text> of this service.</Text>
              </Text>
          </ListItem>
        </Content>
      </Container>
    );
    }
}
AppRegistry.registerComponent('LoginView', () => LoginView);

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
    }
});