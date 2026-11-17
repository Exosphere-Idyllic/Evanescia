/**
 * Configuración visual de temas, gradientes y metadatos por eje temático y dificultad.
 */

export const BLOCKS_INFO = {
  entertainment: {
    id: 'entertainment',
    name: 'Entretenimiento',
    icon: '🎬',
  },
  history: {
    id: 'history',
    name: 'Historia',
    icon: '📜',
  },
  news: {
    id: 'news',
    name: 'Actualidad',
    icon: '🌍',
  },
  technology: {
    id: 'technology',
    name: 'Tecnología',
    icon: '💻',
  },
  society: {
    id: 'society',
    name: 'Sociedad y Cultura',
    icon: '🎭',
  },
};

export const DIFFICULTY_INFO = {
  easy: {
    label: 'Fácil',
    badgeBg: 'rgba(255, 255, 255, 0.22)',
    badgeText: '#FFFFFF',
  },
  medium: {
    label: 'Intermedia',
    badgeBg: 'rgba(255, 255, 255, 0.28)',
    badgeText: '#FFFFFF',
  },
  hard: {
    label: 'Difícil 🔥',
    badgeBg: 'rgba(239, 68, 68, 0.35)',
    badgeText: '#FEE2E2',
  },
};

/**
 * Retorna los colores para el LinearGradient de fondo según el eje temático y la dificultad.
 * Si es fácil o intermedia, el gradiente es más sutil y luminoso (menos intenso).
 * Si es difícil, el gradiente es profundo, saturado y oscuro, transmitiendo máxima tensión.
 */
export function getThemeGradient(block = 'entertainment', difficulty = 'easy') {
  const gradients = {
    entertainment: {
      easy: ['#472288', '#6b32b8', '#884ec7'],     // Menos intenso, luminoso
      medium: ['#3b1b74', '#581c87', '#7c3aed'],   // Tono medio
      hard: ['#1e0a38', '#2e1065', '#4c1d95'],     // Profundo, oscuro, intenso
    },
    history: {
      easy: ['#784415', '#9a581e', '#bd772c'],     // Ambar cálido y suave
      medium: ['#5c2f0a', '#78350f', '#b45309'],   // Ocre medio
      hard: ['#2e1103', '#451a03', '#78350f'],     // Bronce muy oscuro e intenso
    },
    news: {
      easy: ['#12537c', '#176d9e', '#2389bf'],     // Azul cielo suave
      medium: ['#0c3f61', '#0369a1', '#0284c7'],   // Zafiro
      hard: ['#041d2e', '#082f49', '#0c4a6e'],     // Azul medianoche profundo
    },
    technology: {
      easy: ['#0f5a54', '#15756d', '#1f978d'],     // Teal suave
      medium: ['#0b443f', '#0f766e', '#0d9488'],   // Teal medio
      hard: ['#022120', '#042f2e', '#134e4a'],     // Petróleo muy oscuro
    },
    society: {
      easy: ['#7c1945', '#9f245a', '#c23472'],     // Magenta suave
      medium: ['#630e34', '#831843', '#be185d'],   // Ciruela medio
      hard: ['#320416', '#500724', '#831843'],     // Borgoña oscuro e intenso
    },
  };

  const blockColors = gradients[block] || gradients.entertainment;
  return blockColors[difficulty] || blockColors.easy;
}
