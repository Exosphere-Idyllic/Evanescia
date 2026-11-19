/**
 * Pool de preguntas de gracia extremadamente específicas sobre los gustos del desarrollador.
 * Temas:
 * - JoJo's Bizarre Adventure (2)
 * - Too Many Losing Heroines! / Makeine (2)
 * - Alan Walker (2)
 * - Kotlin (2)
 * - Arknights (2)
 */

export const GRACE_QUESTIONS = [
  {
    id: 'grace_jojo_1',
    block: 'grace',
    topic: "JoJo's Bizarre Adventure",
    topicIcon: 'Theater',
    difficulty: 'hard',
    question: 'En la novela ligera "JORGE JOESTAR", ¿qué personaje revela ser el creador original de las Flechas Stand?',
    correctAnswer: 'Kars',
    distractors: ['Dio Brando', 'Yoshikage Kira', 'Funny Valentine'],
  },
  {
    id: 'grace_jojo_2',
    block: 'grace',
    topic: "JoJo's Bizarre Adventure",
    topicIcon: 'Theater',
    difficulty: 'hard',
    question: '¿Cuál es el nombre del Stand de Takuma Hasumi en la novela ligera "The Book", y cuál es su habilidad principal?',
    correctAnswer: 'The Book (registra automáticamente todo lo que percibe en sus páginas)',
    distractors: [
      'Memory Lane (manipula los recuerdos de quien abra el libro)',
      'Page Turner (reescribe eventos pasados al escribir en él)',
      'The Reader (extrae memorias ajenas a través del tacto)',
    ],
  },
  {
    id: 'grace_makeine_1',
    block: 'grace',
    topic: 'Makeine: Too Many Losing Heroines!',
    topicIcon: 'BookOpen',
    difficulty: 'hard',
    question: '¿Qué heroína se convirtió en la primera (y única, hasta ahora) "heroína ganadora" en aparecer en la portada de una novela ligera de Makeine (Vol. 6)?',
    correctAnswer: 'Koto Tsukinoki',
    distractors: ['Anna Yanami', 'Lemon Yakishio', 'Chika Komari'],
  },
  {
    id: 'grace_makeine_2',
    block: 'grace',
    topic: 'Makeine: Too Many Losing Heroines!',
    topicIcon: 'BookOpen',
    difficulty: 'hard',
    question: 'Según reveló el autor Takibi Amamori, ¿qué anime de Studio Trigger fue una influencia clave e inesperada para la creación de Makeine?',
    correctAnswer: 'DARLING in the FRANXX',
    distractors: ['Kill la Kill', 'Little Witch Academia', 'Cyberpunk: Edgerunners'],
  },
  {
    id: 'grace_alan_1',
    block: 'grace',
    topic: 'Alan Walker',
    topicIcon: 'Headphones',
    difficulty: 'hard',
    question: 'Antes de convertirse en el éxito vocal "Faded", la canción era una pista instrumental lanzada en 2014. ¿Cuál era su nombre original?',
    correctAnswer: 'Fade',
    distractors: ['Spectre', 'Force', 'Hope'],
  },
  {
    id: 'grace_alan_2',
    block: 'grace',
    topic: 'Alan Walker',
    topicIcon: 'Headphones',
    difficulty: 'hard',
    question: '¿Cuál es el nombre del sello discográfico de YouTube que lanzó por primera vez la canción "Fade" de Alan Walker?',
    correctAnswer: 'NoCopyrightSounds (NCS)',
    distractors: ['Monstercat', "Spinnin' Records", 'Trap Nation'],
  },
  {
    id: 'grace_kotlin_1',
    block: 'grace',
    topic: 'Kotlin',
    topicIcon: 'Code',
    difficulty: 'hard',
    question: '¿Qué idioma humano fue el responsable del bug KT-13631 en el compilador de Kotlin por la peculiaridad de su letra "i" y tardó 5 años en resolverse?',
    correctAnswer: 'El idioma turco',
    distractors: ['El idioma alemán', 'El idioma ruso', 'El idioma griego'],
  },
  {
    id: 'grace_kotlin_2',
    block: 'grace',
    topic: 'Kotlin',
    topicIcon: 'Code',
    difficulty: 'hard',
    question: '¿De qué isla situada en el Golfo de Finlandia toma su nombre el lenguaje de programación Kotlin?',
    correctAnswer: 'Isla de Kotlin',
    distractors: ['Isla de Java', 'Isla de Sajalín', 'Isla de Valaam'],
  },
  {
    id: 'grace_arknights_1',
    block: 'grace',
    topic: 'Arknights',
    topicIcon: 'Gamepad2',
    difficulty: 'hard',
    question: '¿Qué operadora de Arknights es la única que no aparece en su propio primer registro de operador, titulado "Merry Christmas!"?',
    correctAnswer: 'Specter',
    distractors: ['Skadi', 'Gladiia', 'Texas'],
  },
  {
    id: 'grace_arknights_2',
    block: 'grace',
    topic: 'Arknights',
    topicIcon: 'Gamepad2',
    difficulty: 'hard',
    question: '¿Qué operadora es la única miembro de los Cazadores Abisales (Abyssal Hunters) que está clasificada como "Infectada" de Oripathy?',
    correctAnswer: 'Specter',
    distractors: ['Skadi', 'Gladiia', 'Ulpianus'],
  },
];
