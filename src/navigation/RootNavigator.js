import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '@/features/splash/screens/SplashScreen';
import Login from '@/features/auth/screens/Login';
import Cadastro from '@/features/auth/screens/Cadastro';
import EsqueceuSenha from '@/features/auth/screens/EsqueceuSenha';
import CodigoVerificacao from '@/features/auth/screens/CodigoVerificacao';
import NovaSenha from '@/features/auth/screens/NovaSenha';
import ConfirmacaoPresenca from '@/features/presenca/screens/ConfirmacaoPresenca';
import NotificacoesScreen from '@/features/perfil/screens/NotificacoesScreen';
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
      <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
    </Stack.Navigator>
  );
}
