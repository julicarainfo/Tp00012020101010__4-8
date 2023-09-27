import { useContext, useEffect, useState, Context } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import usuarioContext from '../context/context';
import { View, Text, TextInput, Button, StyleSheet, handleChange } from 'react-native';

export default function CompletarPerfil() {
  const context = useContext(usuarioContext);
  const [validated, setValidated] = useState(false);
  const Navigate = useNavigation();

    useEffect(() => {
      console.log("perfil editarperfil:", context.usuario)
    }, []);

  const handleChange = (event) => {
    console.log("EVENT", event.target);
    console.log("event name", event.target.name);
    context.setUsuario({...context.usuario, [event.target.name] : event.target.value 
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log("values editarperfil: ",context.usuario)
    axios.put('http://localhost:19006/editarperfil', context.usuario)
      .then(res => {
        Navigate.navigate(`Home`)
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
        onChangeText={(text) => handleChange({name, type, text})}
        name="usuario"
        placeholder={context.usuario.usuario}
      />
      <Text>Apellido:</Text>
      <TextInput
        style={styles.input}
        name="apellido"
        onChange={(text) => handleChange(text)}

        placeholder={context.usuario.apellido}
      />
      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        onChange={(text) => handleChange(text)}
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
    resizeMode: 'contain',
    borderWidth: 1,
  },
});
