import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AnimatedButton from './components/buttons/AnimatedButton';
import SimpleButton from './components/buttons/SimpleButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Template Screen</Text>
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