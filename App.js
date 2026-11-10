import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Imagen from './src/screens/Imagen';

export default function App() {
  return (
    <View style={styles.container}>
      <Imagen />     
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#795772',
    alignItems: 'center',
    justifyContent: 'center',
  },
});