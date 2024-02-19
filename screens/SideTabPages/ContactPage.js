import { StyleSheet, View} from 'react-native';
import { Header, Navbar } from '../../components/Index.js';

const ContactPage = ({navigation}) => {

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>

            <View style={styles.container}>

                {/* Code goes here*/}

            </View>
            
            <Navbar/>
        </View>
    );
}


export default ContactPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
});