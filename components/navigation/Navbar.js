import React, {useContext} from 'react';
import { UserContext } from '../../userContext.js'

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {Image} from "expo-image";
import Images from '../../images/Index'

import { saveUserProgress } from "../../API/database_connection.js";


/*
            <TouchableOpacity style={styles.navButton} onPress={() => data.updateProgress({})}> 
            <Image style={styles.imgSty} source={Images.icons.trophy_star}/>
        </TouchableOpacity>



*/



const Navbar = ({ style, navigation }) => {

    const data = useContext(UserContext);

    return (
    <View style={[styles.bar, style]}>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomePage')}> 
            <Image style={styles.imgSty} source={Images.icons.home}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => console.log(JSON.stringify(data))}> 
            <Image style={styles.imgSty} source={Images.icons.key}/>
        </TouchableOpacity>
        
        {/* can move this somewhere else if needed*/}
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Opportunities')}> 
            <Image style={styles.imgSty} source={Images.icons.trophy_star}/>
        </TouchableOpacity>

        

        <TouchableOpacity style={styles.navButton } onPress={() => saveUserProgress(data.id, data.progress)}> 
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
