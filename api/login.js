import axios from 'axios';
import { Api_Url } from '../constants';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Login = async (User,Password) => {
  //  Alert.alert(User,Password);
    if (!User  || !Password) {
        Alert.alert('Please fill in all the fields.');
        return false;
    }
    const loginData = {
        User: User,
        Password: Password  
    }
  //  Alert.alert(User,Password);
    const url = `${Api_Url}/login/LoginUser`
    try {
        const response = await axios.post(url, loginData);

        // console.log(response.message);
        Alert.alert(response.data.message,response.data.token );
        AsyncStorage.setItem("token",response.data.token );
        return response;
    } catch (error) {
        //console.error('Error:',  error.response.data.message);
        Alert.alert('Error' , error.response.data.message)
        return false;
    }
    
}

