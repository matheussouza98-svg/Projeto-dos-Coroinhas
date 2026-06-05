import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Perfil from '@/features/home/screens/Perfil';
import NotificacoesScreen from '@/features/perfil/screens/NotificacoesScreen';
import Privacidade from '@/features/perfil/screens/Privacidade';
import ContaScreen from '@/features/perfil/screens/ContaScreen';
import AparenciaScreen from '@/features/perfil/screens/AparenciaScreen';
import Suporte from '@/features/suporte/screens/Suporte';
import PerguntasFrequentes from '@/features/suporte/screens/PerguntasFrequentes';
import FalarCoordenacao from '@/features/suporte/screens/FalarCoordenacao';
import SobreApp from '@/features/suporte/screens/SobreApp';

const Stack = createNativeStackNavigator();

export default function PerfilNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilHome" component={Perfil} />
      <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
      <Stack.Screen name="Privacidade" component={Privacidade} />
      <Stack.Screen name="Conta" component={ContaScreen} />
      <Stack.Screen
        name="Aparencia"
        component={AparenciaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Suporte" component={Suporte} />
      <Stack.Screen name="PerguntasFrequentes" component={PerguntasFrequentes} />
      <Stack.Screen name="FalarCoordenacao" component={FalarCoordenacao} />
      <Stack.Screen name="SobreApp" component={SobreApp} />
    </Stack.Navigator>
  );
}
