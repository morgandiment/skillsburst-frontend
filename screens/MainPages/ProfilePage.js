import { StyleSheet, View} from 'react-native';
import { Header, Navbar } from '../../components/Index.js';

const ProfilePage = ({navigation}) => {

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


export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
});