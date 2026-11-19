import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { gradients } from '../../theme/gradients';

/**
 * Botón unificado con soporte para degradados BLK, variantes glass, estados de carga e iconos.
 *
 * @param {'primary'|'info'|'success'|'danger'|'warning'|'glass'|'outline'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {React.ComponentType} icon - Componente de Lucide (ej: ArrowRight, Heart)
 * @param {'left'|'right'} iconPosition
 */
export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  ...props
}) => {
  const isGradient = ['primary', 'info', 'success', 'danger', 'warning'].includes(variant);

  const gradientMap = {
    primary: gradients.primary,
    info: gradients.info,
    success: gradients.success,
    danger: gradients.danger,
    warning: gradients.warning,
  };

  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 14, minHeight: 36, fontSize: 13, iconSize: 15 },
    md: { paddingVertical: 12, paddingHorizontal: 20, minHeight: 46, fontSize: 15, iconSize: 18 },
    lg: { paddingVertical: 16, paddingHorizontal: 28, minHeight: 56, fontSize: 16, iconSize: 20 },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  const getContainerVariantStyle = () => {
    switch (variant) {
      case 'glass':
        return {
          backgroundColor: colors.glass.backgroundHover,
          borderWidth: 1,
          borderColor: colors.glass.border,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.accent.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {};
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.text.muted;
    if (variant === 'outline') return colors.accent.primaryLight;
    if (variant === 'ghost') return colors.text.secondary;
    return colors.text.primary;
  };

  const iconColor = getTextColor();

  const content = (
    <View style={styles.contentRow}>
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} style={styles.loader} />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon
              size={currentSize.iconSize}
              color={iconColor}
              style={title ? styles.iconLeft : null}
            />
          )}
          {title ? (
            <Text
              style={[
                styles.text,
                { fontSize: currentSize.fontSize, color: getTextColor() },
                textStyle,
              ]}
            >
              {title}
            </Text>
          ) : null}
          {Icon && iconPosition === 'right' && (
            <Icon
              size={currentSize.iconSize}
              color={iconColor}
              style={title ? styles.iconRight : null}
            />
          )}
        </>
      )}
    </View>
  );

  if (isGradient && !disabled) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          styles.base,
          fullWidth && styles.fullWidth,
          shadows.sm,
          style,
        ]}
        {...props}
      >
        <LinearGradient
          colors={gradientMap[variant]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradientContainer,
            {
              paddingVertical: currentSize.paddingVertical,
              paddingHorizontal: currentSize.paddingHorizontal,
              minHeight: currentSize.minHeight,
            },
          ]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        getContainerVariantStyle(),
        {
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          minHeight: currentSize.minHeight,
        },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gradientContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  loader: {
    marginHorizontal: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

export default Button;
