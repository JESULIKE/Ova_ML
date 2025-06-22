<template>
  <v-container fluid class="ova-container">
    <!-- Header con progreso -->
    <div class="ova-header mb-8">
      <div class="progress-section">
        <v-progress-linear
          :model-value="learningStore.getModuleProgress('regression-classification')"
          color="primary"
          height="8"
          rounded
          class="mb-2"
        ></v-progress-linear>
        <div class="progress-text">
          Progreso: {{ Math.round(learningStore.getModuleProgress('regression-classification')) }}%
        </div>
      </div>
      
      <div class="section-header text-center mb-6">
        <h1 class="section-title">Regresión vs Clasificación</h1>
        <p class="section-subtitle">
          Aprende las diferencias fundamentales entre estos dos enfoques del Machine Learning
        </p>
        <div class="learning-objectives">
          <v-chip-group>
            <v-chip
              v-for="objective in learningObjectives"
              :key="objective.id"
              :color="objective.completed ? 'success' : 'primary'"
              :variant="objective.completed ? 'flat' : 'outlined'"
              size="small"
            >
              <v-icon start :icon="objective.completed ? 'mdi-check' : 'mdi-target'"></v-icon>
              {{ objective.text }}
            </v-chip>
          </v-chip-group>
        </div>
      </div>
    </div>

    <!-- Comparación interactiva -->
    <v-row class="mb-8">
      <v-col cols="12" md="6">
        <div class="comparison-card regression-card" @click="selectConcept('regression')">
          <div class="concept-header mb-4">
            <v-icon color="blue lighten-1" size="48" class="mr-3">mdi-trending-up</v-icon>
            <h3 class="concept-title">Regresión</h3>
            <v-btn
              icon="mdi-information"
              size="small"
              variant="text"
              color="white"
              @click.stop="showInfo('regression')"
            ></v-btn>
          </div>
          
          <p class="concept-text mb-4">
            Predice <strong>valores numéricos continuos</strong>. El resultado puede ser cualquier 
            número dentro de un rango, como predecir temperaturas exactas o precios específicos.
          </p>

          <!-- Visualización interactiva -->
          <div class="interactive-demo mb-4">
            <div class="demo-title">Ejemplo interactivo: Predicción de precios</div>
            <v-slider
              v-model="houseSize"
              :min="50"
              :max="300"
              :step="10"
              label="Tamaño de casa (m²)"
              thumb-label
              class="mb-2"
            ></v-slider>
            <div class="prediction-result">
              Precio predicho: <strong>${{ predictHousePrice(houseSize) }}</strong>
              <v-btn
                size="small"
                variant="outlined"
                color="primary"
                @click="addRegressionExample"
                class="ml-2"
              >
                Agregar ejemplo
              </v-btn>
            </div>
          </div>

          <div class="examples-grid">
            <div 
              class="example-card" 
              v-for="example in regressionExamples" 
              :key="example.title"
              @click="exploreExample('regression', example)"
            >
              <div class="example-title">{{ example.icon }} {{ example.title }}</div>
              <div class="example-text">{{ example.description }}</div>
              <div class="example-output">Salida: {{ example.output }}</div>
            </div>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <div class="comparison-card classification-card" @click="selectConcept('classification')">
          <div class="concept-header mb-4">
            <v-icon color="green lighten-1" size="48" class="mr-3">mdi-format-list-checks</v-icon>
            <h3 class="concept-title">Clasificación</h3>
            <v-btn
              icon="mdi-information"
              size="small"
              variant="text"
              color="white"
              @click.stop="showInfo('classification')"
            ></v-btn>
          </div>
          
          <p class="concept-text mb-4">
            Predice <strong>categorías o clases discretas</strong>. El resultado es una etiqueta 
            específica de un conjunto predefinido de opciones. Las palabras clave son 'gratis', 'oferta', 'dinero', 'urgente', 'promoción'
          </p>

          <!-- Clasificador interactivo -->
          <div class="interactive-demo mb-4">
            <div class="demo-title">Ejemplo interactivo: Clasificador de emails</div>
            <v-textarea
              v-model="emailText"
              label="Escribe un email de ejemplo"
              rows="2"
              variant="outlined"
              density="compact"
            ></v-textarea>
            <div class="prediction-result">
              Clasificación: <strong>{{ classifyEmail(emailText) }}</strong>
              <v-btn
                size="small"
                variant="outlined"
                color="success"
                @click="addClassificationExample"
                class="ml-2"
              >
                Clasificar
              </v-btn>
            </div>
          </div>

          <div class="examples-grid">
            <div 
              class="example-card" 
              v-for="example in classificationExamples" 
              :key="example.title"
              @click="exploreExample('classification', example)"
            >
              <div class="example-title">{{ example.icon }} {{ example.title }}</div>
              <div class="example-text">{{ example.description }}</div>
              <div class="example-output">Clases: {{ example.output }}</div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Sección de práctica -->
    <v-card class="practice-section mb-6" elevation="8">
      <v-card-title class="text-h5 text-center py-4">
        <v-icon color="primary" class="mr-2">mdi-school</v-icon>
        Practica tu conocimiento
      </v-card-title>
      
      <v-card-text>
        <div class="practice-grid">
          <div 
            v-for="scenario in practiceScenarios" 
            :key="scenario.id"
            class="scenario-card"
            :class="{ 'completed': scenario.answered }"
            @click="answerScenario(scenario)"
          >
            <div class="scenario-icon">{{ scenario.icon }}</div>
            <div class="scenario-text">{{ scenario.text }}</div>
            <div class="scenario-question">¿Regresión o Clasificación?</div>
            <div v-if="scenario.answered" class="scenario-answer">
              <v-chip :color="scenario.correct ? 'success' : 'error'" size="small">
                {{ scenario.userAnswer }} {{ scenario.correct ? '✓' : '✗' }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Resumen y navegación -->
    <v-card class="summary-section" elevation="4">
      <v-card-title class="text-h5">
        <v-icon color="info" class="mr-2">mdi-lightbulb</v-icon>
        Puntos clave para recordar
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <div class="key-point">
              <v-icon color="blue" class="mr-2">mdi-trending-up</v-icon>
              <strong>Regresión:</strong> Salida numérica continua (ej: 25.7°C, $125,000)
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="key-point">
              <v-icon color="green" class="mr-2">mdi-format-list-checks</v-icon>
              <strong>Clasificación:</strong> Salida categórica discreta (ej: Spam/No Spam)
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-center pb-4">
        <v-btn
          color="secondary"
          variant="outlined"
          prepend-icon="mdi-arrow-left"
          @click="goToPrevious"
        >
          Anterior
        </v-btn>
        
        <v-btn
          color="primary"
          variant="flat"
          append-icon="mdi-arrow-right"
          @click="goToNext"
          :disabled="!allObjectivesCompleted"
        >
          Continuar al Quiz
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Diálogos informativos -->
    <v-dialog v-model="infoDialog" max-width="600">
      <v-card>
        <v-card-title>{{ selectedConceptInfo.title }}</v-card-title>
        <v-card-text>{{ selectedConceptInfo.content }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="infoDialog = false">Entendido</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de escenario -->
    <v-dialog v-model="scenarioDialog" max-width="500">
      <v-card v-if="selectedScenario">
        <v-card-title>{{ selectedScenario.icon }} Clasifica este problema</v-card-title>
        <v-card-text>
          <p class="mb-4">{{ selectedScenario.text }}</p>
          <v-radio-group v-model="userAnswer">
            <v-radio label="Regresión" value="regression"></v-radio>
            <v-radio label="Clasificación" value="classification"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="scenarioDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="submitAnswer" :disabled="!userAnswer">
            Responder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLearningStore } from '~/stores/learningStore' // Asume que tienes este store

const router = useRouter()
const learningStore = useLearningStore()

// Estados reactivos
const houseSize = ref(150)
const emailText = ref('')
const infoDialog = ref(false)
const scenarioDialog = ref(false)
const selectedScenario = ref(null)
const userAnswer = ref('')

// Objetivos de aprendizaje
const learningObjectives = ref([
  { id: 1, text: 'Identificar problemas de regresión', completed: false },
  { id: 2, text: 'Identificar problemas de clasificación', completed: false },
  { id: 3, text: 'Comparar ambos enfoques', completed: false },
  { id: 4, text: 'Aplicar conocimiento en ejemplos', completed: false }
])

// Ejemplos mejorados con más contexto
const regressionExamples = ref([
  { 
    icon: '🏠', 
    title: 'Precio de Viviendas', 
    description: 'Predecir valor basado en características',
    output: 'Valor continuo ($50K - $2M)',
    details: 'Variables: tamaño, ubicación, año...'
  },
  { 
    icon: '📈', 
    title: 'Ventas Futuras', 
    description: 'Proyección de unidades vendidas',
    output: 'Cantidad numérica (0 - ∞)',
    details: 'Basado en tendencias históricas'
  },
  { 
    icon: '🌡️', 
    title: 'Temperatura', 
    description: 'Pronóstico meteorológico',
    output: 'Grados continuos (-50°C - 50°C)',
    details: 'Usando datos atmosféricos'
  }
])

const classificationExamples = ref([
  { 
    icon: '📧', 
    title: 'Detección de Spam', 
    description: 'Filtrar emails no deseados',
    output: 'Spam | No Spam',
    details: 'Análisis de contenido y remitente'
  },
  { 
    icon: '🖼️', 
    title: 'Reconocimiento de Imágenes', 
    description: 'Identificar objetos en fotos',
    output: 'Gato | Perro | Pájaro | ...',
    details: 'Procesamiento de píxeles'
  },
  { 
    icon: '🏥', 
    title: 'Diagnóstico Médico', 
    description: 'Evaluar resultados de pruebas',
    output: 'Positivo | Negativo',
    details: 'Basado en síntomas y exámenes'
  }
])

// Escenarios de práctica
const practiceScenarios = ref([
  { 
    id: 1, 
    icon: '🚗', 
    text: 'Determinar el precio de venta de un automóvil usado',
    answer: 'regression',
    answered: false,
    correct: false,
    userAnswer: ''
  },
  { 
    id: 2, 
    icon: '🎵', 
    text: 'Clasificar géneros musicales de canciones',
    answer: 'classification',
    answered: false,
    correct: false,
    userAnswer: ''
  },
  { 
    id: 3, 
    icon: '📊', 
    text: 'Predecir la cantidad de visitantes a un sitio web',
    answer: 'regression',
    answered: false,
    correct: false,
    userAnswer: ''
  },
  { 
    id: 4, 
    icon: '🔍', 
    text: 'Detectar si una transacción es fraudulenta',
    answer: 'classification',
    answered: false,
    correct: false,
    userAnswer: ''
  }
])

// Información detallada
const conceptInfo = {
  regression: {
    title: 'Regresión - Detalles',
    content: 'La regresión predice valores numéricos continuos. Los algoritmos comunes incluyen regresión lineal, polinomial, y redes neuronales. Se evalúa usando métricas como MSE, RMSE, y R².'
  },
  classification: {
    title: 'Clasificación - Detalles', 
    content: 'La clasificación asigna instancias a categorías predefinidas. Algoritmos populares: árboles de decisión, SVM, redes neuronales. Se evalúa con precisión, recall, F1-score.'
  }
}

const selectedConceptInfo = ref(conceptInfo.regression)

// Computed properties
const allObjectivesCompleted = computed(() => {
  return learningObjectives.value.every(obj => obj.completed)
})

// Métodos
const predictHousePrice = (size) => {
  // Simulación simple de predicción
  const basePrice = 50000
  const pricePerM2 = 1200
  return (basePrice + size * pricePerM2).toLocaleString()
}

const classifyEmail = (text) => {
  // Clasificador simple basado en palabras clave
  const spamWords = ['gratis', 'oferta', 'dinero', 'urgente', 'promoción']
  const hasSpamWords = spamWords.some(word => 
    text.toLowerCase().includes(word)
  )
  return hasSpamWords ? 'SPAM 🚫' : 'NO SPAM ✅'
}

const selectConcept = (concept) => {
  // Marcar objetivo como completado
  if (concept === 'regression') {
    learningObjectives.value[0].completed = true
  } else {
    learningObjectives.value[1].completed = true
  }
  
  // Actualizar progreso en el store
  learningStore.updateProgress('regression-classification', calculateProgress())
}

const showInfo = (concept) => {
  selectedConceptInfo.value = conceptInfo[concept]
  infoDialog.value = true
}

const exploreExample = (type, example) => {
  // Lógica para explorar ejemplos en detalle
  console.log(`Explorando ${type}:`, example)
  // Aquí podrías abrir un modal con más detalles
}

const addRegressionExample = () => {
  // Agregar ejemplo personalizado
  learningObjectives.value[2].completed = true
  learningStore.addPoints(10)
  learningStore.updateProgress('regression-classification', calculateProgress())
}

const addClassificationExample = () => {
  // Agregar ejemplo de clasificación
  learningObjectives.value[2].completed = true
  learningStore.addPoints(10)
  learningStore.updateProgress('regression-classification', calculateProgress())
}

const answerScenario = (scenario) => {
  if (scenario.answered) return
  
  selectedScenario.value = scenario
  userAnswer.value = ''
  scenarioDialog.value = true
}

const submitAnswer = () => {
  if (!userAnswer.value || !selectedScenario.value) return
  
  const isCorrect = userAnswer.value === selectedScenario.value.answer
  
  selectedScenario.value.answered = true
  selectedScenario.value.correct = isCorrect
  selectedScenario.value.userAnswer = userAnswer.value === 'regression' ? 'Regresión' : 'Clasificación'
  
  if (isCorrect) {
    learningStore.addPoints(25)
  }
  
  // Verificar si todos los escenarios están completos
  const allAnswered = practiceScenarios.value.every(s => s.answered)
  if (allAnswered) {
    learningObjectives.value[3].completed = true
  }
  
  learningStore.updateProgress('regression-classification', calculateProgress())
  scenarioDialog.value = false
}

const calculateProgress = () => {
  const completed = learningObjectives.value.filter(obj => obj.completed).length
  return (completed / learningObjectives.value.length) * 100
}

const goToPrevious = () => {
  router.push('/modulos/introduccion')
}

const goToNext = () => {
  if (allObjectivesCompleted.value) {
    learningStore.completeModule('regression-classification')
    router.push('/quizrvscla')
  }
}

// Lifecycle
onMounted(() => {
  learningStore.startModule('regression-classification')
})
</script>

<style scoped>
.ova-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

.ova-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.progress-section {
  text-align: center;
  margin-bottom: 2rem;
}

.progress-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.section-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto 2rem;
}

.learning-objectives {
  margin-top: 1.5rem;
}

.comparison-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  height: 100%;
  cursor: pointer;
}

.comparison-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  background: rgba(255, 255, 255, 0.15);
}

.concept-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.concept-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  flex-grow: 1;
  text-align: center;
}

.concept-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: center;
}

.interactive-demo {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.demo-title {
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.prediction-result {
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-size: 1.1rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.example-card {
  background: rgba(255, 255, 255, 0.1);
  border-left: 4px solid #ff6b6b;
  border-radius: 12px;
  padding: 1.2rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.example-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(8px);
}

.example-title {
  color: #ff6b6b;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.example-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.example-output {
  color: #4ecdc4;
  font-size: 0.85rem;
  font-weight: 500;
}

.practice-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.scenario-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border-color: #667eea;
}

.scenario-card.completed {
  background: linear-gradient(145deg, #e8f5e8, #f0fff0);
  border-color: #4caf50;
}

.scenario-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.scenario-text {
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
}

.scenario-question {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.scenario-answer {
  margin-top: 1rem;
}

.summary-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
}

.key-point {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }
  
  .examples-grid, .practice-grid {
    grid-template-columns: 1fr;
  }
  
  .comparison-card {
    margin-bottom: 2rem;
  }
}
</style>