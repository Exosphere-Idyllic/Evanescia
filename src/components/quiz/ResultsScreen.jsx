import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Trophy,
  Sparkles,
  PartyPopper,
  ThumbsUp,
  RotateCcw,
  Home,
  CheckCircle2,
} from 'lucide-react-native';
import { GradientBackground } from '../ui/GradientBackground';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { BLOCKS_INFO } from '../../utils/theme';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { gradients } from '../../theme/gradients';

export default function ResultsScreen({
  score,
  total,
  answers,
  gracePoints = 0,
  onRestart,
  onExit,
}) {
  const percentage = Math.round((score / total) * 100);

  let title = '¡Buen intento!';
  let ResultIcon = ThumbsUp;
  let iconColor = colors.accent.info;
  let message = 'Sigue practicando para dominar todos los ejes de cultura general.';

  if (percentage === 100) {
    title = '¡Puntaje Perfecto!';
    ResultIcon = Trophy;
    iconColor = '#FBBF24';
    message = '¡Increíble! Dominas la cultura popular y general a la perfección.';
  } else if (percentage >= 80) {
    title = '¡Excelente Trabajo!';
    ResultIcon = Sparkles;
    iconColor = colors.accent.primaryLight;
    message = 'Tienes un conocimiento muy sólido en la mayoría de los campos.';
  } else if (percentage >= 60) {
    title = '¡Bien Jugado!';
    ResultIcon = PartyPopper;
    iconColor = colors.accent.success;
    message = 'Acertaste más de la mitad. ¡Un desempeño bastante destacado!';
  }

  // Agrupar respuestas por bloque temático
  const blockStats = Object.keys(BLOCKS_INFO)
    .map((blockKey) => {
      const blockQuestions = answers.filter((a) => a.block === blockKey);
      const correctCount = blockQuestions.filter((a) => a.correct).length;
      return {
        key: blockKey,
        ...BLOCKS_INFO[blockKey],
        total: blockQuestions.length,
        correct: correctCount,
      };
    })
    .filter((stat) => stat.total > 0);

  return (
    <GradientBackground colors={gradients.midnight}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={[styles.iconBadge, { borderColor: iconColor }]}>
            <ResultIcon size={44} color={iconColor} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        {/* Tarjeta de puntaje principal */}
        <GlassCard variant="elevated" style={styles.scoreCard} glow glowColor={iconColor}>
          <Text style={styles.scoreNumber}>
            {score}
            <Text style={styles.totalNumber}> / {total}</Text>
          </Text>
          <Text style={styles.scorePercentage}>{percentage}% de aciertos</Text>
          {gracePoints > 0 && (
            <View style={styles.graceRescueBadge}>
              <Sparkles size={14} color="#FDE047" style={{ marginRight: 4 }} />
              <Text style={styles.graceRescueText}>
                +{gracePoints} pts en la Ronda de Gracia
              </Text>
            </View>
          )}
        </GlassCard>

        {/* Desglose por Eje */}
        {blockStats.length > 0 && (
          <GlassCard variant="default" style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Desglose por eje temático</Text>
            {blockStats.map((item) => {
              const ItemIcon = item.Icon;
              const isPerfect = item.correct === item.total;
              return (
                <View key={item.key} style={styles.breakdownRow}>
                  <View style={styles.blockInfoCol}>
                    {ItemIcon && (
                      <ItemIcon
                        size={18}
                        color={colors.accent.primaryLight}
                        style={styles.blockIcon}
                      />
                    )}
                    <Text style={styles.blockName}>{item.name}</Text>
                  </View>
                  <View style={styles.blockScoreCol}>
                    <Text style={styles.blockScoreText}>
                      {item.correct}/{item.total}
                    </Text>
                    {isPerfect && (
                      <CheckCircle2
                        size={15}
                        color={colors.accent.success}
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </View>
                </View>
              );
            })}
          </GlassCard>
        )}

        {/* Botones de acción */}
        <View style={styles.buttonGroup}>
          <Button
            title="Jugar de nuevo"
            onPress={onRestart}
            variant="primary"
            icon={RotateCcw}
            size="lg"
            fullWidth
          />
          <Button
            title="Volver al Inicio"
            onPress={onExit}
            variant="glass"
            icon={Home}
            size="lg"
            fullWidth
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  message: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  scoreCard: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    marginBottom: spacing.xl,
  },
  scoreNumber: {
    fontSize: 52,
    fontWeight: '900',
    color: colors.text.primary,
    letterSpacing: -1,
  },
  totalNumber: {
    fontSize: 26,
    color: colors.text.muted,
    fontWeight: '600',
  },
  scorePercentage: {
    ...typography.body,
    color: colors.accent.success,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  graceRescueBadge: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.45)',
  },
  graceRescueText: {
    ...typography.caption,
    color: '#FDE047',
    fontWeight: '800',
  },
  breakdownCard: {
    width: '100%',
    marginBottom: spacing.xxl,
  },
  breakdownTitle: {
    ...typography.caption,
    color: colors.text.muted,
    letterSpacing: 0.8,
    marginBottom: spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  blockInfoCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  blockIcon: {
    marginRight: spacing.sm,
  },
  blockName: {
    ...typography.bodySmall,
    color: colors.text.primary,
  },
  blockScoreCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockScoreText: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text.primary,
  },
  buttonGroup: {
    width: '100%',
    gap: spacing.md,
  },
});
