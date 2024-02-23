import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import Animated, { ZoomOut, ZoomIn } from 'react-native-reanimated'; 

import {SimpleButton, AnimatedButton } from '../../components/Index.js';
import { MultipleChoiceQuiz } from '../../components/quiz/Quizzes.js';
//import {  } from './Index.js';

const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width : Dimensions.get('window').width * PixelRatio.get();
const windowHeight = Platform.OS === "android" ? Dimensions.get('window').height : Dimensions.get('window').height * PixelRatio.get();

import Quiz from '../../quizzes/multipleChoiceTest.json';
let timer = () => {};

function Template({ route, navigation }) {
  quiz = JSON.parse(JSON.stringify(Quiz)); // create copy otherwise import is destroyed from references - may be able to remove due to switch to indexing
  const { path } = route.params;
  const Path = '../' + path
  var quizType;

  const [timeLeft, setTimeLeft] = useState(3);

  // Deal with import stuff later not priority 

  // Select correct quiz and pass data
  switch (quiz.format)
  {
    case 'multiple_choice':
      quizType = (<MultipleChoiceQuiz name={quiz.name} maxTime={quiz.start_seconds} questionCount={quiz.number_of_questions} questions={quiz.questions} navigation={navigation}/>)
      break;
    default:
      console.log('Error quiz type not recognised');
      return (<View></View>);
  }

  const startTimer = () => {
    timer = setTimeout(() => {
        if(timeLeft <= 0){
            clearTimeout(timer);
            return;
        }
     setTimeLeft(timeLeft-1);
    }, 700)
 }

 useEffect(() => {
     startTimer();
     return () => clearTimeout(timer);
 });    

 if (timeLeft <= 0){
  return (
    <View style={styles.screenViewStyle}>

      {quizType}
      <Animated.View style={styles.screenViewNoFlex} entering={ZoomOut} exiting={ZoomIn}>
        <Text style={styles.countdownText}>{timeLeft}</Text>
      </Animated.View>

    </View>
  );
 }
 else
 {
  return (
    <View style={styles.screenViewStyle}>
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>{timeLeft}</Text>
      </View>
    </View>
  );
 }

}

export default Template;

const styles = StyleSheet.create({
  screenViewStyle: {
    backgroundColor: '#01778a', // lighter blue
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenViewNoFlex: {
    backgroundColor: '#01778a', // lighter blue
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: windowHeight,
    height: windowHeight,
    borderRadius: windowHeight,
  },
  countdownContainer: {
    width: windowWidth/3,
    height: windowWidth/3,
    borderRadius: windowWidth/3,
    backgroundColor: '#0095ab',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
});