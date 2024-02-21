import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Dimensions} from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'; 

import Timer from '../components/Countdown';
import CountdownCricle from '../components/CountdownCricle';
import QuestionProgressBar from '../components/QuestionProgressBar';

const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width * 0.9 : Dimensions.get('window').width * 0.9 * PixelRatio.get();
const windowHeight = Platform.OS === "android" ? Dimensions.get('window').height * 0.85 : Dimensions.get('window').height * 0.85 * PixelRatio.get();

//import thisQuiz from `../quizzes/${quizPath}`;

// Values to store/pass to next page for recording
// - questions complete
// - time taken for each question
// - total time?
// - 

var timer = () => {};

const MultipleChoiceQuiz = ({
  style,
  name,
  maxTime,
  questionCount,
  questions,
  navigation,
}) => {
  

  const currentIndex = useRef(0);
  const currentTime = useRef(0);
  const answers = useRef([]);
  const times = useRef([]);

  const [finished, setFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const initialState = questions[currentIndex.current];
    return initialState;
  });

  const startTimer = () => {
    timer = setTimeout(() => {
        if(currentTime.current >= maxTime - 1){
            clearTimeout(timer);
            checkAnswer(-1, currentQuestion.correct_index);
        }
     currentTime.current = currentTime.current + 0.1;
     startTimer();
    }, 100)
 }

 useEffect(() => {
     startTimer();
     return () => clearTimeout(timer);
 });    

const start = () => {
    currentTime.current = 0;
    clearTimeout(timer);
    startTimer();
}

  const saveResult = () => {

  }


  // Have basic timer in here that does all the real calculations - e.g out of time/ record time taken for analytics - maybe not in useState?
  // timer object is purely for visuals 


  function checkAnswer(selectedIndex, correctIndex) {
    currentIndex.current = currentIndex.current + 1;
    console.log(currentIndex.current);
    if (selectedIndex === correctIndex){
      // correct
      answers.current.push(1);
    }
    else if (selectedIndex === -1){
      // Timed out
      answers.current.push(-1);
    } 
    else {
      // incorrect
      answers.current.push(0);
    }

    times.current.push(currentTime.current);

    if (currentIndex.current < questionCount){
      start();
      setCurrentQuestion(questions[currentIndex.current]);
    }
    else
    {
      // Finished with quiz
      console.log('finished: ' + answers.current + " times: " + times.current);
      clearTimeout(timer);
      navigation.navigate('QuizResultPage');
    }
  }

  const AnswerButton = ({style, text='Default', onPress=() => {}}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.bgColor, style]}>
      {/* Question */}
      <View style={styles.textTimerContainer}>

        {/* Question prgoress bar - very broken may remove
        <QuestionProgressBar start={currentIndex/questionCount} end={currentIndex/questionCount} w={windowWidth*0.8}/>*/}

        <CountdownCricle duration={maxTime * 1000} name={currentQuestion.correct_index} r={windowWidth/6} w={windowWidth/18}/>
        <Text>{currentQuestion.question}</Text>
      </View>


      {/* Answer area */}
      <View style={styles.outerButtonContainer}>
        <View style={styles.innerButtonContainer}>
          <AnswerButton text={currentQuestion.answers[0]} style={{backgroundColor: 'red'}} onPress={() => checkAnswer(0, currentQuestion.correct_index)}/>
          <AnswerButton text={currentQuestion.answers[1]} style={{backgroundColor: 'blue'}} onPress={() => checkAnswer(1, currentQuestion.correct_index)}/>
        </View>

        <View style={styles.innerButtonContainer}>
          <AnswerButton text={currentQuestion.answers[2]} style={{backgroundColor: 'orange'}} onPress={() => checkAnswer(2, currentQuestion.correct_index)}/>
          <AnswerButton text={currentQuestion.answers[3]}  style={{backgroundColor: 'orange'}} onPress={() => checkAnswer(3, currentQuestion.correct_index)}/>
        </View>
      </View>
    </View>
  );
};

export default MultipleChoiceQuiz;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  textTimerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerButtonContainer: {
    flex: 0.5, // Scale of buttons
  },
  innerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: '45%',
    height: '90%',
    borderRadius: 15,
    backgroundColor: '#0EF0A4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 30,
  },
});