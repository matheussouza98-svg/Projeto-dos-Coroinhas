import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Oracoes from '../screens/home/Oracoes';
import OracaoCoroinha from '../screens/oracoes/OracaoCoroinha';

const Stack = createNativeStackNavigator();

export default function OracoesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OracoesHome" component={Oracoes} />
      <Stack.Screen name="OracaoCoroinha" component={OracaoCoroinha} />
    </Stack.Navigator>
  );
}
