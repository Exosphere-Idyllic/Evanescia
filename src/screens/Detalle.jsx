import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  HeartPulse,
  Dna,
  Users,
  Globe,
  ArrowLeft,
} from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Divider } from '../components/ui/Divider';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { gradients } from '../theme/gradients';

const Detalle = ({ route, navigation }) => {
  const { personaje } = route.params;

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'success';
      case 'dead':
        return 'danger';
      default:
        return 'default';
    }
  };

  const renderFila = (IconComponent, etiqueta, valor) => (
    <View style={styles.fila}>
      <View style={styles.filaLabelContainer}>
        <IconComponent size={16} color={colors.accent.info} style={styles.filaIcon} />
        <Text style={styles.etiqueta}>{etiqueta}</Text>
      </View>
      <Text style={styles.valor}>{valor || 'Desconocido'}</Text>
    </View>
  );

  return (
    <GradientBackground colors={gradients.water}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <GlassCard variant="elevated" style={styles.mainCard} glow glowColor={colors.accent.info}>
          {/* Avatar grande */}
          <Avatar
            uri={personaje.imagen}
            size={160}
            borderColor={colors.accent.info}
            glow
          />

          <Text style={styles.nombre}>{personaje.nombre}</Text>

          <Badge
            text={personaje.estado}
            variant={getStatusVariant(personaje.estado)}
            style={styles.statusBadge}
          />

          <Divider style={styles.divider} />

          {/* Ficha técnica del personaje */}
          <View style={styles.detallesList}>
            {renderFila(HeartPulse, 'Estado vital', personaje.estado)}
            {renderFila(Dna, 'Especie', personaje.especie)}
            {renderFila(Users, 'Género', personaje.genero)}
            {renderFila(Globe, 'Planeta de Origen', personaje.origen)}
          </View>

          <Button
            title="Volver a la Galería"
            onPress={() => navigation.goBack()}
            variant="glass"
            icon={ArrowLeft}
            fullWidth
            style={styles.backButton}
          />
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: spacing.xl,
    paddingVertical: spacing.xxxl,
  },
  mainCard: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    padding: spacing.xl,
  },
  nombre: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  statusBadge: {
    marginTop: spacing.xs,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  detallesList: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.glass.borderLight,
    gap: spacing.md,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filaLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filaIcon: {
    marginRight: spacing.sm,
  },
  etiqueta: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  valor: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: spacing.sm,
  },
  backButton: {
    marginTop: spacing.xl,
  },
});

export default Detalle;
