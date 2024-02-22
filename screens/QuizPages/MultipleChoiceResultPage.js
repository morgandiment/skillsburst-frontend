import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Images from '../../images/Index';

// Page template for pages that require both header and footer 

const MultipleChoiceResultPage = ({
    navigation,
    route,
    }) => {
    
    // Maybe generalise page?
    const {answers, times, score, questions, questionCount} = route.params;
    const scoreDecimal = score / questionCount;

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
    
    

    const QuestionDisplay = () => {
        var blocks = [];
        for (i = 0; i < questionCount; i++){
            const img = answers[i] == 1 ? Images.icons.right_icon : Images.icons.wrong_icon;
            blocks.push(
                <View key={i} style={[styles.questionResultContainer]}>
                    <Image style={{ flex: 1, resizeMode: 'contain', height: '130%', alignSelf: 'center'}} source={img}/>
                    <Text style={[{flex: 2}]}>{questions[i].question}</Text>
                    <Text style={[{flex: 2, textAlign: 'center'}]}>{times[i]}s</Text>
                </View>
            );
        }
        return (<View>{blocks}</View>)
    }

    return (
        <View style={{flex: 1}}>
    
            <View style={styles.container}>
                <View style={styles.container}>
                  <Text>{score}/{questionCount}</Text>
                  <Text>{resultMessage}</Text>
                  <TouchableOpacity style={styles.continueButton} onPress={() => {navigation.pop(2)}}>
                    <Text>Continue</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.resultsContainer]}>
                    <QuestionDisplay/>
                </View>

            </View>
            
        </View>
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
    continueButton: {
        width: '30%',
        height: '30%',
        backgroundColor: '#0EF0A4',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultsContainer: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
    },
    questionResultContainer: {
        borderRadius: 25,
        margin: '2%',
        padding: '3%',
        flexDirection: 'row',
        borderWidth: 2,
        width: '90%',
    },
});