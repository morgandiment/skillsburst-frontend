import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text,  View, ScrollView, Dimensions} from 'react-native';
import {Header, Navbar, ChapterBox} from '../../components/Index.js';

import { UserContext } from '../../userContext.js'

const windowHeight = Dimensions.get('window').height * 0.85;
const windowWidth = Dimensions.get('window').width;

const CoursePreviewPage = ({style, route, navigation}) => {
    const {course} = route.params;
    const data = useContext(UserContext);

    const name = course.name;
    const description = course.description;
    const gameSelection = [];
    const difficulties = course.difficulties;

    var difficultyViews = []
    var i = 0;
    for (const difficulty of difficulties){
        difficultyViews.push(
            <ChapterBox key={i} name={difficulty} completion={data.progress[name].difficulties[difficulty].quizzes_passed} num_of_quizzes={data.progress[name].difficulties[difficulty].num_of_quizzes} onPressStart={() => navigation.navigate('LevelSelectPage', {course : course, difficulty: difficulty})} style={{marginBottom: '6%'}}/>
        );
        i++;
    }

    // Add how to play screen here or on category select page

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>
            <ScrollView style={CourseStyle.container}>
                <View style={CourseStyle.scrollContent}>
                    {/* Course Overview */}
                    <View>
                        <Text style={CourseStyle.heading}>{name}</Text>
                        <Text style={CourseStyle.description}>{description}</Text>
                    </View>

                    {/* Display avaliable games*/}
                    <View style={{height: windowHeight/4, width: windowWidth, alignSelf: 'center', marginVertical: '1%'}}>
                        <ScrollView horizontal={true}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 
                                <View style={{height: '90%', width: windowWidth*.6, backgroundColor: 'blue', marginHorizontal: windowWidth/20, borderRadius: 25,}}></View>
                                <View style={{height: '90%', width: windowWidth*.6, backgroundColor: 'blue',  marginHorizontal: windowWidth/20, borderRadius: 25,}}></View>
                                <View style={{height: '90%', width: windowWidth*.6, backgroundColor: 'blue',  marginHorizontal: windowWidth/20, borderRadius: 25,}}></View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Display chapters */}
                    <View style={CourseStyle.chapterContainer}>
                        <Text style={CourseStyle.subHeading}>Chapters</Text>
                        <Text marginBottom={'6%'}>Fully complete a chapter for a special acheivement!</Text>
                        {difficultyViews}
                    </View>

                </View>
            </ScrollView>
            <Navbar navigation={navigation}/>
        </View>
    );
}

export default CoursePreviewPage;

const CourseStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    scrollContent: {
        flex: 1,
        width: '85%',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: '3%'
    },
    subHeading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '3%'
    },
    chapterContainer: {
        flex: 1,
    },
    description: {
    },
});

const iosSupport = StyleSheet.create({
    iosElavation: {
        shadowColor: '#171717', 
        shadowOffset: {width: -2, height: 4}, 
        shadowOpacity: 0.2, 
        shadowRadius: 3
    },
});


