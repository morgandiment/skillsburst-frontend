import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import {SimpleButton, AnimatedButton } from '../../components/Index.js';
import { MultipleChoiceQuiz } from '../../components/quiz/Quizzes.js';
//import {  } from './Index.js';

import Quiz from '../../quizzes/multipleChoiceTest.json';

function Template({ route, navigation }) {
  quiz = JSON.parse(JSON.stringify(Quiz)); // create copy otherwise import is destroyed from references
  const { path } = route.params;
  const Path = '../' + path
  var quizType;

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

  return (
    <View style={styles.screenViewStyle}>
      
      {quizType}

    </View>
  );
}

export default Template;

const styles = StyleSheet.create({
  screenViewStyle: {
    backgroundColor: '#01778a', // lighter blue
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});