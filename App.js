import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './SplashScreen';
import Login from './Login';
import Cadastro from './Cadastro';
import EsqueceuSenha from './EsqueceuSenha';
import CodigoVerificacao from './CodigoVerificacao';
import NovaSenha from './NovaSenha';

import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
        <Stack.Screen name="CodigoVerificacao" component={CodigoVerificacao} />
        <Stack.Screen name="NovaSenha" component={NovaSenha} />

        {/* APP PRINCIPAL */}
        <Stack.Screen name="AppTabs" component={AppTabs} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}