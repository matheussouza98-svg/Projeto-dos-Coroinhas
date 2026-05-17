import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Inicio from "../screens/Inicio";
import Perfil from "../screens/Perfil";
import Escala from "../screens/Escala";
import Oracoes from "../screens/Oracoes";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />

        <Stack.Screen
          name="Inicio"
          component={Inicio}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
        />

        <Stack.Screen
          name="Escala"
          component={Escala}
        />

        <Stack.Screen
          name="Oracoes"
          component={Oracoes}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}