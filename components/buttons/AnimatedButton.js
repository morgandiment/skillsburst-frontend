import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedButton = ({ title, message }) => {
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
      onPress={() => Alert.alert(message)}
      onPressIn={() => (scale.value = 20)}
      onPressOut={() => (scale.value = 60)}
    >
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <Animated.Text style={[styles.textStyle, animatedTextStyle]}>
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
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 30,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
});