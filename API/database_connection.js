import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const Api_Url = "http://192.168.0.21:3000"

export async function registerUser(userData) {
    const url = `${Api_Url}/register/registerUser`;
    try {
         const response = await axios.post(url, userData);
         return true;

     } catch (error) {
         console.error('Error:', error);
         Alert.alert('Error', error.message)
         return false;
     };
};

export const loginUser = async (userData) => {
      const url = `${Api_Url}/login/LoginUser`
      try {
          const response = await axios.post(url, userData);
  
          // console.log(response.message);
          Alert.alert(response.data.message,"Welcome to Skillsburst");
          AsyncStorage.setItem("token",response.data.token );
          return response;
      } catch (error) {
          //console.error('Error:',  error.response.data.message);
          Alert.alert('Error' , error.response.data.message)
          console.log(error.response.data)
          return false;
      }
      
  }

export async function getSession(token) {;
    if (token) {
        const url = `${Api_Url}/login/UserSession`;
        const response = await axios.post(url, { token: token });
        setData(response.data.data);
    }
}