import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

/**
 * Componente de puntuación con estrella vectorial Lucide.
 */
export const Rating = ({
  rate,
  count,
  size = 14,
  color = '#eab308',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Star size={size} color={color} fill={color} />
      <Text style={[styles.rateText, { color }]}>{rate}</Text>
      {count !== undefined && (
        <Text style={styles.countText}>({count})</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateText: {
    ...typography.bodySmall,
    fontWeight: '700',
    marginLeft: spacing.xs,
  },
  countText: {
    ...typography.caption,
    color: colors.text.muted,
    marginLeft: spacing.xs,
  },
});

export default Rating;
