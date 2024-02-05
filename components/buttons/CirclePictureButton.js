import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CirclePictureButton = ({ imagePath, style }) => {

  return (
    <TouchableOpacity style={styles.opacityStyle}>
        <Image
            source={imagePath}
            style={styles.imageStyle}
        />
    </TouchableOpacity>
  );
};

export default CirclePictureButton;

const styles = StyleSheet.create({
  opacityStyle: {
    borderRadius: "100%",
  },

  imageStyle: {
    width: 100,
    height: 100,

    borderRadius: 100,
    borderWidth: 2,
  },
});