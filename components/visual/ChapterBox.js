import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import Images from '../../images/Index';

const windowHeight = Dimensions.get('window').height * 0.85;

const ChapterBox = ({
    style, 
    navigation,
    name = 'Default Name',
    completion = 0,
    units = 10,
    locked = true,
    onPressStart = () => {},
    onPressAchieve = () => {},
}) => {

    const percentage = completion / units * 100;

    return (
        <View style={[ChapterStyle.chapterContainer, iosSupport.iosElavation, style]}>

            {/* Main overView */}
            <View style={ChapterStyle.topView}>
                <Text style={ChapterStyle.titleText}>{name}</Text>
                <Text style={ChapterStyle.percentageText}>{Math.round(percentage)}%</Text>
            </View>
        
            {/* Details */}
            <View style={ChapterStyle.barContainer}>
                
                <View style={ChapterStyle.bar}>
                    <Image style={[ChapterStyle.blackCircle, {left: percentage + '%', top: '-20%'}]} source={Images.other.black_circle}/>
                    <View style={[ChapterStyle.innerBar, {width: percentage + '%'}]}/>
                </View>                
            </View>

            {/* Achievements - kinda messy will sort later*/}
            <View style={{ height: '40%', justifyContent: "center", flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={onPressAchieve}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: '70%'}} >  
                        <Image style={{flex: 1, aspectRatio: 1.6, resizeMode: 'contain'}} source={Images.icons.trophy_icon_filled}/>
                        <Text flex={1.7}><Text style={[{fontWeight: 'bold'}]}>{completion}</Text>/{units}</Text>
                    </View>
                    <Text style={{fontSize: 10}}>Unlocked</Text>
                </TouchableOpacity>

                <View flex={2}>

                </View>
                <TouchableOpacity style={ChapterStyle.startButton} onPress={onPressStart}>
                    <Image style={{flex: 1, aspectRatio: 0.7, resizeMode: 'contain'}} source={Images.other.play}/>
                </TouchableOpacity>
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
        height: '130%',
        width: '3%',
        position: 'absolute',
    },  
    startButton: {
        flex: 1, 
        backgroundColor: '#0EF0A4', 
        borderRadius: 25, 
        marginHorizontal: '5%',
        marginVertical: '1%', 
        justifyContent: 'center', 
        alignItems: 'center'
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


