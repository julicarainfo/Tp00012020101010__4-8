import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,Button} from 'react-native';
import axios from 'axios';


export default function Login() {
    const [Usuario, setUsuario] = React.useState('');
    const [Contraseña, setContraseña] = React.useState('');

  const cambiarContendioU = (t) =>{
    setUsuario(t)
  } 
  const cambiarContendioC = (c) =>{
    setContraseña(c)
  } 
  const handleClick = () => {
    let nuevoUsuario = {
      usuario: Usuario,
      contraseña: Contraseña,
    };
    console.log("usuario:", nuevoUsuario)
      axios.post("http://localhost:5000/login",nuevoUsuario)
      .then(res => {
        console.log("res.data: ",res.data)}
      ) 
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
        placeholder='Ingrese su contraseña'
        onChangeText={c => cambiarContendioC(c)}
        secureTextEntry={true}
        value={Contraseña}
      />      
      <Button onPress={handleClick} title="Ingresar" style={styles}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input :{
    resizeMode: 'contain',
    borderWidth: 1,
  },
});

