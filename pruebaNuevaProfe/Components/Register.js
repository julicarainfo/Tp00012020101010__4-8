import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Toast } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, setDoc, doc} from "firebase/firestore"
import firebaseApp from '../FIreBaseConfig';
export default function Register() {
  const auth = getAuth(firebaseApp); 
  const navigation = useNavigation();
  const [mail, setMail] = React.useState('');
  const [contrasenna, setcontrasenna] = React.useState('');
  let nombre = "";
  let apellido ="";
  const cambiarContendioU = (t) => {
    setMail(t)
  }
  const cambiarContendioC = (c) => {
    setcontrasenna(c)
  }
  const  handleClick  = async () => {
    let nuevoUsuario = {
      mail: mail,
      contrasenna: contrasenna,
    };
    console.log("usuario:", nuevoUsuario)
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        mail,
        contrasenna
      );
      const { uid } = user;
      const db = getFirestore(firebaseApp);
      await setDoc(doc(db, "users", user.uid), {
        mail,
        contrasenna,
        uid,
        nombre,
        apellido
      });
      /*Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "El usuario ha sido creado correctamente.",
      });*/
      navigation.navigate(`Login`)
    } catch (error) {
      console.log(error);
      /*Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ha ocurrido un error al crear el usuario.",
      });*/
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
        value={mail}
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

