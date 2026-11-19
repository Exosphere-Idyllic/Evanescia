import React from 'react';
import { View, Share, StyleSheet } from 'react-native';
import { Share2 } from 'lucide-react-native';
import { Button } from './ui/Button';
import { spacing } from '../theme/spacing';

const BotonShare = ({ datos, titulo = 'Compartir perfil' }) => {
  const share = async () => {
    try {
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
        title: titulo,
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
      <Button
        title="Compartir"
        onPress={share}
        variant="glass"
        icon={Share2}
        fullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    width: '100%',
  },
});

export default BotonShare;
