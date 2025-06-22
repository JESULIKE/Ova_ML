<template>
  <section class="demo-section py-16">
    <v-container>
      <div class="demo-container">
        <!-- Header educativo -->
        <div class="educational-header mb-8">
          <h3 class="demo-title text-center mb-4">Demo Interactivo: Algoritmos de Clasificación</h3>
          <p class="demo-description text-center">
            Observa cómo diferentes algoritmos de machine learning aprenden a clasificar datos en tiempo real
          </p>
        </div>

        <!-- Explicación conceptual -->
        <div class="concept-explanation mb-8">
          <v-card class="explanation-card" elevation="0">
            <v-card-text>
              <h4 class="explanation-title mb-4">¿Qué es la Clasificación en Machine Learning?</h4>
              <p class="explanation-text mb-4">
                La clasificación es una técnica de aprendizaje supervisado donde el algoritmo aprende a 
                asignar etiquetas o categorías a nuevos datos basándose en ejemplos previos. En este demo, 
                tenemos dos clases: <span class="class-label class-a-text">Clase A</span> y 
                <span class="class-label class-b-text">Clase B</span>.
              </p>
              <p class="explanation-text">
                El <strong>límite de decisión</strong> es la frontera que separa las diferentes clases. 
                Durante el entrenamiento, el algoritmo ajusta este límite para clasificar correctamente 
                los datos de entrenamiento.
              </p>
            </v-card-text>
          </v-card>
        </div>

        <!-- Demo interactivo -->
        <div class="classification-demo">
          <div class="demo-controls mb-6">
            <v-btn
              :color="isTraining ? 'error' : 'success'"
              @click="toggleTraining"
              class="mr-4"
              :disabled="false"
            >
              <v-icon left>{{ isTraining ? 'mdi-stop' : 'mdi-play' }}</v-icon>
              {{ isTraining ? 'Detener Entrenamiento' : 'Iniciar Entrenamiento' }}
            </v-btn>
            <v-select
              v-model="selectedAlgorithm"
              :items="demoAlgorithms"
              label="Selecciona un Algoritmo"
              variant="outlined"
              class="demo-select"
              :disabled="isTraining"
            ></v-select>
          </div>
          
          <!-- Visualización del demo -->
          <div class="demo-visualization">
            <div class="algorithm-info mb-4" v-if="selectedAlgorithm">
              <h5 class="algorithm-name">{{ selectedAlgorithm }}</h5>
              <p class="algorithm-description">{{ getAlgorithmDescription(selectedAlgorithm) }}</p>
            </div>

            <div class="data-points">
              <div class="point-group">
                <h4 class="group-title">
                  <v-chip color="success" size="small" class="mr-2"></v-chip>
                  Clase A
                </h4>
                <div class="points-container">
                  <div 
                    v-for="i in 8" 
                    :key="i"
                    class="data-point class-a"
                    :class="{ 'training': isTraining && trainingPoints.includes(`a-${i}`) }"
                  ></div>
                </div>
              </div>
              
              <div class="separator">
                <div class="decision-boundary" :class="{ 'active': isTraining }">
                  <span class="boundary-label" v-if="isTraining">Límite de Decisión</span>
                </div>
              </div>
              
              <div class="point-group">
                <h4 class="group-title">
                  <v-chip color="error" size="small" class="mr-2"></v-chip>
                  Clase B
                </h4>
                <div class="points-container">
                  <div 
                    v-for="i in 8" 
                    :key="i"
                    class="data-point class-b"
                    :class="{ 'training': isTraining && trainingPoints.includes(`b-${i}`) }"
                  ></div>
                </div>
              </div>
            </div>
            
            <!-- Métricas de entrenamiento -->
            <div class="training-metrics" v-if="isTraining">
              <div class="metric">
                <v-icon color="success" class="metric-icon">mdi-target</v-icon>
                <span class="metric-label">Precisión</span>
                <span class="metric-value">{{ trainingAccuracy }}%</span>
              </div>
              <div class="metric">
                <v-icon color="primary" class="metric-icon">mdi-refresh</v-icon>
                <span class="metric-label">Época</span>
                <span class="metric-value">{{ currentEpoch }}</span>
              </div>
              <div class="metric">
                <v-icon color="warning" class="metric-icon">mdi-chart-line</v-icon>
                <span class="metric-label">Estado</span>
                <span class="metric-value training-status">{{ getTrainingStatus() }}</span>
              </div>
            </div>

            <!-- Mensaje explicativo dinámico -->
            <div class="training-explanation mt-4" v-if="isTraining">
              <v-alert 
                type="info" 
                variant="tonal" 
                class="explanation-alert"
                :text="getTrainingExplanation()"
              ></v-alert>
            </div>
          </div>

          <!-- Resultados y aprendizaje -->
          <div class="learning-outcomes mt-6" v-if="!isTraining && hasTrainedBefore">
            <v-card class="outcomes-card" elevation="2">
              <v-card-title class="outcomes-title">
                <v-icon color="success" class="mr-2">mdi-school</v-icon>
                ¿Qué has aprendido?
              </v-card-title>
              <v-card-text>
                <ul class="learning-list">
                  <li>Los algoritmos de clasificación aprenden iterativamente</li>
                  <li>Cada época mejora la precisión del modelo</li>
                  <li>El límite de decisión se ajusta durante el entrenamiento</li>
                  <li>Diferentes algoritmos pueden tener diferentes enfoques</li>
                </ul>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref, onUnmounted, computed } from 'vue'

// Props
defineProps({
  demoAlgorithms: {
    type: Array,
    default: () => [
      'Redes Neuronales',
      'Máquinas de Vectores de Soporte (SVM)', 
      'Bosque Aleatorio (Random Forest)',
      'Regresión Logística'
    ]
  }
})

// Estado del componente
const isTraining = ref(false)
const selectedAlgorithm = ref('Redes Neuronales')
const trainingPoints = ref([])
const trainingAccuracy = ref(0)
const currentEpoch = ref(0)
const hasTrainedBefore = ref(false)
let trainingInterval = null

// Métodos
const toggleTraining = () => {
  if (isTraining.value) {
    stopTraining()
  } else {
    startTraining()
  }
}

const startTraining = () => {
  isTraining.value = true
  currentEpoch.value = 0
  trainingAccuracy.value = Math.floor(Math.random() * 30) + 60
  hasTrainedBefore.value = true

  trainingInterval = setInterval(() => {
    if (!isTraining.value) {
      stopTraining()
      return
    }

    currentEpoch.value++
    const allPoints = []
    for (let i = 1; i <= 8; i++) {
      allPoints.push(`a-${i}`, `b-${i}`)
    }
    trainingPoints.value = allPoints.slice(0, Math.floor(Math.random() * 8) + 4)

    if (trainingAccuracy.value < 95) {
      trainingAccuracy.value += Math.floor(Math.random() * 3) + 1
    } else {
      // Detener entrenamiento automáticamente cuando alcance 95% de precisión
      setTimeout(() => {
        stopTraining()
      }, 2000) // Espera 2 segundos antes de detener
    }

    setTimeout(() => {
      if (isTraining.value) {
        trainingPoints.value = []
      }
    }, 500)
  }, 1500)
}

const stopTraining = () => {
  isTraining.value = false
  if (trainingInterval) {
    clearInterval(trainingInterval)
    trainingInterval = null
  }
  trainingPoints.value = []
}

const getAlgorithmDescription = (algorithm) => {
  const descriptions = {
    'Redes Neuronales': 'Simula el funcionamiento del cerebro humano usando neuronas artificiales conectadas.',
    'Máquinas de Vectores de Soporte (SVM)': 'Encuentra el mejor límite que separa las clases con el mayor margen posible.',
    'Bosque Aleatorio (Random Forest)': 'Combina múltiples árboles de decisión para hacer predicciones más precisas.',
    'Regresión Logística': 'Usa probabilidades para determinar a qué clase pertenece cada punto de datos.'
  }
  return descriptions[algorithm] || 'Algoritmo de clasificación supervisada.'
}

const getTrainingStatus = () => {
  if (trainingAccuracy.value < 70) return 'Aprendiendo...'
  if (trainingAccuracy.value < 85) return 'Mejorando...'
  if (trainingAccuracy.value < 95) return 'Optimizando...'
  return 'Convergiendo'
}

const getTrainingExplanation = () => {
  if (currentEpoch.value < 5) {
    return `El algoritmo ${selectedAlgorithm.value} está explorando los datos y ajustando sus parámetros iniciales.`
  } else if (trainingAccuracy.value < 80) {
    return 'El modelo está aprendiendo patrones en los datos. Observa cómo mejora la precisión gradualmente.'
  } else if (trainingAccuracy.value < 95) {
    return 'El algoritmo está refinando el límite de decisión para clasificar mejor los datos.'
  } else {
    return '¡Excelente! El modelo ha alcanzado una alta precisión y está convergiendo hacia la solución óptima.'
  }
}

onUnmounted(() => {
  stopTraining()
})
</script>

<style scoped>
.demo-section {
  background: linear-gradient(135deg, rgba(63, 94, 251, 0.1), rgba(252, 70, 107, 0.1));
  min-height: 100vh;
}

.educational-header {
  text-align: center;
}

.demo-title {
  font-size: 2.5rem;
  color: white !important;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.demo-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

.concept-explanation {
  max-width: 800px;
  margin: 0 auto;
}

.explanation-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.explanation-title {
  color: white;
  font-weight: 600;
  font-size: 1.3rem;
}

.explanation-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.class-label {
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.class-a-text {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.class-b-text {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.classification-demo {
  max-width: 1000px;
  margin: 0 auto;
}

.demo-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.demo-select {
  max-width: 300px;
}

.demo-visualization {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.algorithm-info {
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border-left: 4px solid #3f5efb;
}

.algorithm-name {
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
}

.algorithm-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  margin: 0;
}

.data-points {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 32px;
}

.point-group {
  text-align: center;
}

.group-title {
  color: white;
  margin-bottom: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.points-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.data-point {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.class-a {
  background: linear-gradient(45deg, #4caf50, #66bb6a);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.class-b {
  background: linear-gradient(45deg, #f44336, #ef5350);
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
}

.data-point.training {
  transform: scale(1.4);
  box-shadow: 0 0 25px currentColor;
  animation: pointPulse 1s infinite;
}

@keyframes pointPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.decision-boundary {
  width: 6px;
  height: 120px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  transition: all 0.3s ease;
  position: relative;
}

.decision-boundary.active {
  background: linear-gradient(45deg, #8b5cf6, #a78bfa);
  box-shadow: 0 0 30px #8b5cf6;
  animation: boundaryPulse 2s infinite;
}

.boundary-label {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

@keyframes boundaryPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.training-metrics {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.metric {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 12px;
  min-width: 120px;
}

.metric-icon {
  display: block;
  margin: 0 auto 8px;
}

.metric-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  display: block;
  margin-bottom: 8px;
}

.metric-value {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  display: block;
}

.training-status {
  font-size: 1rem !important;
}

.explanation-alert {
  background: rgba(33, 150, 243, 0.1) !important;
  border: 1px solid rgba(33, 150, 243, 0.3);
}

.outcomes-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.outcomes-title {
  color: white !important;
  font-weight: 600;
}

.learning-list {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
}

.learning-list li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .demo-title {
    font-size: 2rem;
  }
  
  .demo-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .demo-select {
    max-width: none;
  }
  
  .data-points {
    flex-direction: column;
    gap: 32px;
  }
  
  .training-metrics {
    flex-direction: column;
    gap: 16px;
  }
  
  .demo-visualization {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .points-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .demo-title {
    font-size: 1.5rem;
  }
}
</style>