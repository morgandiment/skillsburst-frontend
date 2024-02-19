import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {SimpleButton, AnimatedButton } from './components/Index.js';
import { Template, QuizAutoBuild, LandingPage, LoginPage, AnimatedCategorySelectPage, SignupPage, HomePage, ProfileEditPage, SettingsPage, CoursePage, Feedback, HelpPage, ContactPage } from './screens/Index.js';
import TemplatePage from './screens/TemplatePage.js';

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
                    
          <Stack.Screen name="SignupPage" component={SignupPage} options={{headerShown: false}}/>
          <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false}}/>
          
          {/* Move to the top for testing*/}
          <Stack.Screen name="HomePage" component={HomePage} options={{title: 'Home Page', headerShown: false}}/>

          {/* Course Pages*/}
          <Stack.Screen name="CoursePage" component={CoursePage} options={{title: 'Course View Page', headerShown: false}}/>
          <Stack.Screen name="AnimatedCategoryPage" component={AnimatedCategorySelectPage} options={{title: 'Animated Category Page', headerShown: false}}/>

          {/* Side tab Pages */}
          <Stack.Screen name="Settings" component={SettingsPage} options={{title: 'Settings Page', headerShown: false}} />
          <Stack.Screen name="Help" component={HelpPage} options={{title: 'Help Page', headerShown: false}} />
          <Stack.Screen name="Contact" component={ContactPage} options={{title: 'Contact Page', headerShown: false}} />
          <Stack.Screen name="Feedback" component={Feedback} options={{title: 'Feedback Page', headerShown: false}} />
          <Stack.Screen name="EditProfile" component={ProfileEditPage} options={{title: 'Edit Profile Page', headerShown: false}}/>


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