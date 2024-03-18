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

  var { units, courseName, chapterName} = route.params;
  if (units === null) {
    return;
  }
  var units = units.default;

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

      updateUnit();
  }, []);

  // Component that returns an array of all questions as precentage circles for a given unit
  var unitIndex = -1;
  const Quizzes = ({qs}) => {
    const n = qs.length;
    const qArr = [];
    
    qs.map((level, index) => {
      if (index == 0){
        unitIndex += 1
      }
      console.log(units[unitIndex].name)
      qArr.push(
        <AnimatedPercentageCircle 
        key={index} 
        w={w/5}
        r={w/1.2} 
        text={level.name} 
        percentage={data.progress[courseName].chapters[chapterName].units[units[unitIndex].name].lessons[level.name].percentage} 
        active={true}
        img={level.image}
        onPress={() => navigation.navigate('QuizPage', {quiz: level.questions[0], courseName: courseName, chapterName: chapterName, unitName: units[unitIndex].name })}
        />
      )
    });

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
  const Units = () => {
    var us = [];
    units.map((unit, index) => {
        us.push(
        <View key={index} style={styles.unitContainer}>
            <Ribbon t={unit.name}/>
            
            <Quizzes qs={unit.quizzes}/>

            <Padlock w={w*3.5} locked={true} t={"Checkpoint " + (index + 1)}/>
            <View style={{marginBottom: '4%'}}/>
        </View>)
    });

    return <View>{us}</View>
  }
    
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation}/>

      <View style={styles.container}>

        <TouchableOpacity style= {{alignSelf: "flex-start", position: "absolute", top: 0, zIndex: 2}} onPress={() => navigation.goBack()}>
          <Image style={{aspectRatio: 1, width: 50}} source={Images.icons.back_arrow}/>
        </TouchableOpacity>

          
        <ScrollView width={"100%"} showsVerticalScrollIndicator={false}>
          <View style={[styles.container, {marginVertical: w/8}]}>
            <Units/>
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
