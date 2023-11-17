import { useContext, useEffect, useState, Context } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import usuarioContext from '../context/context';
import { View, Text, TextInput, Button, StyleSheet, handleChange } from 'react-native';
import { setDoc, doc, updateDoc, getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import firebaseApp from '../FIreBaseConfig';

export default function CompletarPerfil() {

  const auth = getAuth(firebaseApp); 
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
  const handleSubmit = (event) => {
    let u = {
      uid: context.usuario.user.uid,
      usuario:nombre,
      apellido:apellido,
    }
    context.setUsuario(u);
    event.preventDefault();
    const form = event.currentTarget;
    console.log("USUARIO", context.usuario)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const db = getFirestore(firebaseApp);
    console.log("URMOTHER", db);
    console.log("AHSI", u.uid);
      const fetchData = async () => {
          try {
              const res = await setDoc(doc(db, "users", u.uid), u);
              console.log("RESUPDATE", res);
          } catch (error) {
              console.error(error)
          }
          //navigation.navigate(`Home`)
      };
      fetchData() 
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
