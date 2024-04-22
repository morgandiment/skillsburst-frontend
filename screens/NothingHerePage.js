import { Image, View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useRef, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUserData, loadUserProgress } from "../API/database_connection.js";
import { Header, Navbar } from '../components/Index.js';

import { UserContext } from '../userContext.js'

function LoadingScreen({ navigation }) {
    const userData = useContext(UserContext);

    return ( 
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>

            <View style={styles.container}>

                <Image source={require('../images/skillsburst_banner_logo.png')} style={styles.image} />
                <Text style={{fontSize:20, fontWeight: 'bold',}}>Oops, theres nothing here</Text>

            </View>
            
            <Navbar navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#056371",
        alignItems:"center"
    },

    image: {
        width: "100%",
        height: "50%",
    },
});


export default LoadingScreen;
