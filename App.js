import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './SplashScreen';

import Login from './src/screens/Login';

import Cadastro from './src/screens/Cadastro';

import EsqueceuSenha from './src/screens/EsqueceuSenha';

import CodigoVerificacao from './src/screens/CodigoVerificacao';

import NovaSenha from './src/screens/NovaSenha';

import AppTabs from './AppTabs';
import ConfirmacaoPresenca from './src/screens/ConfirmacaoPresenca';
const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

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

        <Stack.Screen
          name="ConfirmacaoPresenca"
          component={ConfirmacaoPresenca}
        />

        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}