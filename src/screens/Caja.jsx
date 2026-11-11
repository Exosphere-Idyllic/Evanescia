import { Button, View, Text, StyleSheet } from 'react-native';

const Caja = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Caja</Text>
            <Button title="Regresar" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
});

export default Caja;