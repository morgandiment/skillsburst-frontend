import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import Images from '../../images/Index'

// Temp navbar im was using for scaling

const Navbar = ({ style }) => {
    return (
    <View style={[styles.bar, style]}>

        <TouchableOpacity style={styles.navButton}> 
            <Image style={styles.imgSty} source={Images.icons.dice_icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}> 
            <Image style={styles.imgSty} source={Images.icons.dice_icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}> 
            <Image style={styles.imgSty} source={Images.icons.dice_icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}> 
            <Image style={styles.imgSty} source={Images.icons.dice_icon}/>
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