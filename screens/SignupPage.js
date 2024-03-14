import * as React from 'react';
import { useState ,useRef} from "react";
import { Button, StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Image} from "expo-image";
import DateTimePicker from '@react-native-community/datetimepicker';

import { SimpleButton, TextInputWithIcon } from '../components/Index.js';
//import {  } from './Index.js';
import Images from '.././images/Index.js';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api_Url } from '../constants';
import axios from 'axios';
import {Register} from '../api/register.js'
import { Alert } from 'react-native';

function SignupPage({ navigation }) {
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 14); 

  const [Username, setUserName] = useState('');
  const [userNameMessageVisible, setuserNameMessageVisible] = useState(false);

  const [Email, setEmail] = useState('');
  const [emailMessageVisible, setEmailMessageVisible] = useState(false);

  const [DateOfBirth, setDateOfBirth] = useState(maxDate);
  const [Password, setPassword] = useState('');
  const [passwordMessageVisible, setPasswordMessageVisible] = useState(false);

  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordMessageVisible, setConfirmPasswordMessageVisible] = useState(false);

  const [data, setData] = React.useState('');

  const [show, setShowDatePicker] = useState(Platform.OS === "ios");
  
  const showDatePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    if (Platform.OS === "android"){
      setShowDatePicker(false);
    }
    setDate(selectedDate);
  };

  const clearInputs =()=> {
    console.log("Clearing inputs...");
    
    setUserName('');
    console.log("Before clearing, Email:", Email);
    setEmail('');
    console.log("After clearing, Email:", Email);
    setDateOfBirth(maxDate);
    setPassword('');
    setConfirmPassword('');
    console.log("Inputs cleared!");
  }

  const clearMessage =()=> {
    setuserNameMessageVisible(false);
    setEmailMessageVisible(false);
    setPasswordMessageVisible(false);
    setConfirmPasswordMessageVisible(false);
  }

  // }


  // for testing we no use
  // async function autologin() {
  //   const token = await AsyncStorage.getItem('token');
  //   if (token) {
  //     const url = `${Api_Url}/login/UserSession`;
  //     const response = await axios.post(url, { token: token });
  //     setData(response.data.data);
  //   }
  // }
  
  React.useEffect(() => {
    // autologin();
    clearMessage();
    clearInputs();
  }, []);
  
  React.useEffect(() => {
    if (data) {
      navigation.navigate('HomePage', { data });
    }
  }, [data, navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screenViewStyle}>
        <Image
          style={styles.bannerLogoStyle}
          source={require('../images/skillsburst_banner_logo.png')}
        />

        <ScrollView style={{width: "80%", maxHeight: "30%"}}>
          <View style={{flex: 1, rowGap: 20}}>
            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Username"}
              imagePath={Images.icons.username}
              onChangeText={setUserName}
              value={Username}
              failMessage={"*Must Enter a Valid username \n*Please make sure there are no spaces in the username"}

              showFailMessage={userNameMessageVisible}
            />

            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Email Address"}
              imagePath={Images.icons.letter}
              onChangeText={setEmail}
              value={Email}
              failMessage="*Must Enter a Valid Email Address" 
              showFailMessage={emailMessageVisible}
            />

            <TouchableOpacity 
              style={styles.dateInputStyle}
              onPress={showDatePicker}
            >
              <Image
                style={styles.iconStyle}
                source={Images.icons.calander_search}
              />
              {show &&
              <DateTimePicker
                value = {DateOfBirth}
                maximumDate={maxDate}
                mode='date'
                display="default"
                onChange={onDateChange}
              />
              }

              {Platform.OS === "android" &&
              <Text style={{alignSelf: "center", paddingLeft: 10}}>{date.toDateString()}</Text>
              }
            </TouchableOpacity>
            
            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Password"}
              isPassword={true}
              imagePath={Images.icons.key}
              onChangeText={setPassword}
              value={Password}
              failMessage={"*Must Contain at Least:\n8 Characters,\n1 Upper Case Character,\n1 Lower Case Character,\n1 Number,\n1 Special Character"}
              showFailMessage={passwordMessageVisible}
            />

            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Confirm Password"}
              isPassword={true}
              imagePath={Images.icons.key}
              onChangeText={setConfirmPassword}
              value={ConfirmPassword}
              failMessage="*Passwords Do Not Match"
              showFailMessage={confirmPasswordMessageVisible}
            />
          </View>
        </ScrollView>
        

        <SimpleButton
          style={styles.signupButtonStyle}
          textStyle={{fontSize: 18}}
          title="Sign Up"
          onPress={async () => {
            try {
              // Wait for the Register function to complete
              const registrationSuccess = await Register(Username,Email,DateOfBirth,Password,ConfirmPassword,setuserNameMessageVisible,setEmailMessageVisible,setPasswordMessageVisible,setConfirmPasswordMessageVisible,clearMessage);

              if (registrationSuccess){
                clearInputs()
                clearMessage()

                navigation.navigate('LoginPage');

                Alert.alert('User has been successfully registered')
              }
               
              // Now you can log the username
             // console.log('Username:', Username);
            } catch (error) {
              // Handle any errors that might occur during registration
              console.error('Registration failed:', error);
            }
          }}
        />
  
        <SimpleButton
          style={{marginTop: -20}}
          textStyle={styles.createAccountText}
          title={"Already have an account?"}
          
          onPress={() => {
            clearInputs();
            
            clearMessage();
            console.log("Navigating to LoginPage...");
            navigation.navigate('LoginPage');
          }}
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

  dateInputStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 10,
  },

  signupButtonStyle: {
    backgroundColor: "white",
    borderRadius: 10,//"10%",
    width: "40%",
    paddingVertical: 10,
  },

  createAccountText: {
    color: "#fec165",
    fontSize: 14,
    textDecorationLine: 'underline'
  },

  iconStyle: {
    width: 35,
    contentFit: "contain",
    tintColor: "black",
  },
});