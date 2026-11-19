import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { gradients } from '../../theme/gradients';

/**
 * Barra de progreso con relleno en degradado e indicadores de estado.
 */
export const ProgressBar = ({
  current,
  total,
  label = 'Pregunta',
  gradientColors = gradients.primary,
  style,
}) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.counterText}>
          {label} <Text style={styles.boldText}>{current}</Text> de {total}
        </Text>
        <Text style={styles.percentText}>{Math.round(percentage)}%</Text>
      </View>
      <View style={styles.track}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${percentage}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  counterText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  boldText: {
    color: colors.text.primary,
    fontWeight: '700',
  },
  percentText: {
    ...typography.caption,
    color: colors.accent.info,
  },
  track: {
    height: 8,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.pill,
  },
});

export default ProgressBar;
