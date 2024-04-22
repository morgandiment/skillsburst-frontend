import { StyleSheet, Text,  View, ScrollView, Dimensions} from 'react-native';

// Change path as needed
import {Header, Navbar, OpportunityBox, OpportunityModal} from '../../components/Index.js';
import opportunities from '../../opportunities/opportunities.js';

// Page template for pages that require both header and footer 
const OpportunityBoxes = ({opps, navigation}) => {
    const qArr = [];
    var i = 0;

    opps.forEach(op => {
        qArr.push(
          <OpportunityBox 
            key={i}
            opportunity={op}
            navigation={navigation}
          />
        )
        i++;
      });
    
    return qArr 
}


const OpportunityPage = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            
            <Header navigation={navigation}/>
            <ScrollView style={styles.container}>
            <View style={styles.scrollContent}>
                <Text style={styles.headText}>All Opportunities</Text>
                <OpportunityBoxes opps={opportunities.digital} navigation={navigation}/>

            </View>
            </ScrollView>
            <Navbar navigation={navigation}/>
        </View>
    );
}

export default OpportunityPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        flex: 1,
        marginTop: '1%',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    headText: {
        alignSelf: 'center',
        marginVertical: '3%',
        fontSize: 25,
    }
});