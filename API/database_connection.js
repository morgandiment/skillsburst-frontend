import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const Api_Url = "10.2.78.168"

async function registerUser(userData) {
    const url = `${Api_Url}/register/registerUser`;
    try {
         //console.log('sdshropfgo');
         const response = await axios.post(url, userData);

         //console.log(response.data);
         return true;

     } catch (error) {
         console.error('Error:',  error.response.data.message);
         Alert.alert('Error',error.response.data.message)
         return false;
     };
};

async function loginUser(userData) {
    const url = `${Api_Url}/login/LoginUser`
    try {
        const response = await axios.post(url, userData);

        console.log(response.message);
        Alert.alert(response.data.message, response.data.token);
        AsyncStorage.setItem("token", response.data.token);

        return response;

    } catch (error) {
        console.error('Error:',  error.response.data.message);
        Alert.alert('Error' , error.response.data.message)

        return false;
    }
}

async function getSession(token) {;
    if (token) {
        const url = `${Api_Url}/login/UserSession`;
        const response = await axios.post(url, { token: token });
        setData(response.data.data);
    }
}