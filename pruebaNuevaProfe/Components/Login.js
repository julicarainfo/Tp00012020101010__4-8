import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import register from './Register';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import usuarioContext from '../context/context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default function Login() {
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
const auth = getAuth(app); 
  const navigation = useNavigation();
  const [mail, setMail] = React.useState('');
  const [Usuario, setUsuario] = React.useState('');
  const [contrasenna, setcontrasenna] = React.useState('');
  const context = useContext(usuarioContext);

  const cambiarContendioU = (t) => {
    setUsuario(t)
  }
  const cambiarContendioC = (c) => {
    setcontrasenna(c)
  }
  const handleClick = async () => {
    let nuevoUsuario = {
      mail: mail,
      contrasenna: contrasenna,
    };
    console.log("usuario:", nuevoUsuario)
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, mail, contrasenna)
      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Errores: ", errorCode," ", errorMessage)
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Ingrese su usuario'
        onChangeText={text => cambiarContendioU(text)}
        value={mail}
      />
      <TextInput
        style={styles.input}
        placeholder='Ingrese su contrasenna'
        onChangeText={c => cambiarContendioC(c)}
        secureTextEntry={true}
        value={contrasenna}
      />

      <Button onPress={handleClick} title="Ingresar" style={styles}></Button>
      <Button
      style={styles}
        title="Registrarse"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    marginTop: "4px",
    marginBottom: "4px",
    borderWidth: 1,
  },
});

