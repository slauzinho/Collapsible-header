import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import FirstTab from './FirstTab';
import AnotherTab from './AnotherTab';
import { createAppContainer } from 'react-navigation';
import MyCustomTopBar from './TopBar';

export default function App() {
  return <MyCustomTopBar />;
}
