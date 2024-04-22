import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Dimensions, TextInput, ScrollView} from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'; 

import CountdownCricle from '../components/CountdownCricle';
import QuestionProgressBar from '../components/QuestionProgressBar'; // broken :,
import { SafeAreaView } from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height * 0.85;

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

const TypingQuiz = ({
  style,
  course,
  difficulty,
  quiz,
  passThreshold = 0.6, //percentage
  navigation,

}) => {
  const [currentQustionIndex, setCurrentQuestionIndex] = useState(0);
  const inputRefs = useRef([]);
  const currentLetters = useRef([]);
  const score = useRef(0);
  const totalLen = useRef(0);
  const len = useRef(0);
  const [gameState, setState] = useState(0);

  len.current = 0;

  const LetterEntry = ({index, preset, style, edi=true, val}) => {
    
    function HandleChange(text, index){
        if (text.length === 1 && index < inputRefs.current.length - 1) {
            if (currentLetters.current[index] === undefined) {
                currentLetters.current[index] = text;
                inputRefs.current[index + 1].focus();
            }

            inputRefs.current[index + 1].focus();
        }
        else if (text.length == 1 && currentLetters.current[index] === undefined) {
            currentLetters.current[index] = text;
        }
        else if ((currentLetters.current[index] === undefined) && text === 'Backspace' && index > 0) {
            inputRefs.current[index - 1].focus();
            currentLetters.current[index - 1] = undefined;
            inputRefs.current[index - 1].clear();
        }
        else if (text === 'Backspace') {
            currentLetters.current[index] = undefined
        }
    }

    if (preset !== undefined) {
      return (
        <View key={index} style={styles.LetterEntry}>
        <TextInput 
        style={styles.entry} 
        maxLength={1}
        value={preset}
        editable={false}
        />
      </View>
      )
    }

    return (
        <View key={index} style={[styles.LetterEntry, style]}>
            <TextInput 
            style={styles.entry} 
            maxLength={1}
            editable={edi}
            value={val}
            onKeyPress={value => HandleChange(value.nativeEvent.key, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        </View>
    )
  }

  const AddWord = ({word, preset, style}) => {
    letters = []
    if (preset !== undefined) {
      for (let i = 0; i < preset.length; i++) {
        letters.push(
            <LetterEntry key={i + len.current + 0.1} index={i + len.current} preset={preset.charAt(i)}/>
        )
      }
      return (
        <View style={[style, styles.addWord, {width: preset.length * 20, marginRight: 3}]}> 
            {letters}
        </View>
      )
    }
    else {
      if (gameState === 0) {
        for (let i = 0; i < word.length; i++) {
          letters.push(
              <LetterEntry key={i + len.current} index={i + len.current}/>
          )
        }
      }
      else if (gameState === 1 || gameState === 2){
        for (let i = 0; i < word.length; i++) {
          if (currentLetters.current[i + len.current] !== undefined && currentLetters.current[i + len.current].toLowerCase() === word.charAt(i).toLowerCase()) {
            score.current += 1;
            letters.push(
              <LetterEntry key={i + len.current} index={i + len.current} edi={false} val={currentLetters.current[i + len.current]} style={{backgroundColor: '#0EF0A4'}}/>
            )
          }
          else {
            letters.push(
              <LetterEntry key={i + len.current} index={i + len.current} edi={false}  val={currentLetters.current[i + len.current]} style={{backgroundColor: 'red'}}/>
            )
          }
        }
      }
      len.current += word.length;
      return (
        <View style={[style, styles.addWord, {width: word.length * 20}]}> 
            {letters}
        </View>
      )
  }
}

  const GenQuestion = (question) => {
    arr = []
    question = question.question;
    p = 0
    for (let i = 0; i < question.length; i++) {
        if (i % 2 === 0){
            question[i][0].split(' ').forEach((word) => {
                p += 1;
                arr.push(
                    <Text key={question.length + p} style={styles.qsText}>{word} </Text>
                )
            })
        }
        else {
            arr.push(
                <AddWord key={i+0.5} preset={question[i][0]}/>
            )

            arr.push(
                <AddWord key={i} word={question[i][1]}/>
            )
        }
    }

    return (
        <View style={styles.question}>
            {arr}
        </View>
    )
  }

  const CorrectAnswer = (question) => {
    arr = []
    question = question.question;
    p = 0
    for (let i = 0; i < question.length; i++) {
      if (i % 2 === 0){
          question[i][0].split(' ').forEach((word) => {
              p += 1;
              arr.push(
                  <Text key={question.length + p} style={styles.qsText}>{word} </Text>
              )
          })
      }
      else {
        arr.push(
          <Text key={i} style={styles.answerText}>{question[i][0] + question[i][1]} </Text>
        )
      }
    }
    return (
      <View style={[styles.question, {marginTop: '5%'}]}>
      {arr}
      </View>
    )
  }

  const Continuebutton = () => {
    function checkAnswer() {
      totalLen.current += len.current;
      len.current = 0;
      if (currentQustionIndex < quiz.questions.length - 1) {
        setState(1)
      }
      else {
        setState(2)
      }
    }

    function endQuestion() {

      inputRefs.current = [];
      currentLetters.current = [];

      setState(0)
      setCurrentQuestionIndex(currentQustionIndex + 1)

    }

    function endQuiz() {
      // Called when all questions are answered
      var decimalScore = score.current / totalLen.current
      var pass = false;
      if (decimalScore > passThreshold) {
        pass = true;
      }
      navigation.navigate("QuizEndPage", {course: course, difficulty: difficulty, quiz: quiz, pass: pass, results: decimalScore})
    }


    var cText = 'Check Answer';
    switch(gameState) {
      case 0:
        return (
          <TouchableOpacity style={styles.continue} onPress={() => checkAnswer()}>
              <Text style={styles.continueText}>{cText}</Text>
          </TouchableOpacity>
        )
      case 1:
        cText = 'Continue'
        return (
          <TouchableOpacity style={styles.continue} onPress={() => endQuestion()}>
              <Text style={styles.continueText}>{cText}</Text>
          </TouchableOpacity>
        )
      case 2:
        cText = 'Finish Quiz'
        return (
          <TouchableOpacity style={styles.continue} onPress={() => endQuiz()}>
              <Text style={styles.continueText}>{cText}</Text>
          </TouchableOpacity>
        )
    }
  }
  var m = (<View/>)
  if (gameState === 1 || gameState === 2){
    m = (<CorrectAnswer question={quiz.questions[currentQustionIndex]}/>)
  }

  // The quiz page
  return (
    <SafeAreaView style={[styles.bgColor, style]}>
      {/* Question */}
      <View style={styles.top}>
        <ScrollView style={styles.container}>
            <View style={styles.scrollContent}>
            <Text style={styles.headText}>Type the missing letters to complete the paragraph below!</Text>
        
            <View flex={1} width={'90%'} flexDirection={'column'}>
                <GenQuestion question={quiz.questions[currentQustionIndex]}/>          
                {m}
            </View>

            </View>
          </ScrollView>
        <Continuebutton/>
      </View>

    </SafeAreaView>
  );
};

export default TypingQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
},
scrollContent: {
    flex: 1,
    marginTop: '1%',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
},
  bgColor: {
    backgroundColor: '#0095ab',
    flex: 1,
    width: '100%',
  },
  question: {
    width: '100%',
    paddingHorizontal: '1%',
    paddingVertical: '5%',
    backgroundColor: '#00cbe9',
    borderRadius: 10,
    elevation: 2,
    alignContent: 'space-between',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  answerText: {
    fontSize: 15,
    backgroundColor: '#ffac07',
    padding: '15',
    borderRadius: 3,
    textAlign: 'center',
    marginTop: '3%',
  },
  addWord: {
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 7
  },
  LetterEntry: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    height: 25,
    width: 20,
    marginHorizontal: 0.5,
    elevation: 3,
  },
  entry: {
    fontSize: 15,
    textAlign: 'center'
  },
  qsText: {
    fontSize: 15,
    marginTop: '3%',
  },
  top: {
    flex: 1,
    alignItems: 'center',
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: '5%'
  },
  continue: {
    width: '90%',
    height: '8%',
    backgroundColor: '#0EF0A4',
    borderRadius: 10,
    elevation: 3,
    marginVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center',
},
continueText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
},
});