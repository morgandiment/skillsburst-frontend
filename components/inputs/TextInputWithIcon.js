import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import {Image} from "expo-image";

const TextInputWithIcon = ({ style, textStyle, placeholder="", imagePath, isPassword=false, onChangeText, showFailMessage=false, failMessage="regex failed"}) => {

  //const [showFailMessage, setShowMessage] = React.useState(false);

  return(
    <View style={{flex: 1}}>
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
        onChangeText={onChangeText}

        style={textStyle}
      />
      </View>
      { showFailMessage &&
        <Text style={styles.messageStyle}>{failMessage}</Text>
      }
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
  },

  messageStyle: {
    color: "red",
  }
});