import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#795772',
    alignItems: 'center',
    justifyContent: 'center',
  },
});