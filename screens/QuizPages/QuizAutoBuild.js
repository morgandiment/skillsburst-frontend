import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated'; 

import { MultipleChoiceQuiz, LessonQuiz, Lesson } from '../../components/quiz/Quizzes.js';

const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width : Dimensions.get('window').width * PixelRatio.get();
const windowHeight = Platform.OS === "android" ? Dimensions.get('window').height : Dimensions.get('window').height * PixelRatio.get();

// Testing quizzes
//import quiz from '../../quizzes/longForm.json';
//import quiz from '../../quizzes/noTimer.json';
//import quiz from '../../quizzes/sizesTest.json';

var timer = () => {};

function QuizAutoBuild({ route, navigation }) {
  const { quiz } = route.params;
  if (quiz === undefined) {
    return (<View><Text>Error</Text></View>);
  }

  const [timeLeft, setTimeLeft] = useState(3);
  const initialised = useRef(false);
  const currentQuiz = useRef(getQuiz());

  // Get current quiz based on format, only once
  function getQuiz() {
    if (!initialised.current) {
      initialised.current = true;
      // Find relevant quiz based on quiz format given in json
      switch (quiz.format) {
        case 'multiple_choice':
          return (<MultipleChoiceQuiz type={quiz.type} name={quiz.name} maxTime={quiz.time} questionCount={quiz.number_of_questions} questions={quiz.questions} navigation={navigation}/>)
        case 'lesson_quiz':
          return (<LessonQuiz partCount={quiz.number_of_parts} parts={quiz.parts} navigation={navigation}/>)
        case 'lesson':
          return (<Lesson partCount={quiz.number_of_parts} parts={quiz.parts} navigation={navigation}/>)
        default:
          return (<View><Text>Error quiz not found, please return.</Text></View>);
      }  
    } 
  }

  // Width/Height value used for start quiz countdown animation
  const wh = useSharedValue(windowHeight*2);

  // Quiz start countdown timer
  const startTimer = () => {
    timer = setTimeout(() => {
        if(timeLeft <= 0){
            wh.value = withTiming(0, { duration: 300, easing: Easing.linear });
            clearTimeout(timer);
            return;
        }
     setTimeLeft(timeLeft-1);
    }, 600)
 }

  // - add option to play or dont play intro animation - and display mini explain page for relevent quiz - option to not see explain page again
 useEffect(() => {
     startTimer();
     return () => clearTimeout(timer);
 });    

 // Fix current quiz rendering every time
  return (
    <View style={styles.screenViewStyle}>

      {currentQuiz.current}

      {/* Quiz countdown animation */}
      <Animated.View style={[styles.screenViewNoFlex, {width: wh, height: wh}]}>
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{timeLeft}</Text>
        </View>
      </Animated.View>

    </View>
  );
}

export default QuizAutoBuild;

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
    borderRadius: windowHeight,
    width: windowHeight*2,
    height: windowHeight*2,
  },
  countdownContainer: {
    width: '10%',
    height: '10%',
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