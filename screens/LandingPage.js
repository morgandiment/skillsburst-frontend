import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import {SimpleButton, AnimatedButton } from '../components/Index.js';
import CirclePictureButton from '../components/buttons/CirclePictureButton.js';
//import {  } from './Index.js';
import Images from '../components/images/Index.js';

function LandingPage({ navigation }) {
  return (
    <View style={styles.screenViewStyle}>
      <CirclePictureButton
        imagePath={Images.icons.person_icon}
        onPress={() => navigation.navigate('Template')}
      />

      <CirclePictureButton
        imagePath={Images.icons.trophy_icon}
        onPress={() => navigation.navigate('page')}
      />

      <CirclePictureButton
        imagePath={Images.icons.bag_icon}
        onPress={() => navigation.navigate('QuizAutoBuild')}
      />

      <CirclePictureButton
        imagePath={Images.icons.house_icon}
        onPress={() => navigation.navigate('QuizAutoBuild')}
      />
    </View>
  );
}

export default LandingPage;

const styles = StyleSheet.create({
  screenViewStyle: {
    backgroundColor: '#ffffff',
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top'
  },
});