import { Text, View, Image} from 'react-native';
import Images from '../../images/Index'

const Ribbon = ({
    w = 100, // Width of image
    t = "Undefined" // Text displayed on image
  }) => {
  
    return (
      <View style={{justifyContent: "center", alignItems: "center", height: w/2, width: w}}>
        <Image style={{ flex: 1, resizeMode: 'contain'}} source={Images.other.Ribbon}/>
        <Text style={{position: "absolute", top: w/10,}}>{t}</Text>
      </View>
    );
  };

export default Ribbon;