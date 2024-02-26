import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

// Can be improved to not require a width integer
const QuestionProgressBar = (
    {
      style,
      w = 100, // Length of the bar
      h = 20,  // Height/Stroke Width of the bar
      current = 0,
      total = 1,
  }) => {
    const progress = useSharedValue(0);

    progress.value = withTiming(((current+1)/total) * w, {duration: 600 });

    return (
      <View style={[{width: w, height: h, backgroundColor: "#056b7a", borderRadius: h}, style]}> 
        <Animated.View style={{width: progress, height: h, backgroundColor: "#0EF0A4", borderRadius: h}}/> 
      </View>
    );
}

export default QuestionProgressBar;

const styles = StyleSheet.create({

    barContainer: {
        width: '90%',
        marginVertical: '3%',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    bar: {
        height: '50%',
        borderRadius: 5,
        backgroundColor: '#D9D9D9',
    },
    innerBar: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#0EF0A4',
    },
    blackCircle: {
        height: '130%',
        width: '3%',
        position: 'absolute',
    },  
  
});

