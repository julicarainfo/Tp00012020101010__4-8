import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import register from './Register';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [Usuario, setUsuario] = React.useState('');
  const [contrasenna, setcontrasenna] = React.useState('');

  const cambiarContendioU = (t) => {
    setUsuario(t)
  }
  const cambiarContendioC = (c) => {
    setcontrasenna(c)
  }
  const handleClick = () => {
    let nuevoUsuario = {
      usuario: Usuario,
      contrasenna: contrasenna,
    };
    console.log("usuario:", nuevoUsuario)
    try {
      axios.post("http://localhost:5000/login", nuevoUsuario)
        .then(res => {
          console.log("res.data: ", res.data)
          navigation.navigate('Home', nuevoUsuario.usuario)
        }
        )
    } catch (error) {
      console.log("error")
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Ingrese su texto'
        onChangeText={text => cambiarContendioU(text)}
        value={Usuario}
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
    resizeMode: 'contain',
    borderWidth: 1,
  },
});

