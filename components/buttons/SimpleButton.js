import React from 'react';
import { Alert, Button, StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';

const SimpleButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.pressableStyle, style]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  pressableStyle : {
    alignItems: "center",
    justifyContent: "center",
  }
});