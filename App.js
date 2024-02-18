import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {SimpleButton, AnimatedButton } from './components/Index.js';
import { Template, QuizAutoBuild, LandingPage, LoginPage, AnimatedCategorySelectPage, SignupPage, HomePage } from './screens/Index.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerStyle: { 
              backgroundColor: '#eeeeee',
            },
            headerTintColor: '#000000',
            headerTitleStyle: { fontWeight: 'bold'},
          }}
        >
          <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>

          <Stack.Screen name="SignupPage" component={SignupPage} options={{headerShown: false}}/>
          <Stack.Screen name="LandingPage" component={LandingPage} options={{title: 'Welcome [Username]'}}/>
          <Stack.Screen name="QuizAutoBuild" component={QuizAutoBuild} options={{title: 'Programatically made quiz page'}}/>
          <Stack.Screen name="Template" component={Template} options={{title: 'Template'}}/>

          <Stack.Screen name="AnimatedCategoryPage" component={AnimatedCategorySelectPage} options={{title: 'Animated Category Page', headerShown: false}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView> 
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