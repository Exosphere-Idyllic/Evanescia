import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { X, ArrowRight } from 'lucide-react-native';

import { ALL_QUESTIONS } from '../data/questions';
import { useQuiz } from '../hooks/useQuiz';
import { getThemeGradient } from '../utils/theme';
import { ProgressBar } from '../components/ui/ProgressBar';
import QuestionCard from '../components/quiz/QuestionCard';
import OptionButton from '../components/quiz/OptionButton';
import ResultsScreen from '../components/quiz/ResultsScreen';
import GraceScreen from '../components/quiz/GraceScreen';
import { IconButton } from '../components/ui/IconButton';
import { Button } from '../components/ui/Button';
import { spacing } from '../theme/spacing';

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
        {/* Barra superior: Botón salir con icono Lucide y ProgressBar */}
        <View style={styles.topBar}>
          <IconButton
            icon={X}
            onPress={() => navigation.goBack()}
            size="sm"
            variant="glass"
          />

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

          {/* Opciones de respuesta con feedback e iconos Lucide */}
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

          {/* Botón opcional "Siguiente" */}
          {isRevealed && (
            <Button
              title={currentIndex + 1 === total ? 'Ver Resultados' : 'Siguiente'}
              onPress={next}
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
              size="lg"
              fullWidth
              style={styles.nextButton}
            />
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    gap: spacing.md,
  },
  progressWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  optionsContainer: {
    marginVertical: spacing.sm,
  },
  nextButton: {
    marginTop: spacing.md,
  },
});
