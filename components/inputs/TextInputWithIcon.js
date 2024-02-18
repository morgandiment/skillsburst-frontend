import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {Image} from "expo-image";

const TextInputWithIcon = ({ style, textStyle, placeholder, imagePath, isPassword=false}) => {
  return(
    <View style={[styles.viewStyle, style]}>

      <Image
        style={styles.iconStyle}
        source={imagePath}
      />

      <TextInput
        placeholder={placeholder}
        backgroundColor="white"
        secureTextEntry={isPassword}
        flex={1}

        style={textStyle}
      />
    </View>       
  )
};

export default TextInputWithIcon;

const styles = StyleSheet.create({
  viewStyle: {
    flex:1,
    flexDirection: "row",
    columnGap: 10,
    padding: 10,
    backgroundColor: "white"
  },

  iconStyle: {
    width: 35,
    contentFit: "contain",
    tintColor: "black",
  }
});