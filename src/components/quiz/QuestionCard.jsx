import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HelpCircle } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { BLOCKS_INFO, DIFFICULTY_INFO } from '../../utils/theme';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export default function QuestionCard({ question }) {
  if (!question) return null;

  const blockData = BLOCKS_INFO[question.block] || {
    name: question.block || 'Cultura General',
    Icon: HelpCircle,
  };

  const diffData = DIFFICULTY_INFO[question.difficulty] || {
    label: question.difficulty || 'Normal',
    badgeBg: 'rgba(255, 255, 255, 0.2)',
    badgeBorder: 'rgba(255, 255, 255, 0.3)',
    badgeText: '#FFFFFF',
    Icon: null,
  };

  const BlockIcon = blockData.Icon || HelpCircle;
  const DiffIcon = diffData.Icon;

  return (
    <GlassCard variant="elevated" style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.blockBadge}>
          <BlockIcon size={14} color={colors.accent.primaryLight} style={styles.blockIcon} />
          <Text style={styles.blockName}>{blockData.name}</Text>
        </View>

        <View
          style={[
            styles.diffBadge,
            {
              backgroundColor: diffData.badgeBg,
              borderColor: diffData.badgeBorder,
            },
          ]}
        >
          {DiffIcon && <DiffIcon size={12} color={diffData.badgeText} style={styles.diffIcon} />}
          <Text style={[styles.diffText, { color: diffData.badgeText }]}>
            {diffData.label}
          </Text>
        </View>
      </View>

      <Text style={styles.questionText}>{question.question}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.md,
    minHeight: 140,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  blockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  blockIcon: {
    marginRight: spacing.xs,
  },
  blockName: {
    ...typography.caption,
    color: colors.text.primary,
  },
  diffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  diffIcon: {
    marginRight: 4,
  },
  diffText: {
    ...typography.caption,
    fontWeight: '800',
  },
  questionText: {
    ...typography.h3,
    color: colors.text.primary,
    lineHeight: 25,
  },
});
