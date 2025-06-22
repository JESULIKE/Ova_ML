<template>
  <v-container fluid class="quiz-container">
    <!-- Header del Quiz -->
    <div class="quiz-header mb-6">
      <div class="quiz-progress-section">
        <div class="quiz-info mb-4">
          <h1 class="quiz-title">Quiz: Regresión vs Clasificación</h1>
          <p class="quiz-subtitle">Demuestra tu comprensión de los conceptos aprendidos</p>
        </div>
        
        <div class="progress-info">
          <v-progress-linear
            :model-value="quizProgress"
            color="primary"
            height="12"
            rounded
            class="mb-3"
          ></v-progress-linear>
          <div class="progress-details">
            <span>Pregunta {{ currentQuestionIndex + 1 }} de {{ questions.length }}</span>
            <span>Tiempo: {{ formatTime(timeElapsed) }}</span>
            <span>Puntuación: {{ score }}/{{ questions.length * 10 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido del Quiz -->
    <div v-if="!quizCompleted" class="quiz-content">
      <v-card class="question-card" elevation="8">
        <v-card-title class="question-header">
          <div class="question-number">
            <v-icon color="primary" size="24">mdi-help-circle</v-icon>
            Pregunta {{ currentQuestionIndex + 1 }}
          </div>
          <div class="question-type">
            <v-chip 
              :color="currentQuestion.difficulty === 'easy' ? 'success' : 
                     currentQuestion.difficulty === 'medium' ? 'warning' : 'error'"
              size="small"
            >
              {{ currentQuestion.difficulty === 'easy' ? 'Fácil' : 
                 currentQuestion.difficulty === 'medium' ? 'Medio' : 'Difícil' }}
            </v-chip>
          </div>
        </v-card-title>

        <v-card-text class="question-content">
          <div class="question-text mb-4">
            {{ currentQuestion.question }}
          </div>

          <!-- Escenario adicional si existe -->
          <div v-if="currentQuestion.scenario" class="scenario-box mb-4">
            <v-icon color="info" class="mr-2">mdi-information</v-icon>
            <em>{{ currentQuestion.scenario }}</em>
          </div>

          <!-- Opciones de respuesta -->
          <v-radio-group 
            v-model="selectedAnswer" 
            class="answer-options"
            :disabled="questionAnswered"
          >
            <v-radio
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              :label="option.text"
              :value="option.value"
              :class="getOptionClass(option.value)"
              class="answer-option"
            >
              <template v-slot:label>
                <div class="option-content">
                  <span class="option-text">{{ option.text }}</span>
                  <span v-if="option.explanation && questionAnswered" class="option-explanation">
                    {{ option.explanation }}
                  </span>
                </div>
              </template>
            </v-radio>
          </v-radio-group>

          <!-- Feedback de la respuesta -->
          <div v-if="questionAnswered" class="feedback-section mt-4">
            <v-alert
              :type="isCorrect ? 'success' : 'error'"
              :icon="isCorrect ? 'mdi-check-circle' : 'mdi-close-circle'"
              class="feedback-alert"
            >
              <div class="feedback-content">
                <div class="feedback-title">
                  {{ isCorrect ? '¡Correcto!' : 'Incorrecto' }}
                </div>
                <div class="feedback-explanation">
                  {{ currentQuestion.explanation }}
                </div>
                <div v-if="!isCorrect" class="correct-answer">
                  <strong>Respuesta correcta:</strong> {{ getCorrectAnswerText() }}
                </div>
              </div>
            </v-alert>
          </div>
        </v-card-text>

        <v-card-actions class="question-actions">
          <v-btn
            v-if="currentQuestionIndex > 0"
            color="secondary"
            variant="outlined"
            @click="previousQuestion"
            :disabled="!questionAnswered"
          >
            <v-icon start>mdi-arrow-left</v-icon>
            Anterior
          </v-btn>
          
          <v-spacer></v-spacer>
          
          <v-btn
            v-if="!questionAnswered"
            color="primary"
            variant="flat"
            @click="submitAnswer"
            :disabled="!selectedAnswer"
          >
            Responder
          </v-btn>
          
          <v-btn
            v-else-if="currentQuestionIndex < questions.length - 1"
            color="primary"
            variant="flat"
            @click="nextQuestion"
          >
            Siguiente
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
          
          <v-btn
            v-else
            color="success"
            variant="flat"
            @click="completeQuiz"
          >
            Finalizar Quiz
            <v-icon end>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- Resultados del Quiz -->
    <div v-else class="quiz-results">
      <v-card class="results-card" elevation="12">
        <v-card-title class="results-header text-center">
          <div class="results-icon mb-2">
            <v-icon 
              :color="finalGrade >= 7 ? 'success' : finalGrade >= 5 ? 'warning' : 'error'"
              size="80"
            >
              {{ finalGrade >= 7 ? 'mdi-trophy' : finalGrade >= 5 ? 'mdi-medal' : 'mdi-alert-circle' }}
            </v-icon>
          </div>
          <h2 class="results-title">
            {{ finalGrade >= 7 ? '¡Excelente trabajo!' : finalGrade >= 5 ? '¡Buen intento!' : 'Necesitas repasar' }}
          </h2>
        </v-card-title>

        <v-card-text class="results-content">
          <div class="score-summary">
            <div class="score-circle">
              <v-progress-circular
                :model-value="(score / (questions.length * 10)) * 100"
                size="120"
                width="8"
                :color="finalGrade >= 7 ? 'success' : finalGrade >= 5 ? 'warning' : 'error'"
                class="score-progress"
              >
                <div class="score-text">
                  <div class="score-number">{{ finalGrade }}/10</div>
                  <div class="score-label">Nota</div>
                </div>
              </v-progress-circular>
            </div>

            <div class="score-details">
              <div class="detail-item">
                <v-icon color="success" class="mr-2">mdi-check</v-icon>
                <span>Respuestas correctas: {{ correctAnswers }}</span>
              </div>
              <div class="detail-item">
                <v-icon color="error" class="mr-2">mdi-close</v-icon>
                <span>Respuestas incorrectas: {{ questions.length - correctAnswers }}</span>
              </div>
              <div class="detail-item">
                <v-icon color="info" class="mr-2">mdi-clock</v-icon>
                <span>Tiempo total: {{ formatTime(timeElapsed) }}</span>
              </div>
              <div class="detail-item">
                <v-icon color="primary" class="mr-2">mdi-star</v-icon>
                <span>Puntos ganados: {{ earnedPoints }}</span>
              </div>
            </div>
          </div>

          <!-- Análisis por categoría -->
          <div class="category-analysis mt-6">
            <h3 class="analysis-title">Análisis por Categoría</h3>
            <div class="category-grid">
              <div class="category-item">
                <div class="category-header">
                  <v-icon color="blue" class="mr-2">mdi-trending-up</v-icon>
                  <span>Regresión</span>
                </div>
                <v-progress-linear
                  :model-value="categoryScores.regression"
                  color="blue"
                  height="8"
                  rounded
                ></v-progress-linear>
                <span class="category-score">{{ categoryScores.regression }}%</span>
              </div>
              
              <div class="category-item">
                <div class="category-header">
                  <v-icon color="green" class="mr-2">mdi-format-list-checks</v-icon>
                  <span>Clasificación</span>
                </div>
                <v-progress-linear
                  :model-value="categoryScores.classification"
                  color="green"
                  height="8"
                  rounded
                ></v-progress-linear>
                <span class="category-score">{{ categoryScores.classification }}%</span>
              </div>
            </div>
          </div>

          <!-- Recomendaciones -->
          <div class="recommendations mt-6">
            <h3 class="recommendations-title">Recomendaciones</h3>
            <div class="recommendations-content">
              <div v-for="recommendation in recommendations" :key="recommendation.id" class="recommendation-item">
                <v-icon :color="recommendation.type" class="mr-2">{{ recommendation.icon }}</v-icon>
                <span>{{ recommendation.text }}</span>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="results-actions justify-center">
          <v-btn
            color="secondary"
            variant="outlined"
            prepend-icon="mdi-refresh"
            @click="retakeQuiz"
          >
            Repetir Quiz
          </v-btn>
          
          <v-btn
            color="info"
            variant="outlined"
            prepend-icon="mdi-book-open"
            @click="reviewContent"
          >
            Repasar Contenido
          </v-btn>
          
          <v-btn
            color="primary"
            variant="flat"
            prepend-icon="mdi-arrow-right"
            @click="continueToNext"
            :disabled="finalGrade < 5"
          >
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLearningStore } from '~/stores/learningStore'

const router = useRouter()
const learningStore = useLearningStore()

// Estados reactivos
const currentQuestionIndex = ref(0)
const selectedAnswer = ref('')
const questionAnswered = ref(false)
const isCorrect = ref(false)
const score = ref(0)
const correctAnswers = ref(0)
const timeElapsed = ref(0)
const quizCompleted = ref(false)
const timer = ref(null)

// Preguntas del quiz
const questions = ref([
  {
    id: 1,
    question: "¿Qué tipo de problema de Machine Learning es predecir el precio exacto de una casa?",
    options: [
      { value: 'regression', text: 'Regresión', explanation: 'Correcto, predecir un valor numérico continuo' },
      { value: 'classification', text: 'Clasificación', explanation: 'Incorrecto, esto sería para categorías' },
      { value: 'clustering', text: 'Clustering', explanation: 'Incorrecto, esto es para agrupar datos' },
      { value: 'reinforcement', text: 'Aprendizaje por refuerzo', explanation: 'Incorrecto, esto es para tomar decisiones secuenciales' }
    ],
    correct: 'regression',
    category: 'regression',
    difficulty: 'easy',
    explanation: 'La regresión se usa para predecir valores numéricos continuos como precios, temperaturas, etc.'
  },
  {
    id: 2,
    question: "¿Cuál de estos es un ejemplo típico de clasificación?",
    scenario: "Una empresa quiere automatizar el procesamiento de emails entrantes.",
    options: [
      { value: 'spam_detection', text: 'Detectar si un email es spam o no', explanation: 'Correcto, es clasificación binaria' },
      { value: 'email_length', text: 'Predecir la longitud del email', explanation: 'Incorrecto, esto sería regresión' },
      { value: 'response_time', text: 'Calcular tiempo de respuesta', explanation: 'Incorrecto, esto sería regresión' },
      { value: 'email_size', text: 'Estimar el tamaño del archivo', explanation: 'Incorrecto, esto sería regresión' }
    ],
    correct: 'spam_detection',
    category: 'classification',
    difficulty: 'easy',
    explanation: 'Detectar spam vs no spam es un problema de clasificación binaria con dos categorías discretas.'
  },
  {
    id: 3,
    question: "¿Qué característica distingue principalmente a la regresión de la clasificación?",
    options: [
      { value: 'continuous_output', text: 'La regresión produce salidas continuas', explanation: 'Correcto, valores numéricos en un rango continuo' },
      { value: 'more_complex', text: 'La regresión es más compleja', explanation: 'Incorrecto, ambos pueden ser complejos' },
      { value: 'needs_more_data', text: 'La regresión necesita más datos', explanation: 'Incorrecto, depende del problema específico' },
      { value: 'faster_training', text: 'La regresión entrena más rápido', explanation: 'Incorrecto, depende del algoritmo y datos' }
    ],
    correct: 'continuous_output',
    category: 'regression',
    difficulty: 'medium',
    explanation: 'La diferencia clave es que regresión produce valores continuos mientras clasificación produce categorías discretas.'
  },
  {
    id: 4,
    question: "En un hospital, ¿qué tipo de problema sería predecir la probabilidad de supervivencia de un paciente?",
    scenario: "Un sistema médico analiza datos de pacientes para asistir en decisiones clínicas.",
    options: [
      { value: 'regression', text: 'Regresión', explanation: 'Correcto, probabilidad es un valor continuo entre 0 y 1' },
      { value: 'binary_classification', text: 'Clasificación binaria', explanation: 'Incorrecto, aunque supervivencia es binaria, se pide probabilidad' },
      { value: 'multi_classification', text: 'Clasificación multiclase', explanation: 'Incorrecto, no hay múltiples categorías' },
      { value: 'unsupervised', text: 'Aprendizaje no supervisado', explanation: 'Incorrecto, tenemos etiquetas de supervivencia' }
    ],
    correct: 'regression',
    category: 'regression',
    difficulty: 'medium',
    explanation: 'Aunque supervivencia es binaria, predecir la probabilidad (0.0 a 1.0) es un problema de regresión.'
  },
  {
    id: 5,
    question: "¿Cuál de estos problemas NO es de clasificación?",
    options: [
      { value: 'stock_price', text: 'Predecir el precio de una acción mañana', explanation: 'Correcto, es regresión (valor continuo)' },
      { value: 'image_recognition', text: 'Reconocer objetos en imágenes', explanation: 'Incorrecto, es clasificación multiclase' },
      { value: 'sentiment_analysis', text: 'Analizar sentimientos en texto', explanation: 'Incorrecto, es clasificación (positivo/negativo/neutral)' },
      { value: 'fraud_detection', text: 'Detectar transacciones fraudulentas', explanation: 'Incorrecto, es clasificación binaria' }
    ],
    correct: 'stock_price',
    category: 'classification',
    difficulty: 'medium',
    explanation: 'Predecir precios de acciones es regresión porque produces valores numéricos continuos.'
  },
  {
    id: 6,
    question: "En un sistema de recomendación, ¿qué tipo de problema sería predecir la calificación (1-5 estrellas) que un usuario dará a una película?",
    scenario: "Una plataforma de streaming quiere predecir qué tan probable es que a un usuario le guste una película.",
    options: [
      { value: 'regression', text: 'Regresión', explanation: 'Correcto, aunque sean enteros, se pueden tratar como valores continuos' },
      { value: 'ordinal_classification', text: 'Clasificación ordinal', explanation: 'También válido, pero generalmente se trata como regresión' },
      { value: 'binary_classification', text: 'Clasificación binaria', explanation: 'Incorrecto, hay 5 categorías posibles' },
      { value: 'clustering', text: 'Clustering', explanation: 'Incorrecto, no estamos agrupando usuarios' }
    ],
    correct: 'regression',
    category: 'regression',
    difficulty: 'hard',
    explanation: 'Aunque las calificaciones son discretas (1-5), comúnmente se tratan como regresión para predecir valores intermedios.'
  },
  {
    id: 7,
    question: "¿Qué métrica sería más apropiada para evaluar un modelo de clasificación binaria?",
    options: [
      { value: 'accuracy', text: 'Precisión (Accuracy)', explanation: 'Correcto, mide el porcentaje de predicciones correctas' },
      { value: 'mse', text: 'Error Cuadrático Medio (MSE)', explanation: 'Incorrecto, es para regresión' },
      { value: 'rmse', text: 'Raíz del Error Cuadrático Medio (RMSE)', explanation: 'Incorrecto, es para regresión' },
      { value: 'r_squared', text: 'R-cuadrado', explanation: 'Incorrecto, es para regresión' }
    ],
    correct: 'accuracy',
    category: 'classification',
    difficulty: 'medium',
    explanation: 'Para clasificación usamos métricas como accuracy, precision, recall, F1-score. MSE y RMSE son para regresión.'
  },
  {
    id: 8,
    question: "¿Cuál sería el enfoque correcto para un problema donde quieres predecir si un cliente comprará un producto Y también cuánto gastará?",
    scenario: "Una tienda online quiere optimizar sus estrategias de marketing y pricing.",
    options: [
      { value: 'two_models', text: 'Dos modelos separados: clasificación + regresión', explanation: 'Correcto, son dos problemas diferentes' },
      { value: 'only_regression', text: 'Solo regresión (monto = 0 si no compra)', explanation: 'Podría funcionar pero no es óptimo' },
      { value: 'only_classification', text: 'Solo clasificación por rangos de precio', explanation: 'Incorrecto, perdemos información precisa del monto' },
      { value: 'clustering', text: 'Clustering por comportamiento de compra', explanation: 'Incorrecto, no responde las preguntas específicas' }
    ],
    correct: 'two_models',
    category: 'classification',
    difficulty: 'hard',
    explanation: 'Es mejor usar clasificación para predecir si comprará y regresión para predecir cuánto gastará.'
  },
  {
    id: 9,
    question: "¿Qué tipo de problema es predecir la temperatura exacta para mañana?",
    options: [
      { value: 'regression', text: 'Regresión', explanation: 'Correcto, temperatura es un valor continuo' },
      { value: 'classification', text: 'Clasificación', explanation: 'Incorrecto, a menos que sea por categorías como frío/calor' },
      { value: 'time_series', text: 'Series de tiempo', explanation: 'Parcialmente correcto, pero sigue siendo regresión' },
      { value: 'clustering', text: 'Clustering', explanation: 'Incorrecto, no agrupamos datos' }
    ],
    correct: 'regression',
    category: 'regression',
    difficulty: 'easy',
    explanation: 'Predecir temperatura exacta es regresión porque produces valores numéricos continuos.'
  },
  {
    id: 10,
    question: "¿Cuál es la principal diferencia en la interpretación de los resultados entre regresión y clasificación?",
    options: [
      { value: 'continuous_vs_discrete', text: 'Regresión: valores continuos, Clasificación: categorías discretas', explanation: 'Correcto, es la diferencia fundamental' },
      { value: 'speed_difference', text: 'Regresión es más rápida de interpretar', explanation: 'Incorrecto, no hay diferencia significativa en velocidad' },
      { value: 'accuracy_difference', text: 'Clasificación es más precisa', explanation: 'Incorrecto, depende del problema y datos' },
      { value: 'complexity_difference', text: 'Regresión es más compleja de interpretar', explanation: 'Incorrecto, ambos pueden ser complejos' }
    ],
    correct: 'continuous_vs_discrete',
    category: 'classification',
    difficulty: 'medium',
    explanation: 'La diferencia clave es que regresión produce valores en un rango continuo mientras clasificación produce etiquetas discretas.'
  }
])

// Computed properties
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const quizProgress = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100)
const finalGrade = computed(() => Math.round((score.value / (questions.value.length * 10)) * 10))
const earnedPoints = computed(() => score.value * 5)

const categoryScores = computed(() => {
  const regressionQuestions = questions.value.filter(q => q.category === 'regression')
  const classificationQuestions = questions.value.filter(q => q.category === 'classification')
  
  const regressionCorrect = regressionQuestions.filter(q => 
    q.userAnswer === q.correct
  ).length
  
  const classificationCorrect = classificationQuestions.filter(q => 
    q.userAnswer === q.correct
  ).length
  
  return {
    regression: regressionQuestions.length > 0 ? 
      Math.round((regressionCorrect / regressionQuestions.length) * 100) : 0,
    classification: classificationQuestions.length > 0 ? 
      Math.round((classificationCorrect / classificationQuestions.length) * 100) : 0
  }
})

const recommendations = computed(() => {
  const recs = []
  
  if (finalGrade.value >= 8) {
    recs.push({
      id: 1,
      type: 'success',
      icon: 'mdi-star',
      text: 'Excelente comprensión de los conceptos. Estás listo para temas avanzados.'
    })
  } else if (finalGrade.value >= 6) {
    recs.push({
      id: 2,
      type: 'info',
      icon: 'mdi-book-open',
      text: 'Buen trabajo. Repasa los ejemplos prácticos para consolidar el conocimiento.'
    })
  } else {
    recs.push({
      id: 3,
      type: 'warning',
      icon: 'mdi-alert',
      text: 'Necesitas repasar el contenido. Practica más con los ejemplos interactivos.'
    })
  }
  
  if (categoryScores.value.regression < 70) {
    recs.push({
      id: 4,
      type: 'info',
      icon: 'mdi-trending-up',
      text: 'Repasa los conceptos de regresión y practica con más ejemplos.'
    })
  }
  
  if (categoryScores.value.classification < 70) {
    recs.push({
      id: 5,
      type: 'info',
      icon: 'mdi-format-list-checks',
      text: 'Refuerza tu comprensión de los problemas de clasificación.'
    })
  }
  
  return recs
})

// Métodos
const submitAnswer = () => {
  if (!selectedAnswer.value) return
  
  questionAnswered.value = true
  isCorrect.value = selectedAnswer.value === currentQuestion.value.correct
  
  // Guardar respuesta del usuario
  questions.value[currentQuestionIndex.value].userAnswer = selectedAnswer.value
  
  if (isCorrect.value) {
    correctAnswers.value++
    const points = currentQuestion.value.difficulty === 'easy' ? 10 : 
                  currentQuestion.value.difficulty === 'medium' ? 15 : 20
    score.value += points
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswer.value = ''
    questionAnswered.value = false
    isCorrect.value = false
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    selectedAnswer.value = questions.value[currentQuestionIndex.value].userAnswer || ''
    questionAnswered.value = !!selectedAnswer.value
    isCorrect.value = selectedAnswer.value === currentQuestion.value.correct
  }
}

const completeQuiz = () => {
  quizCompleted.value = true
  stopTimer()
  
  // Actualizar store con resultados
  learningStore.completeQuiz('regression-classification', {
    score: score.value,
    totalQuestions: questions.value.length,
    correctAnswers: correctAnswers.value,
    timeElapsed: timeElapsed.value,
    grade: finalGrade.value
  })
  
  learningStore.addPoints(earnedPoints.value)
}

const retakeQuiz = () => {
  // Reiniciar todo
  currentQuestionIndex.value = 0
  selectedAnswer.value = ''
  questionAnswered.value = false
  isCorrect.value = false
  score.value = 0
  correctAnswers.value = 0
  timeElapsed.value = 0
  quizCompleted.value = false
  
  // Limpiar respuestas de usuario
  questions.value.forEach(q => {
    delete q.userAnswer
  })
  
  startTimer()
}

const reviewContent = () => {
  router.push('/ml_regresionvsclasificacion.vue')
}

const continueToNext = () => {
  if (finalGrade.value >= 5) {
    router.push('/quiz')
  }
}

const getOptionClass = (optionValue) => {
  if (!questionAnswered.value) return ''
  
  if (optionValue === currentQuestion.value.correct) {
    return 'correct-option'
  } else if (optionValue === selectedAnswer.value && !isCorrect.value) {
    return 'incorrect-option'
  }
  return ''
}

const getCorrectAnswerText = () => {
  const correctOption = currentQuestion.value.options.find(
    opt => opt.value === currentQuestion.value.correct
  )
  return correctOption ? correctOption.text : ''
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const startTimer = () => {
  timer.value = setInterval(() => {
    timeElapsed.value++
  }, 1000)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// Lifecycle
onMounted(() => {
  startTimer()
  learningStore.startQuiz('regression-classification')
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.quiz-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

.quiz-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quiz-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.quiz-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 2rem;
}

.progress-details {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Quiz Content */
.quiz-content {
  animation: slideInUp 0.6s ease-out;
}

.question-card {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 24px !important;
  overflow: hidden;
  transition: all 0.3s ease;
}

.question-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.25) !important;
}

.question-header {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.question-number {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

.question-type .v-chip {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.question-content {
  padding: 2rem !important;
}

.question-text {
  color: white;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.scenario-box {
  background: rgba(33, 150, 243, 0.2);
  border: 1px solid rgba(33, 150, 243, 0.4);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

/* Answer Options */
.answer-options {
  margin-top: 1rem;
}

.answer-option {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  margin-bottom: 1rem;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.answer-option:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(8px);
}

.answer-option.correct-option {
  background: rgba(76, 175, 80, 0.3) !important;
  border-color: #4caf50 !important;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
}

.answer-option.incorrect-option {
  background: rgba(244, 67, 54, 0.3) !important;
  border-color: #f44336 !important;
  box-shadow: 0 0 20px rgba(244, 67, 54, 0.3);
}

.option-content {
  width: 100%;
}

.option-text {
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
}

.option-explanation {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-style: italic;
  display: block;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* Feedback Section */
.feedback-section {
  animation: fadeInUp 0.5s ease-out;
}

.feedback-alert {
  border-radius: 16px !important;
  border: none !important;
  padding: 1.5rem !important;
}

.feedback-content {
  color: white;
}

.feedback-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feedback-explanation {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.correct-answer {
  font-size: 0.95rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

/* Question Actions */
.question-actions {
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.question-actions .v-btn {
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  border-radius: 12px;
  padding: 0 2rem;
  height: 48px;
}

/* Results Section */
.quiz-results {
  animation: slideInUp 0.8s ease-out;
}

.results-card {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 24px !important;
  overflow: hidden;
}

.results-header {
  background: rgba(255, 255, 255, 0.1);
  padding: 3rem 2rem 2rem;
  text-align: center;
}

.results-icon {
  margin-bottom: 1rem;
}

.results-title {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.results-content {
  padding: 2rem !important;
}

.score-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
}

.score-circle {
  position: relative;
}

.score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.score-number {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.score-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
}

.score-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Category Analysis */
.category-analysis {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.analysis-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.category-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
}

.category-header {
  display: flex;
  align-items: center;
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
}

.category-score {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  text-align: center;
  display: block;
}

/* Recommendations */
.recommendations {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
}

.recommendations-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.recommendations-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recommendation-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.recommendation-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(8px);
}

/* Results Actions */
.results-actions {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  gap: 1rem;
}

.results-actions .v-btn {
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  border-radius: 12px;
  padding: 0 2rem;
  height: 48px;
  min-width: 160px;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .quiz-container {
    padding: 1rem 0;
  }
  
  .quiz-header {
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
  }
  
  .quiz-title {
    font-size: 2rem;
  }
  
  .quiz-subtitle {
    font-size: 1rem;
  }
  
  .progress-details {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .question-content {
    padding: 1.5rem !important;
  }
  
  .question-text {
    font-size: 1.1rem;
  }
  
  .score-summary {
    flex-direction: column;
    gap: 2rem;
  }
  
  .category-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .results-actions {
    flex-direction: column;
  }
  
  .results-actions .v-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 480px) {
  .quiz-header {
    padding: 1rem;
  }
  
  .quiz-title {
    font-size: 1.8rem;
  }
  
  .question-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .question-content {
    padding: 1rem !important;
  }
  
  .answer-option {
    padding: 0.8rem;
  }
  
  .option-text {
    font-size: 1rem;
  }
  
  .results-content {
    padding: 1rem !important;
  }
  
  .category-analysis,
  .recommendations {
    padding: 1rem;
  }
}

/* Custom Vuetify overrides */
.v-progress-linear {
  border-radius: 6px !important;
}

.v-progress-circular {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.v-radio-group .v-input__control {
  width: 100%;
}

.v-radio .v-selection-control__wrapper {
  margin-right: 1rem;
}

.v-chip {
  border-radius: 16px !important;
}

.v-alert {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>