import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';

import PercentageCircle from '../components/buttons/PercentageCircle';
import Padlock from '../components/visual/Padlock';
import Ribbon from '../components/visual/Ribbon';
import Header from '../components/navigation/Header';
import Navbar from '../components/navigation/Navbar';

import Images from '.././images/Index.js';

const windowWidth = Dimensions.get('window').width;

//      <View marginTop={w/1.3} height={w/2} width={windowWidth} borderBottomWidth={1} color={"black"} alignItems={"center"} borderRadius={5}>
//<Text>HI USER</Text>      
//</View>
//
//

const CategorySelectPage = ({navigation}) => {
  var w = windowWidth / 7;

  return (
    <View style={{flex: 1}}>
      <Header/>
      <View style={styles.container}>

        <View style={styles.container} width={"100%"}>
          
          <ScrollView width={"100%"} showsVerticalScrollIndicator={false} overScrollMode="never" >
            <View height={w/8}/>
            <View style={styles.container}>
              <Ribbon t={"Unit 1"}/>

              <PercentageCircle onPress={() => navigation.navigate('HomePage')} w={w/5} r={w/1.2} text="Addition 1" percentage={1} active={true} img={Images.icons.plus_icon}/>

              <View style={{flexDirection: "row", marginTop: w/5}}>
                  <PercentageCircle w={w/5} r={w/1.2} text="Addition 2 " percentage={1} active={true} img={Images.icons.plus_icon}/>
                  <View width={w/1.5}></View>
                  <PercentageCircle w={w/5} r={w/1.2} text="Subtraction 1" active={true} percentage={1} img={Images.icons.minus_icon}/>
              </View>

              <View style={{flexDirection: "row", marginTop: w/5}}>
                  <PercentageCircle w={w/5} r={w/1.2} text="Subtraction 2 " percentage={1} active={true} img={Images.icon.minus_icon}/>
                  <View width={w/1.5}></View>
                  <PercentageCircle w={w/5} r={w/1.2} text="Multiplication 1" active={true} percentage={1} img={Images.icons.multiply_icon}/>
              </View>

              <Padlock w={w*3.5} locked={false} t="Checkpoint 1"/>

              <Ribbon t={"Unit 2"}/>

              <View style={{flexDirection: "row", marginTop: w/5}}>
                  <PercentageCircle w={w/5} r={w/1.2} text="Mathematics " percentage={0.3} active={true}/>
                  <View width={w/1.5}></View>
                  <PercentageCircle w={w/5} r={w/1.2} text="Computer" active={true} percentage={0.8} img={Images.icons.literacy_icon}/>
              </View>

              <View style={{flexDirection: "row", marginTop: w/5}}>
                  <PercentageCircle w={w/5} r={w/1.2} text="Mathematics " active={true}/>
                  <View width={w/1.5}></View>
                  <PercentageCircle w={w/5} r={w/1.2} text="Computer" active={true} img={Images.icons.literacy_icon}/>
              </View>

              <PercentageCircle w={w/5} r={w/1.2} text="Literacy" percentage={0.3} active={true}/>

              <Padlock w={w*3.5} t="Checkpoint 2"/>
              <Ribbon t={"Unit 3"}/>

              <View style={{flexDirection: "row", marginTop: w/5}}>
                  <PercentageCircle w={w/5} r={w/1.2} text="Mathematics " active={false}/>
                  <View width={w/1.5}></View>
                  <PercentageCircle w={w/5} r={w/1.2} text="Computer" active={false} img={Images.icons.literacy_icon}/>
              </View>

              <View style={{flexDirection: "row", marginTop: w/5}}>
                  <PercentageCircle w={w/5} r={w/1.2} text="Mathematics " active={false}/>
                  <View width={w/1.5}></View>
                  <PercentageCircle w={w/5} r={w/1.2} text="Computer" active={false} img={Images.icons.literacy_icon}/>
              </View>

            </View>
            <View height={w/8}/>
          </ScrollView>
        </View>

      </View>
      <Navbar/>
    </View>
    
  );
}

export default CategorySelectPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
