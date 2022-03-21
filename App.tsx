import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme as _useColorScheme } from 'react-native';

import ColorPicker from './src/components/ColorPicker';

export default function App() {
  const theme = _useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorPicker />
      <StatusBar style={theme ? theme : 'light'} />
    </GestureHandlerRootView>
  );
}
