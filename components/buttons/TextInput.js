import React from 'react';
import { StyleSheet, View } from 'react-native';

const TextInput = ({ label, icon }) => {
  return(
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand}/>
      </LeftIcon>
      
      <StyledInputLabel> {label} </StyledInputLabel>
    </View>       
  )
};

export default TextInput;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#988EAA',
  },
});