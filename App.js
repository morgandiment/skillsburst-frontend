import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AnimatedButton from './components/buttons/AnimatedButton';
import SimpleButton from './components/buttons/SimpleButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <SimpleButton title={"simple button"} message={"message"}></SimpleButton>
      <AnimatedButton title={"animated button"} message={"message"}></AnimatedButton>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
