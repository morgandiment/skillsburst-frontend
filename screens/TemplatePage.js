import { StyleSheet, View} from 'react-native';

// Change path as needed
import { Header, Navbar } from '../components/Index.js';

// Page template for pages that require both header and footer 

const TemplatePage = ({navigation}) => {

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

export default TemplatePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
});