import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Pencil, MapPin, Briefcase, Calendar } from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Divider } from '../components/ui/Divider';
import BotonShare from '../components/BotonShare';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { gradients } from '../theme/gradients';

const Perfil = ({ navigation }) => {
  const [perfil, setPerfil] = useState({
    nombre: 'Pablo Aguilar',
    edad: '20',
    ciudad: 'Cuenca',
    profesion: 'Desarrollador de software',
    imagen: 'https://animota.net/cdn/shop/files/00095421535_03.jpg?v=1692950795&width=1445',
  });

  const irAEditarPerfil = () => {
    navigation.navigate('EditarPerfil', {
      perfil,
      onSave: (nuevoPerfil) => {
        setPerfil(nuevoPerfil);
      },
    });
  };

  const renderField = (IconComponent, label, valor) => (
    <View style={styles.fieldRow}>
      <View style={styles.fieldLabelContainer}>
        <IconComponent size={16} color={colors.accent.primaryLight} style={styles.fieldIcon} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <Text style={styles.fieldValue}>{valor}</Text>
    </View>
  );

  return (
    <GradientBackground colors={gradients.screenDefault}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard variant="elevated" style={styles.card} glow glowColor={colors.accent.primary}>
          {/* Avatar con borde neón */}
          <View style={styles.avatarWrapper}>
            <Avatar
              uri={perfil.imagen}
              size={120}
              borderColor={colors.accent.primary}
            />
          </View>

          <Text style={styles.nombre}>{perfil.nombre}</Text>
          <Text style={styles.profesionBadge}>{perfil.profesion}</Text>

          <Divider style={styles.divider} />

          {/* Información en Glass Panel */}
          <View style={styles.infoContainer}>
            {renderField(Calendar, 'Edad', `${perfil.edad} años`)}
            {renderField(MapPin, 'Ciudad', perfil.ciudad)}
            {renderField(Briefcase, 'Profesión', perfil.profesion)}
          </View>

          {/* Acciones */}
          <View style={styles.actionsContainer}>
            <Button
              title="Editar perfil"
              onPress={irAEditarPerfil}
              variant="primary"
              icon={Pencil}
              fullWidth
            />
            <BotonShare datos={perfil} titulo="Perfil de usuario" />
          </View>
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    paddingVertical: spacing.xxxl,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  avatarWrapper: {
    marginBottom: spacing.md,
  },
  nombre: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
  },
  profesionBadge: {
    ...typography.bodySmall,
    color: colors.accent.info,
    marginTop: 2,
    textAlign: 'center',
  },
  divider: {
    marginVertical: spacing.lg,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.glass.borderLight,
    gap: spacing.md,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldIcon: {
    marginRight: spacing.sm,
  },
  fieldLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  fieldValue: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  actionsContainer: {
    width: '100%',
    marginTop: spacing.xl,
  },
});

export default Perfil;
