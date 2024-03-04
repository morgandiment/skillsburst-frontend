import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Dimensions, ScrollView} from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'; 

import CountdownCricle from '../components/CountdownCricle';
import QuestionProgressBar from '../components/QuestionProgressBar'; // broken :,
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width : Dimensions.get('window').width;// * PixelRatio.get();

var timer = () => {};

const Lesson = ({
  navigation,
  style,
  partCount,
  parts,
  format,
}) => {
  //const transition = useSharedValue(0); // Width and height of the transition animated view - displays x or tick

  const currentIndex = useRef(0); // Index of the current question within questions array
  const totalTime = useRef(0); // Total time for all questions
  
  const [currentPart, setCurrentPart] = useState(() => {
    const initialState = parts[currentIndex.current];
    return initialState;
  });

  // The main quiz timer, used for counting total time
  const startTimer = () => {
    timer = setInterval(() => {
      totalTime.current = (totalTime.current + 0.1);
    }, 100)
 }

  useEffect(() => {
      startTimer();
      return () => clearInterval(timer);
  });    

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

  const Continuebutton = () => {
    if (currentPart.type == 'l') {
      var cText = 'Continue';
      if (currentIndex.current == partCount - 1) {
        cText = 'Finish';
      }
    }
      return (
        <TouchableOpacity style={styles.continue} onPress={() => continueQuiz()}>
            <Text style={styles.continueText}>{cText}</Text>
        </TouchableOpacity>
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

  
  // The quiz page
  return (
    <SafeAreaView style={[styles.bgColor, style]}>
      <View style={styles.top}>

        <QuestionProgressBar style={styles.progressBar} current={currentIndex.current} total={partCount} w={windowWidth*0.9}/>
        <Text style={styles.titleText}>{currentPart.page_title}</Text>

        <ScrollView style={{width: '100%'}}>
            <View style={{alignItems: 'center', width: '100%'}}> 
                <PageContent/>
            </View>
        </ScrollView>

      </View>

      <Continuebutton/>

    </SafeAreaView>
  );
};

export default Lesson;

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
    borderRadius: 15,
    elevation: 5,
    padding: '5%',
    marginVertical: '3%',
  },
  contentText: {

  },
  top: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    marginVertical: '3%',
  },
  titleText: {
    fontSize: 30,
    marginVertical: '3%',
    alignSelf: 'center',
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