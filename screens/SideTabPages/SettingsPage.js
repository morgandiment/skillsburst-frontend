import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Navbar } from '../../components/Index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
const SettingsPage = ({style, navigation}) => {


    const SettingEntry = ({onPress = () => {}, text="Default", textStyle}) => {
        return (
            <TouchableOpacity style={styles.SettingEntry} onPress={onPress}>
                <Text style={[styles.contentText, textStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }

    async function signout() {
        Alert.alert(
            'Are you sure you want to signout?',
            'This will bring you back to the login page.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Signout',
                onPress: async  () => {
                    await AsyncStorage.removeItem('token');
                    console.log('Token deleted successfully');
                    navigation.navigate('LoginPage');
                    Alert.alert('Signout successfully.');
                },
                style: 'destructive',
              },
            ],
            { cancelable: false }
        );
    }
//contentContainerStyle={{alignItems: 'center', height: '100%'}
    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation}/>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Account settings*/}
                    <View style={[styles.sectionContainer, styles.iosShadow]}>
                        <View style={styles.divider}>
                            <Text style={styles.headerText}>Account</Text>
                        </View>

                        <View>
                            <SettingEntry text={'Edit Profile'} onPress={() => {navigation.navigate('EditProfile')}}/>
                            <SettingEntry text={'Change Password'}/>
                            <SettingEntry text={'Sign Out'} onPress={signout}/>
                            <SettingEntry text={'Delete Account'} textStyle={{color: 'red', fontWeight: 'bold'}}/>
                        </View>
                    </View>

                    {/* General settings*/}
                    <View style={[styles.sectionContainer, styles.iosShadow]}>
                        <View style={styles.divider}>
                            <Text style={styles.headerText}>Settings</Text>
                        </View>

                        <View>
                            <SettingEntry text={'Volume'}/>
                            <SettingEntry text={'Notifications'}/>
                            <SettingEntry text={'Theme'}/>
                        </View>
                    </View>

                    {/* Legal Details*/}
                    <View style={[styles.sectionContainer, styles.iosShadow]}>
                        <View style={styles.divider}>
                            <Text style={styles.headerText}>About</Text>
                        </View>

                        <View>
                            <SettingEntry text={'About us'}/>
                            <SettingEntry text={'Terms of Use'}/>
                            <SettingEntry text={'Privacy Policy'}/>
                            <SettingEntry text={'Cookies'}/>
                        </View>
                    </View>

                </View>
                
                {/* Breathing room, only noticed when options extend past screen size*/}
                <View style={{margin: '3%'}}/>
            </ScrollView>
            <Navbar navigation={navigation}/>
        </View>
    );
}

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    sectionContainer: {
        width: '85%',
        borderRadius: 25,
        elevation: 3,
        backgroundColor: 'white',
        padding: '3%',
        marginTop: '6%',
    },
    divider: {
        borderBottomWidth: 0.5,
        paddingBottom: '1%',
    },
    headerText: {
        fontSize: 23,
    },
    contentText: {
        margin: '1%',
        fontSize: 18,
    },
    SettingEntry: {
        paddingTop: '1%',
        marginLeft: '2%',
    },
    iosShadow: {
        shadowColor: '#171717', 
        shadowOffset: {width: -2, height: 4}, 
        shadowOpacity: 0.2, 
        shadowRadius: 3
    },
});


