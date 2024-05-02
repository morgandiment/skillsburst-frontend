import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated'; 
import { useState } from 'react';
import Images from '../../images/Index';


const windowHeight = Platform.OS === "android" ? Dimensions.get('window').height * 0.85 : Dimensions.get('window').height * 0.85;
const windowWidth = Platform.OS === "android" ? Dimensions.get('window').width : Dimensions.get('window').width;

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const TypingResults = ({
    results,
    }) => {
    console.log(results)
    // Maybe generalise page?
    const score = results;
    // const questions = results.questions;
    // const questionCount = results.questionCount;
    // const selectedIndexes = results.selectedIndexes;
    const scoreDecimal = score;

    const ExpandedBlock = ({exists, i}) => {
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
        for (i = 0; i < 3; i++){
            
            blocks.push(
                <QuestionBLock key={i} i={i}/>
            );
        }
        return (<View>{blocks}</View>)
    }

    return (
        <View  style={styles.container}>

            {/* Question score breakdown*/}
            <View style={styles.resultsOuter}>
                <ScrollView style={styles.resultsScroll}>
                    <View style={styles.resultsInner}>
                        <QuestionDisplay/>
                    </View>
                </ScrollView>
            </View>

        </View>
    );
}

export default TypingResults;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
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