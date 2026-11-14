import { View, Share, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonShare = ({ datos, titulo = 'Compartir perfil' }) => {

    const share = async () => {
        try {
            // Concatenar los datos del objeto en un solo mensaje
            let mensaje = '';
            if (datos && typeof datos === 'object') {
                mensaje = Object.entries(datos)
                    .map(([clave, valor]) => `${clave.charAt(0).toUpperCase() + clave.slice(1)}: ${valor}`)
                    .join('\n');
            } else if (typeof datos === 'string') {
                mensaje = datos;
            }

            const shareData = await Share.share({
                message: mensaje,
                title: titulo
            });

            if (shareData.action === Share.sharedAction) {
                console.log('Compartido con éxito');
            }

        } catch (error) {
            console.error('Error al compartir:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={share}>
                <Text style={styles.buttonText}>Compartir</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#232A4D',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 160,
    },
    buttonText: {
        color: '#FAF9F8',
        fontWeight: '600',
        fontSize: 15,
        letterSpacing: 0.4,
    },
});

export default BotonShare;