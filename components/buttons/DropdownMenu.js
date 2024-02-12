import React from 'react';
import { View, Alert, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
  } from 'react-native-reanimated';

import { CirclePictureButton } from '../Index.js';
import Images from '../../images/Index.js';

const DropdownMenu = ({ children, style }) => {
  
  return (
    <View style={[styles.wrapperStyle, style]}>
        <CirclePictureButton
            imagePath={Images.icons.person_icon}
            onPress={() => navigation.navigate('Template')}
        />

        <View style={style}>
            {children}
        </View>
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
    wrapperStyle: {
        
    },

    childrenViewStyle: {
        borderWidth: 2,
        flex: 1,

        columnGap: 10,
    },

    opacityStyle: {
        borderRadius: "100%",
        paddingBottom:20,
    },
    
    imageStyle: {
        width: 120,
        height: 120,
    
        borderRadius: 100,
        borderWidth: 2,
    },
});