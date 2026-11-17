import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { ALL_QUESTIONS } from '../data/questions';
import { useQuiz } from '../hooks/useQuiz';
import { getThemeGradient } from '../utils/theme';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import OptionButton from '../components/OptionButton';
import ResultsScreen from '../components/ResultsScreen';
import GraceScreen from '../components/GraceScreen';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ navigation }) {
  const {
    current,
    currentIndex,
    total,
    selected,
    isRevealed,
    status,
    score,
    answers,
    select,
    next,
    restart,

    // Props de Gracia
    graceCurrent,
    graceIndex,
    graceSelected,
    graceResult,
    gracePoints,
    effectiveScore,
    selectGrace,
    continueGrace,
    retireGrace,
  } = useQuiz(ALL_QUESTIONS, 10);

  // Si se activa la ronda de gracia (score < 5 y 50% de probabilidad)
  if (status === 'grace') {
    return (
      <GraceScreen
        question={graceCurrent}
        graceIndex={graceIndex}
        graceResult={graceResult}
        graceSelected={graceSelected}
        effectiveScore={effectiveScore}
        onSelect={selectGrace}
        onContinue={continueGrace}
        onRetire={retireGrace}
      />
    );
  }

  // Si terminó, renderizar pantalla de resultados
  if (status === 'finished') {
    return (
      <>
        <StatusBar style="light" />
        <ResultsScreen
          score={score}
          total={total}
          answers={answers}
          gracePoints={gracePoints}
          onRestart={restart}
          onExit={() => navigation.goBack()}
        />
      </>
    );
  }

  // Gradiente dinámico según el eje temático y la dificultad de la pregunta actual
  const gradientColors = getThemeGradient(current?.block, current?.difficulty);

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {/* Barra superior: Botón salir y ProgressBar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.exitButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.progressWrapper}>
            <ProgressBar current={currentIndex + 1} total={total} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Tarjeta con el eje, dificultad y pregunta */}
          <QuestionCard question={current} />

          {/* Opciones de respuesta */}
          <View style={styles.optionsContainer}>
            {current?.options.map((option, idx) => (
              <OptionButton
                key={`${current.id}_${idx}`}
                option={option}
                indexLabel={OPTION_LABELS[idx] || `${idx + 1}`}
                correctAnswer={current.correctAnswer}
                selected={selected}
                isRevealed={isRevealed}
                onPress={() => select(option)}
              />
            ))}
          </View>

          {/* Botón opcional "Siguiente" para avanzar antes de que termine el delay */}
          {isRevealed && (
            <TouchableOpacity
              style={styles.nextButton}
              activeOpacity={0.8}
              onPress={next}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex + 1 === total ? 'Ver Resultados' : 'Siguiente'} →
              </Text>
            </TouchableOpacity>
          )}
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 12,
  },
  exitButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
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
  progressWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  optionsContainer: {
    marginVertical: 10,
  },
  nextButton: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
