import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BLOCKS_INFO } from '../utils/theme';

export default function ResultsScreen({ score, total, answers, gracePoints = 0, onRestart, onExit }) {
  const percentage = Math.round((score / total) * 100);

  // Mensaje y medalla según el rendimiento
  let title = '¡Buen intento!';
  let emoji = '👏';
  let message = 'Sigue practicando para dominar todos los ejes de cultura general.';

  if (percentage === 100) {
    title = '¡Puntaje Perfecto!';
    emoji = '🏆';
    message = '¡Increíble! Dominas la cultura popular y general a la perfección.';
  } else if (percentage >= 80) {
    title = '¡Excelente Trabajo!';
    emoji = '🌟';
    message = 'Tienes un conocimiento muy sólido en la mayoría de los campos.';
  } else if (percentage >= 60) {
    title = '¡Bien Jugado!';
    emoji = '🎉';
    message = 'Acertaste más de la mitad. ¡Un desempeño bastante destacado!';
  }

  // Agrupar respuestas por bloque temático
  const blockStats = Object.keys(BLOCKS_INFO).map((blockKey) => {
    const blockQuestions = answers.filter((a) => a.block === blockKey);
    const correctCount = blockQuestions.filter((a) => a.correct).length;
    return {
      key: blockKey,
      ...BLOCKS_INFO[blockKey],
      total: blockQuestions.length,
      correct: correctCount,
    };
  }).filter((stat) => stat.total > 0);

  return (
    <LinearGradient
      colors={['#1e1b4b', '#0f172a', '#020617']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        {/* Círculo / Tarjeta de puntaje principal */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreNumber}>
            {score}
            <Text style={styles.totalNumber}> / {total}</Text>
          </Text>
          <Text style={styles.scorePercentage}>{percentage}% de aciertos</Text>
          {gracePoints > 0 && (
            <View style={styles.graceRescueBadge}>
              <Text style={styles.graceRescueText}>
                ✨ +{gracePoints} pts en la Ronda de Gracia
              </Text>
            </View>
          )}
        </View>

        {/* Desglose por Eje */}
        {blockStats.length > 0 && (
          <View style={styles.breakdownContainer}>
            <Text style={styles.breakdownTitle}>Desglose por eje temático</Text>
            {blockStats.map((item) => (
              <View key={item.key} style={styles.breakdownRow}>
                <View style={styles.blockInfoCol}>
                  <Text style={styles.blockIcon}>{item.icon}</Text>
                  <Text style={styles.blockName}>{item.name}</Text>
                </View>
                <View style={styles.blockScoreCol}>
                  <Text style={styles.blockScoreText}>
                    {item.correct}/{item.total}
                  </Text>
                  <Text style={styles.blockScoreMini}>
                    {item.correct === item.total ? '✓ Perfecto' : ''}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Botones de acción */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={onRestart}
          >
            <Text style={styles.primaryButtonText}>↺ Jugar de nuevo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={onExit}
          >
            <Text style={styles.secondaryButtonText}>Volver al Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 54,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  message: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  scoreCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    marginBottom: 24,
  },
  scoreNumber: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  totalNumber: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, 0.55)',
    fontWeight: '600',
  },
  scorePercentage: {
    color: '#86efac',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
  graceRescueBadge: {
    marginTop: 10,
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.45)',
  },
  graceRescueText: {
    color: '#FDE047',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  breakdownContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  breakdownTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  blockInfoCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  blockIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  blockName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  blockScoreCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  blockScoreText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  blockScoreMini: {
    color: '#86efac',
    fontSize: 11,
    fontWeight: '600',
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
