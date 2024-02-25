import { StyleSheet, Text,  View, ScrollView, Dimensions} from 'react-native';
import {Header, Navbar, ChapterBox} from '../../components/Index.js';

const windowHeight = Dimensions.get('window').height * 0.85;
const windowWidth = Dimensions.get('window').width;

const CoursePage = ({style, route, navigation}) => {
    // Contains the relevant course, will be used to fetch other course details
    const {name} = route.params;

    // Data to be fetched
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec dui nunc mattis enim ut tellus elementum sagittis vitae. Risus pretium quam";
    const gameSelection = [];
    const chapters = [];

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
                        <Text>Fully complete a chapter for a special acheivement!</Text>
                        <ChapterBox style={{marginBottom: '6%', marginTop: '6%'}}/>
                        <ChapterBox style={{marginBottom: '6%'}}/>
                        <ChapterBox style={{marginBottom: '6%'}}/>

                    </View>

                </View>
            </ScrollView>
            <Navbar/>
        </View>
    );
}


export default CoursePage;

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


