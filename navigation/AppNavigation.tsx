import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Menu from '@/app/(tabs)/index';
import MapaScreen from '@/app/(tabs)/Mapa';
import CScreen from '@/app/(tabs)/calculadora';

export type StackParamList = {
  Menu: undefined;
  Mapa: undefined;
  Calculadora: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Mapa" component={MapaScreen} />
        <Stack.Screen name="Calculadora" component={CScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}