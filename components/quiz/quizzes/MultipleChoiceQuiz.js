import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'; 

import Timer from '../components/Countdown';
import CountdownCricle from '../components/CountdownCricle';

//import thisQuiz from `../quizzes/${quizPath}`;

const MultipleChoiceQuiz = ({
  style,
  name,
  maxTime,
  questionCount,
  questions,
}) => {

  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const initialState = questions.shift();
    return initialState;
  });

  const saveResult = () => {

  }


  // Have basic timer in here that does all the real calculations - e.g out of time/ record time taken for analytics - maybe not in useState?
  // timer object is purely for visuals 

  //console.log(questions);
  //console.log(currentQuestion);

  function checkAnswer(selectedIndex, correctIndex) {
    console.log(selectedIndex, correctIndex);
    if (selectedIndex == correctIndex){
      console.log(true);
    }

    if (questions.length >= 1){
      setCurrentQuestion(questions.shift());
    }
    else
    {
      // End quiz
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
        <Text>{currentQuestion.question}</Text>
        <Timer/>
        <CountdownCricle/>
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