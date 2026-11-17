import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

/**
 * Función pura que calcula los estilos derivados de una opción
 */
function getDerivedColors(option, correctAnswer, selected, isRevealed) {
  if (!isRevealed) {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.14)',
      borderColor: 'rgba(255, 255, 255, 0.25)',
      textColor: '#FFFFFF',
      icon: null,
    };
  }

  // Si es la correcta, siempre verde brillante
  if (option === correctAnswer) {
    return {
      backgroundColor: '#16a34a', // Verde esmeralda
      borderColor: '#4ade80',
      textColor: '#FFFFFF',
      icon: '✓',
    };
  }

  // Si es la que el usuario eligió y era errónea, rojo
  if (option === selected) {
    return {
      backgroundColor: '#dc2626', // Rojo
      borderColor: '#f87171',
      textColor: '#FFFFFF',
      icon: '✕',
    };
  }

  // Las otras opciones no elegidas quedan atenuadas
  return {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'transparent',
    textColor: 'rgba(255, 255, 255, 0.45)',
    icon: null,
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
  const { backgroundColor, borderColor, textColor, icon } = getDerivedColors(
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
        <View style={styles.prefixContainer}>
          <Text style={[styles.prefixText, { color: textColor }]}>
            {icon || indexLabel}
          </Text>
        </View>
        <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    marginVertical: 6,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  prefixText: {
    fontSize: 13,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 21,
  },
});
