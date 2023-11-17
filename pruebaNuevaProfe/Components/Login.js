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
import firebaseApp from '../FIreBaseConfig';

export default function Login() {
  const navigation = useNavigation();
  const [mail, setMail] = React.useState('');
  const [contrasenna, setcontrasenna] = React.useState('');
  const context = useContext(usuarioContext);
  const cambiarContendioU = (t) => {
    setMail(t)
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
      const auth = getAuth(firebaseApp);
      const usuario = await signInWithEmailAndPassword(auth, mail, contrasenna)
      navigation.navigate(`Home`)
      context.setUsuario(usuario);
      console.log("auth: ", usuario);
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

