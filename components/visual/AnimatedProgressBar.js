import { Text, View } from 'react-native';
import { useEffect } from 'react';

import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

// Can be improved to not require a width integer
const AnimatedProgressBar = (
    {
      w = 100, // Length of the bar
      h = 20,  // Height/Stroke Width of the bar
      percentage = 1, // Value ranging from 0 to 1
    
  }) => {
    const progress = useSharedValue(0);
  
    useEffect(() => {
      progress.value = withTiming(w*percentage, { duration: 1500 });
    }, []);
  
    const Bar = () =>
    {
      return (
        <View>
          <Animated.View style={{width: progress, height: h, backgroundColor: "#0EF0A4", borderRadius: h}}>
          </Animated.View>
        </View>
      );
    }
  
    return (
      <View style={{width: w, height: h, backgroundColor: "#D9D9D9", borderRadius: h}}> 
        <Bar/>    
        <View position={"absolute"} alignItems={"center"} justifyContent={"center"} width={w}>
          <Text>{percentage * 100}%</Text> 
        </View>
      </View>
    );
}

export default AnimatedProgressBar;