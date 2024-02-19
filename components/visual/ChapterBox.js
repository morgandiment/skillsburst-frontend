import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';

import Svg, { Path, Circle } from 'react-native-svg';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height * 0.85;

const ChapterBox = ({
    style, 
    navigation,
    name = 'Default Name',
    completion = 1,
    units = 10,
    locked = true,
    onPress = () => {},
}) => {

    const percentage = completion / units * 100;

    return (
        <View style={ChapterStyle.chapterContainer}>
            {/* Main overView */}
           
            <View style={ChapterStyle.topView}>
                <Text style={ChapterStyle.titleText}>{name}</Text>
                <Text style={ChapterStyle.percentageText}>{Math.round(percentage)}%</Text>
            </View>
        
            {/* Details */}
            <View style={ChapterStyle.barContainer}>
                
                <View style={ChapterStyle.bar}>
                    <Image style={[ChapterStyle.blackCircle, {left: percentage + '%', top: '-20%'}]} source={require('../../images/BlackCircle.png')}/>
                    <View style={[ChapterStyle.innerBar, {width: percentage + '%'}]}/>
                </View>
                
            </View>
        </View>
    );
}

export default ChapterBox;

const ChapterStyle = StyleSheet.create({
    chapterContainer: {
        height: windowHeight / 6,
        width: '100%',
        elevation: 4,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: windowHeight / 60,
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
        marginTop: '2%',
    },
    titleText: {
        flex: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    percentageText: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#93cab1',
    },
    barContainer: {
        width: '90%',
        marginVertical: '3%',
        height: '10%',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    bar: {
        height: '50%',
        borderRadius: 5,
        backgroundColor: '#D9D9D9',
    },
    innerBar: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#0EF0A4',
    },
    blackCircle: {
        height: '140%',
        width: '4%',
        position: 'absolute',
    },  
});

const iosSupport = StyleSheet.create({
    iosElavation: {
        shadowColor: '#171717', 
        shadowOffset: {width: -2, height: 4}, 
        shadowOpacity: 0.2, 
        shadowRadius: 3
    },
});


