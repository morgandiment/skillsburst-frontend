import React , {useState} from 'react';
import { Button, StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {Image} from "expo-image";

import { SimpleButton, TextInputWithIcon } from '../components/Index.js';
//import {  } from './Index.js';
import Images from '.././images/Index.js';
import {Login } from '../api/login.js';
function SignupPage({ navigation }) {
  const [User, setUser] = useState('');
  const [userMessageVisible, setUserMessageVisible] = useState(false);

  const [Password, setPassword] = useState('');
  const [passwordMessageVisible, setPasswordMessageVisible] = useState(false);

  // const attemptLogin = () => {
  //   //put backend function here
  //   console.log(username);
  //   console.log(password);
  //   navigation.navigate('HomePage')
  // }

  const clearInputs =()=> {
    setUser('');
    setPassword('');
  }
  const clearMessage =()=> {
    setUserMessageVisible(false);
    setPasswordMessageVisible(false);
  }

  return (
    
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.screenViewStyle}>
          <Image
            style={styles.bannerLogoStyle}
            source={require('../images/skillsburst_banner_logo.png')}
          />

          <ScrollView
            style={{width: "80%", maxHeight: "18%"}}
            contentContainerStyle={{flex: 1,  rowGap: 20}}
          >
            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Email or Username"}
              imagePath={Images.icons.username}
              onChangeText={setUser}
              value={User}
              failMessage='*Enter a existing username or email'
              showFailMessage={userMessageVisible}
            />

            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Password"}
              isPassword={true}
              imagePath={Images.icons.key}
              onChangeText={setPassword}
              value={Password}
              failMessage='*Enter a existing password corresponding to the username or password'
              showFailMessage={passwordMessageVisible}
            />

          </ScrollView>

          <SimpleButton
            style={styles.loginButtonStyle}
            textStyle={{fontSize: 18}}
            title="Login"
            onPress={async () => {
              try {
                // Wait for the Login function to complete
                
                const response = await Login(User,Password ,setUserMessageVisible, setPasswordMessageVisible);
                if (response){
                  const data = response.data.data
                  clearMessage()
                  clearInputs()
                  navigation.navigate('HomePage',{data});
                }
              } catch (error) {
                // Handle any errors that might occur during login
                console.error('Login failed:', error);
              }
            }}
          />

          <SimpleButton
            style={{marginTop: -20}}
            textStyle={styles.createAccountText}
            title={"Don't have an account?"}
            
            onPress={() => {
              clearMessage()
              clearInputs() 
              navigation.navigate('SignupPage')}}
          />
        </View>
      </TouchableWithoutFeedback>
  );
}

export default SignupPage;

const styles = StyleSheet.create({
  screenViewStyle: {
    backgroundColor: '#056371',
    
    flex: 1,
    flexDirection: 'column',
    rowGap: 20,//"30%",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  bannerLogoStyle: {
    resizeMode:'contain',
    width: "100%",
    height: "30%",
    marginTop: 20,
    marginBottom: -40,
  },

  textInputStyle: {
    width: "100%",
    minHeight: 60,
    maxHeight: 60,
    borderRadius: 10,
  },

  loginButtonStyle: {
    backgroundColor: "white",
    borderRadius: 10,//"10%",
    width: "40%",
    paddingVertical: 10,
  },

  createAccountText: {
    color: "#fec165",
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});