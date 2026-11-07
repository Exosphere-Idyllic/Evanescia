import { useState } from 'react';
import {View,Text,Image,TouchableOpacity,TextInput,StyleSheet,ScrollView } from 'react-native';

const Perfil = () => {
    const [perfil, setPerfil] = useState({
    nombre: 'Pablo Aguilar',
    edad: '20',
    ciudad: 'Cuenca',
    profesion: 'Desarrollador de software',
    });

    const [editMode, setEditMode] = useState(false);
    const [draft, setDraft] = useState(perfil);

    const toggleEdit = () => {
    if (editMode) {
        setPerfil(draft); 
    } else {
        setDraft(perfil); 
    }
    setEditMode(!editMode);
    };

const renderField = (label, key) =>
    editMode ? (
        <View style={styles.fieldRow}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={draft[key]}
            onChangeText={(txt) => setDraft({ ...draft, [key]: txt })}
            placeholderTextColor="#7C7B75"
        />
        </View>
    ) : (
        <Text style={styles.info}>
        <Text style={styles.label}>{label}: </Text>
        {perfil[key]}
        </Text>
    );

    return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
        <Image
            source={{
            uri: 'https://animota.net/cdn/shop/files/00095421535_03.jpg?v=1692950795&width=1445',
            }}
            style={styles.avatar}
        />

        <View style={styles.infoCard}>
            {renderField('Nombre', 'nombre')}
            {renderField('Edad', 'edad')}
            {renderField('Ciudad', 'ciudad')}
            {renderField('Profesión', 'profesion')}
        </View>

        <TouchableOpacity style={styles.changeButton} onPress={toggleEdit}>
            <Text style={styles.buttonText}>
            {editMode ? 'Guardar cambios' : 'Editar perfil'}
            </Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
    flexGrow: 1,
    backgroundColor: '#FAF9F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    },
    card: {
    backgroundColor: '#FAF9F8',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#7C7B75',
    shadowColor: '#232A4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    },
    avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 22,
    borderColor: '#795772',
    borderWidth: 2,
    },
    infoCard: {
    width: '100%',
    backgroundColor: '#9294AF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    },
    info: {
    fontSize: 15,
    color: '#232A4D',
    fontWeight: '500',
    marginBottom: 8,
    },
    label: {
    fontWeight: '700',
    color: '#232A4D',
    fontSize: 13,
    marginBottom: 4,
    letterSpacing: 0.3,
    },
    fieldRow: {
    width: '100%',
    marginBottom: 10,
    },
    input: {
    backgroundColor: '#FAF9F8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#232A4D',
    borderWidth: 1,
    borderColor: '#7C7B75',
    },
    changeButton: {
    backgroundColor: '#795772',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 20,
    },
    buttonText: {
    color: '#FAF9F8',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.4,
},
});

export default Perfil;