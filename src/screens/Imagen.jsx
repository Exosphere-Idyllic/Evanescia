import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Imagen = ({ navigation }) => {
    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    fetchImages();
    }, []); 

    const fetchImages = async () => {
    try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://rickandmortyapi.com/api/character');
            if (!response.ok) throw new Error('No se pudo obtener la lista');

        const data = await response.json();

        const filtrados = data.results.map((p) => ({
            id: p.id,
            nombre: p.name,
            imagen: p.image,
            estado: p.status,
            especie: p.species,
            genero: p.gender,
            origen: p.origin.name,
        }));

        setPersonajes(filtrados);
        } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    };

    const renderItem = ({ item }) => (
    <View style={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.image} />
        <View style={styles.info}>
            <Text style={styles.name}>{item.nombre}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Detalle', { personaje: item })}
            >
                <Text style={styles.buttonText}>Ver Detalle</Text>
            </TouchableOpacity>
        </View>
    </View>
    );


    if (loading) {
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Cargando personajes...</Text>
        </LinearGradient>
    );
    }

    if (error) {
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.center}>
        <Text style={styles.errorText}> {error}</Text>
        </LinearGradient>
    );
    }

  // 
    return (
    <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
    >
        <FlatList
        data={personajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        />
    </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    },
    list: { padding: 16 },
    card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    },
    image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
    },
    info: {
    flex: 1,
    marginLeft: 16,
    },
    name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,           // evita desbordar nombres largos
    marginBottom: 8,
    },
    button: {
    backgroundColor: '#00b4d8',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    },
    buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    },
    loadingText: { color: '#fff', marginTop: 12, fontSize: 14 },
    errorText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});

export default Imagen;
