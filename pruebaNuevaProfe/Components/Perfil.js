import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'; // Usamos ScrollView para permitir desplazamiento si es necesario
import { useNavigation } from '@react-navigation/native';
import usuarioContext from '../context/context';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Perfil() {
  const navigation = useNavigation();
  const context = useContext(usuarioContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon name="user-circle" size={50} color="#000" style={styles.icon} />

      <View style={styles.userInfo}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{context.usuario.usuario}</Text>

        <Text style={styles.label}>Apellido:</Text>
        <Text style={styles.value}>{context.usuario.apellido || 'Completa tu perfil'}</Text>

        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{context.usuario.telefono || 'Completa tu perfil'}</Text>
      </View>

      <Button
        title={context.usuario.apellido ? 'Edita tu perfil' : 'Completa tu perfil'}
        onPress={() => navigation.navigate('CompletarPerfil')}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});