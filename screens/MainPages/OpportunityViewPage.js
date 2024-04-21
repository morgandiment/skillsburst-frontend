import { StyleSheet, Text,  View, ScrollView, Dimensions, Image, TouchableOpacity, Linking} from 'react-native';

// Change path as needed
import {Header, Navbar} from '../../components/Index.js';
import opportunities from '../../opportunities/opportunities.js';
const windowHeight = Dimensions.get('window').height * 0.85;

// Page template for pages that require both header and footer 
const OpportunityViewPage = ({navigation, route}) => {
    const {opportunity} = route.params;
    return (
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <Header navigation={navigation}/>
            <ScrollView style={styles.container}>
                <View style={styles.scrollContent}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={opportunity.img}/>  
                    </View> 
                    <Text style={styles.headText}>{opportunity.company}</Text>
                    <Text style={styles.subText}>{opportunity.name}</Text>
                    <View style={styles.line}/>
                    <View style={styles.info}> 
                        <Text style={styles.t} >Cost: {opportunity.cost}</Text>
                        <Text style={styles.t} >Location: {opportunity.location}</Text>
                        <Text style={styles.t} >Type: {opportunity.type}</Text>
                        <Text>{opportunity.longDesc}</Text>
                    </View>

                    <TouchableOpacity style={styles.modButton} onPress={() => {
                    Linking.openURL("https://" + opportunity.link);
                    }}>
                        <Text style={styles.mText}>View More Info</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Navbar navigation={navigation}/>
        </View>
    );
}

export default OpportunityViewPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    t: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: '2%'
    },
    info: {
        width: '80%',
    },
    modButton: {
        backgroundColor: '#0EF0A4',
        height: windowHeight / 14,
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        marginVertical: '7%',
        elevation: 2,
    },
    mText: {
        textAlign: 'center',
        color: 'white'
    },
    scrollContent: {
        flex: 1,
        marginTop: '1%',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        height: windowHeight / 3,
        width: '85%',
        marginBottom: '0%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    headText: {
        alignSelf: 'center',
        fontSize: 23,
        fontWeight: 'bold',
    },
    subText: {
        alignSelf: 'center',
        marginBottom: '1%',
        fontSize: 23,
    },
    line: {
        width: '95%',
        height: '0%',
        borderTopWidth: 0.5,
        alignSelf: 'center',
        marginTop: '1%',
    },
});