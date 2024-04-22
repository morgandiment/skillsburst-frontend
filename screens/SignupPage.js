import React , {useState, useContext} from 'react';
import { Button, StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Image} from "expo-image";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../userContext.js'
import {loginUser, registerUser} from "../API/database_connection.js";

import { SimpleButton, TextInputWithIcon } from '../components/Index.js';
//import {  } from './Index.js';
import Images from '.././images/Index.js';

function SignupPage({ navigation }) {
  const userContextData = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [fullNameMessageVisible, setFullNameMessageVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [emailMessageVisible, setEmailMessageVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  //const [dateMessageVisible, setFullNameMessageVisible] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordMessageVisible, setPasswordMessageVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordMessageVisible, setConfirmPasswordMessageVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameMessageVisible, setUsernameMessageVisible] = useState(false);

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

  const attemptSignup = () => {
    const fullNamePattern = /^[a-z ,.'-]+$/i;
    setFullNameMessageVisible(!fullNamePattern.test(fullName));

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailMessageVisible(!emailPattern.test(email.toLowerCase()));

    //must be at least: 8 chars - one uppercase letter - one lowercase letter - one number - one special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordMessageVisible(!passwordPattern.test(password));

    setConfirmPasswordMessageVisible(password != confirmPassword);

    if (fullNameMessageVisible || emailMessageVisible || passwordMessageVisible || confirmPasswordMessageVisible){
      return;
    }

    const userData = {
      FirstName: fullName.split(" ")[0],
      LastName: fullName.split(" ")[1],
      Email: email,
      Password: password,
      DOB: date.toLocaleDateString('en-GB'),
      Username: username,
    };

    //for testing we no use
    registerUser(userData).then(() => {
      try {
        loginUser(userData).then( async (loginResponse) => {

          userContextData.updateUsername(loginResponse.Username)
          userContextData.updateId(loginResponse.UserID)
          userContextData.updateFinishedIntro(loginResponse.finished_intro)
          userContextData.updateProgress({})
  
          await AsyncStorage.setItem("token", `${loginResponse.UserID}`).then(() => {
            navigation.navigate('OnboardingMainScreen'); 
          });
  
        });
      } catch(e){
        print("register fail")
      }
      
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screenViewStyle}>
        <Image
          style={styles.bannerLogoStyle}
          source={require('../images/skillsburst_banner_logo.png')}
        />

        <View style={{width: "90%", borderWidth: 1}}/>
        
        <ScrollView style={{width: "80%", maxHeight: "25%"}}>
          <View style={{flex: 1, rowGap: 20}}>
            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Full Name"}
              imagePath={Images.icons.username}
              onChangeText={setFullName}

              failMessage="*Must Give Both First and Last Name"
              showFailMessage={fullNameMessageVisible}
            />

            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Email Address"}
              imagePath={Images.icons.letter}
              onChangeText={setEmail}

              failMessage="Must Enter a Valid Email Address" 
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
                value = {date}
                maximumDate={date}
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

              failMessage={"Must Contain at Least:\n8 Characters,\n1 Upper Case Character,\n1 Lower Case Character,\n1 Number,\n1 Special Character"}
              showFailMessage={passwordMessageVisible}
            />

            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Confirm Password"}
              isPassword={true}
              imagePath={Images.icons.key}
              onChangeText={setConfirmPassword}

              failMessage="Passwords Do Not Match"
              showFailMessage={confirmPasswordMessageVisible}
            />

            <TextInputWithIcon
              style={styles.textInputStyle}
              textStyle={{fontSize: 20}}
              placeholder={"Username"}
              imagePath={Images.icons.username}
              onChangeText={setUsername}

              failMessage="This username is already in use" 
              showFailMessage={usernameMessageVisible}
            />
          </View>
        </ScrollView>

        <View style={{width: "90%", borderWidth: 1}}/>

        <View style={{flex:1, justifyContent:"flex-end", alignItems:"center", marginBottom:30}}>
          <SimpleButton
            style={styles.signupButtonStyle}
            textStyle={{fontSize: 18}}
            title="Sign Up"
            onPress={attemptSignup}
          />
    
          <SimpleButton
            textStyle={styles.createAccountText}
            title={"Already have an account?"}
            onPress={() => navigation.navigate('LoginPage')}
          />
        </View>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  bannerLogoStyle: {
    resizeMode:'contain',
    width: "100%",
    height: "30%",
    marginTop: 20,
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
    minHeight: 60,
    maxHeight: 60,
    borderRadius: 10,
  },

  signupButtonStyle: {
    backgroundColor: "white",
    borderRadius: 10,//"10%",
    width: 200,
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