import React, { useState, useEffect,useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,Button} from 'react-native';
import axios from 'axios';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import register from './Register';
import { useNavigation } from '@react-navigation/native';
import { route } from '@react-navigation/native';
import { Context } from 'react';
import usuarioContext from '../context/context';

function Home() {
    const [titulo, setTitulo] = useState('');
    const [Productos, setProductos] = useState([]);
    const navigation = useNavigation();
    const context = useContext(usuarioContext);

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(res => {
                setProductos(res.data.products);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const handleChange = (text) => {
        setTitulo(text);
    }

    const handleSubmit = () => {
        if (!titulo) {
            alert("Completa todos los campos");
        } else {
            traerFiltros(`https://dummyjson.com/products/search?q=${titulo}`);
        }
    }

    const traerFiltros = (url) => {
        axios.get(url)
            .then(res => {
                setProductos(res.data.products);
            });
    }
    const verDetalle = (producto) => {
      navigation.navigate('VerDetalle', { Id: producto.id, producto });
  }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>TPPRODUCTOS</Text>
                </View>

                {/* Formulario de búsqueda */}
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese el producto"
                        value={titulo}
                        onChangeText={handleChange}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>FILTRAR</Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de productos */}
                <View style={styles.productList}>
                    {Productos.map(producto => (
                        <TouchableOpacity
                            key={producto.id}
                            style={styles.productItem}
                            onPress={() => navigation.navigate('Detalles', { producto })}
                        >
                            {/* Renderizar la información del producto aquí */}
                            <Text>{producto.title}</Text>
                            {/* ... */}
                        <Button
                         title="Ver detalle"
                         onPress={() => verDetalle(producto)}
                     />
                        </TouchableOpacity>
                    ))}
                </View>
            <Button
                title="Ver perfil"
                onPress={() => navigation.navigate('Perfil')}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 10,
        backgroundColor: '#007bff',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
    },
    form: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    productItem: {
        width: '48%',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
});

export default Home;
