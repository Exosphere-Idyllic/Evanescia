import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import OptionButton from './OptionButton';

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

  return (
    <LinearGradient
      colors={['#070712', '#1b0a2e', '#2c104d', '#0c0414']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {/* Barra superior */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={onRetire}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.exitButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.badgeRow}>
            <View style={styles.graceBadge}>
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
              <Text style={styles.disclaimerIcon}>⚠️</Text>
              <Text style={styles.disclaimerTitle}>PREGUNTAS DEL DESARROLLADOR</Text>
            </View>
            <Text style={styles.disclaimerText}>
              Has entrado a la Ronda de Gracia. Este banco de preguntas es de dificultad extrema y está basado estrictamente en los gustos personales del creador (JoJo, Makeine, Alan Walker, Kotlin y Arknights).
            </Text>
          </View>

          {/* Tarjeta de la Pregunta */}
          <View style={styles.card}>
            <View style={styles.topicBadge}>
              <Text style={styles.topicIcon}>{question.topicIcon || '✨'}</Text>
              <Text style={styles.topicName}>{question.topic || 'Trivia Personal'}</Text>
            </View>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>

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
              <TouchableOpacity
                style={styles.retireEarlyButton}
                activeOpacity={0.8}
                onPress={onRetire}
              >
                <Text style={styles.retireEarlyText}>
                  🏳️ Plantarme y asegurar {effectiveScore} pts
                </Text>
              </TouchableOpacity>
            ) : isCorrect ? (
              <View style={styles.feedbackContainer}>
                <View style={styles.feedbackBannerSuccess}>
                  <Text style={styles.feedbackEmoji}>🌟</Text>
                  <Text style={styles.feedbackTitleSuccess}>¡Respuesta Correcta!</Text>
                  <Text style={styles.feedbackSubSuccess}>
                    Sumaste +1 punto. Tu nota actual es {effectiveScore}/10.
                  </Text>
                </View>

                {isMaxScore ? (
                  <TouchableOpacity
                    style={styles.primaryActionButton}
                    activeOpacity={0.85}
                    onPress={onRetire}
                  >
                    <Text style={styles.primaryActionText}>
                      🏆 ¡Puntaje Máximo! Ver Resultados →
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.buttonStack}>
                    <TouchableOpacity
                      style={styles.primaryActionButton}
                      activeOpacity={0.85}
                      onPress={onContinue}
                    >
                      <Text style={styles.primaryActionText}>
                        Siguiente pregunta (+1 pt en juego) →
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.secondaryActionButton}
                      activeOpacity={0.85}
                      onPress={onRetire}
                    >
                      <Text style={styles.secondaryActionText}>
                        Plantarse y retirarse con {effectiveScore} pts
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.feedbackContainer}>
                <View style={styles.feedbackBannerFailure}>
                  <Text style={styles.feedbackEmoji}>❌</Text>
                  <Text style={styles.feedbackTitleFailure}>Respuesta Incorrecta</Text>
                  <Text style={styles.feedbackSubFailure}>
                    La ronda de gracia concluye aquí. Conservas los puntos obtenidos ({effectiveScore}/10).
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.primaryActionButton}
                  activeOpacity={0.85}
                  onPress={onRetire}
                >
                  <Text style={styles.primaryActionText}>
                    Ver Resultados Finales →
                  </Text>
                </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  exitButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  graceBadge: {
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.45)',
  },
  graceBadgeText: {
    color: '#FDE047',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scoreBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  scoreBadgeSub: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 36,
    flexGrow: 1,
  },
  disclaimerCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  disclaimerIcon: {
    fontSize: 14,
  },
  disclaimerTitle: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  disclaimerText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 17,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  topicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 10,
    marginBottom: 12,
    gap: 5,
  },
  topicIcon: {
    fontSize: 13,
  },
  topicName: {
    color: '#E0E7FF',
    fontSize: 12,
    fontWeight: '600',
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
  },
  optionsContainer: {
    marginVertical: 4,
  },
  actionPanel: {
    marginTop: 16,
  },
  retireEarlyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  retireEarlyText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  feedbackContainer: {
    gap: 12,
  },
  feedbackBannerSuccess: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.35)',
  },
  feedbackEmoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  feedbackTitleSuccess: {
    color: '#86EFAC',
    fontSize: 16,
    fontWeight: '800',
  },
  feedbackSubSuccess: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    marginTop: 2,
    textAlign: 'center',
  },
  feedbackBannerFailure: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.35)',
  },
  feedbackTitleFailure: {
    color: '#FCA5A5',
    fontSize: 16,
    fontWeight: '800',
  },
  feedbackSubFailure: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    marginTop: 2,
    textAlign: 'center',
  },
  buttonStack: {
    gap: 10,
  },
  primaryActionButton: {
    backgroundColor: '#38BDF8',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryActionText: {
    color: '#090D16',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  secondaryActionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
