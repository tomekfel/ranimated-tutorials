import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Box from './src/components/Box';
import InterpolateScrollView from './src/components/InterpolateScrollView';
import PanGesture from './src/components/PanGesture';

export default function App() {
  return (
    <View style={styles.container}>
      <InterpolateScrollView />
      <StatusBar style='auto' />
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
