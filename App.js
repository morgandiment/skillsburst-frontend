import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {SimpleButton, AnimatedButton } from './components/Index.js';
import { Template, QuizAutoBuild, LandingPage, LoginPage, SignupPage } from './screens/Index.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle: { 
            backgroundColor: '#eeeeee',
          },
          headerTintColor: '#000000',
          headerTitleStyle: { fontWeight: 'bold'},
        }}
      >

        <Stack.Screen name="SignupPage" component={SignupPage} options={{headerShown: false}}/>
        <Stack.Screen name="LandingPage" component={LandingPage} options={{title: 'Welcome [Username]'}}/>
        <Stack.Screen name="QuizAutoBuild" component={QuizAutoBuild} options={{title: 'Programatically made quiz page'}}/>
        <Stack.Screen name="Template" component={Template} options={{title: 'Template'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});