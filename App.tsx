import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScrollViewCustom from './src/components/ScrollViewCustom';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollViewCustom />
      <StatusBar style='dark' />
    </GestureHandlerRootView>
  );
}
