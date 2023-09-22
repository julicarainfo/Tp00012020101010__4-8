import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import usuarioContext from '../context/context';
import { View, Text, TextInput, Button, StyleSheet, handleChange } from 'react-native';
import { Context } from 'react';


export default function CompletarPerfil() {
  const context = useContext(usuarioContext);
  const [validated, setValidated] = useState(false);
  const Navigate = useNavigation();

    useEffect(() => {
      console.log("perfil editarperfil:", context.usuario)
    }, []);

  const handleChange = (event) => {
    context.setUsuario({...values, [event.target.name]:event.target.value 
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log("values editarperfil: ",values)
    axios.put('http://localhost:19006/editarperfil', context.usuario)
      .then(res => {
        Navigate(`/Home`)
      })
      .catch(e => {
        console.log(e.response.status, e.data);
      });
    setValidated(true);
  };

  return (
    <div className='container'>
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text)}
        value={context.usuario.usuario}
      />
      <Text>Apellido:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text)}
        value={context.usuario.apellido}
      />
      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text)}
        value={context.usuario.contrasenna}
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
    resizeMode: 'contain',
    borderWidth: 1,
  },
});
