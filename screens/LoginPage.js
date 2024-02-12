import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import {SimpleButton, AnimatedButton } from '../components/Index.js';
//import {  } from './Index.js';

function Template({ navigation }) {
  return (
    <View style={styles.screenViewStyle}>
      <SimpleButton
        title="Navigate to next page"
        onPress={() => navigation.navigate('name of page')}
      />
    </View>
  );
}

export default Template; //remember to change this

const styles = StyleSheet.create({
  screenViewStyle: {
    backgroundColor: '#056371',
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});