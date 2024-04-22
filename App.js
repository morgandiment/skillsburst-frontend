import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SimpleButton, AnimatedButton } from './components/Index.js';
import {NothingHerePage, MainLearningScreen, ModuleLearningScreen, LessonLearningScreen, LoadingPage, OpportunityPage, OpportunityViewPage, QuizEndPage, QuizAutoBuild, OnboardingMainScreen, CoursePreviewPage, LevelSelectPage, LandingPage, CourseSelectPage, LoginPage, SignupPage, HomePage, ProfileEditPage, SettingsPage, ChapterSelectPage, Feedback, HelpPage, ContactPage } from './screens/Index.js';
import TemplatePage from './screens/TemplatePage.js';

import Courses from './courses/index.js';

import { UserContext } from './userContext.js'

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = React.useState("asdSignupPage");

  const [username, setUsername] = React.useState("")
  const [profilePicture, setProfilePicture] = React.useState("")
  const [id, setId] = React.useState("")
  const [progress, setProgress] = React.useState({})
  const [dailyStreak, setDailyStreak] = React.useState(1)
  const [finishedIntro, setFinishedIntro] = React.useState(false)

  return (
    <UserContext.Provider value={{
      username : username,
      updateUsername : setUsername,

      profile_picture : profilePicture,
      updateProfilePicture : setProfilePicture,

      id : id,
      updateId : setId,

      progress : progress,
      updateProgress : setProgress,

      daily_streak : dailyStreak,
      updateDailyStreak : setDailyStreak,

      finished_intro : finishedIntro,
      updateFinishedIntro : setFinishedIntro,
    }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName={initialRoute}

            screenOptions={{
              headerStyle: { 
                backgroundColor: '#eeeeee',
              },
              headerTintColor: '#000000',
              headerTitleStyle: { fontWeight: 'bold'},
              headerShown: false,
              animation: 'fade',
              //gestureEnabled: false,
            }}
          >
            
            <Stack.Screen name="LoadingPage" component={LoadingPage} options={{}}/>
            
            <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false}}/>
            <Stack.Screen name="SignupPage" component={SignupPage} options={{headerShown: false}}/>

            <Stack.Screen name="HomePage" component={HomePage} options={{title: 'Home Page'}}/>

            <Stack.Screen name="OnboardingMainScreen" component={OnboardingMainScreen} options={{}}/>
            <Stack.Screen name="Opportunities" component={OpportunityPage} options={{title: 'Opportunities Page'}}/>
            <Stack.Screen name="OpportunityView" component={OpportunityViewPage} options={{title: 'Opportunities Page'}}/>
            
            <Stack.Screen name="LevelSelectPage" component={LevelSelectPage} options={{title: 'Level Select Page'}}/>
            <Stack.Screen name="CourseSelectPage" component={CourseSelectPage} options={{title: 'Course Select Page'}}/>
            <Stack.Screen name="CoursePreviewPage" component={CoursePreviewPage} options={{title: 'Course Preview Page'}}/>
            
            {/* Need to add some way of back swipe prevention - as going back to quiz you just took makes no sense and breaks everything */}
            <Stack.Screen name="QuizPage" component={QuizAutoBuild} options={{title: 'Quiz Page'}}/>
            <Stack.Screen name="QuizEndPage" component={QuizEndPage} options={{title: 'Quiz End Page', animation: 'none'}}/>

            {/* Course Pages*/}
            <Stack.Screen name="ChapterSelectPage" component={ChapterSelectPage} options={{title: 'Chapter select Page'}}/>

            <Stack.Screen name="MainLearningScreen" component={MainLearningScreen} options={{}}/>
            <Stack.Screen name="ModuleLearningScreen" component={ModuleLearningScreen} options={{}}/>
            <Stack.Screen name="LessonLearningScreen" component={LessonLearningScreen} options={{}}/>

            <Stack.Screen name="NothingHere" component={NothingHerePage} options={{}}/>

            {/* Side tab Pages - convert to screen navigator of header component?? */}
            <Stack.Screen name="Settings" component={SettingsPage} options={{title: 'Settings Page'}} />
            <Stack.Screen name="Help" component={HelpPage} options={{title: 'Help Page'}} />
            <Stack.Screen name="Contact" component={ContactPage} options={{title: 'Contact Page'}} />
            <Stack.Screen name="Feedback" component={Feedback} options={{title: 'Feedback Page',}} />
            <Stack.Screen name="EditProfile" component={ProfileEditPage} options={{title: 'Edit Profile Page'}}/>

          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserContext.Provider>
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
