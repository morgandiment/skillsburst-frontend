import { StyleSheet, View} from 'react-native';
import { Header, Navbar } from '../../components/Index.js';

const Feedback = ({navigation}) => {

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>

            <View style={styles.container}>

                {/* Code goes here*/}

            </View>
            
            <Navbar navigation={navigation}/>
        </View>
    );
}


export default Feedback;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
});