import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Linking  } from 'react-native';
import Images from '../../images/Index';

const windowHeight = Dimensions.get('window').height * 0.85;

const OpportunityBox = ({
    style, 
    opportunity,
    navigation,
}) => {

    return (
        <TouchableOpacity style={[oppStyle.chapterContainer, iosSupport.iosElavation, style]} onPress={() => navigation.navigate('OpportunityView', {opportunity: opportunity})}>

            {/* Main overView */}
            <View style={oppStyle.topView}>
                <Text style={oppStyle.titleText}>{opportunity.name}</Text>
            </View>
        
            {/* body */}
            <View style={oppStyle.body}>
                <View style={oppStyle.imgContainer}>
                    <Image style={oppStyle.img} source={opportunity.img}/>       
                </View>  
                <Text style={oppStyle.desc}>{opportunity.desc}</Text>       
            </View>

            <View style={oppStyle.line}/>

            {/* Achievements - kinda messy will sort later*/}
            <View style={oppStyle.tagContainer}>
                <View style={oppStyle.tagLevel}>
                    <Text style={oppStyle.tag}>{opportunity.type}</Text>
                    <Text style={oppStyle.tag}>{opportunity.location}</Text>
                    <Text style={oppStyle.tag}>{opportunity.cost}</Text>
                </View>
                {/* Add Tag levels as needed - if we add more tags (prolly wont)*/}
            </View>
        </TouchableOpacity>
    );
}

export default OpportunityBox;

const oppStyle = StyleSheet.create({
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
        height: windowHeight / 2.5,
        width: '85%',
        elevation: 4,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: '7%'
    },
    desc: {
        textAlign: 'center',
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
        flex: 4,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
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


