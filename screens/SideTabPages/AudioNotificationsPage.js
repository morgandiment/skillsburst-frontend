// Joes stuff - couldn't install slider for some reason :<

/*import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'; // Import Slider from @react-native-community/slider
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon

function AudioNotificationScreen({ navigation }) {
  const [masterVolume, setMasterVolume] = useState(50);
  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSFXVolume] = useState(50);
  const [notificationOption, setNotificationOption] = useState(null);

  const handleMasterVolumeChange = (value) => {
    setMasterVolume(Math.round(value));
  };

  const handleMusicVolumeChange = (value) => {
    setMusicVolume(Math.round(value));
  };

  const handleSFXVolumeChange = (value) => {
    setSFXVolume(Math.round(value));
  };

  const handleNotificationOptionChange = (option) => {
    setNotificationOption(option);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-left" size={20} color="white" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.backText}>Back</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Audio and Notifications</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Volume Settings</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.volumeSection}>
            <Text style={styles.label}>Master Volume: {masterVolume}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={masterVolume}
              minimumTrackTintColor="#00f0a4" // Color when dragged
              thumbTintColor="#00f0a4" // Thumb color
              onValueChange={handleMasterVolumeChange}
            />
            <Text style={styles.label}>Music Volume: {musicVolume}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={musicVolume}
              minimumTrackTintColor="#00f0a4" // Color when dragged
              thumbTintColor="#00f0a4" // Thumb color
              onValueChange={handleMusicVolumeChange}
            />
            <Text style={styles.label}>SFX Volume: {sfxVolume}%</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={sfxVolume}
              minimumTrackTintColor="#00f0a4" // Color when dragged
              thumbTintColor="#00f0a4" // Thumb color
              onValueChange={handleSFXVolumeChange}
            />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.notificationSection}>
            <View style={styles.checkboxContainer}>
              <Text style={styles.notificationOptionText}>No Notifications</Text>
              <Switch
                value={notificationOption === 'none'}
                onValueChange={() => handleNotificationOptionChange('none')}
                trackColor={{ false: '#ffffff', true: '#00f0a4' }} // Color when selected
                thumbColor="#ffffff" // Thumb color
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.notificationOptionText}>Regular Notifications</Text>
              <Switch
                value={notificationOption === 'regular'}
                onValueChange={() => handleNotificationOptionChange('regular')}
                trackColor={{ false: '#ffffff', true: '#00f0a4' }} // Color when selected
                thumbColor="#ffffff" // Thumb color
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.notificationOptionText}>All Notifications</Text>
              <Switch
                value={notificationOption === 'all'}
                onValueChange={() => handleNotificationOptionChange('all')}
                trackColor={{ false: '#ffffff', true: '#00f0a4' }} // Color when selected
                thumbColor="#ffffff" // Thumb color
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#01778a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  backText: {
    color: 'white',
    fontSize: 18,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    width: '90%', // Adjusted width to make the blue boxes wider
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 2, // Added border width
    borderColor: '#00f0a4', // Added border color to match selected color
  },
  sectionHeader: {
    backgroundColor: '#00f0a4',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionContent: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  volumeSection: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  notificationSection: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  slider: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    color: '#333',
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  notificationOptionText: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
});

export default AudioNotificationScreen;
*/