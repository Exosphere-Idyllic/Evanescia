import {
  Clapperboard,
  Scroll,
  Globe,
  Monitor,
  Theater,
  Flame,
  Sparkles,
  Zap,
} from 'lucide-react-native';

/**
 * Configuración visual de temas, gradientes y metadatos por eje temático y dificultad.
 * Usa iconos vectoriales de Lucide en lugar de emojis.
 */

export const BLOCKS_INFO = {
  entertainment: {
    id: 'entertainment',
    name: 'Entretenimiento',
    Icon: Clapperboard,
  },
  history: {
    id: 'history',
    name: 'Historia',
    Icon: Scroll,
  },
  news: {
    id: 'news',
    name: 'Actualidad',
    Icon: Globe,
  },
  technology: {
    id: 'technology',
    name: 'Tecnología',
    Icon: Monitor,
  },
  society: {
    id: 'society',
    name: 'Sociedad y Cultura',
    Icon: Theater,
  },
};

export const DIFFICULTY_INFO = {
  easy: {
    label: 'Fácil',
    badgeBg: 'rgba(0, 242, 195, 0.15)',
    badgeBorder: 'rgba(0, 242, 195, 0.4)',
    badgeText: '#00F2C3',
    Icon: Sparkles,
  },
  medium: {
    label: 'Intermedia',
    badgeBg: 'rgba(29, 140, 248, 0.18)',
    badgeBorder: 'rgba(29, 140, 248, 0.45)',
    badgeText: '#60A5FA',
    Icon: Zap,
  },
  hard: {
    label: 'Difícil',
    badgeBg: 'rgba(253, 93, 147, 0.25)',
    badgeBorder: 'rgba(253, 93, 147, 0.5)',
    badgeText: '#FCA5A5',
    Icon: Flame,
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
      easy: ['#2e155b', '#472288', '#6b32b8'],
      medium: ['#220d47', '#3b1b74', '#581c87'],
      hard: ['#120424', '#1e0a38', '#340f6b'],
    },
    history: {
      easy: ['#4e2908', '#784415', '#9a581e'],
      medium: ['#3b1b05', '#5c2f0a', '#78350f'],
      hard: ['#1c0801', '#2e1103', '#451a03'],
    },
    news: {
      easy: ['#0b3754', '#12537c', '#176d9e'],
      medium: ['#06263b', '#0c3f61', '#0369a1'],
      hard: ['#02121d', '#041d2e', '#082f49'],
    },
    technology: {
      easy: ['#0a3c38', '#0f5a54', '#15756d'],
      medium: ['#062925', '#0b443f', '#0f766e'],
      hard: ['#011514', '#022120', '#042f2e'],
    },
    society: {
      easy: ['#510e2c', '#7c1945', '#9f245a'],
      medium: ['#3e081f', '#630e34', '#831843'],
      hard: ['#20020d', '#320416', '#500724'],
    },
  };

  const blockColors = gradients[block] || gradients.entertainment;
  return blockColors[difficulty] || blockColors.easy;
}
