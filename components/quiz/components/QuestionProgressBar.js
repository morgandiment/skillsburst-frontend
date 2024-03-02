import { View } from 'react-native';
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