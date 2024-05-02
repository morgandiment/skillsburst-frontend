import { StyleSheet, Text,  View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import {Header, Navbar , ScrollBox} from '../../components/Index.js';
import images from '../../images/Index.js';

import adventures from '../../courses/lessonbuilder.js';
const LearningBoxes = ({ navigation}) => {
    const qArr = [];
    var i = 0;
    
    adventures.forEach(adventure => {
        qArr.push(
          <ScrollBox 
          key={i}
          content={adventure}
          navigation={navigation}
          navidata={null}
          />
        )
        i++;
      });
    
    return qArr 
}

function MainLearningScreen({ navigation }) {
    return ( 
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>
            <TouchableOpacity onPress={() =>navigation.navigate("HomePage")} style={styles.backButton}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
            <Text style={styles.headText}>Branches of knowledge</Text>
            <ScrollView style={styles.container}>
                <View style={styles.scrollContent}>
                    <Text style={styles.headText}></Text>
                    <LearningBoxes navigation={navigation}/>
                </View>
            </ScrollView>
            <Navbar navigation={navigation}/>
        </View>);

}


export default MainLearningScreen;

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: '#056b7a',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '20%',
        justifyContent: 'center', // Align items vertically center
        alignItems: 'center', // Align items horizontally center
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', // Center text horizontally
    },
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
    headText: {
        alignSelf: 'center',
        marginVertical: '3%',
        fontSize: 25,
        color: '#056b7a',
        fontWeight: 'bold',
        textAlign: 'center', // Center text horizontally
    }
});