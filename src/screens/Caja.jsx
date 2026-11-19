import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ArrowLeft, Construction } from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { gradients } from '../theme/gradients';

const cajaImage = require('../../assets/caja.webp');

const Caja = ({ navigation }) => {
  return (
    <GradientBackground colors={gradients.screenDefault} safe>
      <View style={styles.container}>
        <GlassCard
          variant="elevated"
          glow
          glowColor={colors.accent.primary}
          style={styles.card}
        >
          {/* Badge de estado */}
          <Badge
            text="En desarrollo"
            variant="warning"
            icon={Construction}
            size="sm"
            style={styles.badge}
          />

          {/* Imagen ilustrativa */}
          <View style={styles.imageWrapper}>
            <Image
              source={cajaImage}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Título y Mensaje */}
          <Text style={styles.title}>Caja</Text>
          <Text style={styles.message}>
            Esta funcionalidad aún no se ha implementado. ¡Vuelve pronto para ver las novedades!
          </Text>

          {/* Botón para regresar a Home */}
          <Button
            title="Regresar a Home"
            onPress={() => navigation.navigate('Home')}
            variant="primary"
            icon={ArrowLeft}
            size="lg"
            fullWidth
            style={styles.button}
          />
        </GlassCard>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    padding: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  badge: {
    marginBottom: spacing.md,
  },
  imageWrapper: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  message: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  button: {
    width: '100%',
  },
});

export default Caja;
