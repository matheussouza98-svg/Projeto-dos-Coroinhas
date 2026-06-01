// src/navigation/RootNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* SPLASH */
import SplashScreen from '../screens/splash/SplashScreen';

/* AUTH */
import Login from '../screens/auth/Login';
import Cadastro from '../screens/auth/Cadastro';
import EsqueceuSenha from '../screens/auth/EsqueceuSenha';
import CodigoVerificacao from '../screens/auth/CodigoVerificacao';
import NovaSenha from '../screens/auth/NovaSenha';

/* PRESENÇA */
import ConfirmacaoPresenca from '../screens/presenca/ConfirmacaoPresenca';

/* TABS */
import TabNavigator from './TabNavigator';

/* NOVA TELA */
import NotificacoesScreen from '../screens/perfil/NotificacoesScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {/* SPLASH */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      {/* AUTH */}
      <Stack.Screen
        name="Login"
        component={Login}
      />

      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
      />

      <Stack.Screen
        name="EsqueceuSenha"
        component={EsqueceuSenha}
      />

      <Stack.Screen
        name="CodigoVerificacao"
        component={CodigoVerificacao}
      />

      <Stack.Screen
        name="NovaSenha"
        component={NovaSenha}
      />

      {/* PRESENÇA */}
      <Stack.Screen
        name="ConfirmacaoPresenca"
        component={ConfirmacaoPresenca}
      />

      {/* TABS */}
      <Stack.Screen
        name="AppTabs"
        component={TabNavigator}
      />

      {/* NOTIFICAÇÕES */}
      <Stack.Screen
        name="Notificacoes"
        component={NotificacoesScreen}
      />
    </Stack.Navigator>
  );
}