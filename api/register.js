import axios from 'axios';
import { Api_Url } from '../constants';
import { Alert } from 'react-native';

export const Register = async (Username,Email,DateOfBirth,Password,ConfirmPassword,setuserNameMessageVisible,setEmailMessageVisible,setPasswordMessageVisible,setConfirmPasswordMessageVisible,clearMessage) => {
    clearMessage()
    console.log('help')
    console.log(Username,Email,DateOfBirth.toLocaleDateString('en-GB'),Password,ConfirmPassword,);
   // console.log('tyooo',setUserNameMessageVisible);
    console.log('sfaseitgo')
    if (!Username || !Email || !Password || !ConfirmPassword) {
        Alert.alert('Please fill in all the fields.');
        setuserNameMessageVisible(true);
        setEmailMessageVisible(true);
        setPasswordMessageVisible(true);
        setConfirmPasswordMessageVisible(true);
        return false;
    }

    if (!isValidUsername(Username)){
        setuserNameMessageVisible(true);
        return false;
    }

    if (!isValidEmail(Email)) {
        setEmailMessageVisible(true);
        // Alert.alert('Invalid Email', 'Please enter a valid email address');
        return false;
    }

    if (Password != ConfirmPassword) {
        // Alert.alert('Passwords Dont Match', 'Please make sure the passwords match');
        setConfirmPasswordMessageVisible(true);
        return false;
    }

    if (!isValidPassword(Password)){
        setPasswordMessageVisible(true);
        return false;
    }
    
    const userData = {
   
        Username: Username,
        Email: Email,
        Password: Password,
        DOB: DateOfBirth.toLocaleDateString('en-GB'),
    };

    //for testing we no use
    const url = `${Api_Url}/register/registerUser`
    try {
        console.log('sdshropfgo');
        const response = await axios.post(url, userData);

        console.log(response.data  );
        return true;
    } catch (error) {
        //console.error('Error:',  error.response.data.message);
        Alert.alert('Error',error.response.data.message)
        return false;
    }
    return true
};


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  

const isValidUsername = (username) => {
    
    if (/\s/.test(username)) {
        Alert.alert('Error','Please make sure there are no spaces in the username')
        return false;
    }

    return true;
};

const isValidPassword = (password) => {
    if ((/\s/.test(password))  ||(password.length < 8)  ||  (!/\d/.test(password)))

        return false;

    return true;
};
