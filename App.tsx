import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import InterpolateColors from './src/components/InterpolateColors';

export default function App() {
  return (
    <View style={styles.container}>
      <InterpolateColors />
      <StatusBar style='dark' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
