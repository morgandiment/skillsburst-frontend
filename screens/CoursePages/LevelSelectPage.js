import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Text } from 'react-native';
import {Image} from "expo-image";
import {Header, Navbar, Ribbon, Padlock, AnimatedPercentageCircle} from '../../components/Index.js';

import Images from '../../images/Index.js';

const windowWidth = Dimensions.get('window').width;

// A generative version on the animated category select page

const LevelSelectPage = ({route, navigation}) => {

  var { units } = route.params;
  if (units === null) {
    return;
  }
  var units = units.default;

  var w = windowWidth / 7;

  // Component that returns an array of all questions as precentage circles for a given unit
  const Quizzes = ({qs}) => {
    const n = qs.length;
    const qArr = [];

    qs.map((level, index) => {
      qArr.push(
        <AnimatedPercentageCircle 
        key={index} 
         w={w/5}
        r={w/1.2} 
        text={level.name} 
        percentage={0} 
        active={true}
        img={level.image}
        onPress={() => navigation.navigate('QuizPage', {quiz: level.questions[0] })}
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

            <Padlock w={w*3.5} locked={false} t={"Checkpoint " + (index + 1)}/>
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
