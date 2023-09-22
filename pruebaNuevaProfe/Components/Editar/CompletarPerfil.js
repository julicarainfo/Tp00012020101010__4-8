import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import usuarioContext from '../../context/context';
import { View, Text, TextInput, Button, StyleSheet, handleChange } from 'react-native';


function CompletarPerfil() {
  const context = useContext(usuarioContext);
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({});
  const Navigate = useNavigate();
  const perfil = context.usuario;

    useEffect(() => {
      console.log("perfil editarperfil:",perfil)
        setValues({...perfil});
    }, []);

  const handleChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value 
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
    axios.put('http://localhost:19006/editarperfil', values)
      .then(res => {
        context.setUsuarioLogeado(values)
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
        value={nombre}
      />
      <Text>Apellido:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text)}
        value={apellido}
      />
      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text)}
        value={contrasena}
        secureTextEntry={true} // Para ocultar la contraseña
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
    </div>
  );
}

export default CompletarPerfil;