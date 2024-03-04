import { StyleSheet, View, Text, Alert, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useState } from 'react';

// Change path as needed
import { Header, Navbar } from '../../components/Index.js';
import courses from '../../courses/Courses.js';
const windowHeight = Dimensions.get('window').height * 0.85;

// Stand in for actual user data that would either be fetched from database or local save data
var currentCourses = ['Arithmetic'];

const CourseSelectPage = ({navigation}) => {
    const [active, setActive] = useState(() => {
        var initialState = [];
        for (var i = 0; i < courses.length; i++) {
            if (currentCourses.includes(courses[i].name)) {
                initialState.push(true);
            } else {
                initialState.push(false);
            }
        }
        return initialState;
    });

    const saveData = () => {
        // Save data - put saving code here when save data format is decided
        navigation.pop(1);
    }
    
    const CourseView = ({currentActive, course, i}) => {
        const set = () => {
            var temp = active;
            if (currentActive == true) {
                Alert.alert(
                    "Remove " + course.name + "?",
                    "Your progress will not be deleted",
                    [
                        { text: "Yes", onPress: () => { temp[i] = false; setActive({...temp}); } },
                        { text: "No" }
                    ]);
            } else {
                Alert.alert(
                    "Add " + course.name + "?",
                    "Previous progress will be restored",
                    [
                        { text: "Yes", onPress: () => { temp[i] = true; setActive({...temp}); } },
                        { text: "No" }
                    ]);
            }
        }

        var button;
        if (currentActive){
            button = (<TouchableOpacity onPress={set} style={[styles.button, {backgroundColor: '#c14b4d', marginRight: '5%',}]}>
                        <Text>Remove</Text>
                    </TouchableOpacity>)
        } else {
            button = (<TouchableOpacity onPress={set} style={[styles.button, {backgroundColor: '#0EF0A4', marginRight: '5%',}]}>
                        <Text>Add</Text>
                    </TouchableOpacity>)
        }

        return (
            <TouchableOpacity style={[styles.course]} onPress={() => {navigation.navigate('CoursePreviewPage', {course: course})}}>
                <Image style={{ flex: 1, resizeMode: 'contain', height: '80%'}} source={course.icon}/>
                <Text style={[{flex: 1.2}]}>{course.name}</Text>
                <View flex={3} alignItems={'flex-end'}>
                    {button}
                </View>
            </TouchableOpacity>
        )
    }

    var activeArr = [];
    var notActiveArr = [];

    for (var i = 0; i < courses.length; i++) {

        if (active[i] == true) {
            activeArr.push(
                <CourseView key={i} currentActive={true} course={courses[i]} i={i}/>
            ) 
        } else {
            notActiveArr.push(
                <CourseView key={i} currentActive={false} course={courses[i]} i={i}/>
            )
        }
    }

    if (activeArr.length === 0){
        activeArr.push(<Text key={0} style={styles.headerText}>No Courses</Text>)
    }

    if (notActiveArr.length === 0){
        notActiveArr.push(<Text key={0} style={styles.headerText}>No Courses</Text>)
    }


    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>
            <ScrollView flex={1} width={'100%'} backgroundColor={'white'}>
                <View style={styles.container}>
                    <Text style={[styles.titleText]}>Tap a course to see details</Text>

                    <View style={styles.courseBox}>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.headerText]}>Currently Taking:</Text>
                        </View>
        
                        {activeArr}

                        <View marginBottom={'2%'}/>
                    </View>
                    
                    <View style={styles.courseBox}>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.headerText]}>Other Courses:</Text>
                        </View>
        
                        {notActiveArr}

                        <View marginBottom={'2%'}/>
                    </View>

                </View>
            </ScrollView>
            <View style={styles.buttonBar}>
                <TouchableOpacity onPress={() => {navigation.pop(2)}} style={[styles.button, {backgroundColor: '#c14b4d'}]}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveData} style={[styles.button, {backgroundColor: '#0EF0A4'}]}>
                    <Text>Save Changes</Text>
                </TouchableOpacity>
            </View>
            <Navbar navigation={navigation}/>
        </View>
    );
}

export default CourseSelectPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    courseBox: {
        width: '85%',
        flex: 1,
        borderRadius: 15,
        elevation: 2,
        backgroundColor: '#0795ab',
        marginTop: '5%',
        overflow: 'hidden',
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
        backgroundColor: '#01778a',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2%',
    },
    titleText: {
        marginTop: '3%',
        fontSize: 25,
    },
    headerText: {
        color: 'white',
        marginVertical: '3%',
        fontWeight: 'bold',
    },
    course: {
        width: '95%',
        height: windowHeight*.5*.15,
        backgroundColor: 'white',
        borderRadius: 7,
        marginBottom: '2%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 7,
        width: '40%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    buttonBar: {
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
    },
});