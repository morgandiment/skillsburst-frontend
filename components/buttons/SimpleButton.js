import React from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

const SimpleButton = ({ title, message, style }) => {
  return (
    <View style={[styles.bgColor, style]}>
      <Button
        title={title}
        onPress={() => Alert.alert(message)}
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