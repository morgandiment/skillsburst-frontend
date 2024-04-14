import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

function PronounsAndStudyOptions({ onSelectPronouns, onSelectStatus }) {
  const [pronounsOptions, setPronounsOptions] = useState([
    { id: 1, pronouns: 'He/Him', selected: false },
    { id: 2, pronouns: 'She/Her', selected: false },
    { id: 3, pronouns: 'They/Them', selected: false }
  ]);
  const [studyOptions, setStudyOptions] = useState([
    { id: 1, status: 'In school', selected: false },
    { id: 2, status: 'Working part-time', selected: false },
    { id: 3, status: 'In university', selected: false },
    { id: 4, status: 'In training', selected: false },
    { id: 5, status: 'Working full-time', selected: false },
    { id: 6, status: 'Other', selected: false }
  ]);

  function onPressHandler(id, type) {
    if (type === 'pronouns') {
      const updatedPronounsOptions = pronounsOptions.map(option => ({
        ...option,
        selected: option.id === id
      }));
      setPronounsOptions(updatedPronounsOptions);
      const selectedPronouns = updatedPronounsOptions.find(option => option.selected)?.pronouns || '';
      onSelectPronouns(selectedPronouns);
    } else if (type === 'study') {
      const updatedStudyOptions = studyOptions.map(option => ({
        ...option,
        selected: option.id === id
      }));
      setStudyOptions(updatedStudyOptions);
      const selectedStatus = updatedStudyOptions.find(option => option.selected)?.status || '';
      onSelectStatus(selectedStatus);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.titleStyle}>Select Pronouns</Text>
        <View style={styles.FlatListContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={pronounsOptions}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Button
                mode="outlined"
                style={[
                  styles.buttonStyle,
                  item.selected ? styles.selectedButton : styles.unselectedButton
                ]}
                onPress={() => onPressHandler(item.id, 'pronouns')}
                labelStyle={{ color: item.selected ? 'white' : '#056371' }}>

                {item.pronouns}
              </Button>
            )}
          />
        </View>
        <Text style={styles.titleStyle}>Select Current Status</Text>
        <View style={styles.FlatListContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={studyOptions}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Button
                mode="outlined"
                style={[
                  styles.buttonStyle,
                  item.selected ? styles.selectedButton : styles.unselectedButton
                ]}
                onPress={() => onPressHandler(item.id, 'study')}
                labelStyle={{ color: item.selected ? 'white' : '#056371' }}>

                {item.status}
              </Button>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleStyle: {
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.36,
    textAlign: 'center',
    alignSelf: 'stretch'
  },
  FlatListContainer: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: "90%",
  },
  buttonStyle: {
    margin: 5,
    borderRadius: 20,
    borderColor: '#056371',
    borderWidth: 1,
    color: 'transparent', // Making text color same as background color
  },
  selectedButton: {
    backgroundColor: '#056371',
    color: 'white', // Set text color to white
  },
  unselectedButton: {
    backgroundColor: '#ffffff',
  },
});

export default PronounsAndStudyOptions;
