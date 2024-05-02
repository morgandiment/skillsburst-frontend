import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Linking  } from 'react-native';
import Images from '../../images/Index';

const windowHeight = Dimensions.get('window').height * 0.85;

const ScrollBox = ({
    style, 
    content,
    navigation,
}) => {

    return (
        <TouchableOpacity  style={[Style.chapterContainer, iosSupport.iosElavation, style]}>
            <View style={Style.topView}>
                <Text style={Style.titleText}>{content.name}</Text>
            </View>
            <View style={Style.body}>
                <Text style={Style.desc}>{content.info}</Text>      
            </View>
        </TouchableOpacity>
    );
}

export default ScrollBox;

const Style = StyleSheet.create({
    tagContainer: {
        flex: 1,
    },
    tagLevel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    tag: {
        padding: '1%',
        paddingHorizontal: '2%',
        borderRadius: 5,
        backgroundColor: '#fec165'
    },
    chapterContainer: {
        height: windowHeight / 5.5,
        width: '85%',
        elevation: 4,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: '7%'
    },
    desc: {
        textAlign: 'center',
        color:'#056b7a'
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
        alignSelf: 'center',
    },
    line: {
        width: '95%',
        height: '0%',
        borderTopWidth: 0.5,
        alignSelf: 'center',
        marginTop: '1%',
    },
    titleText: {
        flex: 1, // Adjust the flex property to allow centering vertically
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center', // Center text vertically
        color:'#056b7a'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    percentageText: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#93cab1',
        left: 0,
    },
    body: {
        width: '90%',
        height: '65%',
        alignSelf: 'center',
        marginTop: '2%',
        
    },
    imgContainer: {
        height: '70%',
        width: '70%',
        marginBottom: '2%',
        alignSelf: 'center'
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


