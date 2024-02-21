import React, { useState, useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming, Easing } from 'react-native-reanimated'; 
import { ReText } from 'react-native-redash';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CountdownCricle = ({
    w = 10, // Width of the pecentage bar
    r = 100, // Radius of the percentage bar
    duration = 15000, // in miliseconds
    mainColor = "#0EF0A4",
    barFillColor = "#0EF0A4",
    barEmptyColor = "#D9D9D9",
  }) => {
    const durationInSeconds = duration / 1000;

    // Percentage bar circle
    var total = r*2 + w;
    var outerLength = r * (2 * Math.PI);
  
    // Center
    var cWidth = (r*2 - w/2) - (r*2 - (w/2)) / 5;
    var c = r+w/2;

    const progress = useSharedValue(0);
    progress.value = 0;
    progress.value = withTiming(1, {duration: duration, easing: Easing.linear});

    const progressText = useDerivedValue(() => {
        return `${Math.floor((1 - progress.value) * durationInSeconds)}`
    })

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: outerLength*(progress.value)
    }));
  
    return (
      <View alignItems = "center">
        <View style={{width: total, height: total, alignItems: "center"}}>

          <Svg transform={[{rotate: "-85deg"}]}>
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
          <View style={{ flex:1, justifyContent: "center", alignItems: "center", position: "absolute", top: c-cWidth/2, width: cWidth, height: cWidth, backgroundColor: mainColor, borderRadius: cWidth}}>
            <ReText text={progressText} style={styles.text}/>
          </View>
  
        </View>
      </View>
      
    );
};

export default CountdownCricle;

const styles = StyleSheet.create({
    text: {
      color: '#525458',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 28,
    },
  
});