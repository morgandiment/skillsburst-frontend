import React, {useContext} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MultipleChoiceResults } from '../../components/quiz/quizResults/Results';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Images from '../../images/Index';

import { UserContext } from '../../userContext.js'

const windowWidth = Dimensions.get('window').width;

const QuizEndPage = ({navigation, route}) => {

    const { courseName, lessonName, unitName, chapterName, format, pass, results } = route.params;

    const data = useContext(UserContext);

    React.useMemo(() => {
        console.log(unitName)
        const updateUnit = () => {
            //take copy of progress
            const progressCopy = data.progress

            //add new value to copy
            progressCopy[courseName].chapters[chapterName].units[unitName].lessons[lessonName] = {
                passed : pass,
                percentage : Math.round((results.score / results.questionCount) * 100) / 100,
                time : results.times.reduce((a, b) => a + b, 0),
                maxStreak: results.maxStreak,
                score: results.score,
            }

            data.updateProgress(progressCopy);
        }

        updateUnit();
    }, [])
    
    
    
    const ResultBreakdown = () => {
        switch (format) {
            case 'multiple_choice':
                return <MultipleChoiceResults results={results}/>
            default:
                return;
        }
    }

    const PassFailCircle = () => {
        var resultMessage = 'Well Done!';
        var bgColour = '#00f0a4';
        const img = pass === true ? Images.icons.right_icon : Images.icons.wrong_icon;

        if (pass === false) {
            resultMessage = 'Better Luck Next Time!'
            bgColour = '#c14b4d'
        }

        return (
            <View style={styles.passFail}>
                <View style={[styles.circleStyle, { backgroundColor: bgColour }]}> 
                    <Image style={{flex: 1, aspectRatio: 0.5, resizeMode: 'contain'}} source={img}/>
                </View>
                <View alignItems={'center'} justifyContent={'center'}>
                    <Text style={styles.endText}>{resultMessage}</Text>
                </View>
            </View>
        );

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' style="auto"/>
            <View style={styles.passFail}>
                <PassFailCircle/>
            </View>

            <View style={styles.resultsContainer}>
                <ResultBreakdown/>
            </View>

            <TouchableOpacity style={styles.continue} onPress={() => {navigation.pop(2)}}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default QuizEndPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    passFail: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleStyle: {
        height: windowWidth/3,
        width:windowWidth/3,
        borderRadius: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3%',
    },
    resultsContainer: {
        flex: 2,
        width: '100%',
    },
    continue: {
        width: '90%',
        height: '8%',
        backgroundColor: '#0095ab',
        borderRadius: 10,
        elevation: 3,
        marginVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    endText: {
        fontSize: 25,
    },
    continueText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    }
});