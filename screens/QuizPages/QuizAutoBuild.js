import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated'; 

import { MultipleChoiceQuiz } from '../../components/quiz/Quizzes.js';

const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width : Dimensions.get('window').width * PixelRatio.get();
const windowHeight = Platform.OS === "android" ? Dimensions.get('window').height : Dimensions.get('window').height * PixelRatio.get();

// Testing quizzes
import Quiz from '../../quizzes/shortForm.json';
//import Quiz from '../../quizzes/longForm.json';
//import Quiz from '../../quizzes/noTimer.json';
//import Quiz from '../../quizzes/sizesTest.json';

var timer = () => {};

function QuizAutoBuild({ route, navigation }) {
  quiz = Quiz // create copy otherwise import is destroyed from references - may be able to remove due to switch to indexing

  const [timeLeft, setTimeLeft] = useState(3);
  const initialised = useRef(false);
  const currentQuiz = useRef(getQuiz());

  // Get current quiz based on format
  function getQuiz() {
    if (!initialised.current) {
      initialised.current = true;
      // Find relevant quiz based on quiz format given in json
      switch (quiz.format) {
        case 'multiple_choice':
          return (<MultipleChoiceQuiz type={quiz.type} name={quiz.name} maxTime={quiz.time} questionCount={quiz.number_of_questions} questions={quiz.questions} navigation={navigation}/>)
        default:
          console.log('Error quiz type not recognised');
          return (<View><Text>Error</Text></View>);
      }  
    } 
  }

  // Width/Height value used for start quiz countdown animation
  const wh = useSharedValue(windowHeight*2);

  // Quiz start countdown timer
  const startTimer = () => {
    timer = setTimeout(() => {
        if(timeLeft <= 0){
            clearTimeout(timer);
            return;
        }
     setTimeLeft(timeLeft-1);
    }, 600)
 }

 useEffect(() => {
     startTimer();
     return () => clearTimeout(timer);
 });    

 // If timer is out, play the intro animation
 if (timeLeft <= 0){
  wh.value = withTiming(0, { duration: 300, easing: Easing.linear });
 }

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