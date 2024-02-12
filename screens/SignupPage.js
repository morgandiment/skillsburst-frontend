import * as React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {SimpleButton, AnimatedButton } from '../components/Index.js';
//import {  } from './Index.js';

function SignupPage({ navigation }) {

  return (
    <View style={styles.screenViewStyle}>
      <Image
        style={styles.bannerLogoStyle}
        source={require('../images/skillsburst_banner_logo.png')}
      />

      <DateTimePicker
        value = {new Date()}
        maximumDate={new Date()}
        mode='date'
        display="compact"

        style={{
          backgroundColor: "white",
          
          borderWidth: 2,
          marginBottom: 20
        }}
      />

    </View>
  );
}

export default SignupPage;

const styles = StyleSheet.create({
  screenViewStyle: {
    backgroundColor: '#056371',
    
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bannerLogoStyle: {
    resizeMode:'contain',
    width: "100%",
    height: "30%",
    borderWidth: 10,
    borderColor: "red",
  }
});