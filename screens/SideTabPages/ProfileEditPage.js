import { StyleSheet, View, Text} from 'react-native';
import { Header, Navbar } from '../../components/Index.js';

const ProfileEditPage = ({style, navigation}) => {

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>

            <View style={styles.container}>

                <Text>temp</Text>

            </View>
            
            <Navbar navigation={navigation}/>
        </View>
    );
}

export default ProfileEditPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
});