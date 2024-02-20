import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';

let timer = () => {};

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(30);

    const startTimer = () => {
        timer = setTimeout(() => {
            if(timeLeft <= 0){
                clearTimeout(timer);
                return false;
            }
         setTimeLeft(timeLeft-1);
        }, 1000)
     }

     useEffect(() => {
         startTimer();
         return () => clearTimeout(timer);
     });    

    const start = () => {
        setTimeLeft(30);
        clearTimeout(timer);
        startTimer();
    }

    return (
       <View style={styles.container}>
          <Text style={styles.timer}>{timeLeft}</Text>
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