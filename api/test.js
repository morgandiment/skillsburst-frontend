import axios from 'axios';
import { Api_Url } from '../constants';
import { Alert, Button, StyleSheet, View } from 'react-native';

export const testconnection = () => {
    const url = `${Api_Url}/data/testconnection`
    axios.get(url)
    .then(response => {
      // Handle the successful response here
      console.log('API call successful:', response.data);
      alert('API call successful:', response.data);
    })
    .catch(error => {
      // Handle errors here
      console.error('API call error:', url);
    });
}