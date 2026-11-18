import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    SafeAreaView,
} from 'react-native';

const API_URL = 'https://fakestoreapi.com/products';

const DetalleProducto = ({ route, navigation }) => {
    const { producto: productoInicial, id } = route.params || {};

    const [producto, setProducto] = useState(productoInicial || null);
    const [cargando, setCargando] = useState(!productoInicial && !!id);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!producto && id) {
            let activo = true;
            fetch(`${API_URL}/${id}`)
                .then((respuesta) => {
                    if (!respuesta.ok) {
                        throw new Error(`Error en el servidor: ${respuesta.status}`);
                    }
                    return respuesta.json();
                })
                .then((datos) => {
                    if (activo) {
                        setProducto(datos);
                        setCargando(false);
                    }
                })
                .catch((err) => {
                    if (activo) {
                        setError(err.message || 'No se pudo obtener el detalle del producto');
                        setCargando(false);
                    }
                });

            return () => {
                activo = false;
            };
        }
    }, [id, producto]);

    const handleComprar = () => {
        if (!producto) return;
        Alert.alert(
            '¡Orden Confirmada!',
            `Has seleccionado:\n"${producto.title}"\n\nTotal a pagar: $${Number(producto.price).toFixed(2)}\n\n¿Deseas finalizar la compra?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar Compra',
                    onPress: () => {
                        Alert.alert('¡Éxito!', 'Tu compra ha sido procesada con éxito.', [
                            { text: 'Volver al catálogo', onPress: () => navigation.goBack() },
                        ]);
                    },
                },
            ]
        );
    };

    if (cargando) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2563eb" />
                <Text style={styles.mensajeCarga}>Cargando información del producto...</Text>
            </View>
        );
    }

    if (error || !producto) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorIcono}>⚠️</Text>
                <Text style={styles.errorTitulo}>Producto no encontrado</Text>
                <Text style={styles.errorMensaje}>
                    {error || 'No se pudieron recuperar los datos de este artículo.'}
                </Text>
                <TouchableOpacity
                    style={styles.volverBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.volverTexto}>← Regresar a la lista</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Contenedor de la Imagen Grande */}
                <View style={styles.imageCard}>
                    <Image
                        source={{ uri: producto.image }}
                        style={styles.imagenGrande}
                        resizeMode="contain"
                    />
                </View>

                {/* Encabezado y Categoría */}
                <View style={styles.detallesContainer}>
                    <View style={styles.headerInfo}>
                        <View style={styles.badgeCategoria}>
                            <Text style={styles.badgeTexto}>
                                {producto.category?.toUpperCase()}
                            </Text>
                        </View>

                        {producto.rating && (
                            <View style={styles.ratingBadge}>
                                <Text style={styles.ratingStar}>★</Text>
                                <Text style={styles.ratingRate}>{producto.rating.rate}</Text>
                                <Text style={styles.ratingCount}>
                                    ({producto.rating.count} reseñas)
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Título */}
                    <Text style={styles.titulo}>{producto.title}</Text>

                    {/* Precio Destacado */}
                    <View style={styles.precioCard}>
                        <View>
                            <Text style={styles.precioEtiqueta}>Precio Total</Text>
                            <Text style={styles.precio}>${Number(producto.price).toFixed(2)}</Text>
                        </View>
                        <View style={styles.envioGratisBadge}>
                            <Text style={styles.envioGratisTexto}>✓ Envío gratis</Text>
                        </View>
                    </View>

                    {/* Descripción Completa */}
                    <View style={styles.seccionDescripcion}>
                        <Text style={styles.subtituloSeccion}>Descripción del Producto</Text>
                        <Text style={styles.descripcionTexto}>{producto.description}</Text>
                    </View>

                    {/* Botón de Compra */}
                    <TouchableOpacity
                        style={styles.botonComprar}
                        activeOpacity={0.85}
                        onPress={handleComprar}
                    >
                        <Text style={styles.botonComprarIcono}>💳</Text>
                        <Text style={styles.botonComprarTexto}>Comprar Ahora</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    imageCard: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    imagenGrande: {
        width: '100%',
        height: '100%',
    },
    detallesContainer: {
        padding: 20,
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    badgeCategoria: {
        backgroundColor: '#eff6ff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    badgeTexto: {
        fontSize: 11,
        fontWeight: '700',
        color: '#2563eb',
        letterSpacing: 0.6,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fefce8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fef08a',
    },
    ratingStar: {
        color: '#ca8a04',
        fontSize: 14,
        marginRight: 4,
    },
    ratingRate: {
        fontSize: 13,
        fontWeight: '700',
        color: '#854d0e',
    },
    ratingCount: {
        fontSize: 12,
        color: '#a16207',
        marginLeft: 4,
    },
    titulo: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
        lineHeight: 28,
        marginBottom: 16,
    },
    precioCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    precioEtiqueta: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
        marginBottom: 2,
    },
    precio: {
        fontSize: 26,
        fontWeight: '800',
        color: '#059669',
    },
    envioGratisBadge: {
        backgroundColor: '#ecfdf5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#a7f3d0',
    },
    envioGratisTexto: {
        fontSize: 12,
        fontWeight: '600',
        color: '#059669',
    },
    seccionDescripcion: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    subtituloSeccion: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 10,
    },
    descripcionTexto: {
        fontSize: 15,
        lineHeight: 24,
        color: '#475569',
    },
    botonComprar: {
        backgroundColor: '#2563eb',
        borderRadius: 14,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    botonComprarIcono: {
        fontSize: 18,
        marginRight: 8,
    },
    botonComprarTexto: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
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
    volverBtn: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    volverTexto: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default DetalleProducto;
