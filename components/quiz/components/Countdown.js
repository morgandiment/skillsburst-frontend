import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';

let timer = () => {};

const Timer = () => {
    const timeLeft = useRef(0);
    console.log('beans');
    const startTimer = () => {
        timer = setTimeout(() => {
            if(timeLeft > 15){
                clearTimeout(timer);
                return false;
            }
            timeLeft.current = timeLeft.current + 1;
            console.log(timeLeft.current);
            startTimer();
        }, 1000)
     }

     useEffect(() => {
         startTimer();
         return () => clearTimeout(timer);
     });    

    const start = () => {
        timeLeft.current = 0;
        clearTimeout(timer);
        startTimer();
    }

    return (
       <View style={styles.container}>
          <Text style={styles.timer}>{timeLeft.current}</Text>
          <Button onPress={start} title="Press"/>
    </View>
)}

export default Timer;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'blue',

    },
    timer: {

    },

  });