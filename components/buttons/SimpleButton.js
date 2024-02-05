import React from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

const SimpleButton = ({ title, onPress, style }) => {
  return (
    <View style={[styles.bgColor, style]}>
      <Button
        title={title}
        onPress={onPress}
        color={'#EEDFEE'}
      />
    </View>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#988EAA',
  },
});