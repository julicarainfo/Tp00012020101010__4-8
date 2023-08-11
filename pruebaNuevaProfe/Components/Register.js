import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,Button} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function Register({navigation}) {
    const [Usuario, setUsuario] = React.useState('');
    const [contrasenna, setcontrasenna] = React.useState('');

  const cambiarContendioU = (t) =>{
    setUsuario(t)
  } 
  const cambiarContendioC = (c) =>{
    setcontrasenna(c)
  } 
  const handleClick = () => {
    let nuevoUsuario = {
      usuario: Usuario,
      contrasenna: contrasenna,
    };
    console.log("usuario:", nuevoUsuario)
      axios.post("http://localhost:5000/registrarse",nuevoUsuario)
      .then(res => {
        console.log("res.data: ",res.data)}
      ) 
  };
  return (
    <View style={styles.container}>
        <Text>
            Registrarse
        </Text>
      <TextInput
        style={styles.input}
        placeholder='Cree un usuario de usuario'
        onChangeText={text => cambiarContendioU(text)}
        value={Usuario}
      />
      <TextInput
        style={styles.input}
        placeholder='Cree su contrasenna'
        onChangeText={c => cambiarContendioC(c)}
        secureTextEntry={true}
        value={contrasenna}
      />      
      <Button onPress={handleClick} title="Registrarse" style={styles}></Button>
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

