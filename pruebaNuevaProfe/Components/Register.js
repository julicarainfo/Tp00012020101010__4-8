import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const navigation = useNavigation();
  const [Mail, setMail] = React.useState('');
  const [contrasenna, setcontrasenna] = React.useState('');

  const cambiarContendioU = (t) => {
    setMail(t)
  }
  const cambiarContendioC = (c) => {
    setcontrasenna(c)
  }
  const  handleClick = () => {
    let nuevoUsuario = {
      mail: Mail,
      contrasenna: contrasenna,
    };
    console.log("usuario:", nuevoUsuario)
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = user;
      const db = getFirestore();
      await setDoc(doc(db, "users", uid), {
        nombre,
        telefono,
        email,
        uid,
      });
      setNombre("");
      setTelefono("");
      setEmail("");
      setPassword("");
      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "El usuario ha sido creado correctamente.",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ha ocurrido un error al crear el usuario.",
      });
    }
  };


  return (
    <View style={styles.container}>
      <Text>
        Registrarse
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Cree un mail de usuario'
        onChangeText={text => cambiarContendioU(text)}
        value={Mail}
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
  input: {
    borderWidth: 1,
  },
});

