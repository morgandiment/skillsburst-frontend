import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text,  View, ScrollView, Dimensions} from 'react-native';
import {Header, Navbar, ChapterBox, AnimatedPercentageCircleText} from '../../components/Index.js';

const windowWidth = Dimensions.get('window').width;

const ChapterSelectPage = ({style, route, navigation}) => {
    const {course} = route.params;
    const name = course.name;
    const chapters = course.chapters;

    const [userData, setUserData] = React.useState({
        username : "",
        profile_picture : "",
        progress : {},
            last_course : {
            course : "",
            unit : "",
            lesson : ""
        },
        current_courses : [],
        daily_streak : 0,
    });

    const [completionPercentage, setCompletionPercentage] = React.useState(0);

    React.useEffect(() => {
        const loadUserData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("userData");
                const obj = jsonValue != null ? JSON.parse(jsonValue) : null;

                //if no user data for being here create it
                if (obj.progress[name] === undefined){
                    obj.progress[name] = {
                        percentage : 100,
                        chapters : {}
                    }
                    for (const chapter of chapters){
                        obj.progress[name].chapters[chapter.name] = {
                            achievements_unlocked : 0,
                            units : {}
                        }
                    }
                }
                await AsyncStorage.setItem("userData", JSON.stringify(obj));
                setUserData(obj);
            } catch (e) {
                console.log(e);
            }
        };

        loadUserData();
        
    }, [])

    const calculateCompletion = () => {
        var playerTotal = 0;
        for (const chapter of chapters){
            playerTotal += typeof(userData.progress[name]) === 'undefined' ? 0 : userData.progress[name].chapters[chapter.name].achievements_unlocked;
        }
        setCompletionPercentage(Math.round(playerTotal / course.total_units))
        console.log(completionPercentage)
    }

    // Switch to embedded map
    var chapterViews = []
    var i = 0;
    chapters.forEach(chapter => {
        chapterViews.push(
            <ChapterBox
            completion={typeof(userData.progress[name]) === 'undefined' ? 0 : userData.progress[name].chapters[chapter.name].achievements_unlocked} 
            key={i} 
            name={chapter.name}
            units={chapter.units} 
            active={true}
            onPressStart={() => navigation.navigate('LevelSelectPage', {units: chapter.path, name: chapter.name})} 
            style={{marginBottom: '6%'}}/>
        );
        i++;
    });

    // Add how to play screen here or on category select page

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>
            <ScrollView style={CourseStyle.container}>
                <View style={CourseStyle.scrollContent}>

                    <Text style={CourseStyle.heading}>{name}</Text>
                    <AnimatedPercentageCircleText onPress={() => {navigation.navigate('CoursePreviewPage', {course: course})}} active={true} percentage={typeof(userData.progress[name]) === 'undefined' ? 0 : userData.progress[name].percentage} w={windowWidth / 30} r={windowWidth / 7} />

                    {/* Display chapters */}
                    <View style={CourseStyle.chapterContainer}>
                        <Text style={CourseStyle.subHeading}>Chapters</Text>
                        <Text marginBottom={'6%'}>Fully complete a chapter for a special acheivement!</Text>
                        {chapterViews}
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


