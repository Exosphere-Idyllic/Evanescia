import React from 'react';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import { GradientBackground } from './GradientBackground';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

/**
 * Pantalla o vista de carga unificada con degradado de fondo.
 */
export const LoadingScreen = ({ message = 'Cargando información...' }) => {
  return (
    <GradientBackground style={styles.centerContainer}>
      <ActivityIndicator size="large" color={colors.accent.primary} />
      <Text style={styles.message}>{message}</Text>
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
  message: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default LoadingScreen;
