import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    RefreshControl,
    SafeAreaView,
} from 'react-native';

const API_URL = 'https://fakestoreapi.com/products';

const Productos = ({ navigation }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [refrescando, setRefrescando] = useState(false);

    useEffect(() => {
        let activo = true;
        fetch(API_URL)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error(`Error en el servidor: ${respuesta.status}`);
                }
                return respuesta.json();
            })
            .then((datos) => {
                if (activo) {
                    setProductos(datos);
                    setCargando(false);
                }
            })
            .catch((err) => {
                if (activo) {
                    setError(err.message || 'No se pudieron cargar los productos');
                    setCargando(false);
                }
            });

        return () => {
            activo = false;
        };
    }, []);

    const refrescar = async () => {
        setRefrescando(true);
        setError(null);
        try {
            const respuesta = await fetch(API_URL);
            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setProductos(datos);
        } catch (err) {
            setError(err.message || 'No se pudieron cargar los productos');
        } finally {
            setRefrescando(false);
        }
    };

    const reintentar = async () => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await fetch(API_URL);
            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setProductos(datos);
        } catch (err) {
            setError(err.message || 'No se pudieron cargar los productos');
        } finally {
            setCargando(false);
        }
    };

    const irADetalle = (producto) => {
        navigation.navigate('DetalleProducto', {
            producto,
            id: producto.id,
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => irADetalle(item)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.thumbnail}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.badgeCategoria}>
                    <Text style={styles.badgeTexto} numberOfLines={1}>
                        {item.category?.toUpperCase()}
                    </Text>
                </View>

                <Text style={styles.titulo} numberOfLines={2}>
                    {item.title}
                </Text>

                {item.rating && (
                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingStar}>★</Text>
                        <Text style={styles.ratingRate}>{item.rating.rate}</Text>
                        <Text style={styles.ratingCount}>({item.rating.count})</Text>
                    </View>
                )}

                <View style={styles.footerRow}>
                    <Text style={styles.precio}>${Number(item.price).toFixed(2)}</Text>
                    <View style={styles.verMasBtn}>
                        <Text style={styles.verMasTexto}>Ver detalle →</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (cargando && !refrescando) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2563eb" />
                <Text style={styles.mensajeCarga}>Cargando catálogo de productos...</Text>
            </View>
        );
    }

    if (error && productos.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorIcono}>⚠️</Text>
                <Text style={styles.errorTitulo}>Algo salió mal</Text>
                <Text style={styles.errorMensaje}>{error}</Text>
                <TouchableOpacity
                    style={styles.reintentarBtn}
                    onPress={reintentar}
                >
                    <Text style={styles.reintentarTexto}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refrescando}
                        onRefresh={refrescar}
                        colors={['#2563eb']}
                        tintColor="#2563eb"
                    />
                }
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitulo}>Explorar Productos</Text>
                        <Text style={styles.headerSubtitulo}>
                            Selecciona cualquier producto para ver especificaciones y comprar
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 16,
    },
    headerTitulo: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0f172a',
    },
    headerSubtitulo: {
        fontSize: 13,
        color: '#64748b',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: 'row',
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    imageContainer: {
        width: 105,
        height: 125,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'space-between',
    },
    badgeCategoria: {
        alignSelf: 'flex-start',
        backgroundColor: '#eff6ff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        marginBottom: 4,
    },
    badgeTexto: {
        fontSize: 10,
        fontWeight: '700',
        color: '#2563eb',
        letterSpacing: 0.5,
    },
    titulo: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
        lineHeight: 19,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingStar: {
        color: '#eab308',
        fontSize: 13,
        marginRight: 3,
    },
    ratingRate: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
    },
    ratingCount: {
        fontSize: 12,
        color: '#94a3b8',
        marginLeft: 4,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    precio: {
        fontSize: 17,
        fontWeight: '800',
        color: '#059669',
    },
    verMasBtn: {
        backgroundColor: '#f8fafc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    verMasTexto: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563eb',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f8fafc',
    },
    mensajeCarga: {
        marginTop: 12,
        fontSize: 14,
        color: '#64748b',
    },
    errorIcono: {
        fontSize: 40,
        marginBottom: 12,
    },
    errorTitulo: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 6,
    },
    errorMensaje: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 16,
    },
    reintentarBtn: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    reintentarTexto: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default Productos;
