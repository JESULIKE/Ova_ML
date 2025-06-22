<template>
  <section class="learning-types-section py-16" id="learning-types">
    <v-container>
      <div class="section-header text-center mb-12">
        <h2 class="section-title">Tipos de Aprendizaje en Machine Learning</h2>
        <p class="section-subtitle">
          Explora las diferencias entre aprendizaje supervisado y no supervisado
        </p>
        
        <!-- Indicador de progreso del aprendizaje -->
        <div class="progress-indicator mt-8">
          <v-progress-linear
            :value="learningProgress"
            color="teal"
            height="8"
            rounded
            class="mb-2"
          ></v-progress-linear>
          <p class="progress-text">Progreso del aprendizaje: {{ learningProgress }}%</p>
        </div>
      </div>

      <!-- Introducción interactiva -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-card class="intro-card pa-6" elevation="8">
            <div class="d-flex align-center mb-4">
              <v-icon color="primary" size="32" class="mr-3">mdi-lightbulb-on</v-icon>
              <h3 class="intro-title">¿Sabías que...?</h3>
            </div>
            <p class="intro-text">
              Los algoritmos de machine learning pueden aprender de diferentes maneras, 
              similar a como los humanos aprendemos. ¡Descubramos las dos principales formas!
            </p>
            <v-btn 
              @click="startLearning" 
              color="primary" 
              size="large"
              :disabled="hasStarted"
              class="mt-4"
            >
              <v-icon start>mdi-play</v-icon>
              {{ hasStarted ? 'Ya comenzaste' : 'Comenzar exploración' }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Tarjetas comparativas interactivas -->
      <v-row v-if="hasStarted">
        <v-col cols="12" md="6">
          <div 
            class="comparison-card supervised-card" 
            :class="{ 'active': selectedType === 'supervised' }"
            @click="selectLearningType('supervised')"
          >
            <div class="concept-header mb-4">
              <v-icon color="teal-lighten-1" size="48" class="mr-3">mdi-school</v-icon>
              <h3 class="concept-title">Aprendizaje Supervisado</h3>
            </div>
            <p class="concept-text mb-4">
              El algoritmo aprende de ejemplos etiquetados. Como un estudiante con un profesor 
              que le proporciona las respuestas correctas durante el entrenamiento.
            </p>
            
            <!-- Ejemplos interactivos -->
            <div class="examples-grid">
              <div 
                class="example-card" 
                v-for="example in supervisedExamples" 
                :key="example.title"
                @click.stop="showExampleDetail(example)"
              >
                <div class="example-title">{{ example.icon }} {{ example.title }}</div>
                <div class="example-text">{{ example.description }}</div>
                <v-btn 
                  size="x-small"
                  color="teal" 
                  variant="outlined"
                  class="mt-2"
                  @click.stop="showExampleDetail(example)"
                >
                  Ver ejemplo
                </v-btn>
              </div>
            </div>

            <!-- Características del aprendizaje supervisado -->
            <v-expansion-panels v-if="selectedType === 'supervised'" class="mt-4">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-information</v-icon>
                  Características principales
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="feature-list">
                    <div v-for="feature in supervisedFeatures" :key="feature" class="feature-item">
                      <v-icon color="teal" class="mr-2">mdi-check-circle</v-icon>
                      <span>{{ feature }}</span>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div 
            class="comparison-card unsupervised-card"
            :class="{ 'active': selectedType === 'unsupervised' }"
            @click="selectLearningType('unsupervised')"
          >
            <div class="concept-header mb-4">
              <v-icon color="red-lighten-1" size="48" class="mr-3">mdi-compass</v-icon>
              <h3 class="concept-title">Aprendizaje No Supervisado</h3>
            </div>
            <p class="concept-text mb-4">
              El algoritmo encuentra patrones ocultos en datos sin etiquetas. Como un explorador 
              que descubre territorios desconocidos sin un mapa.
            </p>
            
            <!-- Ejemplos interactivos -->
            <div class="examples-grid">
              <div 
                class="example-card" 
                v-for="example in unsupervisedExamples" 
                :key="example.title"
                @click.stop="showExampleDetail(example)"
              >
                <div class="example-title">{{ example.icon }} {{ example.title }}</div>
                <div class="example-text">{{ example.description }}</div>
                <v-btn 
                  size="x-small"
                  color="red" 
                  variant="outlined"
                  class="mt-2"
                  @click.stop="showExampleDetail(example)"
                >
                  Ver ejemplo
                </v-btn>
              </div>
            </div>

            <!-- Características del aprendizaje no supervisado -->
            <v-expansion-panels v-if="selectedType === 'unsupervised'" class="mt-4">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon class="mr-2">mdi-information</v-icon>
                  Características principales
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="feature-list">
                    <div v-for="feature in unsupervisedFeatures" :key="feature" class="feature-item">
                      <v-icon color="red" class="mr-2">mdi-check-circle</v-icon>
                      <span>{{ feature }}</span>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
      </v-row>

      <!-- Separador VS -->
      <div class="vs-divider" v-if="hasStarted">
        <v-chip color="primary" size="large" class="vs-chip">
          <v-icon start>mdi-versus</v-icon>
          VS
        </v-chip>
      </div>

      <!-- Quiz interactivo -->
      <v-row v-if="showQuiz" class="mt-8">
        <v-col cols="12">
          <v-card class="quiz-card pa-6" elevation="8">
            <div class="d-flex align-center mb-4">
              <v-icon color="orange" size="32" class="mr-3">mdi-quiz</v-icon>
              <h3>¡Pon a prueba tu conocimiento!</h3>
            </div>
            
            <!-- Indicador de progreso del quiz -->
            <div class="quiz-progress mb-4">
              <div class="d-flex justify-between align-center mb-2">
                <span class="quiz-progress-text">
                  Pregunta {{ currentQuestionIndex + 1 }} de {{ quizQuestions.length }}
                </span>
                <span class="quiz-score">
                  Puntaje: {{ correctAnswers }}/{{ answeredQuestions }}
                </span>
              </div>
              <v-progress-linear
                :value="((currentQuestionIndex + 1) / quizQuestions.length) * 100"
                color="orange"
                height="6"
                rounded
              ></v-progress-linear>
            </div>
            
            <div v-if="!quizCompleted">
              <p class="quiz-question mb-4">{{ currentQuestion.question }}</p>
              <v-radio-group v-model="selectedAnswer" class="mb-4">
                <v-radio
                  v-for="(option, index) in currentQuestion.options"
                  :key="index"
                  :label="option"
                  :value="index"
                  :disabled="showFeedback"
                ></v-radio>
              </v-radio-group>
              
              <div class="quiz-actions mb-4">
                <v-btn 
                  @click="checkAnswer" 
                  color="primary" 
                  :disabled="selectedAnswer === null || showFeedback"
                  class="mr-2"
                >
                  Verificar respuesta
                </v-btn>
                <v-btn 
                  @click="nextQuestion" 
                  color="success" 
                  :disabled="!showFeedback"
                  v-if="showFeedback"
                >
                  {{ currentQuestionIndex < quizQuestions.length - 1 ? 'Siguiente pregunta' : 'Terminar quiz' }}
                </v-btn>
              </div>
              
              <div v-if="showFeedback" class="feedback-section">
                <v-alert
                  :type="isCorrect ? 'success' : 'error'"
                  :icon="isCorrect ? 'mdi-check-circle' : 'mdi-close-circle'"
                  class="mb-2"
                >
                  {{ currentQuestion.feedback }}
                </v-alert>
                <div v-if="!isCorrect" class="correct-answer-info">
                  <p class="text-success">
                    <v-icon color="success" class="mr-1">mdi-lightbulb</v-icon>
                    Respuesta correcta: {{ currentQuestion.options[currentQuestion.correct] }}
                  </p>
                </div>
              </div>
            </div>

            <div v-else class="quiz-completed text-center">
              <v-icon color="success" size="64" class="mb-4">mdi-trophy</v-icon>
              <h3 class="mb-2">¡Felicitaciones!</h3>
              <p class="mb-4">
                Has completado la evaluación con {{ correctAnswers }} respuestas correctas 
                de {{ quizQuestions.length }} preguntas.
              </p>
              
              <div class="performance-feedback mb-4">
                <v-chip 
                  :color="getPerformanceColor()" 
                  size="large" 
                  class="ma-1"
                >
                  {{ getPerformanceText() }}
                </v-chip>
              </div>
              
              <div class="quiz-actions">
                <v-btn @click="resetQuiz" color="primary" variant="outlined" class="mr-2">
                  Repetir evaluación
                </v-btn>
                <NuxtLink to="/ml_regresionvsclasificacion">
                  <v-btn color="primary">
                    Continuar aprendizaje
                  </v-btn>
                </NuxtLink>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Botón para mostrar quiz -->
      <div class="text-center mt-8" v-if="hasStarted && bothTypesViewed && !showQuiz">
        <v-btn @click="startQuiz" color="orange" size="large">
          Evaluar conocimientos
        </v-btn>
      </div>
    </v-container>

    <!-- Modal para detalles de ejemplos -->
    <v-dialog v-model="exampleDialog" max-width="600">
      <v-card v-if="selectedExample">
        <v-card-title class="d-flex align-center">
          <span class="mr-2">{{ selectedExample.icon }}</span>
          {{ selectedExample.title }}
        </v-card-title>
        <v-card-text>
          <p class="mb-4">{{ selectedExample.detailedDescription }}</p>
          <div v-if="selectedExample.steps">
            <h4 class="mb-2">Pasos del proceso:</h4>
            <v-timeline density="compact">
              <v-timeline-item
                v-for="(step, index) in selectedExample.steps"
                :key="index"
                size="small"
                :dot-color="selectedExample.type === 'supervised' ? 'teal' : 'red'"
              >
                {{ step }}
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="exampleDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estados reactivos
const hasStarted = ref(false)
const selectedType = ref(null)
const viewedTypes = ref(new Set())
const exampleDialog = ref(false)
const selectedExample = ref(null)
const showQuiz = ref(false)
const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const showFeedback = ref(false)
const isCorrect = ref(false)
const quizCompleted = ref(false)
const correctAnswers = ref(0)
const answeredQuestions = ref(0)

// Datos de ejemplos con información detallada
const supervisedExamples = ref([
  { 
    icon: '📧', 
    title: 'Clasificación de Emails', 
    description: 'Spam vs No Spam',
    type: 'supervised',
    detailedDescription: 'Un sistema que aprende a identificar emails spam utilizando miles de ejemplos de emails ya etiquetados como "spam" o "no spam". El algoritmo aprende patrones en las palabras, remitentes y características de los emails.',
    steps: [
      'Recopilar miles de emails etiquetados',
      'Extraer características (palabras clave, remitente, etc.)',
      'Entrenar el algoritmo con estos ejemplos',
      'Probar con nuevos emails no vistos',
      'Clasificar automáticamente emails nuevos'
    ]
  },
  { 
    icon: '🏠', 
    title: 'Predicción de Precios', 
    description: 'Valor de propiedades',
    type: 'supervised',
    detailedDescription: 'Un modelo que predice el precio de una casa basándose en características como ubicación, tamaño, número de habitaciones, etc. Se entrena con datos históricos de ventas.',
    steps: [
      'Recopilar datos de ventas históricas con precios',
      'Identificar características relevantes (m², ubicación, etc.)',
      'Entrenar el modelo con estos datos',
      'Validar precisión con ventas conocidas',
      'Predecir precios de nuevas propiedades'
    ]
  }
])

const unsupervisedExamples = ref([
  { 
    icon: '👥', 
    title: 'Segmentación de Clientes', 
    description: 'Grupos por comportamiento',
    type: 'unsupervised',
    detailedDescription: 'Análisis que encuentra grupos naturales de clientes basándose en patrones de compra, sin conocer previamente qué grupos existen. Descubre segmentos como "compradores frecuentes", "ocasionales", etc.',
    steps: [
      'Recopilar datos de comportamiento de clientes',
      'Aplicar algoritmos de clustering',
      'Identificar patrones y grupos naturales',
      'Analizar características de cada grupo',
      'Desarrollar estrategias específicas por segmento'
    ]
  },
  { 
    icon: '🔍', 
    title: 'Detección de Anomalías', 
    description: 'Fraudes o valores atípicos',
    type: 'unsupervised',
    detailedDescription: 'Sistema que identifica transacciones inusuales o sospechosas sin ejemplos previos de fraude. Aprende qué es "normal" y detecta lo que se desvía de esos patrones.',
    steps: [
      'Analizar patrones de transacciones normales',
      'Establecer línea base de comportamiento típico',
      'Identificar desviaciones significativas',
      'Alertar sobre anomalías detectadas',
      'Ajustar continuamente los umbrales'
    ]
  }
])

// Características de cada tipo de aprendizaje
const supervisedFeatures = ref([
  'Requiere datos etiquetados para entrenar',
  'Puede hacer predicciones específicas',
  'Rendimiento medible con métricas claras',
  'Necesita ejemplos de entrada y salida esperada'
])

const unsupervisedFeatures = ref([
  'Trabaja con datos sin etiquetas',
  'Descubre patrones ocultos',
  'Útil para exploración de datos',
  'No requiere respuestas conocidas previamente'
])

// Preguntas del quiz - CORREGIDO: Array bien estructurado
const quizQuestions = ref([
  {
    question: '¿Qué se necesita para entrenar un modelo de predicción de precios de propiedades?',
    options: [
      'Etiquetas con los tipos de clientes',
      'Solo datos de ubicación sin precios',
      'Datos históricos con precios conocidos',
      'Agrupaciones hechas por el algoritmo'
    ],
    correct: 2,
    feedback: '¡Correcto! El aprendizaje supervisado requiere datos históricos con precios reales para poder entrenar el modelo.'
  },
  {
    question: '¿Cuál de estas tareas corresponde a un caso de aprendizaje supervisado?',
    options: [
      'Agrupar clientes según comportamiento',
      'Predecir el precio de una casa basada en sus características',
      'Detectar transacciones inusuales sin etiquetas',
      'Explorar hábitos de usuarios sin categorías previas'
    ],
    correct: 1,
    feedback: '¡Bien! La predicción de precios con base en características es un ejemplo claro de aprendizaje supervisado.'
  },
  {
    question: '¿Qué hace un algoritmo de aprendizaje no supervisado al segmentar clientes?',
    options: [
      'Clasifica clientes según etiquetas predefinidas',
      'Asigna precios según ubicación',
      'Encuentra patrones sin conocer grupos previamente',
      'Evalúa métricas de precisión y recall'
    ],
    correct: 2,
    feedback: '¡Exacto! La segmentación de clientes es un caso de aprendizaje no supervisado porque no usa etiquetas previas.'
  },
  {
    question: '¿Cuál es una característica clave del aprendizaje no supervisado?',
    options: [
      'Usa datos con salidas conocidas',
      'Predice resultados específicos',
      'Requiere entrenamiento con respuestas correctas',
      'Identifica patrones ocultos sin etiquetas'
    ],
    correct: 3,
    feedback: '¡Correcto! El aprendizaje no supervisado descubre patrones en datos sin tener salidas conocidas.'
  }
])

// Computadas
const learningProgress = computed(() => {
  let progress = 0
  if (hasStarted.value) progress += 20
  if (viewedTypes.value.has('supervised')) progress += 25
  if (viewedTypes.value.has('unsupervised')) progress += 25
  if (showQuiz.value) progress += 15
  if (quizCompleted.value) progress += 15
  return progress
})

const bothTypesViewed = computed(() => {
  return viewedTypes.value.has('supervised') && viewedTypes.value.has('unsupervised')
})

const currentQuestion = computed(() => {
  return quizQuestions.value[currentQuestionIndex.value]
})

// Métodos
const startLearning = () => {
  hasStarted.value = true
  console.log('Aprendizaje iniciado')
}

const selectLearningType = (type) => {
  selectedType.value = type
  viewedTypes.value.add(type)
  console.log(`Tipo de aprendizaje seleccionado: ${type}`)
}

const showExampleDetail = (example) => {
  selectedExample.value = example
  exampleDialog.value = true
}

const startQuiz = () => {
  showQuiz.value = true
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showFeedback.value = false
  quizCompleted.value = false
  correctAnswers.value = 0
  answeredQuestions.value = 0
}

const checkAnswer = () => {
  if (selectedAnswer.value !== null && !showFeedback.value) {
    isCorrect.value = selectedAnswer.value === currentQuestion.value.correct
    showFeedback.value = true
    answeredQuestions.value++
    
    if (isCorrect.value) {
      correctAnswers.value++
    }
    
    console.log(`Respuesta ${isCorrect.value ? 'correcta' : 'incorrecta'}`)
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    showFeedback.value = false
    isCorrect.value = false
  } else {
    quizCompleted.value = true
    console.log('Quiz completado')
  }
}

const resetQuiz = () => {
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showFeedback.value = false
  isCorrect.value = false
  quizCompleted.value = false
  correctAnswers.value = 0
  answeredQuestions.value = 0
}

const getPerformanceColor = () => {
  const percentage = (correctAnswers.value / quizQuestions.value.length) * 100
  if (percentage >= 80) return 'success'
  if (percentage >= 60) return 'warning'
  return 'error'
}

const getPerformanceText = () => {
  const percentage = (correctAnswers.value / quizQuestions.value.length) * 100
  if (percentage >= 80) return '¡Excelente!'
  if (percentage >= 60) return 'Bien hecho'
  return 'Puedes mejorar'
}

// Lifecycle
onMounted(() => {
  console.log('Componente montado')
})
</script>

<style scoped>
.learning-types-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.section-header {
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

.progress-indicator {
  max-width: 500px;
  margin: 0 auto;
}

.progress-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 0;
}

.intro-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

.intro-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

.intro-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
}

.comparison-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  cursor: pointer;
}

.comparison-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.comparison-card.active {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.02);
}

.concept-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.concept-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

.concept-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}

.vs-chip {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24) !important;
  color: white !important;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.example-card {
  background: rgba(255, 255, 255, 0.1);
  border-left: 4px solid #ff6b6b;
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s ease;
  text-align: left;
  cursor: pointer;
}

.example-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.example-title {
  color: #ff6b6b;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.example-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
}

.quiz-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

.quiz-progress {
  color: white;
}

.quiz-progress-text,
.quiz-score {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

.quiz-question {
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
}

.quiz-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.feedback-section {
  animation: fadeIn 0.3s ease;
}

.correct-answer-info {
  margin-top: 0.5rem;
}

.quiz-completed {
  color: white;
}

.performance-feedback {
  margin: 1rem 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .concept-header {
    flex-direction: column;
  }
  
  .quiz-actions {
    flex-direction: column;
  }
}
</style>