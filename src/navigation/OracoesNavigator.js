import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Oracoes from '@/features/home/screens/Oracoes';
import OracaoCoroinha from '@/features/oracoes/screens/OracaoCoroinha';
import RespostasMissa from '@/features/oracoes/screens/RespostasMissa';
import OrdemMissa from '@/features/oracoes/screens/OrdemMissa';
import FuncoesCoroinha from '@/features/oracoes/screens/FuncoesCoroinha';
import SantosDevocoes from '@/features/oracoes/screens/SantosDevocoes';

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
