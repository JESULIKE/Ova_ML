<template>
  <section class="hero-section py-16">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <div class="hero-content">
            <div class="hero-badge mb-4">
              <v-icon left color="white">mdi-rocket-launch</v-icon>
              Comienza tu viaje en IA
            </div>
            <h1 class="hero-title mb-4">
              Domina el
              <span class="gradient-text">Machine Learning</span>
              desde cero
            </h1>
            <p class="hero-subtitle mb-6">
              Descubre el poder de los algoritmos inteligentes y aprende a crear 
              sistemas que aprenden y se adaptan. Tu puerta de entrada al futuro 
              de la tecnología.
            </p>
            <div class="hero-actions">
              <v-btn
                color="deep-purple"
                size="large"
                variant="flat"
                class="hero-btn mr-4"
                @click="$emit('scroll-to-content')"
              >
                Explorar Algoritmos
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="text-center">
          <div class="ml-visualization">
            <div class="data-flow">
              <!-- Input Data -->
              <div class="data-input">
                <div class="data-points-container">
                  <div 
                    class="data-point" 
                    v-for="(point, i) in dataPoints" 
                    :key="i"
                    :class="{ 'active': point.active, 'processing': point.processing }"
                    :style="{ 
                      animationDelay: point.delay + 's',
                      backgroundColor: point.color 
                    }"
                  ></div>
                </div>
                <span class="flow-label">{{ currentInputLabel }}</span>
              </div>

              <!-- Flow Arrow with Data Stream -->
              <div class="flow-arrow">
                <div class="data-stream">
                  <div class="stream-particle" v-for="n in 3" :key="n"></div>
                </div>
                <v-icon color="white" size="32">mdi-arrow-right</v-icon>
              </div>

              <!-- ML Brain with Neural Network Effect -->
              <div class="ml-brain">
                <div class="brain-core" :class="{ 'processing': isProcessing }">
                  <div class="neural-network">
                    <div class="neural-node" v-for="n in 6" :key="n"></div>
                  </div>
                  <v-icon color="white" size="48">mdi-brain</v-icon>
                </div>
                <span class="flow-label">{{ currentAlgorithm }}</span>
                <div class="processing-indicator" v-if="isProcessing">
                  <div class="progress-bar"></div>
                </div>
              </div>

              <!-- Flow Arrow -->
              <div class="flow-arrow">
                <div class="data-stream">
                  <div class="stream-particle" v-for="n in 3" :key="n"></div>
                </div>
                <v-icon color="white" size="32">mdi-arrow-right</v-icon>
              </div>

              <!-- Output Prediction -->
              <div class="data-output">
                <div class="prediction-box" :class="{ 'success': showPrediction }">
                  <div class="prediction-content">
                    <v-icon 
                      :color="showPrediction ? 'success' : 'white'" 
                      size="24"
                      :class="{ 'bounce': showPrediction }"
                    >
                      {{ showPrediction ? 'mdi-check-circle' : 'mdi-help-circle' }}
                    </v-icon>
                    <div class="confidence-meter" v-if="showPrediction">
                      <div class="confidence-bar" :style="{ width: confidence + '%' }"></div>
                    </div>
                  </div>
                </div>
                <span class="flow-label">{{ currentPrediction }}</span>
              </div>
            </div>

            <!-- Floating ML Concepts -->
            <div class="floating-concepts">
              <div 
                class="concept-bubble" 
                v-for="(concept, i) in mlConcepts" 
                :key="i"
                :style="{ 
                  animationDelay: (i * 0.8) + 's',
                  left: concept.x + '%',
                  top: concept.y + '%'
                }"
              >
                {{ concept.name }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Emits
defineEmits(['scroll-to-content'])

// Reactive data
const dataPoints = ref([])
const isProcessing = ref(false)
const showPrediction = ref(false)
const confidence = ref(0)
const currentInputLabel = ref('Datos')
const currentAlgorithm = ref('Algoritmo ML')
const currentPrediction = ref('Predicción')

// ML concepts for floating bubbles
const mlConcepts = ref([
  { name: 'Neural Networks', x: 10, y: 20 },
  { name: 'Deep Learning', x: 85, y: 15 },
  { name: 'Regression', x: 5, y: 60 },
  { name: 'Classification', x: 90, y: 70 },
  { name: 'Clustering', x: 15, y: 85 },
  { name: 'Random Forest', x: 80, y: 45 }
])

// Data point colors for different data types
const dataColors = [
  'rgba(78, 205, 196, 0.8)', // Turquoise
  'rgba(69, 183, 209, 0.8)', // Blue
  'rgba(255, 107, 107, 0.8)', // Red
  'rgba(255, 193, 7, 0.8)',   // Yellow
  'rgba(156, 39, 176, 0.8)',  // Purple
  'rgba(76, 175, 80, 0.8)'    // Green
]

// Algorithm names
const algorithms = [
  'Linear Regression',
  'Random Forest',
  'Neural Network',
  'SVM',
  'K-Means',
  'Decision Tree'
]

// Input labels
const inputLabels = [
  'Datos de Entrada',
  'Features',
  'Training Data',
  'Raw Data'
]

// Prediction labels
const predictionLabels = [
  'Predicción',
  'Clasificación',
  'Resultado',
  'Output'
]

let animationInterval = null

// Initialize data points
const initializeDataPoints = () => {
  dataPoints.value = Array.from({ length: 6 }, (_, i) => ({
    active: false,
    processing: false,
    delay: Math.random() * 2,
    color: dataColors[i]
  }))
}

// Simulate ML process
const simulateMLProcess = () => {
  // Reset state
  dataPoints.value.forEach(point => {
    point.active = false
    point.processing = false
  })
  isProcessing.value = false
  showPrediction.value = false
  confidence.value = 0

  // Change labels randomly
  currentInputLabel.value = inputLabels[Math.floor(Math.random() * inputLabels.length)]
  currentAlgorithm.value = algorithms[Math.floor(Math.random() * algorithms.length)]
  currentPrediction.value = predictionLabels[Math.floor(Math.random() * predictionLabels.length)]

  // Activate data points randomly
  const activationSequence = [...Array(6).keys()].sort(() => Math.random() - 0.5)
  
  activationSequence.forEach((index, i) => {
    setTimeout(() => {
      dataPoints.value[index].active = true
      dataPoints.value[index].processing = true
      
      // After all points are active, start brain processing
      if (i === activationSequence.length - 1) {
        setTimeout(() => {
          isProcessing.value = true
          
          // Show prediction after processing
          setTimeout(() => {
            showPrediction.value = true
            
            // Animate confidence meter
            const targetConfidence = 75 + Math.random() * 20
            const step = targetConfidence / 30
            let current = 0
            
            const confidenceInterval = setInterval(() => {
              current += step
              confidence.value = Math.min(current, targetConfidence)
              
              if (current >= targetConfidence) {
                clearInterval(confidenceInterval)
              }
            }, 50)
            
          }, 1500)
        }, 500)
      }
    }, i * 200 + Math.random() * 300)
  })
}

onMounted(() => {
  initializeDataPoints()
  
  // Start initial animation
  setTimeout(() => {
    simulateMLProcess()
  }, 1000)
  
  // Repeat animation every 8 seconds
  animationInterval = setInterval(() => {
    simulateMLProcess()
  }, 8000)
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 16px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: white;
  line-height: 1.1;
}

.gradient-text {
  background: linear-gradient(45deg, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

/* ML Visualization */
.ml-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  position: relative;
}

.data-flow {
  display: flex;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 2;
}

.data-input,
.data-output {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* Enhanced Data Points */
.data-points-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.data-point {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  opacity: 0.5;
  transform: scale(0.8);
}

.data-point.active {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  animation: dataActivate 0.6s ease-out;
}

.data-point.processing {
  animation: dataProcess 2s infinite ease-in-out;
}

/* Flow Arrows with Data Stream */
.flow-arrow {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.data-stream {
  position: absolute;
  width: 100%;
  height: 2px;
  overflow: hidden;
}

.stream-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(78, 205, 196, 0.8);
  border-radius: 50%;
  animation: streamFlow 2s infinite linear;
}

.stream-particle:nth-child(2) {
  animation-delay: 0.7s;
  background: rgba(69, 183, 209, 0.8);
}

.stream-particle:nth-child(3) {
  animation-delay: 1.4s;
  background: rgba(255, 107, 107, 0.8);
}

/* Enhanced ML Brain */
.ml-brain {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
}

.brain-core {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.brain-core.processing {
  background: rgba(78, 205, 196, 0.2);
  border-color: rgba(78, 205, 196, 0.5);
  animation: brainProcess 1.5s infinite ease-in-out;
  box-shadow: 0 0 30px rgba(78, 205, 196, 0.3);
}

/* Neural Network Effect */
.neural-network {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.neural-node {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: neuralPulse 2s infinite ease-in-out;
}

.neural-node:nth-child(1) { top: 10%; left: 50%; transform: translateX(-50%); }
.neural-node:nth-child(2) { top: 30%; right: 15%; animation-delay: 0.3s; }
.neural-node:nth-child(3) { top: 50%; right: 5%; animation-delay: 0.6s; }
.neural-node:nth-child(4) { bottom: 30%; right: 15%; animation-delay: 0.9s; }
.neural-node:nth-child(5) { bottom: 10%; left: 50%; transform: translateX(-50%); animation-delay: 1.2s; }
.neural-node:nth-child(6) { top: 50%; left: 5%; animation-delay: 1.5s; }

/* Processing Indicator */
.processing-indicator {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4ecdc4, #45b7d1);
  border-radius: 2px;
  animation: progressLoad 2s ease-in-out;
}

/* Enhanced Prediction Box */
.prediction-box {
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  gap: 8px;
}

.prediction-box.success {
  background: rgba(76, 175, 80, 0.2);
  border-color: #4caf50;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
  animation: predictionSuccess 0.6s ease-out;
}

.prediction-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.confidence-meter {
  width: 40px;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.confidence-bar {
  height: 100%;
  background: #4caf50;
  border-radius: 2px;
  transition: width 1s ease-out;
}

.flow-label {
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  transition: all 0.3s ease;
}

/* Floating ML Concepts */
.floating-concepts {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.concept-bubble {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: floatConcept 8s infinite linear;
}

/* Animations */
@keyframes dataActivate {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes dataProcess {
  0%, 100% { transform: translateY(0px); opacity: 1; }
  50% { transform: translateY(-8px); opacity: 0.7; }
}

@keyframes streamFlow {
  0% { left: -10px; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { left: 110%; opacity: 0; }
}

@keyframes brainProcess {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes neuralPulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes progressLoad {
  0% { width: 0%; }
  100% { width: 100%; }
}

@keyframes predictionSuccess {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes floatConcept {
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
  25% { opacity: 0.8; }
  50% { transform: translateY(-20px) rotate(2deg); opacity: 0.6; }
  75% { opacity: 0.8; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
}

.bounce {
  animation: bounce 0.6s ease-out;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-btn {
    width: 100%;
    margin-bottom: 12px;
  }
  
  .ml-visualization {
    height: auto;
    min-height: 450px;
    padding: 20px 0;
  }
  
  .data-flow {
    flex-direction: column;
    gap: 35px;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .flow-arrow {
    transform: rotate(90deg);
  }

  .concept-bubble {
    font-size: 0.6rem;
    padding: 4px 8px;
  }
  
  .brain-core {
    width: 80px;
    height: 80px;
  }
  
  .prediction-box {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 48px 0;
  }
  
  .ml-visualization {
    min-height: 400px;
  }
  
  .data-flow {
    gap: 25px;
  }
}
</style>