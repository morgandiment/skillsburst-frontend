import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {SimpleButton, AnimatedButton, Header } from './components/Index.js';
import { Template, QuizAutoBuild, LandingPage, LoginPage, AnimatedCategorySelectPage, SignupPage, HomePage, ProfileEditPage, SettingsPage, CoursePage, Feedback, HelpPage, ContactPage } from './screens/Index.js';
import TemplatePage from './screens/TemplatePage.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            //gestureEnabled: false //turns off backswiping between screens
          }}
        >
                    
          <Stack.Screen name="SignupPage" component={SignupPage}/>
          <Stack.Screen name="LoginPage" component={LoginPage}/>
          <Stack.Screen name="HomePage" component={HomePage}/>

          {/* Course Pages*/}
          <Stack.Screen name="CoursePage" component={CoursePage}/>
          <Stack.Screen name="AnimatedCategoryPage" component={AnimatedCategorySelectPage}/>

          {/* Side tab Pages */}
          <Stack.Screen name="Settings" component={SettingsPage}/>
          <Stack.Screen name="Help" component={HelpPage}/>
          <Stack.Screen name="Contact" component={ContactPage}/>
          <Stack.Screen name="Feedback" component={Feedback}/>
          <Stack.Screen name="EditProfile" component={ProfileEditPage}/>

          <Stack.Screen name="TemplatePage" component={TemplatePage}/>


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