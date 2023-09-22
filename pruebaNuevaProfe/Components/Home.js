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


export default function Home (){
    const [perfil,setPefil] = useState([]);
    const context = useContext(usuarioContext);
    useEffect(()=>{
        setPefil(context.usuario)
      },[])

      console.log("perfil",perfil)

    if (perfil.apellido === null) {
        return(
            <View style={styles.container}>
            <Text>Bienvenido {perfil.usuario}</Text>
            <Button
                title="Completa tu perfil"
                onPress={() => navigation.navigate('Perfil')}
                />
          </View>
        )
    }
    else
        return (
          <View style={styles.container}>
            <Text>Bienvenido {perfil.usuario}  {perfil.apellido}</Text>
          </View>  

        )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    }})
