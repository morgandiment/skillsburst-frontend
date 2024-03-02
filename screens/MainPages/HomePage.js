import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image, PixelRatio, Platform } from 'react-native';
import {Header, Navbar, AnimatedPercentageCircle, AnimatedProgressBar} from '../../components/Index.js';

import Images from '../../images/Index.js';
import Courses from '../../courses/Courses.js';

// Potential fix for ios scaling? - apparently doesnt work on ios .-.
const windowWidth = Dimensions.get('window').width * 0.9;
const windowHeight = Dimensions.get('window').height * 0.85;

const HomePage = ({style, navigation}) => {
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

    /*

    // Get all current course json files
    var currentCourses = [];
    var i = 0;
    getCourses().forEach(courseName => {
        var i = 0;
        Courses.forEach(course => {
            i++;
            if (course.name == courseName) {
                currentCourses.push(
                    <CourseView key={i} name={course.name} percentage={0} img={course.icon} onPress={() => {navigation.navigate('CoursePage', {course: course})}} />
                );
            }
        });
    }); */

    var currentCourses = [];
    var i = 0;
    Courses.forEach(course => {
        i++;
        currentCourses.push(
            <CourseView key={i} name={course.name} percentage={0} img={course.icon} onPress={() => {navigation.navigate('CoursePage', {course: course})}} />
        );
        
    });

    const streak = [1, 2, 3, 4, 5, 6, 7];

    // Function to determine the color of the number boxes based on streak
    const getNumberBoxColor = (index) => {
      // Determine the color based on the index
      const completedDays = 3; // Number of completed days (for example)
      return index < completedDays ? '#00fda2' : '#ffffff'; // Green for completed days, white for remaining days
    };

    return (
            <View style={{flex: 1}}>

                <Header navigation={navigation}/>

                <View style={[styles.container, style]}>

                    <View>
                        <Text style={styles.welcomeText}>Welcome User</Text>
                    </View>

                    {/* Continue Current Course*/}
                    {/*<Text style={{fontSize: 15}} marginTop={5}>Continue where you left off</Text>*/}
                    <View style={[styles.continueContainer, styles.iosShadow]} >
                        <View flex={1.5} alignItems={'center'} justifyContent={'center'}>
                            {/* Needs a number instead of percentage for sizing due to svg*/}
                            <AnimatedPercentageCircle onPress={() => {navigation.navigate('QuizPage', {path: '/quizzes/multipleChoiceTest.json'})}} active={true} imgARatio={0.5} percentage={0.75} w={windowWidth / 30} r={windowWidth / 7} img={Images.other.play} barEmptyColor={'#056b7a'} />
                        </View>
                        <View flex={2} justifyContent={'center'}>
                            <View height={'70%'} width={'90%'} alignItems={'center'}  borderRadius={20} backgroundColor={'#01778a'}>
                                <Text style={[styles.whiteText, {fontSize: 20}]} marginTop={10}>Arithmetic:</Text>
                                <Text style={[styles.whiteText, {fontSize: 15}]} marginTop={5}>Unit 3 - Addition 5</Text>
                            </View>
                        </View>
                    </View>

                    {/* View Current Courses*/}
                    <View style={[styles.courseSelectionContainer, styles.iosShadow]}>
                        <Text style={[styles.courseHeaderText, styles.whiteText]} >Current Courses:</Text>
                        
                        <ScrollView width={'100%'}>
                            <View alignItems={'center'}>
                                {currentCourses}
                            </View>
                        </ScrollView>

                        <TouchableOpacity style={styles.courseButton} onPress={() => {navigation.navigate('CourseSelectPage')}}>
                            <Text style={[styles.courseHeaderText, {padding: '2%'}]}> Add/Remove Courses</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Current Streak */}
                    <View style={[styles.streakContainer, styles.iosShadow]}>
                        {/* Title */}
                        <Text style={styles.streakTitle}>Daily Streak:</Text>

                        {/* Information text */}
                        <Text style={styles.infoText}>Log in daily to increase your streak!</Text>

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
                <Navbar/>
            </View>
    );
}


export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
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


