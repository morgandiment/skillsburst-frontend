import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedButton = ({ title, style, textStyle }) => {
  const scale = useSharedValue(60);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: withSpring(scale.value),
      paddingVertical: withSpring(scale.value / 3, { stiffness: 10 }),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(scale.value / 3, { stiffness: 30 }),
    };
  });

  return (
    <TouchableOpacity
      onPressIn={() => (scale.value = 50)}
      onPressOut={() => (scale.value = 60)}
    >
      <Animated.View style={[styles.wrapper, style, animatedStyle]}>
        <Animated.Text style={[styles.textStyle, textStyle, animatedTextStyle]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    color: 'white',
  },
});