/**
 * Paleta de colores del sistema de diseño Evanescia.
 * Inspirada en BLK Design System (Creative Tim) con soporte para Dark Glassmorphism.
 */
export const colors = {
  // === Fondos base ===
  background: {
    primary: '#1e1e2f',      // Fondo principal oscuro
    secondary: '#171941',    // Fondo secundario más profundo
    surface: '#27293d',      // Superficie de cards opacas
    elevated: '#2b2d42',     // Superficie elevada
  },

  // === Colores de acento ===
  accent: {
    primary: '#ba54f5',      // Púrpura primario (BLK primary)
    primaryLight: '#e14eca',  // Púrpura claro / rosa neón
    info: '#1d8cf8',         // Azul info
    success: '#00f2c3',      // Verde menta neón
    warning: '#ff8d72',      // Naranja/ámbar
    danger: '#fd5d93',       // Rosa/rojo neón
  },

  // === Texto ===
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.75)',
    muted: 'rgba(255, 255, 255, 0.45)',
    inverse: '#1e1e2f',
  },

  // === Glass / Transparencias (Efecto Cristal y Agua) ===
  glass: {
    background: 'rgba(255, 255, 255, 0.08)',
    backgroundHover: 'rgba(255, 255, 255, 0.12)',
    backgroundElevated: 'rgba(255, 255, 255, 0.14)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderLight: 'rgba(255, 255, 255, 0.04)',
    waterGlow: 'rgba(29, 140, 248, 0.15)',
  },

  // === Estados semánticos en estilo glassmorphism ===
  status: {
    successBg: 'rgba(0, 242, 195, 0.15)',
    successBorder: 'rgba(0, 242, 195, 0.4)',
    dangerBg: 'rgba(253, 93, 147, 0.15)',
    dangerBorder: 'rgba(253, 93, 147, 0.4)',
    warningBg: 'rgba(255, 141, 114, 0.15)',
    warningBorder: 'rgba(255, 141, 114, 0.4)',
    infoBg: 'rgba(29, 140, 248, 0.15)',
    infoBorder: 'rgba(29, 140, 248, 0.4)',
    purpleBg: 'rgba(186, 84, 245, 0.15)',
    purpleBorder: 'rgba(186, 84, 245, 0.4)',
  },
};
