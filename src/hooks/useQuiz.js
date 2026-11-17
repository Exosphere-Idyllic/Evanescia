import { useState, useRef, useEffect, useCallback } from 'react';
import { buildQuiz } from '../utils/buildQuiz';
import { GRACE_QUESTIONS } from '../data/graceQuestions';
import { shouldTriggerGrace, prepareGraceQueue } from '../utils/graceLogic';

const AUTO_ADVANCE_DELAY_MS = 1400; // Delay para apreciar el feedback visual en el quiz normal

export function useQuiz(pool, count = 10) {
  const [quiz, setQuiz] = useState(() => buildQuiz(pool, count));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const timerRef = useRef(null);

  // Estados de la Ronda de Gracia
  const [graceActive, setGraceActive] = useState(false);
  const [graceQueue, setGraceQueue] = useState([]);
  const [graceIndex, setGraceIndex] = useState(0);
  const [graceSelected, setGraceSelected] = useState(null);
  const [graceResult, setGraceResult] = useState(null); // null | 'correct' | 'wrong'
  const [gracePoints, setGracePoints] = useState(0);

  const total = quiz.length;
  const current = quiz[currentIndex] || null;
  const isRevealed = selected !== null;
  const isNormalFinished = total > 0 && currentIndex >= total;

  // Puntaje base derivado exclusivamente del quiz regular
  const baseScore = answers.filter((a) => a.correct).length;
  // Puntaje efectivo acumulando puntos de rescate en la gracia
  const effectiveScore = baseScore + gracePoints;

  // Determinar status general
  const status = !isNormalFinished
    ? 'playing'
    : graceActive
    ? 'grace'
    : 'finished';

  // Limpiar temporizador al desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Función interna para avanzar de pregunta o activar la gracia si corresponde
  const advanceToNext = useCallback(
    (updatedAnswers, targetIndex) => {
      setSelected(null);
      setCurrentIndex(targetIndex);

      if (targetIndex >= total) {
        const finalBaseScore = updatedAnswers.filter((a) => a.correct).length;
        if (shouldTriggerGrace(finalBaseScore)) {
          setGraceQueue(prepareGraceQueue(GRACE_QUESTIONS));
          setGraceIndex(0);
          setGraceActive(true);
        }
      }
    },
    [total]
  );

  const next = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    advanceToNext(answers, currentIndex + 1);
  }, [advanceToNext, answers, currentIndex]);

  const select = useCallback(
    (option) => {
      if (selected !== null || !current) return; // Evitar selecciones múltiples

      const isCorrect = option === current.correctAnswer;
      setSelected(option);

      const updatedAnswers = [
        ...answers,
        {
          id: current.id,
          block: current.block,
          difficulty: current.difficulty,
          question: current.question,
          selected: option,
          correctAnswer: current.correctAnswer,
          correct: isCorrect,
        },
      ];
      setAnswers(updatedAnswers);

      const nextTargetIndex = currentIndex + 1;

      // Delay para mostrar feedback verde/rojo y auto-avanzar
      timerRef.current = setTimeout(() => {
        advanceToNext(updatedAnswers, nextTargetIndex);
        timerRef.current = null;
      }, AUTO_ADVANCE_DELAY_MS);
    },
    [selected, current, answers, currentIndex, advanceToNext]
  );

  // ================= Acciones de la Ronda de Gracia =================
  const graceCurrent = graceQueue[graceIndex] || null;

  const selectGrace = useCallback(
    (option) => {
      if (graceSelected !== null || !graceCurrent) return;

      const isCorrect = option === graceCurrent.correctAnswer;
      setGraceSelected(option);

      if (isCorrect) {
        setGraceResult('correct');
        setGracePoints((prev) => prev + 1);
      } else {
        setGraceResult('wrong');
      }
    },
    [graceSelected, graceCurrent]
  );

  const continueGrace = useCallback(() => {
    const nextScore = effectiveScore;
    const hasNext = graceIndex + 1 < graceQueue.length;

    // Si ya alcanzó 10 puntos o no hay más preguntas, finaliza y consolida
    if (nextScore >= 10 || !hasNext) {
      setGraceActive(false);
      return;
    }

    setGraceSelected(null);
    setGraceResult(null);
    setGraceIndex((prev) => prev + 1);
  }, [effectiveScore, graceIndex, graceQueue.length]);

  const retireGrace = useCallback(() => {
    // El jugador se retira y asegura los puntos sumados hasta ahora
    setGraceActive(false);
  }, []);

  const restart = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setSelected(null);
    setCurrentIndex(0);
    setAnswers([]);
    setQuiz(buildQuiz(pool, count));

    // Resetear estado de gracia
    setGraceActive(false);
    setGraceQueue([]);
    setGraceIndex(0);
    setGraceSelected(null);
    setGraceResult(null);
    setGracePoints(0);
  }, [pool, count]);

  return {
    quiz,
    current,
    currentIndex,
    total,
    selected,
    isRevealed,
    status,
    score: effectiveScore,
    baseScore,
    answers,
    select,
    next,
    restart,

    // Props de Gracia
    graceActive,
    graceCurrent,
    graceIndex,
    graceTotal: graceQueue.length,
    graceSelected,
    graceResult,
    gracePoints,
    effectiveScore,
    selectGrace,
    continueGrace,
    retireGrace,
  };
}
