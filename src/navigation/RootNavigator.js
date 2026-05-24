import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash/SplashScreen';
import Login from '../screens/auth/Login';
import Cadastro from '../screens/auth/Cadastro';
import EsqueceuSenha from '../screens/auth/EsqueceuSenha';
import CodigoVerificacao from '../screens/auth/CodigoVerificacao';
import NovaSenha from '../screens/auth/NovaSenha';
import ConfirmacaoPresenca from '../screens/presenca/ConfirmacaoPresenca';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
      <Stack.Screen name="CodigoVerificacao" component={CodigoVerificacao} />
      <Stack.Screen name="NovaSenha" component={NovaSenha} />
      <Stack.Screen name="ConfirmacaoPresenca" component={ConfirmacaoPresenca} />
      <Stack.Screen name="AppTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
