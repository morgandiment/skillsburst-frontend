import { Image, View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useRef, useContext } from 'react';

import Onboarding from 'react-native-onboarding-swiper';
import PronounsAndStudyOptions from './PronounsAndStudyOptions';
import SelectionHobbyScreen from './SelectionHobbyScreen';

import { UserContext } from '../../userContext.js'

function OnboardingMainScreen({ navigation }) {
    const userData = useContext(UserContext);

    const [selectedPronouns, setSelectedPronouns] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const onboardingRef = useRef(null);

    const handleInterestsSubmit = () => {
        // Handle interests submission, for example, store them or perform some action.
        console.log('Interests submitted:', selectedPronouns, selectedStatus, selectedHobbies);
        userData.updateIntroData({
            pronouns: selectedPronouns,
            education_status: selectedStatus,
            hobbies: selectedHobbies,
        })
        userData.updateFinishedIntro(true)
    };

    const handleOnDone = () => {
        console.log(selectedPronouns);
        handleInterestsSubmit();

        //set user first time login false

        navigation.navigate('HomePage')
    };

    return ( 
        <Onboarding
            ref={onboardingRef}
            onSkip={() => console.log('skipped')}
            onDone={handleOnDone}
            pages={[
            {
                image: <Image source={require('../../images/skillsburst_banner_logo.png')} style={styles.image} />,
                backgroundColor: '#056371',
                title: 'Welcome to Skill Bursts',
                subtitle: 'Swipe to continue',
                titleStyles: { marginBottom: 10 },
                subTitleStyles: { marginTop: 10 }
            },
            {
                image:<View/>,
                backgroundColor: '#01778a',
                title: 'Tell us a bit more about yourself',
                titleStyles: {marginTop: 0 , marginBottom: -100 , fontWeight: 'bold' , textDecorationLine: 'underline'  } ,
                subtitle: <View style={{ flex: 1 }}>
                <PronounsAndStudyOptions onSelectPronouns={setSelectedPronouns} onSelectStatus={setSelectedStatus} />
            </View>
            },
            {
                image:<View/>,
                backgroundColor: 'white',
                title: 'Select hobbies that you enjoy',
                titleStyles: {marginTop: 0 , marginBottom: -100 , fontWeight: 'bold', color:"#056371" , textDecorationLine: 'underline' } ,
                subtitle:<View style={{ flex: 1 }}>
                            <SelectionHobbyScreen onSelectHobbies={setSelectedHobbies} />
                        </View>
                
            },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "50%",
        marginTop: 120,
        marginBottom: -120 ,
    },
    titles: {
        marginTop: 160 , 
        marginBottom: -100 , 
        fontWeight: 'bold', 
        color:"#056371" , 
        textDecorationLine: 'underline' 
    }
 
});


export default OnboardingMainScreen;
