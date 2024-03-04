import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Dimensions, ScrollView} from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'; 

import QuestionProgressBar from '../components/QuestionProgressBar'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width : Dimensions.get('window').width// * PixelRatio.get();

var timer = () => {};

const LessonQuiz = ({
  navigation,
  style,
  type,
  partCount,
  parts,
  format,
}) => {
  //const transition = useSharedValue(0); // Width and height of the transition animated view - displays x or tick

  const currentIndex = useRef(0); // Index of the current question within questions array
  const totalTime = useRef(0); // Total time for all questions
  const selected = useRef(); // Index of the currently selected answer
  const [correctSelection, setCorrectSelection] = useState(null); // Boolean containing whether the current question was correctly answered or not
  const [currentPart, setCurrentPart] = useState(() => {
    const initialState = parts[currentIndex.current];
    return initialState;
  });

  // The main quiz timer, used for counting per question time and total time - seperate clock from visual countdown
  const startTimer = () => {
    timer = setInterval(() => {
      totalTime.current = (totalTime.current + 0.1);
    }, 100)
 }

  useEffect(() => {
      startTimer();
      return () => clearInterval(timer);
  });    

  function checkAnswer(selectedIndex, correctIndex) {
    currentIndex.current = currentIndex.current + 1;

    if (selectedIndex === correctIndex){
      // correct
      selected.current.push(selectedIndex);
    }
    else {
      // incorrect
      streak.current[0] = 0;
      selected.current.push(selectedIndex);
    }

    // If we have reached partCount, then no more questions remain
    if (currentIndex.current < partCount){
      setCurrentPart(parts[currentIndex.current]);
    }
    else
    {
      clearTimeout(timer);
      navigation.navigate('HomePage');
    }
  }

  function continueQuiz() {
    currentIndex.current = currentIndex.current + 1;
    if (currentIndex.current < partCount){
      setCurrentPart(parts[currentIndex.current]);
    }
    else
    {
      navigation.navigate('QuizEndPage', { format: format, pass: true, results: null });
    }
  }

  const LongAnswerButton = ({ text, thisIndex, currentSelectedIndex, onPress}) => {
    var borderC = '#999999';
    var bgC = 'white';

    switch (null) {
      case true:
        borderC = 'green';
        bgC = 'green';
        break;
      case false:
        borderC = 'red';
        bgC = 'red';
        break;
    }

    if (currentSelectedIndex == thisIndex) {
      var borderC = '#007180';
      var bgC = '#e6fcff';
    }

    return (
      <TouchableOpacity onPress={onPress} style={[styles.answerButton, {backgroundColor: bgC, borderColor: borderC}]}>
          <Text style={[styles.answerText, {marginHorizontal: '5%'}]}>{text}</Text>
      </TouchableOpacity> 
    );
  }

  const AnswerSelection = () => {
    const [selected, setSelected] = useState(-1);

    function updateSelected(newIndex) {
      if (newIndex === selected) {
        setSelected(-1);
      } else {
        setSelected(newIndex);
      }
    }

    return (
      <View style={{width: '100%'}}>
        {
          currentPart.answers.map((answer, index) => {
            return (<LongAnswerButton key={index} text={answer} thisIndex={index} currentSelectedIndex={selected} onPress={() => updateSelected(index)}/>)
          })
        }     
      </View>
    )
  }

  const PageContent = () => {
    var pc = [];
    currentPart.page_content.map((content, index) => {
      pc.push(
          <View key={index} style={styles.textContainer}>
              <Text style={styles.contentText}>{content}</Text>
          </View>   
      )
    })
    return pc;
  }

  const Continuebutton = () => {
    var cText = 'Continue';
    if (currentPart.type == 'l') {
      if (currentIndex.current == partCount - 1) {
        cText = 'Finish';
      }
    } 
    else if (currentPart.type == 'q') {
      cText = 'Check Answer';
    }
      return (
        <TouchableOpacity style={styles.continue} onPress={() => continueQuiz()}>
            <Text style={styles.continueText}>{cText}</Text>
        </TouchableOpacity>
      )
  }

  // Select and return correct question format
  const QuestionContent = () => {
    switch (currentPart.type) {
      case 'q':
        return <AnswerSelection/>
      default:
        return;
    }
  }


  // The quiz page
  return (
    <SafeAreaView style={[styles.bgColor, style]}>
      <View style={styles.top}>

        <QuestionProgressBar style={styles.progressBar} current={currentIndex.current} total={partCount} w={windowWidth*0.9}/>
        <Text style={styles.titleText}>{currentPart.page_title}</Text>
        <ScrollView style={{width: '100%'}}>
          <View style={{alignItems: 'center', width: '100%'}}> 
              <PageContent/>
              <QuestionContent/>
          </View>
        </ScrollView>

      </View>

      {/* Answer area - auto sizes based on longform/answer_count*/}
      <Continuebutton/>

    </SafeAreaView>
  );
};

export default LessonQuiz;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#0095ab',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 25,
    elevation: 2,
    padding: '5%',
    marginVertical: '3%',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    marginVertical: '1.5%',
  },
  titleText: {
    fontSize: 30,
    marginVertical: '1.5%',
    alignSelf: 'center',
  },
  innerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  answerButton: {
    width: '85%',
    flex: 1,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: '2.5%',
    borderWidth: 3,
  },
  answerText: {
    color: 'black',
    margin: '3%',
    fontSize: 18,
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