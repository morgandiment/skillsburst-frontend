import React , {useState} from 'react';
import { Button, StyleSheet, Text, View, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';

import { SimpleButton, TextInputWithIcon } from '../components/Index.js';
//import {  } from './Index.js';
import Images from '.././images/Index.js';

function SignupPage({ navigation }) {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screenViewStyle}>
        <Image
          style={styles.bannerLogoStyle}
          source={require('../images/skillsburst_banner_logo.png')}
        />

        <TextInputWithIcon
          style={styles.textInputStyle}
          textStyle={{fontSize: 20}}
          placeholder={"Email or Username"}
          imagePath={Images.icons.username}
        />
        
        <TextInputWithIcon
          style={styles.textInputStyle}
          textStyle={{fontSize: 20}}
          placeholder={"Password"}
          isPassword={true}
          imagePath={Images.icons.key}
        />

        <SimpleButton
          style={styles.loginButtonStyle}
          textStyle={{fontSize: 18}}
          title="Login"
          onPress={() => navigation.navigate('LandingPage')}
        />
  
        <SimpleButton
          style={{marginTop: -20}}
          textStyle={styles.createAccountText}
          title={"Don't have an account?"}
          onPress={() => navigation.navigate('SignupPage')}
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
    rowGap: "30%",
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
    width: "80%",
    maxHeight: "6%",
  },

  loginButtonStyle: {
    backgroundColor: "white",
    borderRadius: "10%",
    width: "40%",
    paddingVertical: 10,
  },

  createAccountText: {
    color: "#fec165",
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});