import React, {useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native';
import {Header, Navbar, AnimatedPercentageCircle, AnimatedProgressBar} from '../../components/Index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from "expo-image";

import Images from '../../images/Index.js';
import Courses from '../../courses/index.js';

import { UserContext } from '../../userContext.js'
import { getCourseData, saveUserProgress } from "../../API/database_connection.js";

import course from '../../courses/problemSolving.js';
import { set } from 'react-hook-form';

const windowWidth = Dimensions.get('window').width * 0.9;
const windowHeight = Dimensions.get('window').height * 0.85;

const HomePage = ({style, navigation}) => {

    const data = useContext(UserContext);
    //console.log(JSON.stringify(data))
    
    // Entries on the current courses box, each one links to a course page
    const CourseView = ({
        img =  Images.icons.dice_icon,
        name = 'No name', 
        percentage = 0,
        onPress = () => {},
    }) => {
        return (
            // cant use percentage height because of variable scrollview height
            <TouchableOpacity onPress={onPress} style={[styles.course, styles.iosShadow, {height: windowHeight*.5*.15}]}> 
                <Image style={{ flex: 1, resizeMode: 'contain', height: '80%'}} source={img}/>
                <Text style={[{flex: 1.2}]}>{name}</Text>
                <View flex={3}>
                    <AnimatedProgressBar w={windowWidth*0.8*(3/5)} percentage={percentage}/>
                </View>
            </TouchableOpacity>
        );
    }

    const initCourses = () => {
        var progressCopy = data.progress

        for(const course of Courses){
            if (typeof progressCopy[course.name] === "undefined"){
                progressCopy[course.name] = {
                    percentage : 0,
                    
                    difficulties : {}
                }
            }
        }
        data.updateProgress(progressCopy)
    }

    initCourses()
    //saveUserProgress(data.id, data.progress);

    var currentCourses = [];
    var i = 0;
    for (const course of Courses) {
        currentCourses.push(
            <CourseView key={i} name={course.name} percentage={data?.progress?.[course.name]?.percentage} img={course.icon} onPress={() => {getCourseData(course.name).then((courseData) => navigation.navigate('ChapterSelectPage', { course: courseData }))}} />
        );

        i++;
    }
    

    const streak = [1, 2, 3, 4, 5, 6, 7];

    // Function to determine the color of the number boxes based on streak
    const getNumberBoxColor = (index) => {
      // Determine the color based on the index
      const completedDays = data.daily_streak; // Number of completed days (for example)
      return index < completedDays ? '#00fda2' : '#ffffff'; // Green for completed days, white for remaining days
    };

    const navLevelSelectPage = (courseName, difficulty) => {
        getCourseData(courseName).then((courseData) => {
            navigation.navigate('LevelSelectPage', {course : courseData, difficulty: difficulty});
        });
    }

    

    return (
            <View style={{flex: 1}}>
                <Header navigation={navigation}/>
                
                <View style={[styles.container, style]}>

                    <View>
                        <Text style={styles.welcomeText}>Welcome {data.username}</Text>
                    </View>

                    {/* Continue Current Course*/}
                    
                    <View style={[styles.continueContainer, styles.iosShadow]} >

                        {typeof data.progress.last_lesson?.course === "undefined" &&
                        <View style={{flex: 1, flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
                            <View style={{ minHeight: "75%", width: "90%", padding: 5, alignItems: 'center', justifyContent:"center", borderRadius: 20, backgroundColor: '#01778a' }}>
                                <Text style={[styles.whiteText, { fontSize: 13, textAlign:"center" }]}>{"Get started and play your first quiz below!"}</Text>
                            </View>
                        </View>
                        }
                        {typeof data.progress.last_lesson?.course !== "undefined" &&
                        <View style={{flex:1, flexDirection:"row", justifyContent:"space-evenly"}}>
                            {/* Needs a number instead of percentage for sizing due to svg*/}
                            <AnimatedPercentageCircle style={{}} active={true} imgARatio={0.5} percentage={data?.progress?.[data.progress.last_lesson.course]?.percentage} w={windowWidth / 30} r={windowWidth / 7} img={Images.other.play} barEmptyColor={'#056b7a'} onPress={() => navLevelSelectPage(data.progress.last_lesson.course, data.progress.last_lesson.difficulty)}/>
                            
                            <View style={{ minHeight: "75%", width: "50%", padding: 5, alignItems: 'center',  borderRadius: 20, backgroundColor: '#01778a' }}>
                                <Text style={[styles.whiteText, { fontSize: 12, textAlign:"center" }]}>{"Where you left off"}:</Text>
                                <View style={{height:15}}/>
                                <Text style={[styles.whiteText, { fontSize: 15, textAlign:"center" }]}>{data.progress.last_lesson.course}</Text>
                                <Text style={[styles.whiteText, { fontSize: 14, textAlign:"center" }]}>{data.progress.last_lesson.difficulty}</Text>
                            </View>
                        </View>
                        }
                        
                    </View>

                    {/* View Current Courses*/}
                    <View style={[styles.courseSelectionContainer, styles.iosShadow]}>
                        <Text style={[styles.courseHeaderText, styles.whiteText]} >My Courses:</Text>
                        
                        <ScrollView width={'100%'}>
                            <View alignItems={'center'}>
                                {currentCourses}
                            </View>
                        </ScrollView>

                        {/* <TouchableOpacity style={styles.courseButton} onPress={() => {navigation.navigate('CourseSelectPage')}}>
                            <Text style={[styles.courseHeaderText, {padding: '2%'}]}> Add/Remove Courses</Text>
                        </TouchableOpacity> */}
                    </View>

                    {/* Current Streak */}
                    <View style={[styles.streakContainer, styles.iosShadow]}>
                        {/* Title */}
                        <Text style={styles.streakTitle}>Daily Streak:</Text>

                        {/* Information text */}
                        <Text style={styles.infoText}>Log in daily to earn a reward!</Text>

                        {/* Render the streak numbers */}
                        <View style={styles.numberBoxContainer}>
                        {streak.map((number, index) => (
                            <View
                            key={index}
                            style={[styles.numberBox, { backgroundColor: getNumberBoxColor(index) }]}
                            >
                            <Text style={styles.numberText}>{number}</Text>
                            </View>
                        ))}
                        </View>
                    </View>

                </View>
                
                <Navbar navigation={navigation}/>
            </View>
    );
}


export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: '3%',
    },
    iosShadow: {
        shadowColor: '#171717', 
        shadowOffset: {width: -2, height: 4}, 
        shadowOpacity: 0.2, 
        shadowRadius: 3
    },
    continueContainer:{
        width: '85%',
        height: '20%',
        borderRadius: 25,
        backgroundColor: '#0795ab',
        flexDirection: 'row',
        marginTop: '3%',
        elevation: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    courseSelectionContainer: {
        width: '85%',
        height: '50%',
        borderRadius: 25,
        backgroundColor: '#0795ab',
        marginTop: '4%',
        elevation: 2,
        alignItems: 'center',
    },
    course: {
        width: '95%',
        height: '10%',
        backgroundColor: 'white',
        borderRadius: 7,
        marginBottom: '2%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    courseButton: {
        height: '10%',
        marginVertical: '2.5%',
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    streakViewContainer: {
        width: '85%',
        height: '15%',
        borderRadius: 25,
        backgroundColor: '#fec165',
        marginTop: '5%',
        elevation: 2,
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    whiteText: {
        color: 'white',
        fontWeight: 'bold',
    },
    courseHeaderText: {
        fontWeight: 'bold',
        padding: '2%',
    },
    streakContainer: {
        width: '85%',
        height: '17%',
        paddingVertical: 5,
        borderRadius: 25,
        marginTop: '4%',
        backgroundColor: '#fec165',
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      streakTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      infoText: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center', 
      },
      numberBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
      },
      numberBox: {
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      numberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
      },
});


