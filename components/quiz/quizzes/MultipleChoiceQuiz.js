import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Dimensions} from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'; 

import CountdownCricle from '../components/CountdownCricle';
import QuestionProgressBar from '../components/QuestionProgressBar'; // broken :,
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width : Dimensions.get('window').width// * PixelRatio.get();

// Colours of answer buttons
const c1 = '#df163c';
const c2 = '#24f2f9';
const c3 = 'orange';
const c4 = 'yellow'

// This quiz has three modes
// - Timed per question
// - Overall Time requirement
// - Untimed (timing still recorded but no fail state)

var timer = () => {};

const MultipleChoiceQuiz = ({
  style,
  type,
  maxTime = 999999,
  required,
  questionCount,
  questions,
  format,
  navigation,
}) => {
  //const transition = useSharedValue(0); // Width and height of the transition animated view - displays x or tick

  const currentIndex = useRef(0); // Index of the current question within questions array
  const currentTime = useRef(0); // Current time on countdown clock per question
  const score = useRef(0); // Total correct answers
  const streak = useRef([0, 0]); // [Current Streak, max Streak]
  const totalTime = useRef(0); // Total time for all questions
  const selected = useRef([]); // Index of the selected answer
  const times = useRef([]); // Time taken per answer selection
  
  const [finished, setFinished] = useState(false); // on finsihed set view to full screen -> cool ending animation?
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const initialState = questions[currentIndex.current];
    return initialState;
  });

  // The main quiz timer, used for counting per question time and total time - seperate clock from visual countdown
  // convert to change startTimer definition based on switch(type) instead of checking inside - increase performance!!
  const startTimer = () => {
    timer = setInterval(() => {
      switch (type){
        case "total_time":
          if(currentTime.current + totalTime.current >= maxTime-0.1) {
            timeOutQuiz();
          }
          break;
        case "question_time":
          if(currentTime.current >= maxTime-0.1) {
            clearInterval(timer);
            checkAnswer(-1, currentQuestion.correct_index);
          }
          break;
        default:
          break;
      }
      currentTime.current = (currentTime.current + 0.1);
    }, 100)
 }

  useEffect(() => {
      startTimer();
      return () => clearInterval(timer);
  });    

  const start = () => {
      currentTime.current = 0;
      clearInterval(timer);
      startTimer();
  }

  function checkAnswer(selectedIndex, correctIndex) {
    currentIndex.current = currentIndex.current + 1;

    if (selectedIndex === correctIndex){
      // correct
      streak.current[0] += 1;
      if (streak.current[0] > streak.current[1]){
        streak.current[1] = streak.current[0];
      }

      score.current = score.current + 1;
      times.current.push(Math.round(currentTime.current * 10) / 10);
      selected.current.push(selectedIndex);
    }
    else if (selectedIndex === -1){
      // Timed out - set question result time as max time due to some floating point precision making time appear lower when rounded
      streak.current[0] = 0;
      times.current.push(maxTime);
      selected.current.push(-1);
    } 
    else {
      // incorrect
      streak.current[0] = 0;
      times.current.push(Math.round(currentTime.current * 10) / 10);
      selected.current.push(selectedIndex);
    }

    totalTime.current = times.current.reduce((partialSum, a) => partialSum + a, 0);

    if (currentIndex.current < questionCount){
      start();
      setCurrentQuestion(questions[currentIndex.current]);
    }
    else
    {
      // Finished with quiz
      clearTimeout(timer);
      var pass = score.current >= required ? true : false;
      const results = { type: type, times: times.current, score: score.current, selectedIndexes: selected.current, questions: questions, questionCount: questionCount, maxStreak: streak.current[1] }
      navigation.navigate('QuizEndPage', { format: format, pass: pass, results: results });
    }
  }

  function timeOutQuiz() {
    // Time out every following question
    for (var i = currentIndex.current; i < questionCount; i++) {
      selected.current.push(-1);
    }
    clearTimeout(timer);
    const results = { type: type, times: times.current, score: score.current,  selectedIndexes: selected.current, questions: questions, questionCount: questionCount,  maxStreak: streak.current[1] }
    navigation.navigate('QuizEndPage', { format: format, pass: false, results: results });
    
  }

  const AnswerButton = ({style, text='Default', onPress=() => {}}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  } 

  const LongAnswerButton = ({style, text='Default', onPress=() => {}}) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.longButton, style]}>
          <Text style={[styles.buttonText, {marginLeft: '5%'}]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  // Prolly a cleaner way to do this but it works
  const ShortFormAnswerSelection = () => {
    switch (currentQuestion.answer_count)
    {
      case 2:
        return (
          <View style={[styles.innerButtonContainer, {flex: 0.6}]}>
            <AnswerButton text={currentQuestion.answers[0]} style={{backgroundColor: c1}} onPress={() => checkAnswer(0, currentQuestion.correct_index)}/>
            <AnswerButton text={currentQuestion.answers[1]} style={{backgroundColor: c2}} onPress={() => checkAnswer(1, currentQuestion.correct_index)}/>
          </View>
        )
      case 3:
        return (
          <View style={styles.outerButtonContainer}>
            <View style={styles.innerButtonContainer}>
              <AnswerButton text={currentQuestion.answers[0]} style={{backgroundColor: c1}} onPress={() => checkAnswer(0, currentQuestion.correct_index)}/>
              <AnswerButton text={currentQuestion.answers[1]} style={{backgroundColor: c2}} onPress={() => checkAnswer(1, currentQuestion.correct_index)}/>
            </View>
    
            <View style={[styles.innerButtonContainer, {}]}>
              <AnswerButton text={currentQuestion.answers[2]} style={{backgroundColor: c3}} onPress={() => checkAnswer(2, currentQuestion.correct_index)}/>
            </View>
          </View>
        )
        break;
      case 4:
        return (
          <View style={styles.outerButtonContainer}>
            <View style={styles.innerButtonContainer}>
              <AnswerButton text={currentQuestion.answers[0]} style={{backgroundColor: c1}} onPress={() => checkAnswer(0, currentQuestion.correct_index)}/>
              <AnswerButton text={currentQuestion.answers[1]} style={{backgroundColor: c2}} onPress={() => checkAnswer(1, currentQuestion.correct_index)}/>
            </View>
    
            <View style={styles.innerButtonContainer}>
              <AnswerButton text={currentQuestion.answers[2]} style={{backgroundColor: c3}} onPress={() => checkAnswer(2, currentQuestion.correct_index)}/>
              <AnswerButton text={currentQuestion.answers[3]}  style={{backgroundColor: c4}} onPress={() => checkAnswer(3, currentQuestion.correct_index)}/>
            </View>
          </View>
        )
    }
    return;
  }

  const LongFormAnswerSelection = () => {
    return (
      <View style={[styles.outerButtonContainer, {flex: 0.6}]}>     
          <LongAnswerButton text={currentQuestion.answers[0]} style={{backgroundColor: c1}} onPress={() => checkAnswer(0, currentQuestion.correct_index)}/>
          <LongAnswerButton text={currentQuestion.answers[1]} style={{backgroundColor: c2}} onPress={() => checkAnswer(1, currentQuestion.correct_index)}/>

          <LongAnswerButton text={currentQuestion.answers[2]} style={{backgroundColor: c3}} onPress={() => checkAnswer(2, currentQuestion.correct_index)}/>
          <LongAnswerButton text={currentQuestion.answers[3]}  style={{backgroundColor: c4}} onPress={() => checkAnswer(3, currentQuestion.correct_index)}/>
      </View>
    )
  }

  const QuestionLayout = ({long, count}) => {
    if (long){
      return (<LongFormAnswerSelection/>)
    } else {
      return (<ShortFormAnswerSelection/>)
    }
  }
  
  // The quiz page
  return (
    <SafeAreaView style={[styles.bgColor, style]}>
      {/* Question */}
      <View style={styles.top}>

        {/* Question prgoress bar */}
        <QuestionProgressBar style={styles.progressBar} current={currentIndex.current} total={questionCount} w={windowWidth*0.9}/>
        <View flex={1} width={'100%'} justifyContent={'space-evenly'} flexDirection={'row'}>
          <CountdownCricle duration={maxTime * 1000} type={type} r={windowWidth/7} w={windowWidth/19} barEmptyColor='#056b7a'/>
          {/*<View width={windowWidth/3} height={windowWidth/3} borderRadius={windowWidth} backgroundColor={'red'}>
              <Text>{streak.current[0]}</Text>
          </View>*/}
        </View>
        <View flex={1}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>
      </View>

      {/* Answer area - auto sizes beased on longform/answer_count*/}
      <QuestionLayout long={currentQuestion.long_form} count={currentQuestion.answer_count}/>
    </SafeAreaView>
  );
};

export default MultipleChoiceQuiz;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#0095ab',
    flex: 1,
    width: '100%',
  },
  top: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    marginVertical: '3%',
  },
  questionText: {
    fontSize: 30,
  },
  outerButtonContainer: {
    flex: 0.6, // Scale of buttons
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
  longButton: {
    width: '90%',
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#0EF0A4',
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: '5%',
  },
  buttonText: {
    color: 'black',
    fontSize: 30,
  },
});