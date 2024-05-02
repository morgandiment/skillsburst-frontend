import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import course from '../courses/problemSolving';

const Api_Url = "http://192.168.0.58:3000"
                

export async function registerUser(userData) {
    const url = `${Api_Url}/register/registerUser`;
    let success = false
    try {
         const response = await axios.post(url, userData);
         Alert.alert('Success', response.data.message)
         success= true;

     } catch (error) {
        //  console.error('Error:', error);
         Alert.alert('Error', error.response.data.message);
     };
     return success;
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
        Alert.alert('Error', error.response.data.message);
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
        //  console.error('Error:', error);
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
        // console.error('Error:', error);
        return {};
     };
};

export async function updateFinishedIntro(userID, selectedPronouns, selectedStatus, selectedHobbies) {
    const url = `${Api_Url}/login/updateFinishedIntro`;
    try {
        const response = await axios.post(url, { userID : userID, selectedPronouns : selectedPronouns, selectedStatus : selectedStatus, selectedHobbies : selectedHobbies});
        return response;

     } catch (error) {
        // console.error('Error:', error);
        //Alert.alert('Error', error.message)
        return false;
     };
};

// export async function getOpportunityData(UserID){
//     const url = `${Api_Url}/quiz/getOpportunityprogress`;
//     try {
//         const response = await axios.post(url, { userID : userID });
//         return response.data.OpportunityData;

//      } catch (error) {
//         // console.error('Error:', error);
//         return {};
//      };
// }



// export async function saveOpportunityProgress(userID, userOpportunities) {
//     const url = `${Api_Url}/quiz/saveOpportunityprogress`;
//     try {
//         await axios.post(url, { userID : userID, OpportunityData : userOpportunities });
//         return true

//      } catch (error) {
//         console.error('Error:', error);
//         //Alert.alert('Error', error.message)
//         return false;
//      };
// };
