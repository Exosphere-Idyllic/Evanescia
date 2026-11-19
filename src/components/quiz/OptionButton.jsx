import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

/**
 * Función pura que calcula los estilos derivados de una opción
 */
function getDerivedColors(option, correctAnswer, selected, isRevealed) {
  if (!isRevealed) {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.18)',
      textColor: colors.text.primary,
      statusIcon: null,
    };
  }

  // Si es la correcta, siempre verde menta / esmeralda
  if (option === correctAnswer) {
    return {
      backgroundColor: 'rgba(0, 242, 195, 0.22)',
      borderColor: colors.accent.success,
      textColor: colors.accent.success,
      statusIcon: 'check',
    };
  }

  // Si es la que el usuario eligió y era errónea, rojo neón
  if (option === selected) {
    return {
      backgroundColor: 'rgba(253, 93, 147, 0.22)',
      borderColor: colors.accent.danger,
      textColor: colors.accent.danger,
      statusIcon: 'x',
    };
  }

  // Las otras opciones no elegidas quedan atenuadas
  return {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'transparent',
    textColor: colors.text.muted,
    statusIcon: null,
  };
}

export default function OptionButton({
  option,
  indexLabel,
  correctAnswer,
  selected,
  isRevealed,
  onPress,
}) {
  const { backgroundColor, borderColor, textColor, statusIcon } = getDerivedColors(
    option,
    correctAnswer,
    selected,
    isRevealed
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isRevealed}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <View style={styles.contentRow}>
        <View
          style={[
            styles.prefixContainer,
            statusIcon === 'check' && styles.prefixSuccess,
            statusIcon === 'x' && styles.prefixDanger,
          ]}
        >
          {statusIcon === 'check' ? (
            <Check size={16} color={colors.accent.success} />
          ) : statusIcon === 'x' ? (
            <X size={16} color={colors.accent.danger} />
          ) : (
            <Text style={[styles.prefixText, { color: textColor }]}>
              {indexLabel}
            </Text>
          )}
        </View>
        <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    marginVertical: spacing.xs,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  prefixSuccess: {
    backgroundColor: 'rgba(0, 242, 195, 0.2)',
    borderColor: colors.accent.success,
  },
  prefixDanger: {
    backgroundColor: 'rgba(253, 93, 147, 0.2)',
    borderColor: colors.accent.danger,
  },
  prefixText: {
    ...typography.buttonSmall,
    fontWeight: '800',
  },
  optionText: {
    flex: 1,
    ...typography.body,
    fontWeight: '600',
  },
});
