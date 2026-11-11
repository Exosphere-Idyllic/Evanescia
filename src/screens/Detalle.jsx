import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Detalle = ({ route }) => {
    // Los datos del personaje llegan como parámetro de navegación
    const { personaje } = route.params;

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri: personaje.imagen }} style={styles.image} />

                <Text style={styles.nombre}>{personaje.nombre}</Text>

                <View style={styles.card}>
                    <Fila etiqueta="Estado" valor={personaje.estado} />
                    <Fila etiqueta="Especie" valor={personaje.especie} />
                    <Fila etiqueta="Género" valor={personaje.genero} />
                    <Fila etiqueta="Origen" valor={personaje.origen} />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

// Componente auxiliar para cada fila de dato
const Fila = ({ etiqueta, valor }) => (
    <View style={styles.fila}>
        <Text style={styles.etiqueta}>{etiqueta}:</Text>
        <Text style={styles.valor}>{valor}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: {
        alignItems: 'center',
        padding: 24,
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 20,
        marginTop: 16,
    },
    nombre: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    card: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: 16,
        padding: 16,
        gap: 12,
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.15)',
        paddingBottom: 10,
    },
    etiqueta: {
        color: '#90e0ef',
        fontSize: 16,
        fontWeight: '600',
    },
    valor: {
        color: '#fff',
        fontSize: 16,
        flexShrink: 1,
        textAlign: 'right',
        marginLeft: 8,
    },
});

export default Detalle;
