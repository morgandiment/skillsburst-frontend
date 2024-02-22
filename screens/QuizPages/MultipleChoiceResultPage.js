import { StyleSheet, View, Text} from 'react-native';
import { Header, Navbar } from '../../components/Index.js';

// Page template for pages that require both header and footer 

const MultipleChoiceResultPage = ({
    navigation,
    route,
    }) => {
    
    // Maybe generalise page?
    const {answers, times, score, questions, questionCount} = route.params;

    return (
        <View style={{flex: 1}}>

            <View style={styles.container}>

                {/* Code goes here*/}
                <Text>{score}/{questionCount}</Text>
                <Text>{answers}</Text>
                <Text>{times}</Text>

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
});