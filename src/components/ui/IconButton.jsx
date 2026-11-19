import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { borderRadius } from '../../theme/spacing';

/**
 * Botón circular para acciones con iconos (cerrar, volver, compartir, opciones).
 *
 * @param {React.ComponentType} icon - Componente de icono Lucide
 * @param {'sm'|'md'|'lg'} size - Tamaño del botón ('sm': 36, 'md': 44, 'lg': 52)
 * @param {'glass'|'solid'|'ghost'} variant
 */
export const IconButton = ({
  icon: Icon,
  onPress,
  size = 'md',
  variant = 'glass',
  color = colors.text.primary,
  style,
  disabled = false,
  ...props
}) => {
  const sizeMap = {
    sm: { buttonSize: 36, iconSize: 18 },
    md: { buttonSize: 44, iconSize: 22 },
    lg: { buttonSize: 52, iconSize: 26 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const variantStyles = {
    glass: {
      backgroundColor: colors.glass.backgroundHover,
      borderWidth: 1,
      borderColor: colors.glass.border,
    },
    solid: {
      backgroundColor: colors.background.surface,
      borderWidth: 1,
      borderColor: colors.glass.borderLight,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          width: currentSize.buttonSize,
          height: currentSize.buttonSize,
          borderRadius: borderRadius.pill,
        },
        variantStyles[variant] || variantStyles.glass,
        disabled && styles.disabled,
        style,
      ]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      {...props}
    >
      {Icon && <Icon size={currentSize.iconSize} color={color} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default IconButton;
