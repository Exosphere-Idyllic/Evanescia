import { shuffle } from './shuffle.js';

/**
 * Función pura que construye un quiz seleccionando 10 preguntas aleatorias libres del pool
 * y barajando las 4 opciones de respuesta para cada una.
 *
 * @param {Array} pool - Arreglo de preguntas
 * @param {number} count - Cantidad de preguntas (por defecto 10)
 * @returns {Array} Arreglo de preguntas listas para renderizar con options barajadas
 */
export function buildQuiz(pool, count = 10) {
  if (!pool || pool.length === 0) return [];
  
  // Barajado libre de todo el pool de preguntas y tomar las primeras `count`
  const selectedQuestions = shuffle(pool).slice(0, count);

  return selectedQuestions.map((q) => ({
    ...q,
    options: shuffle([q.correctAnswer, ...q.distractors]),
  }));
}
