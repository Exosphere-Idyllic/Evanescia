import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

/**
 * Badge o píldora de estado estilo glassmorphism.
 *
 * @param {'default'|'primary'|'info'|'success'|'warning'|'danger'} variant
 * @param {'sm'|'md'} size
 * @param {React.ComponentType} icon - Icono Lucide opcional
 */
export const Badge = ({
  text,
  variant = 'default',
  size = 'md',
  icon: Icon,
  style,
  textStyle,
  children,
}) => {
  const variantStyles = {
    default: {
      bg: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      color: colors.text.primary,
    },
    primary: {
      bg: colors.status.purpleBg,
      border: colors.status.purpleBorder,
      color: colors.accent.primaryLight,
    },
    info: {
      bg: colors.status.infoBg,
      border: colors.status.infoBorder,
      color: colors.accent.info,
    },
    success: {
      bg: colors.status.successBg,
      border: colors.status.successBorder,
      color: colors.accent.success,
    },
    warning: {
      bg: colors.status.warningBg,
      border: colors.status.warningBorder,
      color: colors.accent.warning,
    },
    danger: {
      bg: colors.status.dangerBg,
      border: colors.status.dangerBorder,
      color: colors.accent.danger,
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: currentVariant.bg,
          borderColor: currentVariant.border,
          paddingVertical: isSm ? 2 : 4,
          paddingHorizontal: isSm ? 8 : 12,
        },
        style,
      ]}
    >
      {Icon && (
        <Icon
          size={isSm ? 12 : 14}
          color={currentVariant.color}
          style={styles.icon}
        />
      )}
      {text ? (
        <Text
          style={[
            styles.text,
            isSm && styles.textSmall,
            { color: currentVariant.color },
            textStyle,
          ]}
        >
          {text}
        </Text>
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: borderRadius.pill,
    borderWidth: 1,
  },
  icon: {
    marginRight: spacing.xs,
  },
  text: {
    ...typography.caption,
    textTransform: 'uppercase',
  },
  textSmall: {
    fontSize: 10,
  },
});

export default Badge;
