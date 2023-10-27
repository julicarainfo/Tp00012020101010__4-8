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
import { Context } from 'react';
import usuarioContext from './context/context';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const Stack = createNativeStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyBAOUO-2iFpuApUObu1n3sxnfOJVaHDC-8",
  authDomain: "tpdaifirebase.firebaseapp.com",
  projectId: "tpdaifirebase",
  storageBucket: "tpdaifirebase.appspot.com",
  messagingSenderId: "792894759437",
  appId: "1:792894759437:web:2c02aabf39aede9574ab44",
  measurementId: "G-M8CLK53KGE"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default function App() {
  
  const [usuario,setUsuario] = useState([])   
  const auth = getAuth(app); 
  return (
    <usuarioContext.Provider value={{usuario, setUsuario}}>
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="CompletarPerfil" component={CompletarPerfil} />
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

