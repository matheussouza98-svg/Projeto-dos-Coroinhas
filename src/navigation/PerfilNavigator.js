// src/navigation/PerfilNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Perfil from '../screens/home/Perfil';

import Suporte from '../screens/suporte/Suporte';
import PerguntasFrequentes from '../screens/suporte/PerguntasFrequentes';
import FalarCoordenacao from '../screens/suporte/FalarCoordenacao';
import SobreApp from '../screens/suporte/SobreApp';

/* IMPORTA A TELA */
import NotificacoesScreen from '../screens/perfil/NotificacoesScreen';
import Privacidade from '../screens/perfil/Privacidade';
import ContaScreen from '../screens/perfil/ContaScreen';
import AparenciaScreen from '../screens/perfil/AparenciaScreen';

const Stack = createNativeStackNavigator();

export default function PerfilNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {/* PERFIL */}
      <Stack.Screen
        name="PerfilHome"
        component={Perfil}
      />

      {/* NOTIFICAÇÕES */}
      <Stack.Screen
        name="Notificacoes"
        component={NotificacoesScreen}
      />

      {/* PRIVACIDADE */}
      <Stack.Screen
        name="Privacidade"
        component={Privacidade}
      />

      {/* CONTA */}
      <Stack.Screen
        name="Conta"
        component={ContaScreen}
      />

      {/* APARENCIA */}
      <Stack.Screen
        name="Aparencia"
        component={AparenciaScreen}
        options={{ headerShown: false }}
      />

      {/* SUPORTE */}
      <Stack.Screen
        name="Suporte"
        component={Suporte}
      />

      <Stack.Screen
        name="PerguntasFrequentes"
        component={PerguntasFrequentes}
      />

      <Stack.Screen
        name="FalarCoordenacao"
        component={FalarCoordenacao}
      />

      <Stack.Screen
        name="SobreApp"
        component={SobreApp}
      />
    </Stack.Navigator>
  );
}