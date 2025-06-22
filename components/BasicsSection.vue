<template>
  <section class="basics-section py-16" id="basics">
    <v-container>
      <!-- Indicador de Progreso -->
      <div class="progress-indicator mb-8">
        <v-progress-linear
          :model-value="(completedSections / totalSections) * 100"
          height="16"
          rounded
          color="success"
          bg-color="rgba(255,255,255,0.2)"
        >
          <template v-slot:default="{ value }">
            <div class="progress-text">
              Progreso: {{ Math.ceil(value) }}% ({{ completedSections }}/{{ totalSections }} secciones)
            </div>
          </template>
        </v-progress-linear>
      </div>

      <div class="section-header text-center mb-12">
        <h2 class="section-title">¿Qué es Machine Learning?</h2>
        <p class="section-subtitle">
          Una introducción visual a los conceptos fundamentales
        </p>
      </div>
      
      <v-row align="center" class="mb-12">
        <v-col cols="12" md="6">
          <div class="concept-card" :class="{ 'completed': sectionStatus.definition }">
            <div class="concept-header">
              <v-icon color="deep-purple" size="40" class="mr-3">mdi-lightbulb-on</v-icon>
              <h3 class="concept-title">Definición</h3>
              <v-btn
                v-if="!sectionStatus.definition"
                @click="markSectionComplete('definition')"
                icon="mdi-check"
                size="small"
                color="success"
                variant="outlined"
                class="ml-auto"
              ></v-btn>
              <v-icon 
                v-else 
                color="success" 
                class="ml-auto"
              >mdi-check-circle</v-icon>
            </div>
            <p class="concept-text">
              El Machine Learning es una rama de la inteligencia artificial que permite 
              a las computadoras aprender y mejorar automáticamente a través de la experiencia, 
              sin ser programadas explícitamente para cada tarea específica.
            </p>
            
            <!-- Ejemplo Interactivo -->
            <div class="interactive-example mt-4">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <v-icon color="amber" class="mr-2">mdi-lightbulb</v-icon>
                    Ejemplo Práctico
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="example-content">
                      <p class="example-text mb-3">
                        <strong>Analogía:</strong> Imagina que enseñas a un niño a reconocer animales.
                      </p>
                      <div class="analogy-steps">
                        <div class="step" v-for="(step, index) in analogySteps" :key="index">
                          <v-avatar :color="step.color" size="30" class="mr-3">
                            {{ index + 1 }}
                          </v-avatar>
                          <span class="step-text">{{ step.text }}</span>
                        </div>
                      </div>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </div>
        </v-col>
        
        <v-col cols="12" md="6">
          <div class="learning-types">
            <h4 class="types-title mb-4">Tipos de Machine Learning</h4>
            <div 
              v-for="(type, index) in learningTypes" 
              :key="index"
              class="type-item"
              :class="{ 
                'active': activeType === index,
                'completed': sectionStatus.types && visitedTypes.includes(index)
              }"
              @click="selectType(index)"
            >
              <div class="type-icon">
                <v-icon color="white">{{ type.icon }}</v-icon>
              </div>
              <div class="type-content">
                <h4 class="type-title">{{ type.title }}</h4>
                <p class="type-description">{{ type.description }}</p>
                <v-btn
                  v-if="activeType === index && type.hasQuiz"
                  @click.stop="openQuiz(index)"
                  size="small"
                  color="warning"
                  variant="outlined"
                  class="mt-2"
                  prepend-icon="mdi-quiz"
                >
                  Quiz
                </v-btn>
              </div>
            </div>
            
            <v-btn
              v-if="visitedTypes.length >= 3 && !sectionStatus.types"
              @click="markSectionComplete('types')"
              color="success"
              variant="flat"
              class="mt-4 w-100"
              prepend-icon="mdi-check"
            >
              Marcar Sección como Completada
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Características Adicionales -->
      <v-row class="mb-8">
        <v-col cols="12">
          <h3 class="section-subtitle mb-4">Características Clave del Machine Learning</h3>
          <div class="features-grid">
            <div 
              v-for="(feature, index) in additionalFeatures" 
              :key="index"
              class="feature-card"
              :class="{ 'completed': sectionStatus.features && visitedFeatures.includes(index) }"
              @click="selectFeature(index)"
            >
              <div class="feature-icon">
                <v-icon color="white">{{ feature.icon }}</v-icon>
              </div>
              <h4 class="feature-title">{{ feature.title }}</h4>
              <p class="feature-description">{{ feature.description }}</p>
              
              <v-expand-transition>
                <div v-if="activeFeature === index" class="feature-details mt-3">
                  <v-divider class="mb-3"></v-divider>
                  <p class="feature-detail-text">{{ feature.details }}</p>
                  <div class="feature-examples">
                    <strong>Ejemplos:</strong>
                    <ul class="mt-2">
                      <li v-for="example in feature.examples" :key="example">{{ example }}</li>
                    </ul>
                  </div>
                </div>
              </v-expand-transition>
            </div>
          </div>
          
          <v-btn
            v-if="visitedFeatures.length >= 3 && !sectionStatus.features"
            @click="markSectionComplete('features')"
            color="success"
            variant="flat"
            class="mt-4"
            prepend-icon="mdi-check"
          >
            Completar Sección de Características
          </v-btn>
        </v-col>
      </v-row>

      <!-- Mensaje de Finalización -->
      <v-row v-if="allSectionsComplete">
        <v-col cols="12">
          <div class="completion-section">
            <div class="completion-content">
              <v-icon color="success" size="60" class="mb-4">mdi-check-circle</v-icon>
              <h3 class="completion-title">¡Felicidades!</h3>
              <p class="completion-subtitle">
                Has completado exitosamente la sección de conceptos básicos de Machine Learning.
              </p>
              <p class="completion-description">
                Ahora tienes una base sólida sobre qué es el Machine Learning, sus tipos principales 
                y sus características más importantes. ¡Estás listo para continuar con el siguiente módulo!
              </p><br>
              <!-- Contenedor centrado -->
<div class="lock-wrapper">
  <div class="lock-content">
    <v-icon size="64" color="warning">mdi-lock</v-icon>
    <h3 class="lock-title">Contenido Bloqueado</h3>
    <p class="lock-message">
      Continuemos al siguente modulo!
    </p>
    <NuxtLink to="/ml_tiposdeaprendizaje">
      <v-btn color="deep-purple">
        Avanzar
      </v-btn>
    </NuxtLink>
  </div>
  </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Dialog para Quiz -->
    <v-dialog v-model="quizDialog" max-width="600">
      <v-card v-if="currentQuiz">
        <v-card-title class="quiz-title">
          <v-icon color="warning" class="mr-2">mdi-quiz</v-icon>
          Quiz: {{ currentQuiz.title }}
        </v-card-title>
        <v-card-text>
          <div class="quiz-question">
            <h4 class="mb-4">{{ currentQuiz.question }}</h4>
            <v-radio-group v-model="selectedAnswer">
              <v-radio
                v-for="(option, index) in currentQuiz.options"
                :key="index"
                :value="index"
                :label="option"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="quizDialog = false" variant="text">Cancelar</v-btn>
          <v-btn 
            @click="checkAnswer" 
            color="primary" 
            :disabled="selectedAnswer === null"
          >
            Verificar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar para Feedback -->
    <v-snackbar
      v-model="showFeedback"
      :color="feedbackColor"
      :timeout="3000"
      location="bottom"
    >
      {{ feedbackMessage }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="showFeedback = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useMLProgressStore } from '~/stores/mlProgress'

const progressStore = useMLProgressStore()

// Estado reactivo
const activeType = ref(0)
const activeFeature = ref(-1)
const visitedTypes = ref([])
const visitedFeatures = ref([])
const quizDialog = ref(false)
const selectedAnswer = ref(null)
const currentQuiz = ref(null)
const showFeedback = ref(false)
const feedbackMessage = ref('')
const feedbackColor = ref('success')

// Progreso de secciones
const sectionStatus = ref({
  definition: false,
  types: false,
  features: false
})

// Datos
const analogySteps = [
  { text: 'Le muestras muchas fotos de perros y gatos', color: 'blue' },
  { text: 'El niño identifica patrones y características', color: 'orange' },
  { text: 'Puede reconocer nuevos perros y gatos', color: 'green' }
]

const learningTypes = [
  {
    title: 'Supervisado',
    description: 'Aprende de ejemplos etiquetados para hacer predicciones',
    icon: 'mdi-school',
    hasQuiz: true,
    quiz: {
      question: '¿Cuál es la característica principal del aprendizaje supervisado?',
      options: [
        'No necesita datos etiquetados',
        'Usa datos con respuestas conocidas para entrenar',
        'Solo funciona con imágenes',
        'Es más rápido que otros métodos'
      ],
      correct: 1
    }
  },
  {
    title: 'No Supervisado',
    description: 'Encuentra patrones ocultos en datos sin etiquetas',
    icon: 'mdi-magnify',
    hasQuiz: true,
    quiz: {
      question: '¿Qué busca el aprendizaje no supervisado?',
      options: [
        'Patrones ocultos en datos sin etiquetas',
        'Respuestas correctas predefinidas',
        'Entrenar con supervisión humana',
        'Clasificar datos etiquetados'
      ],
      correct: 0
    }
  },
  {
    title: 'Reforzado',
    description: 'Aprende a través de recompensas y castigos',
    icon: 'mdi-trophy',
    hasQuiz: true,
    quiz: {
      question: '¿Cómo aprende un sistema de aprendizaje reforzado?',
      options: [
        'Memorizando datos',
        'A través de recompensas y castigos',
        'Copiando otros modelos',
        'Solo con datos supervisados'
      ],
      correct: 1
    }
  }
]

const additionalFeatures = [
  {
    icon: 'mdi-brain',
    title: 'Aprendizaje Automático',
    description: 'Los algoritmos mejoran su rendimiento conforme procesan más datos',
    details: 'El sistema se vuelve más preciso y eficiente automáticamente, sin necesidad de reprogramación manual.',
    examples: ['Reconocimiento de voz que mejora con el uso', 'Sistemas de recomendación que aprenden tus gustos']
  },
  {
    icon: 'mdi-chart-line',
    title: 'Reconocimiento de Patrones',
    description: 'Identifica patrones complejos en grandes volúmenes de datos',
    details: 'Puede encontrar relaciones y tendencias que serían imposibles de detectar manualmente.',
    examples: ['Detección de fraude en transacciones', 'Análisis de sentimientos en redes sociales']
  },
  {
    icon: 'mdi-robot',
    title: 'Automatización Inteligente',
    description: 'Toma decisiones y realiza predicciones sin intervención humana',
    details: 'Opera de forma autónoma, procesando información y generando respuestas en tiempo real.',
    examples: ['Chatbots de atención al cliente', 'Sistemas de trading automatizado']
  }
]

// Computed properties
const totalSections = computed(() => Object.keys(sectionStatus.value).length)
const completedSections = computed(() => 
  Object.values(sectionStatus.value).filter(Boolean).length
)

const allSectionsComplete = computed(() => 
  completedSections.value === totalSections.value
)

// Métodos
const selectType = (index) => {
  activeType.value = index
  if (!visitedTypes.value.includes(index)) {
    visitedTypes.value.push(index)
  }
}

const selectFeature = (index) => {
  activeFeature.value = activeFeature.value === index ? -1 : index
  if (!visitedFeatures.value.includes(index)) {
    visitedFeatures.value.push(index)
  }
}

const markSectionComplete = (section) => {
  sectionStatus.value[section] = true
  showFeedbackMessage('¡Sección completada!', 'success')
  
  // Guardar progreso en store
  progressStore.updateProgress('basics', section, true)
}

const openQuiz = (typeIndex) => {
  currentQuiz.value = {
    title: learningTypes[typeIndex].title,
    ...learningTypes[typeIndex].quiz
  }
  quizDialog.value = true
  selectedAnswer.value = null
}

const checkAnswer = () => {
  const isCorrect = selectedAnswer.value === currentQuiz.value.correct
  const message = isCorrect ? '¡Correcto! Bien hecho.' : 'Incorrecto. Inténtalo de nuevo.'
  const color = isCorrect ? 'success' : 'error'
  
  showFeedbackMessage(message, color)
  quizDialog.value = false
  
  if (isCorrect) {
    progressStore.updateQuizScore('basics', currentQuiz.value.title, true)
  }
}

const showFeedbackMessage = (message, color = 'info') => {
  feedbackMessage.value = message
  feedbackColor.value = color
  showFeedback.value = true
}

// Watchers
watch(allSectionsComplete, (newVal) => {
  if (newVal) {
    showFeedbackMessage('¡Felicidades! Has completado toda la sección básica.', 'success')
  }
})
</script>

<style scoped>
.basics-section {
  background: rgba(255, 255, 255, 0.05);
}

.progress-indicator {
  max-width: 800px;
  margin: 0 auto;
}

.progress-text {
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  padding: 0 16px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

.concept-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  height: 100%;
}

.concept-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.concept-card.completed {
  border-color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.concept-header {
  display: flex;
  align-items: center;
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

.interactive-example {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
}

.example-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.example-text {
  color: #333;
  font-weight: 500;
}

.analogy-steps .step {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.step-text {
  color: #333;
  font-weight: 500;
}

.types-title {
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
}

.learning-types {
  display: grid;
  gap: 1rem;
}

.type-item {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.type-item:hover,
.type-item.active {
  background: rgba(255, 255, 255, 0.2);
  border-color: #ff6b6b;
  transform: scale(1.02);
}

.type-item.completed {
  border-color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.type-icon {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.type-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.type-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.4;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.feature-card.completed {
  border-color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.feature-icon {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.feature-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.4;
}

.feature-details {
  color: rgba(255, 255, 255, 0.9);
}

.feature-detail-text {
  margin-bottom: 1rem;
}

.feature-examples ul {
  padding-left: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.completion-section {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(67, 160, 71, 0.1));
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
}

.completion-content {
  max-width: 600px;
  margin: 0 auto;
}

.completion-title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.completion-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.completion-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
}

.quiz-title {
  background: linear-gradient(45deg, #FFC107, #FF9800);
  color: white;
  font-weight: 600;
}

.quiz-question h4 {
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .progress-indicator {
    max-width: 100%;
  }
  
  .type-item {
    flex-direction: column;
    text-align: center;
  }
  
  .type-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .completion-section {
    padding: 2rem 1rem;
  }
  
  .completion-title {
    font-size: 1.5rem;
  }
  
  .completion-subtitle {
    font-size: 1.1rem;
  }
}

.lock-content {
  text-align: center;
  color: white;
  margin: 0 auto;
  max-width: 400px;
}

.lock-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 16px 0;
}

.lock-message {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 24px;
  max-width: 400px;
  text-align: center;
}

.lock-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px; /* o 100vh si quieres toda la pantalla */
  padding: 2rem;
}
</style>