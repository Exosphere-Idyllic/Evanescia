import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { shadows } from '../../theme/shadows';

/**
 * Avatar circular con borde de neón y fallback a icono de Lucide.
 *
 * @param {string} uri - URL de la imagen
 * @param {number} size - Diámetro en píxeles (default: 100)
 * @param {string} borderColor - Color del borde (default: colors.accent.primary)
 */
export const Avatar = ({
  uri,
  size = 100,
  borderColor = colors.accent.primary,
  glow = true,
  style,
  ...props
}) => {
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor,
    borderWidth: 2,
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        glow ? shadows.glow(borderColor, 0.4) : shadows.sm,
        style,
      ]}
      {...props}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { borderRadius: size / 2 }]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            { borderRadius: size / 2, width: size - 4, height: size - 4 },
          ]}
        >
          <User size={size * 0.45} color={colors.text.secondary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.surface,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;
