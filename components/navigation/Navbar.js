import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {Image} from "expo-image";
import Images from '../../images/Index'

// Temp navbar im was using for scaling


const Navbar = ({ style, navigation }) => {
    return (
    <View style={[styles.bar, style]}>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomePage')}> 
            <Image style={styles.imgSty} source={Images.icons.home}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}> 
            <Image style={styles.imgSty} source={Images.icons.default}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}> 
            <Image style={styles.imgSty} source={Images.icons.default}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}> 
            <Image style={styles.imgSty} source={Images.icons.default}/>
        </TouchableOpacity>

    </View>
    )
}

export default Navbar;

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        height: '8%',
        backgroundColor: 'white', //#0795ab
        flexDirection: 'row',
        borderTopWidth: 0.5,
    },
    navButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgSty: {
        flex: 1,
        aspectRatio: 0.5,
        resizeMode: 'contain'
    }

});


// https://docs.expo.dev/versions/latest/sdk/navigation-bar/