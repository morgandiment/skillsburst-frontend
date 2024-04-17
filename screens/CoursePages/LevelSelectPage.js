import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Text } from 'react-native';
import {Header, Navbar, Ribbon, Padlock, AnimatedPercentageCircle, ChapterBox} from '../../components/Index.js';
import {Image} from "expo-image";

import Images from '../../images/Index.js';

import { UserContext } from '../../userContext.js'

const windowWidth = Dimensions.get('window').width;

// A generative version of the animated category select page

const LevelSelectPage = ({route, navigation}) => {

  var { course, difficulty } = route.params;
  var quizzes = course.quizzes[difficulty];

  console.log(quizzes)

  var w = windowWidth / 7;

  const data = useContext(UserContext);
  React.useMemo(() => {
      const updateUnit = () => {
        for (const unit of units){
          //take copy of progress
          const progressCopy = data.progress

          //add new value to copy
          if (typeof progressCopy[courseName].chapters[chapterName].units[unit.name] === "undefined"){
            progressCopy[courseName].chapters[chapterName].units[unit.name] = {
              unlocked : false,
              complete : false,
              lessons : { },
            };
          };

          for (const quiz of unit.quizzes){
            if (typeof progressCopy[courseName].chapters[chapterName].units[unit.name].lessons[quiz.name] === "undefined"){
              progressCopy[courseName].chapters[chapterName].units[unit.name].lessons[quiz.name] = {
                passed : false,
                percentage : 0,
                time : 0,
                maxStreak: 0,
                score: 0,
            }
            };
          }

          data.updateProgress(progressCopy);
        }
      }

      //updateUnit();
  }, []);

  // Component that returns an array of all questions as precentage circles for a given unit
  const Quizzes = (quizzes) => {
    const n = quizzes.quizzes.length;
    const qArr = [];

    var i = 0;

    for (const quiz of quizzes.quizzes){
      qArr.push(
        <AnimatedPercentageCircle 
          key={i} 
          w={w/5}
          r={w/1.2} 
          text={quiz.name} 
          percentage={0} 
          active={true}
          img={Images?.[quiz.icon]}
          onPress={() => navigation.navigate('QuizPage', {quiz: quiz, course : course, difficulty : difficulty})}
        />
      )
      i++;
    };

    const formated = [];
    var i = 0;
    if (n % 2 !== 0) {
      formated.push(qArr[i])
      i++;
    }

    for (i; i < n; i += 2) {
      formated.push(
        <View key={i} style={{flexDirection: "row", marginTop: w/5}}>
            {qArr[i]}
            <View width={w/1.5}></View>
            {qArr[i+1]}
        </View>
      )
    }

    return (<View>{formated}</View>)
  }

  // Component that iterates through every unit within the current chapter and returns them as an array
  // Need to fix the padlock styling
  // const Units = () => {
  //   var us = [];
  //   quizzes.map((quiz, index) => {
  //       us.push(
  //         <View key={index} style={styles.unitContainer}>
  //           <Ribbon t={quiz.name}/>
            
  //           <Quizzes qs={quiz.questions}/>

  //           <Padlock w={w*3.5} locked={true} t={"Checkpoint " + (index + 1)}/>
  //           <View style={{marginBottom: '4%'}}/>
  //         </View>
  //       )
  //   });

  //   return <View>{us}</View>
  // }
    
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation}/>

      <View style={styles.container}>

        <TouchableOpacity style= {{alignSelf: "flex-start", position: "absolute", top: 0, zIndex: 2}} onPress={() => navigation.goBack()}>
          <Image style={{aspectRatio: 1, width: 50}} source={Images.icons.back_arrow}/>
        </TouchableOpacity>

          
        <ScrollView width={"100%"} showsVerticalScrollIndicator={false}>
          <View style={[styles.container, {marginVertical: w/8}]}>
            

            <View key={0} style={styles.unitContainer}>
              <Ribbon t={difficulty}/>
              
                <Quizzes quizzes={quizzes}/>

              <Padlock w={w*3.5} locked={true} t={"Checkpoint : xyz"}/>
              <View style={{marginBottom: '4%'}}/>
            </View>


          </View>
          <View marginVertical={'30%'}/>
        </ScrollView>

      </View>
      <Navbar navigation={navigation}/>
    </View>
    
  );
}

export default LevelSelectPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  unitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
