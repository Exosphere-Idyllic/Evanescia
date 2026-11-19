import { Platform } from 'react-native';

/**
 * Sombras y efectos de resplandor (glow) estilo BLK Design System.
 * En móviles evitamos elevation sobre vistas transparentes/degradadas para no generar bordes grises.
 */
export const shadows = {
  none: {},
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    android: {},
    web: {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {},
    web: {
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
    },
    android: {},
    web: {
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
    },
  }),
  glow: (color, opacity = 0.5) =>
    Platform.select({
      ios: {
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: opacity,
        shadowRadius: 14,
      },
      android: {
        // En Android elevation genera un halo gris opaco; el brillo se logra con el borde tintado
      },
      web: {
        boxShadow: `0 0 18px ${color}66`,
      },
    }),
};
