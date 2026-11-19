import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  Image as ImageIcon,
  Camera,
  Trash2,
  Save,
  User,
  Calendar,
  MapPin,
  Briefcase,
  XCircle,
} from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { TextInput } from '../components/ui/TextInput';
import { Badge } from '../components/ui/Badge';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { gradients } from '../theme/gradients';

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

  return (
    <GradientBackground colors={gradients.screenDefault} safe edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard variant="elevated" style={styles.card}>
          {/* Badge de cancelaciones con icono Lucide */}
          <View style={styles.badgeContainer}>
            <Badge
              text={`Canceladas: ${cancelaciones}`}
              variant="danger"
              icon={XCircle}
              size="sm"
            />
          </View>

          {/* Avatar con borde neón */}
          <View style={styles.avatarWrapper}>
            <Avatar
              uri={perfil.imagen}
              size={120}
              borderColor={colors.accent.primary}
            />
          </View>

          {/* Botones para seleccionar foto */}
          <View style={styles.botonesFotoRow}>
            <Button
              title="Galería"
              onPress={seleccionarDeGaleria}
              variant="info"
              icon={ImageIcon}
              size="sm"
              style={styles.botonFoto}
            />
            <Button
              title="Cámara"
              onPress={tomarFoto}
              variant="glass"
              icon={Camera}
              size="sm"
              style={styles.botonFoto}
            />
          </View>

          {/* Botón eliminar foto si existe */}
          {perfil.imagen ? (
            <Button
              title="Eliminar foto de perfil"
              onPress={eliminarFoto}
              variant="ghost"
              icon={Trash2}
              size="sm"
              textStyle={{ color: colors.accent.danger }}
              style={styles.botonEliminar}
            />
          ) : null}

          {/* Formulario de edición con Inputs reutilizables */}
          <View style={styles.formContainer}>
            <TextInput
              label="Nombre completo"
              value={perfil.nombre}
              onChangeText={(txt) => setPerfil({ ...perfil, nombre: txt })}
              placeholder="Ingresa tu nombre"
              icon={User}
            />
            <TextInput
              label="Edad"
              value={perfil.edad}
              onChangeText={(txt) => setPerfil({ ...perfil, edad: txt })}
              placeholder="Ingresa tu edad"
              keyboardType="numeric"
              icon={Calendar}
            />
            <TextInput
              label="Ciudad"
              value={perfil.ciudad}
              onChangeText={(txt) => setPerfil({ ...perfil, ciudad: txt })}
              placeholder="Ingresa tu ciudad"
              icon={MapPin}
            />
            <TextInput
              label="Profesión"
              value={perfil.profesion}
              onChangeText={(txt) => setPerfil({ ...perfil, profesion: txt })}
              placeholder="Ingresa tu profesión"
              icon={Briefcase}
            />
          </View>

          {/* Botón Guardar Cambios */}
          <Button
            title="Guardar cambios"
            onPress={guardarCambios}
            variant="primary"
            icon={Save}
            size="lg"
            fullWidth
            style={styles.guardarBtn}
          />
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  avatarWrapper: {
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  botonesFotoRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
    marginBottom: spacing.sm,
  },
  botonFoto: {
    flex: 1,
  },
  botonEliminar: {
    marginBottom: spacing.sm,
  },
  formContainer: {
    width: '100%',
    marginTop: spacing.sm,
  },
  guardarBtn: {
    marginTop: spacing.md,
  },
});

export default EditarPerfil;
