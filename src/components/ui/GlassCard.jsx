import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

/**
 * Contenedor con efecto glassmorphism oscuro y bordes luminosos sin halos grises en móviles.
 *
 * @param {'default'|'elevated'|'subtle'|'water'} variant - Variante visual de transparencia
 * @param {boolean} glow - Si aplica brillo neón exterior
 * @param {string} glowColor - Color del resplandor si glow=true
 */
export const GlassCard = ({
  children,
  style,
  variant = 'default',
  glow = false,
  glowColor = colors.accent.primary,
  ...props
}) => {
  const variantStyles = {
    default: {
      backgroundColor: colors.glass.background,
      borderColor: glow ? `${glowColor}80` : colors.glass.border,
    },
    elevated: {
      backgroundColor: colors.glass.backgroundElevated,
      borderColor: glow ? `${glowColor}99` : colors.glass.border,
    },
    subtle: {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      borderColor: glow ? `${glowColor}66` : colors.glass.borderLight,
    },
    water: {
      backgroundColor: 'rgba(29, 140, 248, 0.08)',
      borderColor: glow ? `${glowColor}99` : 'rgba(0, 242, 195, 0.25)',
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;
  const glowStyle = glow ? shadows.glow(glowColor) : shadows.none;

  return (
    <View
      style={[
        styles.card,
        selectedVariant,
        glow && { borderWidth: 1.5 },
        glowStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
  },
});

export default GlassCard;
