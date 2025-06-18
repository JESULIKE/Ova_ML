<template>
    <section class="demo-section py-16">
      <v-container>
        <div class="demo-container">
          <h3 class="demo-title text-center mb-8">Demo Interactivo: Clasificación</h3>
          <div class="classification-demo">
            <div class="demo-controls mb-6">
              <v-btn
                :color="isTraining ? 'error' : 'success'"
                @click="toggleTraining"
                class="mr-4"
              >
                {{ isTraining ? 'Detener' : 'Entrenar' }} Modelo
              </v-btn>
              <v-select
                v-model="selectedAlgorithm"
                :items="demoAlgorithms"
                label="Algoritmo"
                variant="outlined"
                class="demo-select"
              ></v-select>
            </div>
            
            <div class="demo-visualization">
              <div class="data-points">
                <div class="point-group">
                  <h4 class="group-title">Clase A</h4>
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
                  <div class="decision-boundary" :class="{ 'active': isTraining }"></div>
                </div>
                
                <div class="point-group">
                  <h4 class="group-title">Clase B</h4>
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
              
              <div class="training-metrics" v-if="isTraining">
                <div class="metric">
                  <span class="metric-label">Precisión:</span>
                  <span class="metric-value">{{ trainingAccuracy }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Época:</span>
                  <span class="metric-value">{{ currentEpoch }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </section>
  </template>
  
  <script setup>
  import { ref, onUnmounted } from 'vue'
  
  // Props
  defineProps({
    demoAlgorithms: {
      type: Array,
      default: () => ['Neural Networks', 'SVM', 'Random Forest', 'Logistic Regression']
    }
  })
  
  // Estado del componente
  const isTraining = ref(false)
  const selectedAlgorithm = ref('Neural Networks')
  const trainingPoints = ref([])
  const trainingAccuracy = ref(0)
  const currentEpoch = ref(0)
  let trainingInterval = null
  
  // Métodos
  const toggleTraining = () => {
    isTraining.value = !isTraining.value
    isTraining.value ? startTraining() : stopTraining()
  }
  
  const startTraining = () => {
    currentEpoch.value = 0
    trainingAccuracy.value = Math.floor(Math.random() * 30) + 60
  
    trainingInterval = setInterval(() => {
      currentEpoch.value++
      const allPoints = []
      for (let i = 1; i <= 8; i++) {
        allPoints.push(`a-${i}`, `b-${i}`)
      }
      trainingPoints.value = allPoints.slice(0, Math.floor(Math.random() * 8) + 4)
  
      if (trainingAccuracy.value < 95) {
        trainingAccuracy.value += Math.floor(Math.random() * 3) + 1
      }
  
      setTimeout(() => {
        trainingPoints.value = []
      }, 500)
    }, 1500)
  }
  
  const stopTraining = () => {
    if (trainingInterval) {
      clearInterval(trainingInterval)
      trainingInterval = null
    }
    trainingPoints.value = []
  }
  
  onUnmounted(() => {
    stopTraining()
  })
  </script>
  
  <style scoped>
  .demo-section {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .demo-title {
    font-size: 2rem;
    color: white;
    font-weight: 600;
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
    max-width: 200px;
  }
  
  .demo-visualization {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
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
  }
  
  .points-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  
  .data-point {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .class-a {
    background: #4caf50;
  }
  
  .class-b {
    background: #f44336;
  }
  
  .data-point.training {
    transform: scale(1.3);
    box-shadow: 0 0 20px currentColor;
  }
  
  .separator {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .decision-boundary {
    width: 4px;
    height: 100px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  
  .decision-boundary.active {
    background: #8b5cf6;
    box-shadow: 0 0 20px #8b5cf6;
    animation: boundaryPulse 2s infinite;
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
  }
  
  .metric {
    text-align: center;
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
  
  @media (max-width: 768px) {
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
  }
  
  @media (max-width: 480px) {
    .demo-visualization {
      padding: 24px;
    }
    
    .points-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  </style>