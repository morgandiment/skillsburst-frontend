import { Image, View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useRef, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUserData, loadUserProgress,getOpportunityData } from "../../API/database_connection.js";

import { UserContext } from '../../userContext.js'

function LoadingScreen({ navigation }) {
    const userData = useContext(UserContext);

    React.useEffect(() => {
        checkToken = async () => {
            AsyncStorage.getItem("token").then((value) => {
                if (value !== null) {
                    getUserData(value).then((response) => {
                        userData.updateUsername(response.Username)
                        userData.updateId(response.UserID)
                        userData.updateFinishedIntro(response.finished_intro)
                        userData.updateProgress({})
                      
                        loadUserProgress(response.UserID).then((userProgress) => {
                            userData.updateProgress(userProgress);

                            if (response.finished_intro){
                                navigation.navigate("HomePage");
                            } else {
                                navigation.navigate('OnboardingMainScreen'); 
                            }
                            
                        });
                        
    
                    })
                } else {
                    navigation.navigate("SignupPage");
                }
            });      
        };
    
        checkToken();
    }, [])
    

    return ( 
        <View style={styles.container}>
            <Image source={require('../../images/skillsburst_banner_logo5.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#056371",
        justifyContent: "center"
    },

    image: {
        width: "100%",
        height: "50%",
        top: -50
    },
});


export default LoadingScreen;
