import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import Images from '../../images/Index'

const Padlock = ({
    locked = true,
    w = 100,
    h = w/3.5,
    t = "Checkpoint 1"
  }) => {
    const dropH = useSharedValue(0);
    const [open, setOpen] = useState(false);
  
    if (locked == true)
    {
      var img = Images.other.padlock_closed;
    }
    else
    {
      var img = Images.other.padlock_open;
    }
  
    var p = "M" + "0 " + h/2 + " H" + w + " " + h/2;
    var pW = w/4.5;
  
    const toggleMenu = () => {
      setOpen(!open);
    }
  
    const PadLockDrop = () => {
      if (open)
      {
        dropH.value = withTiming(w*0.8, {
          duration: 100,
        })
        return (
          <Animated.View style={{width: w*1.6, height: dropH, backgroundColor: "#A6A6A6", zIndex: 1, borderRadius: w/10, alignItems: "center"}}>

            <Text style={styles.text} marginTop={w/10}>{t.toUpperCase()}</Text>
            <Text style={styles.text} marginTop={w/15}>Complete the challenge to unlock</Text>
            <Text style={styles.text}>more skills!</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={{ fontWeight: 'bold'}}>START</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      }
      else
      {
        dropH.value = withTiming(0, {
          duration: 100,
        })
        return (
          <Animated.View style={{width: w*1.6, height: dropH, backgroundColor: "#A6A6A6", zIndex: 1, borderRadius: w/10, alignItems: "center"}}>
          </Animated.View>
        );
      }
    }
  
    return (
      <View height={h} width={w} alignItems={"center"} >
        <Svg>
        <Path
            d={p}
            stroke="#525458"
            strokeWidth={1.5}
          />
        </Svg>
        <TouchableOpacity onPress={toggleMenu} style={{ flex:1, justifyContent: "center", alignItems: "center", position: "absolute", top: h/2 - (pW/2), width: pW, height: pW, backgroundColor: "#525458", borderRadius: w/3}}>
            <Image style={{flex: 1, aspectRatio: 0.6, resizeMode: 'contain'}} source={img}/>
        </TouchableOpacity>
        <PadLockDrop position={"absolute"}/>
    </View>
    );
};


export default Padlock;

const styles = StyleSheet.create({
    text: {
      color: 'white',
      fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'white',
         height: "30%", 
         width: "55%",
         borderRadius: 5, 
         alignItems: 'center', 
         justifyContent: 'center', 
         
         // Android Shadow
         elevation: 2,

         // ios Shadow
         shadowColor: '#171717', 
         hadowOffset: {width: -2, height: 4}, 
         shadowOpacity: 0.2, 
         shadowRadius: 3

    }
  
});


  