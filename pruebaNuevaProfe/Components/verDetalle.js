import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

function VerDetalle({ route }) {
    const [producto, setProducto] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const { Id } = route.params;

        axios.get(`https://dummyjson.com/products/${Id}`)
            .then(function (response) {
                setProducto(response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>TPPRODUCTOS</Text>
            </View>

            <View style={styles.content}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <>
                        <Text style={styles.productName}>Nombre del producto: {producto.title}</Text>
                        <Text style={styles.price}>Precio: {producto.price}</Text>
                        <Image source={{ uri: producto.thumbnail }} style={styles.image} />
                        <Text style={styles.description}>Descripción: {producto.description}</Text>
                    </>
                )}
            </View>
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
    content: {
        padding: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default VerDetalle;