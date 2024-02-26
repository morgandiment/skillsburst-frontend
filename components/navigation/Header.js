import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, Platform } from 'react-native';

import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import Images from '../../images/Index'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Tab variables
const tabWidth = windowWidth * 0.7;

const Header = ({style, navigation}) => {

  // position of tab: 0 -> fully on screen, -tabWidth -> fully off screen
  const x = useSharedValue(-tabWidth);

  //z index needs to be increased when opened so that the buttons are clickable 
  const [zIndex, setZIndex] = useState(1);

  const openTab = () => {
    if (x.value == 0){
      x.value = withTiming(-tabWidth, {duration: 750} );
      setTimeout(function(){
        setZIndex(1);
      }, 500); 
      
    } else{
      x.value = withTiming(0, {duration: 750} );
      setZIndex(10);
    }; 
  };

  // Set the value of x to the current pan position instantly
  const panUpdate = Gesture.Pan().onUpdate((event) => {
    var tl = Math.min(0, event.translationX)
    x.value = tl;
  });

  // When pan is released, either bring x back to fully open or fully closed depending on current x
  const panEnd = Gesture.Pan().onEnd((event) => {
    if (x.value > -windowWidth * 0.1){
      x.value = withTiming(0, {duration: 100});
    } else { 
      x.value = withTiming(-tabWidth, {duration: 100});
    }
  });

  const composed = Gesture.Simultaneous(panUpdate, panEnd);

  // Text Image pair for the tab menu
  const TabEntry = ({ style, onPress = () => {}, text="default", img=(Images.icons.dice_icon)}) => {

    {/* Closes the side when switching page, otherwise when returning the side tab remains out*/}
    switchPage = () => {
      x.value = withTiming(-tabWidth, {duration: 100});
      onPress();
    }
    
    return (
      <TouchableOpacity onPress={switchPage} style={[TabStyles.tabEntry, style]}>
        <Image style={TabStyles.tabImage} source={img}/>
        <Text style={[TabStyles.tabText]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  {/* Requires GestureHandlerRootView of whole screen in order to correctly detect pan inputs*/}
  const SideTab = () => {
    return (
      <View style={{height: windowHeight, width: windowWidth}}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[TabStyles.tab, {height: windowHeight, left: x}]}>

            {/* Mini Profile Display area */}
            <View height={'20%'} backgroundColor={'#0795ab'}> 
              <Text style={{flex: 1}}>Hello User</Text>
            </View>

            {/* Text area */}
            <View height={'80%'} backgroundColor={'white'}> 

              <TabEntry text={'Home'} onPress={() => navigation.navigate('HomePage')}/>
              <TabEntry text={'Planning Board'}/>
              <TabEntry text={'Invite Friends'}/>
              <TabEntry text={'Rate App'}/>
              <TabEntry text={'Feedback'} onPress={() => navigation.navigate('Feedback')}/>

              <View style={TabStyles.textSeperator}/>

              <TabEntry text={'Contact us'} onPress={() => navigation.navigate('Contact')} img={Images.icons.contact_icon}/>
              <TabEntry text={'Help'} onPress={() => navigation.navigate('Help')} img={Images.other.questionMark}/>
              <TabEntry text={'Settings'} onPress={() => navigation.navigate('Settings')} img={Images.icons.settings_icon}/>

            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    );
  }

  // Testing - ignore
  const DarkenTab = () => {
    <Animated.View backgroundColor={'rgb(255, 0, 255)'} opacity={1 - (x.value/-tabWidth) / 2} width={windowWidth} height={windowHeight} position={'absolute'} top={0} borderWidth={3}>
      <Text>my g</Text>
    </Animated.View>
  }
  
  // Main header return
  return (
    <View style={[style, HeaderStyles.headerAndTabContainer, {zIndex: zIndex}]}>
      <View style={HeaderStyles.headerContainer}>
        <StatusBar backgroundColor='#01778a' style="auto"/>
        <TouchableOpacity onPress={openTab} style={HeaderStyles.headerButton}>
          <Image style={HeaderStyles.headerImage} source={Images.other.headerDropdown}/>
        </TouchableOpacity>
        <Text style={HeaderStyles.headerText}>Skillburst</Text>
      </View>

      <SideTab/>
    </View>

  );
}

export default Header;

const HeaderStyles = StyleSheet.create({
  headerAndTabContainer: {
    //marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    width: '100%',
    height: '12%',
  },

  headerContainer: {
    paddingTop: "8%",
    height: "100%",
    backgroundColor: '#0795ab',
    flexDirection: 'row',
    elevation: 5,
    alignItems: 'center'
  },

  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },

  headerButton: {
    marginHorizontal: '5%',
  },

  headerImage: {
    aspectRatio: 1, 
    resizeMode: 'contain',
    height: "65%",
  },

});

const TabStyles = StyleSheet.create({
  tab: {
    width: tabWidth,
    elevation: 2,
    borderRightWidth: 0.5,
  },

  tabEntry: {
    width: '80%',
    height: '6%',
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textSeperator: {
    width:'80%', 
    borderBottomWidth: 0.8,
    marginHorizontal:'5%',
    marginVertical: '2%',
  },

  tabImage: {
    flex: 1, 
    resizeMode: 'contain',
    height: '80%', 
    marginHorizontal: '3%'
  },
  
  tabText: {
    fontSize: 17,
    flex: 2.5,
  },
});
