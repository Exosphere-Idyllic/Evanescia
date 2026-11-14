import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const EditarPerfil = ({ navigation, route }) => {
    const perfilInicial = route?.params?.perfil || {
        nombre: 'Pablo Aguilar',
        edad: '20',
        ciudad: 'Cuenca',
        profesion: 'Desarrollador de software',
        imagen: 'https://animota.net/cdn/shop/files/00095421535_03.jpg?v=1692950795&width=1445',
    };

    const [perfil, setPerfil] = useState(perfilInicial);
    const [cancelaciones, setCancelaciones] = useState(0);

    const procesarResultadoPicker = (result) => {
        if (result.canceled) {
            setCancelaciones((prev) => prev + 1);
            return;
        }

        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];

            // Validación de tamaño (máximo 5 MB si está reportado fileSize)
            if (asset.fileSize && asset.fileSize > MAX_IMAGE_SIZE_BYTES) {
                const tamanoMB = (asset.fileSize / (1024 * 1024)).toFixed(2);
                Alert.alert(
                    'Imagen muy pesada',
                    `La imagen seleccionada pesa ${tamanoMB} MB. El tamaño máximo permitido es de 5 MB.`
                );
                return;
            }

            setPerfil((prev) => ({ ...prev, imagen: asset.uri }));
        }
    };

    const seleccionarDeGaleria = async () => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!status.granted) {
            Alert.alert('Permiso requerido', 'Se requiere permiso para acceder a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        procesarResultadoPicker(result);
    };

    const tomarFoto = async () => {
        const status = await ImagePicker.requestCameraPermissionsAsync();
        if (!status.granted) {
            Alert.alert('Permiso requerido', 'Se requiere permiso para acceder a la cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        procesarResultadoPicker(result);
    };

    const eliminarFoto = () => {
        Alert.alert(
            'Eliminar foto',
            '¿Estás seguro de que deseas eliminar la foto de perfil?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => setPerfil((prev) => ({ ...prev, imagen: null })),
                },
            ]
        );
    };

    const guardarCambios = () => {
        if (route?.params?.onSave) {
            route.params.onSave(perfil);
        }
        navigation.goBack();
    };

    const renderInput = (label, key, keyboardType = 'default') => (
        <View style={styles.fieldRow}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={perfil[key]}
                onChangeText={(txt) => setPerfil({ ...perfil, [key]: txt })}
                placeholderTextColor="#7C7B75"
                keyboardType={keyboardType}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    {/* Contador de cancelaciones en la esquina superior derecha */}
                    <View style={styles.badgeCancelaciones}>
                        <Text style={styles.badgeLabel}>Canceladas</Text>
                        <Text style={styles.badgeCount}>{cancelaciones}</Text>
                    </View>

                    {/* Contenedor circular para el Avatar */}
                    <View style={styles.avatarContainer}>
                        {perfil.imagen ? (
                            <Image source={{ uri: perfil.imagen }} style={styles.avatar} />
                        ) : (
                            <View style={styles.placeholder}>
                                <Text style={styles.placeholderTexto}>Sin Foto</Text>
                            </View>
                        )}
                    </View>

                    {/* Botones para seleccionar / tomar foto */}
                    <View style={styles.botonesRow}>
                        <TouchableOpacity
                            style={[styles.boton, styles.botonPrimario]}
                            onPress={seleccionarDeGaleria}
                        >
                            <Text style={styles.botonTexto}>Galería</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.boton, styles.botonSecundario]}
                            onPress={tomarFoto}
                        >
                            <Text style={styles.botonTextoSecundario}>Cámara</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botón Eliminar Foto de Perfil */}
                    {perfil.imagen && (
                        <TouchableOpacity
                            style={styles.botonEliminar}
                            onPress={eliminarFoto}
                        >
                            <Text style={styles.botonEliminarTexto}>Eliminar foto</Text>
                        </TouchableOpacity>
                    )}

                    {/* Formulario de edición */}
                    <View style={styles.formContainer}>
                        {renderInput('Nombre', 'nombre')}
                        {renderInput('Edad', 'edad', 'numeric')}
                        {renderInput('Ciudad', 'ciudad')}
                        {renderInput('Profesión', 'profesion')}
                    </View>

                    {/* Botón Guardar Cambios */}
                    <TouchableOpacity style={styles.guardarButton} onPress={guardarCambios}>
                        <Text style={styles.guardarButtonText}>Guardar cambios</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditarPerfil;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAF9F8',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 24,
        paddingTop: 36,
        alignItems: 'center',
        width: '100%',
        maxWidth: 380,
        borderWidth: 1,
        borderColor: '#7C7B75',
        shadowColor: '#232A4D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },
    badgeCancelaciones: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#FAF0F0',
        borderColor: '#D9534F',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    badgeLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#D9534F',
    },
    badgeCount: {
        fontSize: 12,
        fontWeight: '700',
        color: '#D9534F',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 1,
        overflow: 'hidden',
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#795772',
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderTexto: {
        color: '#6B7280',
        fontWeight: '600',
    },
    botonesRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
        marginBottom: 10,
    },
    boton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonPrimario: {
        backgroundColor: '#795772',
    },
    botonSecundario: {
        backgroundColor: '#FAF9F8',
        borderWidth: 1,
        borderColor: '#795772',
    },
    botonTexto: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    botonTextoSecundario: {
        color: '#795772',
        fontWeight: '600',
        fontSize: 14,
    },
    botonEliminar: {
        width: '100%',
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D9534F',
        backgroundColor: '#FFF5F5',
        marginBottom: 16,
    },
    botonEliminarTexto: {
        color: '#D9534F',
        fontWeight: '600',
        fontSize: 13,
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#9294AF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
    },
    fieldRow: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontWeight: '700',
        color: '#232A4D',
        fontSize: 13,
        marginBottom: 4,
        letterSpacing: 0.3,
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
    guardarButton: {
        backgroundColor: '#795772',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 16,
        width: '100%',
        alignItems: 'center',
    },
    guardarButtonText: {
        color: '#FAF9F8',
        fontWeight: '600',
        fontSize: 15,
        letterSpacing: 0.4,
    },
});
