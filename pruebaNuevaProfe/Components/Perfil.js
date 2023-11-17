import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,Button} from 'react-native';
import axios from 'axios';
import register from './Register';
import { useNavigation } from '@react-navigation/native';
import { route } from '@react-navigation/native';
import { useEffect, useContext } from 'react';
import { Context } from 'react';
import usuarioContext from '../context/context';


export default function Perfil (){
   const navigation = useNavigation();
    const context = useContext(usuarioContext);


    if (context.usuario.apellido === undefined || context.usuario.telefono=== undefined) {
        return(
            <View style={styles.container}>
            <Text>Nombre: {context.usuario.usuario} </Text>
            <Text>Apellido: {context.usuario.apellido}</Text>
            <Text>Telefono: {context.usuario.telefono}</Text>
            <Button
                title="Completa tu perfil"
                onPress={() => navigation.navigate('CompletarPerfil')}
                />
          </View>
        )
    }
    else
        return (
        
          <View style={styles.container}>
            {console.log("apellido", context.usuario.apellido)}
            <Text>Nombre: {context.usuario.usuario} </Text>
            <Text>Apellido: {context.usuario.apellido}</Text>
            <Text>Telefono: {context.usuario.telefono}</Text>
            <Button
                title="Edita tu perfil"
                onPress={() => navigation.navigate('CompletarPerfil')}
                />
          </View>  

        )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    }
    
  })
