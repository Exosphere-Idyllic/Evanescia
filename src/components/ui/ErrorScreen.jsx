import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';
import { GradientBackground } from './GradientBackground';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

/**
 * Pantalla de error con icono Lucide y botón de reintento.
 */
export const ErrorScreen = ({
  title = 'Ha ocurrido un problema',
  message = 'No se pudo cargar la información solicitada.',
  onRetry,
  retryText = 'Reintentar',
  icon: CustomIcon,
}) => {
  const IconToRender = CustomIcon || AlertTriangle;

  return (
    <GradientBackground style={styles.centerContainer}>
      <GlassCard variant="elevated" style={styles.card} glow glowColor={colors.accent.danger}>
        <View style={styles.iconWrapper}>
          <IconToRender size={44} color={colors.accent.danger} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        {onRetry && (
          <Button
            title={retryText}
            onPress={onRetry}
            variant="primary"
            icon={RefreshCw}
            style={styles.retryButton}
          />
        )}
      </GlassCard>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  iconWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.status.dangerBg,
    borderWidth: 1,
    borderColor: colors.status.dangerBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  retryButton: {
    minWidth: 180,
  },
});

export default ErrorScreen;
