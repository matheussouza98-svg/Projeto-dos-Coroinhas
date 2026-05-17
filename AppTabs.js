import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import Inicio from './src/screens/Inicio';

import Escala from './src/screens/Escala';

import Oracoes from './src/screens/Oracoes';

import Perfil from './src/screens/Perfil';

const Tab = createBottomTabNavigator();

export default function AppTabs() {

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarActiveTintColor: '#C89D2A',

        tabBarInactiveTintColor: '#999',

        tabBarStyle: {
          backgroundColor: '#001830',
          borderTopWidth: 0,
          height: 60,
        },

        tabBarIcon: ({ color, size }) => {

          if (route.name === 'Inicio') {
            return (
              <Ionicons
                name="home"
                size={size}
                color={color}
              />
            );
          }

          if (route.name === 'Escala') {
            return (
              <Ionicons
                name="calendar-outline"
                size={size}
                color={color}
              />
            );
          }

          if (route.name === 'Oracoes') {
            return (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
              />
            );
          }

          if (route.name === 'Perfil') {
            return (
              <Ionicons
                name="person-outline"
                size={size}
                color={color}
              />
            );
          }
        },
      })}
    >

      <Tab.Screen
        name="Inicio"
        component={Inicio}
      />

      <Tab.Screen
        name="Escala"
        component={Escala}
      />

      <Tab.Screen
        name="Oracoes"
        component={Oracoes}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
      />

    </Tab.Navigator>
  );
}