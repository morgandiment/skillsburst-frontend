import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import Animated, {FadeIn, ZoomIn} from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height * 0.85;

const OpportunityModal = ({
    style, 
    oppotunities = [],
    navigation,
}) => {
    [v, setV] = useState(true);
    const qArr = [];
    var i = 0;

    oppotunities.forEach(op => {
        qArr.push(
          <View  key={i} style={omStyle.entry}>
            <Text 
            style={[omStyle.tText, {color: '#000000'}]}
            >
                {op}
            </Text>
          </View>
        )
        i++;
    });


    const close = () => {
        setV(false);
    }

    const goToPage = () => {
        close()
        navigation.navigate('Opportunities')
    }

    return (
        <View>
            { v && 
            <Modal transparent={true} >
                <Animated.View style={omStyle.darken} entering={FadeIn}>
                    <Animated.View style={omStyle.mainModal} entering={ZoomIn}>
                        <Text style={[omStyle.tText, {margin: '5%'}]}>NEW OPPORTUNITIES AVALAIBLE</Text>
                        {qArr}
                        <View style={omStyle.buttonContainer}>
                            <TouchableOpacity style={[omStyle.modButton, {marginTop: '5%'}]} title="View all" onPress={() => goToPage()}>
                                <Text style={omStyle.bText}>View All</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[omStyle.modButton, {backgroundColor: '#ffffff'}]} title="View all" onPress={() => close()}>
                                <Text style={[omStyle.bText, {color: '#0EF0A4'}]}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Animated.View>
            </Modal>
            }
        </View>
        
    );
}

export default OpportunityModal;

const omStyle = StyleSheet.create({
    darken: {
        backgroundColor: '#212121aa', 
        flex: 1,
        justifyContent: 'center'
    },
    mainModal: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    entry: {
        marginBottom: '3%',
        backgroundColor: '#fefefe',
        elevation: 0.5,
        width: '80%',
        height: windowHeight / 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modButton: {
        backgroundColor: '#0EF0A4',
        width: '40%',
        height: windowHeight / 15,
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: '3%',
        elevation: 2,
    },
    buttonContainer: {
        height: windowHeight / 5,
        width: '100%',
        alignItems: 'center',
    },
    tText: {
        textAlign: 'center',
        color: '#0EF0A4',
        fontSize: 16,
    },
    bText: {
        margin: '5%',
        textAlign: 'center',
        color: 'white'
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


