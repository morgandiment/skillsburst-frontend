import React, { useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'; 

import Images from '../../images/Index';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedPercentageCircle = ({
    w = 10, // Width of the pecentage bar
    r = 100, // Radius of the percentage bar
    percentage = 0, // 0 - 1
    active = false, // Whether the button is currently useable
    text = null,
    mainColor = "#0EF0A4",
    barFillColor = "#0EF0A4",
    barEmptyColor = "#D9D9D9",
    offColor = "#D9D9D9",
    imgARatio = 0.5,
    onPress = () => {},
  
    // Default image
    img = Images.default_Image,
  }) => {


    // Percentage bar circle
    var total = r*2 + w;
    var outerLength = r * (2 * Math.PI);
  
    // Center
    var cWidth = (r*2 - w/2) - (r*2 - (w/2)) / 5;
    var c = r+w/2;
  
    if (active == false)
    {
      var mainColor = offColor;
      var barFillColor = offColor;
      var barEmptyColor = offColor; 
    }

    const VariableText = () => {
      if (text == null){
        return <View/>;
      }
      return (
        <Text style={styles.text}>{text}</Text>
      );
    };

    const progress = useSharedValue(0);

    useEffect(() =>{
        progress.value = withTiming(percentage, {duration: 1000});
    }, []);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: outerLength*(1-progress.value)
    }));
  
    return (
      <View alignItems = "center">
        <View style={{width: total, height: total, alignItems: "center"}}>

          <Svg transform={[{rotate: "-90deg"}]}>
            
            {/* Base circle */}
            <Circle 
            fill={"none"}
            cx={total/2} 
            cy={total/2} 
            r={r}
            stroke={barEmptyColor}
            strokeWidth={w}
            />

            {/* Percentage Bar - % full determined by the dash offset*/}
            <AnimatedCircle 
            fill={"none"}
            cx={total/2} 
            cy={total/2} 
            r={r}
            stroke={barFillColor}
            strokeWidth={w}
            strokeLinecap={"round"}
            strokeDasharray={outerLength}
            animatedProps={animatedProps}
            />
          </Svg>

           {/* Inner Button - size is automatically determined to fit within the percentage bar*/}
          <TouchableOpacity onPress={onPress} disabled={!active} style={{ flex:1, justifyContent: "center", alignItems: "center", position: "absolute", top: c-cWidth/2, width: cWidth, height: cWidth, backgroundColor: mainColor, borderRadius: cWidth}}>
            <Image style={{flex: 1, aspectRatio: imgARatio, resizeMode: 'contain'}} source={img}/>
          </TouchableOpacity>
  
        </View>
        <VariableText/>
      </View>
      
    );
};

export default AnimatedPercentageCircle;

const styles = StyleSheet.create({
    text: {
      color: '#525458',
      fontWeight: 'bold',
    },
  
});