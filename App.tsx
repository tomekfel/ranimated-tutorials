import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import PinchGesture from './src/components/PinchGesture';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PinchGesture />
      <StatusBar style='dark' />
    </GestureHandlerRootView>
  );
}
