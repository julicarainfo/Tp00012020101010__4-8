import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View,TextInput,Button} from 'react-native';
import axios from 'axios';
import register from './Register';
import { useNavigation } from '@react-navigation/native';
import { route } from '@react-navigation/native';
import { useEffect } from 'react';


export default function Home ({route, navigation}){
    const [perfil,setPefil] = useState([]);
    const {usuario} = route.params; 
    useEffect(()=>{
        setPefil(route.params)
      },[])



    if (perfil.usuario === "") {
        return(
            <View style={styles.container}>
            <Text>Bienvenido </Text>
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
