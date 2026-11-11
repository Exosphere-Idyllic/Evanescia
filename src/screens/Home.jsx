import { View, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
    return (
    <View style={styles.container}>
        <Button
        title="Ir a Perfil"
        onPress={() => navigation.navigate('Perfil')}
        />
        <Button
        title="Ir a Imagen"
        onPress={() => navigation.navigate('Imagen')}
        />
        <Button
        title="Ir a Caja"
        onPress={() => navigation.navigate('Caja')}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
});

export default Home;