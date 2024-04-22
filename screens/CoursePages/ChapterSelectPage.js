import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text,  View, ScrollView, Dimensions} from 'react-native';
import {Header, Navbar, ChapterBox, AnimatedPercentageCircleText} from '../../components/Index.js';

import { UserContext } from '../../userContext.js'
import {saveUserProgress} from "../../API/database_connection.js";

const windowWidth = Dimensions.get('window').width;

const ChapterSelectPage = ({style, route, navigation}) => {
    const {course} = route.params;

    const name = course.name
    const difficulties = course.difficulties;

    const data = useContext(UserContext);

    const initProgress = () => {
        if (typeof data.progress[name] === "undefined"){
            //take copy of progress
            const progressCopy = data.progress

            progressCopy[name] = {
                percentage : 0,
                difficulties : {}
            }
            
            for (const difficulty of difficulties){
                progressCopy[name].difficulties[difficulty] = {
                    percentage : 0,
                    quizzes_passed : 0,
                    num_of_quizzes : course.quizzes[difficulty].length,
                    quizzes : {}
                }
            }

            //overwrite old progress with updated
            data.updateProgress(progressCopy);
        } else {
            const progressCopy = data.progress

            for (const difficulty of difficulties){
                if (data.progress[name].difficulties[difficulty] === undefined){
                    progressCopy[name].difficulties[difficulty] = {
                        percentage : 0,
                        quizzes_passed : 0,
                        num_of_quizzes : course.quizzes[difficulty].length,
                        quizzes : {}
                    }
                }
            }
            data.updateProgress(progressCopy);
        }
    };

    const updateCompletionPercentage = () => {
        var totalQuizzesPassed = 0;
        var totalQuizzes = 0;
        for (const difficulty of difficulties){
            totalQuizzesPassed += data.progress[name].difficulties[difficulty].quizzes_passed;
            totalQuizzes += data.progress[name].difficulties[difficulty].num_of_quizzes;
        }
        const progressCopy = data.progress
        progressCopy[name].percentage = Math.round((totalQuizzesPassed / totalQuizzes) * 100) / 100
        data.updateProgress(progressCopy)
    }

    const updateCompletedQuizzes = () => {
        const progressCopy = data.progress
        for (const difficulty of difficulties){
            completedCount = 0;

            //convert json object to array
            const quizArr = []
            for(var i in data.progress[name].difficulties[difficulty]?.quizzes){
                quizArr.push(data.progress[name].difficulties[difficulty]?.quizzes[i]);
            }
                
            for (const quiz of quizArr){
                if (quiz.best_try.passed){
                    completedCount ++;
                }
                progressCopy[name].difficulties[difficulty].quizzes_passed = completedCount;
            }
        }     
        data.updateProgress(progressCopy)
    };

    //React.useEffect(() => {
        initProgress();
        updateCompletedQuizzes();
        updateCompletionPercentage();
        saveUserProgress(data.id, data.progress);
    //})
    

    // Switch to embedded map
    var difficultyViews = []
    var i = 0;
    for (const difficulty of difficulties) {
        difficultyViews.push(
            <ChapterBox
                completion={data.progress?.[name].difficulties[difficulty].quizzes_passed}
                num_of_quizzes={data.progress?.[name].difficulties[difficulty].num_of_quizzes}
                key={i} 
                name={difficulty}
                active={true}
                onPressStart={() => navigation.navigate('LevelSelectPage', {course : course, difficulty: difficulty})} 
                style={{marginBottom: '6%'}}
            />
        );
        i++;
    };

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>
            <ScrollView style={CourseStyle.container}>
                <View style={CourseStyle.scrollContent}>

                    <Text style={CourseStyle.heading}>{name}</Text>
                    <AnimatedPercentageCircleText onPress={() => {navigation.navigate('CoursePreviewPage', {course: course})}} active={true} percentage={data.progress[name].percentage} w={windowWidth / 30} r={windowWidth / 7} />

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
export default ChapterSelectPage;

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
        marginVertical: '3%',
        alignSelf: 'center',
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


