// end quiz page - shows ending - then shows appropriate results format upon request
// Change multiple choice and tutorial quiz to return json with needed data
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Platform, Dimensions} from 'react-native';
import { useState, useEffect } from 'react';
import Images from '../../images/Index';
import Animated, { ZoomIn, useSharedValue, withTiming, Easing } from 'react-native-reanimated'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const windowHeight = Platform.OS === "android" ? Dimensions.get('window').height * 0.85 : Dimensions.get('window').height * 0.85 * PixelRatio.get();
const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width : Dimensions.get('window').width * PixelRatio.get();

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const MultipleChoiceResultPage = ({
    navigation,
    route,
    }) => {
    
    // Maybe generalise page?
    const { times, score, questions, questionCount, maxStreak, selectedIndexes} = route.params;
    const scoreDecimal = score / questionCount;
    const totalTime = times.reduce((partialSum, a) => partialSum + a, 0);
    
    // needs function to save permanenet quiz data

    var resultMessage = "";
    if (scoreDecimal === 1){
        resultMessage = "Well done!!!";
    } 
    else if (scoreDecimal >= 0.6){
        resultMessage = "Great try!";
    }
    else if (scoreDecimal >= 0.3){
        resultMessage = "Good attempt!";
    }
    else{
        resultMessage = "Better luck next time!";
    }

    // top of question results - total time, fastest time, average time, highest answer streak

    const ExpandedBlock = ({exists, h, i}) => {
        var qs = [];
        var count = 0;
        questions[i].answers.forEach(answer => {
            var colour = 'transparent';

            if (count == selectedIndexes[i]){
                if (count == questions[i].correct_index){
                    var colour = '#00f0a4';
                }
                else{
                    var colour = '#c14b4d';
                }
            } else if (count == questions[i].correct_index){
                var colour = '#00f0a4';
            }

            count++;
            qs.push(
                <View key={count} style={[styles.answerEntry, {backgroundColor: colour}]}>
                    <Text alignSelf={'center'}>{answer}</Text>
                </View>
            );
        });

        if (exists){
            return (
            <Animated.View style={[styles.expandedContainer, {flex: 1}]}>
                {qs}
            </Animated.View>
            )
        }
        else{
        return;
        }
    }

    const QuestionBLock = (i) => {
        const [expanded, expand] = useState(false);
        i=i.i;
        const h = useSharedValue(windowHeight/16);

        const grow = () => {
            if (expanded){
                // default height
                h.value = withTiming(windowHeight/16, {duration: 100, easing: Easing.linear});
            } else{
                // Expanded height
                h.value = withTiming(windowHeight/6, {duration: 100, easing: Easing.linear});
            }
            expand(!expanded);
        }

        const img = selectedIndexes[i] == questions[i].correct_index ? Images.icons.right_icon : Images.icons.wrong_icon;
        return (
            <AnimatedButton style={[styles.questionResultContainer, {height: h}]} onPress={grow}>
                <View style={{width: '100%', flexDirection: 'row', height: windowHeight/16, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{ flex: 1, resizeMode: 'contain', height: '50%', alignSelf: 'center'}} source={img}/>
                    <Text style={[{flex: 4}]}>Q{i+1}: {questions[i].question}</Text>
                    <Image style={{ flex: 1, resizeMode: 'contain', height: '30%', alignSelf: 'center'}} source={Images.other.dropdownArrowGrey}/>
                </View>
                <ExpandedBlock exists={expanded} h={h} i={i}/>
            </AnimatedButton>
        )
    } 

    const QuestionDisplay = () => {
        var blocks = [];
        for (i = 0; i < questionCount; i++){
            
            blocks.push(
                <QuestionBLock key={i} i={i}/>
            );
        }
        return (<View>{blocks}</View>)
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#0095ab', zIndex: 1}}>
            <Animated.View entering={ZoomIn} style={styles.container}>

                {/* Score and result message*/}
                <View style={styles.container}>
                    <View style={styles.scoreAndContinue}> 
                        <Text style={styles.endText}>{score}/{questionCount}</Text>
                    </View>

                    <View flex={0.5} alignItems={'center'} justifyContent={'center'}>
                        <Text style={styles.endText}>{resultMessage}</Text>
                    </View>
                </View>

                {/* Mini stats overview*/}
                <View style={styles.infoContainer}>
                    <View style={styles.infoView}>
                        <Text style={styles.infoText}>Total:</Text>
                        <Text style={styles.infoText}>{Math.round(times.reduce((partialSum, a) => partialSum + a, 0) * 10) / 10}s</Text>
                    </View>

                    <View style={styles.infoView}>
                        <Text style={styles.infoText}>Average:</Text>
                        <Text style={styles.infoText}>{Math.round(times.reduce((partialSum, a) => partialSum + a, 0) / times.length * 10) / 10}s</Text>
                    </View>

                    <View style={styles.infoView}>
                        <Text style={styles.infoText}>Fastest:</Text>
                        <Text style={styles.infoText}>{times.reduce((a, b) => Math.min(a, b))}s</Text>
                    </View>

                    <View style={styles.infoView}>
                        <Text style={styles.infoText}>Streak:</Text>
                        <Text style={styles.infoText}>{maxStreak}</Text>
                    </View>

                </View>

                {/* Question score breakdown*/}
                <View style={styles.resultsOuter}>
                    <ScrollView style={styles.resultsScroll}>
                        <View style={styles.resultsInner}>
                            <QuestionDisplay/>
                        </View>
                    </ScrollView>
                </View>

                {/* Continue Button */}
                <TouchableOpacity style={styles.continue} onPress={() => {navigation.pop(2)}}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>

            </Animated.View>
        </SafeAreaView>
    );
}

export default MultipleChoiceResultPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreAndContinue: {
        height: windowWidth/3,
        width:windowWidth/3,
        borderRadius: windowWidth,
        backgroundColor: '#00f0a4',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    infoContainer: {
        height: windowHeight/12,
        width: '95%',
        flexDirection: 'row',
        marginVertical: '2%',
    },
    infoView: {
        flex: 1,
        marginHorizontal: '1%',
        backgroundColor: '#0095ab',
        borderRadius: 15,
        alignItems: 'center',
    },
    infoText: {
        margin: '3%',
        color: 'white',
        fontWeight: 'bold',
    },
    resultsOuter: {
        flex: 1.5,
        width: '100%',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderRadius: 14,
    },
    resultsScroll: {
        width: '100%',
    },
    resultsInner: {
        flex: 1,
        alignItems: 'center',
    },
    questionResultContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        margin: '2%',
        width: '90%',
        elevation: 5,
    },
    expandedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    answerEntry: {
        flex: 1,
        margin: '2%',
        padding: '2%',
        borderRadius: 10,
    },
});