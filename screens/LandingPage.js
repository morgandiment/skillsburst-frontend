import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { CirclePictureButton, DropdownMenu } from '../components/Index.js';

//import {  } from './Index.js';
import Images from '.././images/Index.js';

function LandingPage({ navigation }) {
  return (
    <View style={styles.screenViewStyle}>
      <DropdownMenu
        style={{
          flex: 1,
          flexDirection: "column",
          //justifyContent: "space-between",
          alignItems: "center",

          borderWidth: 1
        }}
      >
        <CirclePictureButton
          imagePath={Images.icons.person_icon}
          style={{flex:1,}}
          onPress={() => navigation.navigate('Template')}
        />

        <CirclePictureButton
          imagePath={Images.icons.trophy_icon}
          style={{flex:1,}}
          onPress={() => navigation.navigate('page')}
        />

        <CirclePictureButton
          imagePath={Images.icons.bag_icon}
          style={{flex:1,}}
          onPress={() => navigation.navigate('QuizAutoBuild')}
        />

        <CirclePictureButton
          imagePath={Images.icons.house_icon}
          style={{flex:1,}}
          onPress={() => navigation.navigate('QuizAutoBuild')}
        />
      </DropdownMenu>
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