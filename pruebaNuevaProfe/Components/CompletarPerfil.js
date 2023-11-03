import { useContext, useEffect, useState, Context } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import usuarioContext from '../context/context';
import { View, Text, TextInput, Button, StyleSheet, handleChange } from 'react-native';
import { setDoc, doc, updateDoc, getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default function CompletarPerfil() {
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
  const context = useContext(usuarioContext);
  const [validated, setValidated] = useState(false);
  const [nombre, setNombre] = useState(context.usuario.usuario);
  const [apellido, setApellido] = useState(context.usuario.apellido);
  const [contrasenna, setContra] = useState(context.usuario.contrasenna);
  const Navigate = useNavigation();

    useEffect(() => {
      console.log("perfil editarperfil:", context.usuario)
    }, []);

  const handleChangeName = (v) => {
    setNombre(v)
  }
  const handleChangeApellido = (v) => {
    setApellido(v)
  }
  const handleChangeContra = (v) => {
    setContra(v)
  }
  const handleSubmit = (event) => {
    let u = {
      ID: context.usuario.ID,
      usuario:nombre,
      apellido:apellido,
      contrasenna:contrasenna,
    }
    context.setUsuario(u);
    event.preventDefault();
    const form = event.currentTarget;
    console.log("USUARIO", context.usuario)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const db = getFirestore();
    if (context.usuario.nombre != "" && context.usuario.apellido !="") {
      const fetchData = async () => {
          try {
              await updateDoc(doc(db, "perfil", context.usuario.uid), u);
          } catch (error) {
              console.error(error)
          } finally {
          }
          navigation.navigate(`Home`)
      };
      fetchData() 
  } else {
      const fetchData = async () => {
          try {
              await setDoc(doc(db, "perfil", context.usuario.uid), u);
          } catch (error) {
              console.error(error)
          } finally {
          }
          navigation.navigate(`Home`)
      };
      fetchData() 
  }
   context.setUsuario(u);
    setValidated(true);
  };

  return (
    <div className='container'>
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeName}
        name="usuario"
        placeholder={context.usuario.usuario}
      />
      <Text>Apellido:</Text>
      <TextInput
        style={styles.input}
        name="apellido"
        onChangeText={handleChangeApellido}
        placeholder={context.usuario.apellido}
      />
      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeContra}
        name="contrasenna"
        placeholder={context.usuario.contrasenna}
        secureTextEntry={true} // Para ocultar la contraseña
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
    </div>
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
