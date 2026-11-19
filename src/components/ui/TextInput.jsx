import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

/**
 * Campo de texto estilo BLK con borde iluminado al enfocar e icono opcional.
 *
 * @param {string} label - Etiqueta superior
 * @param {React.ComponentType} icon - Icono Lucide opcional a la izquierda
 * @param {string} error - Mensaje de error
 */
export const TextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon: Icon,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
      >
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon
              size={18}
              color={
                error
                  ? colors.accent.danger
                  : isFocused
                  ? colors.accent.primary
                  : colors.text.muted
              }
            />
          </View>
        )}

        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            Icon && styles.inputWithIcon,
            multiline && styles.inputMultiline,
            inputStyle,
          ]}
          {...props}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.glass.border,
    paddingHorizontal: spacing.md,
  },
  inputWrapperFocused: {
    borderColor: colors.accent.primary,
    backgroundColor: 'rgba(186, 84, 245, 0.08)',
  },
  inputWrapperError: {
    borderColor: colors.accent.danger,
    backgroundColor: 'rgba(253, 93, 147, 0.08)',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text.primary,
    paddingVertical: spacing.md,
  },
  inputWithIcon: {
    paddingLeft: spacing.xs,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    ...typography.caption,
    color: colors.accent.danger,
    marginTop: spacing.xs,
  },
});

export default TextInput;
