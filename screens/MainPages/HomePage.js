import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import {Header, Navbar, AnimatedPercentageCircle, AnimatedProgressBar} from '../../components/Index.js';
import {Image} from "expo-image";

import Images from '../../images/Index.js';

const windowWidth = Dimensions.get('window').width * 0.9;
const windowHeight = Dimensions.get('window').height * 0.85;

const HomePage = ({style, navigation}) => {

    const streak = [1, 2, 3, 4, 5, 6, 7];

    // Function to determine the color of the number boxes based on streak
    const getNumberBoxColor = (index) => {
      // Determine the color based on the index
      const completedDays = 3; // Number of completed days (for example)
      return index < completedDays ? '#00fda2' : '#ffffff'; // Green for completed days, white for remaining days
    };

    const CourseView = ({
        img =  Images.icons.dice_icon,
        name = 'No name', 
        percentage = 0,
        onPress = () => {},
    }) => {
        return (
            <TouchableOpacity onPress={onPress} style={[styles.course, styles.iosShadow, {height: windowHeight*.5*.15}]} >
                <Image style={{ flex: 1, resizeMode: 'contain', height: '80%'}} source={img}/>
                <Text style={[{flex: 1.2}]}>{name}</Text>
                <View flex={3}>
                    <AnimatedProgressBar w={windowWidth*0.8*(3/5)} percentage={percentage}/>
                </View>
            </TouchableOpacity>
        );
    }

    return (
            <View style={{flex: 1}}>
                <Header navigation={navigation} style={{}}/>
                
                <View style={[styles.container, style]}>

                    <View>
                        <Text style={styles.welcomeText}>Welcome User</Text>
                    </View>

                    {/* Continue Current Course*/}
                    {/*<Text style={{fontSize: 15}} marginTop={5}>Continue where you left off</Text>*/}
                    <View style={[styles.continueContainer, styles.iosShadow]} >
                        <View flex={1.5} alignItems={'center'} justifyContent={'center'}>
                            <AnimatedPercentageCircle onPress={() => navigation.navigate('AnimatedCategoryPage')} active={true} imgARatio={0.5} percentage={0.75} w={windowWidth / 30} r={windowWidth / 7} img={Images.other.play} barEmptyColor={'#056b7a'} />
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
                                <CourseView name={'Arithmetic'} percentage={0.75} img={Images.icons.green.maths_symbols} onPress={() => {navigation.navigate('CoursePage', {name: 'Arithmetic'})}} />
                                <CourseView name={'Literacy'} percentage={0.6} img={Images.icons.green.literacy_book} onPress={() => {navigation.navigate('CoursePage', {name: 'Literacy'})}} />
                                <CourseView name={'Digital'} percentage={0.2} img={Images.icons.green.gears}  onPress={() => {navigation.navigate('CoursePage', {name: 'Digital'})}} />
                                <CourseView name={'Interview Skills'} percentage={0} img={Images.icons.green.chat}  onPress={() => {navigation.navigate('CoursePage', {name: 'Interview Skills'})}} />
                                <CourseView/>
                                <CourseView/>
                            </View>
                        </ScrollView>

                        <TouchableOpacity style={styles.courseButton}>
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
        borderRadius: 10,
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


