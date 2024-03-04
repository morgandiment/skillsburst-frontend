import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

import {SimpleButton, AnimatedButton } from './components/Index.js';
import { Template, QuizEndPage, QuizAutoBuild, CoursePreviewPage, LevelSelectPage, LandingPage, CourseSelectPage, LoginPage, SignupPage, HomePage, ProfileEditPage, SettingsPage, ChapterSelectPage, Feedback, HelpPage, ContactPage } from './screens/Index.js';
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
            headerShown: false,
            animation: 'fade',
          }}
        > 
          <Stack.Screen name="HomePage" component={HomePage} options={{title: 'Home Page'}}/>
          <Stack.Screen name="LevelSelectPage" component={LevelSelectPage} options={{title: 'Level Select Page'}}/>
          <Stack.Screen name="CourseSelectPage" component={CourseSelectPage} options={{title: 'Course Select Page'}}/>
          <Stack.Screen name="CoursePreviewPage" component={CoursePreviewPage} options={{title: 'Course Preview Page'}}/>

          <Stack.Screen name="SignupPage" component={SignupPage} options={{headerShown: false}}/>
          <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false}}/>
          
          {/* Need to add some way of back swipe prevention - as going back to quiz you just took makes no sense and breaks everything */}
          <Stack.Screen name="QuizPage" component={QuizAutoBuild} options={{title: 'Quiz Page', gestureEnabled: false}}/>
          <Stack.Screen name="QuizEndPage" component={QuizEndPage} options={{title: 'Quiz End Page', gestureEnabled: false, animation: 'none'}}/>

          {/* Course Pages*/}
          <Stack.Screen name="ChapterSelectPage" component={ChapterSelectPage} options={{title: 'Chapter select Page'}}/>

          {/* Side tab Pages - convert to screen navigator of header component?? */}
          <Stack.Screen name="Settings" component={SettingsPage} options={{title: 'Settings Page'}} />
          <Stack.Screen name="Help" component={HelpPage} options={{title: 'Help Page'}} />
          <Stack.Screen name="Contact" component={ContactPage} options={{title: 'Contact Page'}} />
          <Stack.Screen name="Feedback" component={Feedback} options={{title: 'Feedback Page',}} />
          <Stack.Screen name="EditProfile" component={ProfileEditPage} options={{title: 'Edit Profile Page'}}/>

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
