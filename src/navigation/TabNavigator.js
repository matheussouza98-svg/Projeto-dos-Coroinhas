import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Inicio from '../screens/home/Inicio';
import Escala from '../screens/home/Escala';
import OracoesNavigator from './OracoesNavigator';
import PerfilNavigator from './PerfilNavigator';
import { TAB_BAR } from '../constants';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Inicio: 'home',
  Escala: 'calendar-clear-outline',
  Oracoes: 'notifications-outline',
  Perfil: 'person-outline',
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: TAB_BAR.activeTintColor,
        tabBarInactiveTintColor: TAB_BAR.inactiveTintColor,
        tabBarStyle: {
          backgroundColor: TAB_BAR.backgroundColor,
          borderTopWidth: 0,
          height: TAB_BAR.height,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={TAB_ICONS[route.name]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{ tabBarLabel: 'Início' }}
      />
      <Tab.Screen
        name="Escala"
        component={Escala}
        options={{ tabBarLabel: 'Escala' }}
      />
      <Tab.Screen
        name="Oracoes"
        component={OracoesNavigator}
        options={{ tabBarLabel: 'Orações' }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilNavigator}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}
