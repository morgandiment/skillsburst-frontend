import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import course from '../courses/problemSolving';

const Api_Url = "https://bd07-82-9-238-25.ngrok-free.app"


export async function registerUser(userData) {
    const url = `${Api_Url}/register/registerUser`;
    try {
         const response = await axios.post(url, userData);
         return response;

     } catch (error) {
         console.error('Error:', error);
         //Alert.alert('Error', error.message)
         return false;
     };
};

export const loginUser = async (userData) => {
    const url = `${Api_Url}/login/LoginUser`
    try {
        const response = await axios.post(url, userData);
    
        //Alert.alert(response.data.message,"Welcome to Skillsburst");
        //AsyncStorage.setItem("token",response.data.token );

        return response.data.data;

    } catch (error) {
        //console.error('Error:',  error.response.data.message);
        //Alert.alert('Error' , error.response.data.message)
        return false;
    }
}

export const getUserData = async (userID) => {
    const url = `${Api_Url}/login/getUserData`
    try {
        const response = await axios.post(url, { userID : userID });
        return response.data.recordset[0];

    } catch (error) {
        //Alert.alert('Error' , error.response.data.message)
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

export async function getCourseData(courseName) {
    const url = `${Api_Url}/quiz/getQuiz`;
    try {
         const response = await axios.post(url, { name : courseName });
         return response.data

     } catch (error) {
         console.error('Error:', error);
         //Alert.alert('Error', error.message)
         return false;
     };
};

export async function saveUserProgress(userID, userProgress) {
    const url = `${Api_Url}/quiz/saveprogress`;
    try {
        await axios.post(url, { userID : userID, userProgress : userProgress });
        return true

     } catch (error) {
        console.error('Error:', error);
        //Alert.alert('Error', error.message)
        return false;
     };
};

export async function loadUserProgress(userID) {
    const url = `${Api_Url}/quiz/getprogress`;
    try {
        const response = await axios.post(url, { userID : userID });
        return response.data.userProgress;

     } catch (error) {
        console.error('Error:', error);
        return {};
     };
};

export async function updateFinishedIntro(userID, selectedPronouns, selectedStatus, selectedHobbies) {
    const url = `${Api_Url}/login/updateFinishedIntro`;
    try {
        const response = await axios.post(url, { userID : userID, selectedPronouns : selectedPronouns, selectedStatus : selectedStatus, selectedHobbies : selectedHobbies});
        return response;

     } catch (error) {
        console.error('Error:', error);
        //Alert.alert('Error', error.message)
        return false;
     };
};