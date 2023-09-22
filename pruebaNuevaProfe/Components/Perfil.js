import React, { useState, useEffect, handleChange, useNavigate, TextTextInput, Button } from 'react-native';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';

function Perfil() {
  const {state} = useLocation();
  const perfil = state;
  const [values, setValues] = useState({});
  const Navigate = useNavigate();

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
    axios.put('http://localhost:19006/editarPerfil', values)
      .then(res => {
        Navigate(`/perfil/${perfil.Id}`, {state: values})
      })
      .catch(e => {
        console.log(e.response.status, e.data);
      });
    setValidated(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={contrasenia}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Guardar"
        onPress={handleSubmit}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});


export default Perfil;