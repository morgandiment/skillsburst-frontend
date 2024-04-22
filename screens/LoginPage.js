import React , {useState, useContext} from 'react';
import { Button, StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {Image} from "expo-image";
import { UserContext } from '../userContext.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleButton, TextInputWithIcon } from '../components/Index.js';
//import {  } from './Index.js';
import Images from '.././images/Index.js';

import {loginUser, loadUserProgress} from "../API/database_connection.js";

function LoginPage({ navigation }) {
  const userContextData = useContext(UserContext);

  const [username, onChangeUsername] = useState('');
  const [usernameMessageVisible, setUsernameMessageVisible] = useState(false);

  const [password, onChangePassword] = useState('');
  const [passwordMessageVisible, setPasswordMessageVisible] = useState(false);

  const attemptLogin = () => {    
    const userData = {
      Username: username,
      Password: password,
    };

    loginUser(userData).then( async (loginResponse) => {
      if (loginResponse){ //login successful

        //load user data
        userContextData.updateUsername(loginResponse.Username)
        userContextData.updateId(loginResponse.UserID)
        userContextData.updateFinishedIntro(loginResponse.finished_intro)

        await AsyncStorage.setItem("token", `${loginResponse.UserID}`).then(() => {
          //load userdata into context//
          loadUserProgress(loginResponse.UserID).then((userProgress) => {
            userContextData.updateProgress(userProgress);

            if (userContextData.finished_intro){ //if user has completed onboarding
              navigation.navigate("HomePage");
            } else {
              navigation.navigate('OnboardingMainScreen');  
            }
          });
        });
  
      } else { //login failed
        setUsernameMessageVisible(!loginResponse.cause == "username");
        setPasswordMessageVisible(!loginResponse.cause == "password");
      };
    })
  };

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
              onChangeText={onChangeUsername}

              failMessage='No Account with this Email or Username Found'
              showFailMessage={usernameMessageVisible}
            />

            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Password"}
              isPassword={true}
              imagePath={Images.icons.key}
              onChangeText={onChangePassword}

              failMessage='Incorrect Password'
              showFailMessage={passwordMessageVisible}
            />

          </ScrollView>
          <View style={{flex:1, justifyContent:"flex-end", alignItems:"center", marginBottom:30}}>
            <SimpleButton
              style={styles.loginButtonStyle}
              textStyle={{fontSize: 18}}
              title="Login"
              onPress={attemptLogin}
            />

            <SimpleButton
              textStyle={styles.createAccountText}
              title={"Don't have an account?"}
              onPress={() => navigation.navigate('SignupPage')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
}

export default LoginPage;

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
    width: 200,
    paddingVertical: 10,
  },

  createAccountText: {
    color: "#fec165",
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});