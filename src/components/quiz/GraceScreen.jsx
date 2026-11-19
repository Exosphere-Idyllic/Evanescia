import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  X,
  AlertTriangle,
  Sparkles,
  Flag,
  Trophy,
  XCircle,
  ArrowRight,
  Theater,
  BookOpen,
  Headphones,
  Code,
  Gamepad2,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OptionButton from './OptionButton';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function GraceScreen({
  question,
  graceIndex,
  graceResult,
  graceSelected,
  effectiveScore,
  onSelect,
  onContinue,
  onRetire,
}) {
  if (!question) return null;

  const isAnswered = graceResult !== null;
  const isCorrect = graceResult === 'correct';
  const isMaxScore = effectiveScore >= 10;

  const topicIconMap = {
    Theater,
    BookOpen,
    Headphones,
    Code,
    Gamepad2,
  };
  const TopicIcon = topicIconMap[question.topicIcon] || Sparkles;

  return (
    <LinearGradient
      colors={['#070712', '#1b0a2e', '#2c104d', '#0c0414']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {/* Barra superior */}
        <View style={styles.topBar}>
          <IconButton icon={X} onPress={onRetire} size="sm" />

          <View style={styles.badgeRow}>
            <View style={styles.graceBadge}>
              <Sparkles size={13} color="#FDE047" style={{ marginRight: 4 }} />
              <Text style={styles.graceBadgeText}>RONDA DE GRACIA #{graceIndex + 1}</Text>
            </View>

            <View style={styles.scoreBadge}>
              <Text style={styles.scoreBadgeText}>
                {effectiveScore} <Text style={styles.scoreBadgeSub}>/ 10</Text>
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* DISCLAIMER OBLIGATORIO SOBRE GUSTOS DEL DESARROLLADOR */}
          <View style={styles.disclaimerCard}>
            <View style={styles.disclaimerHeader}>
              <AlertTriangle size={15} color="#FBBF24" style={{ marginRight: 6 }} />
              <Text style={styles.disclaimerTitle}>PREGUNTAS DEL DESARROLLADOR</Text>
            </View>
            <Text style={styles.disclaimerText}>
              Has entrado a la Ronda de Gracia. Este banco de preguntas es de dificultad extrema y está basado estrictamente en los gustos personales del creador (JoJo, Makeine, Alan Walker, Kotlin y Arknights).
            </Text>
          </View>

          {/* Tarjeta de la Pregunta */}
          <GlassCard variant="elevated" style={styles.card}>
            <View style={styles.topicBadge}>
              <TopicIcon size={14} color="#A78BFA" style={{ marginRight: 6 }} />
              <Text style={styles.topicName}>{question.topic || 'Trivia Personal'}</Text>
            </View>
            <Text style={styles.questionText}>{question.question}</Text>
          </GlassCard>

          {/* Opciones de respuesta */}
          <View style={styles.optionsContainer}>
            {question.options.map((option, idx) => (
              <OptionButton
                key={`${question.id}_${idx}`}
                option={option}
                indexLabel={OPTION_LABELS[idx] || `${idx + 1}`}
                correctAnswer={question.correctAnswer}
                selected={graceSelected}
                isRevealed={isAnswered}
                onPress={() => onSelect(option)}
              />
            ))}
          </View>

          {/* Panel de Decisiones y Confirmación Manual */}
          <View style={styles.actionPanel}>
            {!isAnswered ? (
              <Button
                title={`Plantarme y asegurar ${effectiveScore} pts`}
                onPress={onRetire}
                variant="glass"
                icon={Flag}
                fullWidth
              />
            ) : isCorrect ? (
              <View style={styles.feedbackContainer}>
                <View style={styles.feedbackBannerSuccess}>
                  <Sparkles size={28} color="#86EFAC" style={styles.feedbackIcon} />
                  <Text style={styles.feedbackTitleSuccess}>¡Respuesta Correcta!</Text>
                  <Text style={styles.feedbackSubSuccess}>
                    Sumaste +1 punto. Tu nota actual es {effectiveScore}/10.
                  </Text>
                </View>

                {isMaxScore ? (
                  <Button
                    title="¡Puntaje Máximo! Ver Resultados"
                    onPress={onRetire}
                    variant="info"
                    icon={Trophy}
                    size="lg"
                    fullWidth
                  />
                ) : (
                  <View style={styles.buttonStack}>
                    <Button
                      title="Siguiente pregunta (+1 pt en juego)"
                      onPress={onContinue}
                      variant="info"
                      icon={ArrowRight}
                      iconPosition="right"
                      size="lg"
                      fullWidth
                    />
                    <Button
                      title={`Plantarse y retirarse con ${effectiveScore} pts`}
                      onPress={onRetire}
                      variant="glass"
                      icon={Flag}
                      fullWidth
                    />
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.feedbackContainer}>
                <View style={styles.feedbackBannerFailure}>
                  <XCircle size={28} color="#FCA5A5" style={styles.feedbackIcon} />
                  <Text style={styles.feedbackTitleFailure}>Respuesta Incorrecta</Text>
                  <Text style={styles.feedbackSubFailure}>
                    La ronda de gracia concluye aquí. Conservas los puntos obtenidos ({effectiveScore}/10).
                  </Text>
                </View>

                <Button
                  title="Ver Resultados Finales"
                  onPress={onRetire}
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  size="lg"
                  fullWidth
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  graceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.45)',
  },
  graceBadgeText: {
    ...typography.caption,
    color: '#FDE047',
    fontWeight: '800',
  },
  scoreBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreBadgeText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '800',
  },
  scoreBadgeSub: {
    color: colors.text.muted,
    fontSize: 11,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
  disclaimerCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  disclaimerTitle: {
    ...typography.caption,
    color: '#FBBF24',
    fontWeight: '800',
  },
  disclaimerText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  card: {
    marginBottom: spacing.md,
  },
  topicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  topicName: {
    ...typography.caption,
    color: '#E0E7FF',
  },
  questionText: {
    ...typography.h3,
    color: colors.text.primary,
    lineHeight: 24,
  },
  optionsContainer: {
    marginVertical: spacing.xs,
  },
  actionPanel: {
    marginTop: spacing.lg,
  },
  feedbackContainer: {
    gap: spacing.md,
  },
  feedbackBannerSuccess: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.35)',
  },
  feedbackBannerFailure: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.35)',
  },
  feedbackIcon: {
    marginBottom: spacing.xs,
  },
  feedbackTitleSuccess: {
    ...typography.h3,
    color: '#86EFAC',
  },
  feedbackSubSuccess: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  feedbackTitleFailure: {
    ...typography.h3,
    color: '#FCA5A5',
  },
  feedbackSubFailure: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  buttonStack: {
    gap: spacing.sm,
  },
});
