import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import EditarPerfil from '../screens/EditarPerfil';
import Imagen from '../screens/Imagen';
import Caja from '../screens/Caja';
import Detalle from '../screens/Detalle';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ title: 'Editar Perfil' }} />
            <Stack.Screen name="Imagen" component={Imagen} options={{ title: 'Imagen' }} />
            <Stack.Screen name="Caja" component={Caja} options={{ title: 'Caja' }} />
            <Stack.Screen name="Detalle" component={Detalle} options={{ title: 'Detalle del Personaje' }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
