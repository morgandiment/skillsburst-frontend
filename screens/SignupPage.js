import * as React from 'react';
import { useState } from "react";
import { Button, StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Platform} from 'react-native';
import {Image} from "expo-image";
import DateTimePicker from '@react-native-community/datetimepicker';

import { SimpleButton, TextInputWithIcon } from '../components/Index.js';
//import {  } from './Index.js';
import Images from '.././images/Index.js';

function SignupPage({ navigation }) {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(Platform.OS === "ios");
  

  const showDatePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    if (Platform.OS === "android"){
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    }
  };

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
          placeholder={"Full Name"}
          imagePath={Images.icons.username}
        />

        <TextInputWithIcon
          style={styles.textInputStyle}
          textStyle={{fontSize: 20}}
          placeholder={"Email Address"}
          imagePath={Images.icons.letter}
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
            value = {date}
            maximumDate={date}
            mode='date'
            display="default"
            onChange={onChange}
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
        />

        <TextInputWithIcon
          style={styles.textInputStyle}
          textStyle={{fontSize: 20}}
          placeholder={"Confirm Password"}
          isPassword={true}
          imagePath={Images.icons.key}
        />

        <SimpleButton
          style={styles.signupButtonStyle}
          textStyle={{fontSize: 18}}
          title="Sign Up"
          onPress={() => navigation.navigate('HomePage')}
        />
  
        <SimpleButton
          style={{marginTop: -20}}
          textStyle={styles.createAccountText}
          title={"Already have an account?"}
          onPress={() => navigation.navigate('LoginPage')}
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
    width: "80%",
    maxHeight: "7%",
    borderRadius: 10,
  },

  dateInputStyle: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    width: "80%",
    maxHeight: "6%",
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