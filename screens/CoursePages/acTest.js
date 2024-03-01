import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import { useState, useEffect } from 'react';
import {Header, Navbar, Ribbon, Padlock, AnimatedPercentageCircle} from '../../components/Index.js';

import Images from '../../images/Index.js';
const windowWidth = Dimensions.get('window').width;

// A generative version on the animated category select page

const CategoryPage = ({route, navigation}) => {

  var { units } = route.params;
  if (units === null) {
    return;
  }
  var units = units.default;

  var w = windowWidth / 7;

  const Quizzes = ({qs}) => {
    const n = qs.length;
    const qArr = [];
    var i = 0;
    if (n % 2 !== 0) {
      qArr.push(
        <AnimatedPercentageCircle key={i} onPress={() => navigation.navigate('HomePage')} w={w/5} r={w/1.2} text={qs[i].name} percentage={1} active={true} img={Images.icons.plus_icon}/>
      )
      i++;
    }

    for (i; i < n; i += 2) {
      qArr.push(
        <View key={i} style={{flexDirection: "row", marginTop: w/5}}>
            <AnimatedPercentageCircle w={w/5} r={w/1.2} text={qs[i].name} percentage={1} active={true} img={Images.icons.plus_icon}/>
            <View width={w/1.5}></View>
            <AnimatedPercentageCircle w={w/5} r={w/1.2} text={qs[i+1].name} active={true} percentage={1} img={Images.icons.minus_icon}/>
        </View>
      )
    }

    return (<View>{qArr}</View>)
  }

  const Units = () => {
    var us = [];
    units.map((unit, index) => {
        us.push(
        <View key={index} style={styles.unitContainer}>
            <Ribbon t={unit.name}/>
            
            <Quizzes qs={unit.quizzes}/>

            <Padlock w={w*3.5} locked={false} t={"Checkpoint " + (index + 1)}/>
        </View>)
    });

    return <View>{us}</View>
  }
    
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation}/>
      <View style={styles.container}>
          
        <ScrollView width={"100%"} showsVerticalScrollIndicator={false}>
          <View style={[styles.container, {marginVertical: w/8}]}>
            <Units/>

          </View>
        </ScrollView>

      </View>
      <Navbar/>
    </View>
    
  );
}

export default CategoryPage;

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
