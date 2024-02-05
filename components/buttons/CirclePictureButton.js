import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const CirclePictureButton = ({ imagePath, style }) => {
  const scale = useSharedValue(10);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      padding: withSpring(scale.value / 3, { stiffness: 10 }),
    };
  });

  return (
    <TouchableOpacity
      onPressIn={() => (scale.value = 0)}
      onPressOut={() => (scale.value = 10)}
    >
        <Animated.View style={[styles.wrapper, animatedStyle]}>
            <Image
                source={imagePath}
                style={[styles.imageStyle, animatedStyle]}
            />
        </Animated.View>
    </TouchableOpacity>
  );
};

export default CirclePictureButton;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: "100%",
    padding: 0,
  },

  imageStyle: {
    width: 100,
    height: 100,

    borderRadius: "100%",
  },
});