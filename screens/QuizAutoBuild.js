import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import {SimpleButton, AnimatedButton, QuizDisplay } from '../components/Index.js';
//import {  } from './Index.js';

function Template({ navigation }) {
  return (
    <View style={styles.screenViewStyle}>
      
      <QuizDisplay/>

    </View>
  );
}

export default Template;

const styles = StyleSheet.create({
  screenViewStyle: {
    backgroundColor: '#056371',
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});