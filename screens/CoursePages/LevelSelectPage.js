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

  var w = windowWidth / 7;

  const data = useContext(UserContext);
  React.useMemo(() => {
      const initQuizzes = () => {
        const progressCopy = data.progress

        //add new value to copy
        var i = 0;
        for (const quiz of quizzes){
          if (typeof progressCopy[course.name].difficulties[difficulty].quizzes[quiz.name] === "undefined"){
            progressCopy[course.name].difficulties[difficulty].quizzes[quiz.name] = {
              locked : true,
              unlock_requirement : i,

              last_try : {
                passed : false,
                percentage : 0,
                time : 0,
                maxStreak: 0,
                score: 0,
              },
              
              best_try : {
                passed : false,
                percentage : 0,
                time : Number.MAX_SAFE_INTEGER,
                maxStreak: 0,
                score: 0,
              }
            }
          }
          i++;
        }
        data.updateProgress(progressCopy);
      }

      const updateQuizzes = () => {
        const progressCopy = data.progress

        //add new value to copy
        for (const quiz of quizzes){
          progressCopy[course.name].difficulties[difficulty].quizzes[quiz.name].locked = !(progressCopy[course.name].difficulties[difficulty].quizzes[quiz.name].unlock_requirement <= progressCopy[course.name].difficulties[difficulty].quizzes_passed)
        }
        data.updateProgress(progressCopy);
      }
      
      initQuizzes();
      updateQuizzes();
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
          percentage={data.progress[course.name].difficulties[difficulty].quizzes[quiz.name].best_try.percentage} 
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
      formated.push(
        <View key={i} style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: w/5}}>
          {qArr[i]}
        </View>
      )
      i++;
    }

    for (i; i < n; i += 2) {
      formated.push(
        <View key={i} style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: w/5}}>
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

        <TouchableOpacity style= {{alignSelf: "flex-start", position: "absolute", top: 0, zIndex: 2}} onPress={() => navigation.navigate('ChapterSelectPage', { course: course })}>
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
    flex: 1,
    width:"100%",
    alignItems: 'center',
  }
});
