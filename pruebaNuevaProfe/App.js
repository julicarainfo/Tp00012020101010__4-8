import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,Button} from 'react-native';
import axios from 'axios';
import Login from './Components/Login';
import Register from './Components/Register';
import CompletarPerfil from './Components/CompletarPerfil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import Perfil from './Components/Perfil';
import { Context } from 'react';
import usuarioContext from './context/context';
import VerDetalle from './Components/verDetalle';

const Stack = createNativeStackNavigator();

export default function App() {
 const [usuario, setUsuario] = useState();
  return (
    <usuarioContext.Provider value={{usuario, setUsuario}}>
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="CompletarPerfil" component={CompletarPerfil} />
        <Stack.Screen name="VerDetalle" component={VerDetalle} />
      </Stack.Navigator>
    </NavigationContainer>
    </usuarioContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});

