import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

function SelectionHobbyScreen({ onSelectHobbies }) {
  const [hobbiesOptions, setHobbiesOptions] = useState([
    { id: 1, hobby: 'Reading', selected: false },
    { id: 2, hobby: 'Painting', selected: false },
    { id: 3, hobby: 'Cooking', selected: false },
    { id: 4, hobby: 'Sports', selected: false },
    { id: 5, hobby: 'Music', selected: false }
  ]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  function onPressHandler(id) {
    const updatedHobbiesOptions = hobbiesOptions.map(option =>
      option.id === id ? { ...option, selected: !option.selected } : option
    );
    setHobbiesOptions(updatedHobbiesOptions);
    const selectedHobbiesList = updatedHobbiesOptions.filter(option => option.selected).map(option => option.hobby);
    setSelectedHobbies(selectedHobbiesList);
    onSelectHobbies(selectedHobbiesList);
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.titleStyle}>Select Hobbies</Text>
        <View style={styles.FlatListContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={hobbiesOptions}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Button
                mode="outlined"
                style={[
                    styles.buttonStyle,
                    item.selected ? styles.selectedButton : styles.unselectedButton
                ]}
                onPress={() => onPressHandler(item.id)}
                labelStyle={{ color: item.selected ? 'white' : '#056371' }}>
                {item.hobby}
              </Button>
            )}
          />
        </View>
        <View style={styles.selectedHobbiesContainer}>
          <Text style={styles.titleStyle}>Selected Hobbies:</Text>
          {selectedHobbies.length > 0 ? (
            <Text style={styles.titleStyle}>{selectedHobbies.join(', ')}</Text>
          ) : (
            <Text style={styles.titleStyle}>None</Text>
          )}
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
    color: '#056371',
    letterSpacing: 0.36,
    textAlign: 'center',
    alignSelf: 'stretch'
  },
  FlatListContainer: {
    width: '100%',
    height: '40%',
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
    borderRadius: 20, // Set a border radius for curved edges
    borderColor: '#056371',
    borderWidth: 1,
    
  },
  selectedButton: {
    color:"white",
    backgroundColor: '#056371',
    paddingHorizontal: 10, // Add horizontal padding
  },
  unselectedButton: {
    color: "#056371",
    backgroundColor: '#ffffff',
    paddingHorizontal: 10, // Add horizontal padding
  },
  selectedHobbiesContainer: {
    marginTop: 20,
    alignItems: 'center',
  }
});

export default SelectionHobbyScreen;
