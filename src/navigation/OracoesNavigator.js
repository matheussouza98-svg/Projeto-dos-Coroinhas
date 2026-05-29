import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Oracoes from '../screens/home/Oracoes';
import OracaoCoroinha from '../screens/oracoes/OracaoCoroinha';
import RespostasMissa from '../screens/oracoes/RespostasMissa';
import OrdemMissa from '../screens/oracoes/OrdemMissa';
import FuncoesCoroinha from '../screens/oracoes/FuncoesCoroinha';
import SantosDevocoes from '../screens/oracoes/SantosDevocoes';

const Stack = createNativeStackNavigator();

export default function OracoesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OracoesHome" component={Oracoes} />
      <Stack.Screen name="OracaoCoroinha" component={OracaoCoroinha} />
      <Stack.Screen name="RespostasMissa" component={RespostasMissa} />
      <Stack.Screen name="OrdemMissa" component={OrdemMissa} />
      <Stack.Screen name="FuncoesCoroinha" component={FuncoesCoroinha} />
      <Stack.Screen name="SantosDevocoes" component={SantosDevocoes} />
    </Stack.Navigator>
  );
}
