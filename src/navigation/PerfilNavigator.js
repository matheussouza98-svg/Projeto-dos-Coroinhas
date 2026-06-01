import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Perfil from '../screens/home/Perfil';
import Suporte from '../screens/suporte/Suporte';
import PerguntasFrequentes from '../screens/suporte/PerguntasFrequentes';
import FalarCoordenacao from '../screens/suporte/FalarCoordenacao';
import SobreApp from '../screens/suporte/SobreApp';

const Stack = createNativeStackNavigator();

export default function PerfilNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilHome" component={Perfil} />
      <Stack.Screen name="Suporte" component={Suporte} />
      <Stack.Screen name="PerguntasFrequentes" component={PerguntasFrequentes} />
      <Stack.Screen name="FalarCoordenacao" component={FalarCoordenacao} />
      <Stack.Screen name="SobreApp" component={SobreApp} />
    </Stack.Navigator>
  );
}
