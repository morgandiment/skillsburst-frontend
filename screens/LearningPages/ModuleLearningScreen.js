import { StyleSheet, Text,  View, ScrollView, Dimensions,TouchableOpacity} from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import {Header, Navbar , ScrollBox} from '../../components/Index.js';

import images from '../../images/Index.js';

const ModuleBoxes = ({modules, navidata,  navigation}) => {
    const qArr = [];
    var i = 0;
    modules.forEach(module => {
        content = module.default[0];
        qArr.push(
          <ScrollBox 
          key={i}
          content={content}
          navidata = {navidata}
          navigation={navigation}
          />
        )
        i++;
      });
    
    return qArr 
}

function ModuleLearningScreen({ navigation ,route}) {
    const { modules} = route.params.content;
    return ( 
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>
            <TouchableOpacity onPress={() =>navigation.navigate("MainLearningScreen")} style={styles.backButton}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
            <Text style={styles.headText}>Modules:</Text>
            <ScrollView style={styles.container}>
                <View style={styles.scrollContent}>
                    <Text style={styles.headText}></Text>
                    <ModuleBoxes modules= {modules} navidata = {route.params}navigation={navigation}/>
                </View>
            </ScrollView>
            <Navbar navigation={navigation}/>
        </View>);

}


export default ModuleLearningScreen;

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: '#056b7a',
        padding:10,
        margin:10,
        borderRadius: 10,
        width: '20%',
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
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
    }
});