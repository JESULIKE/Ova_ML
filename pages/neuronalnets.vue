<template>
  <v-app>
    <v-main class="neural-bg">
      <!-- Hero Section -->
      <section class="hero-section py-16">
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" class="text-center text-md-left">
              <div class="hero-content">
                <h1 class="hero-title mb-4">
                  Explorando las
                  <span class="gradient-text">Redes Neuronales</span>
                </h1>
                <p class="hero-subtitle mb-6">
                  Sumérgete en el fascinante mundo de la inteligencia artificial 
                  a través de una experiencia de aprendizaje interactiva y visual.
                </p>
                <v-btn
                  color="deep-purple"
                  size="large"
                  variant="flat"
                  class="hero-btn"
                  @click="scrollToContent"
                >
                  Comenzar Exploración
                  <v-icon right>mdi-rocket-launch</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="text-center">
              <div class="neural-animation">
                <div class="neural-network">
                  <div v-for="layer in 3" :key="layer" class="neural-layer">
                    <div
                      v-for="neuron in getNeuronCount(layer)"
                      :key="neuron"
                      class="neuron"
                      :class="`neuron-${layer}-${neuron}`"
                    ></div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Stats Section -->
      <section class="stats-section py-12">
        <v-container>
          <v-row>
            <v-col cols="6" md="3" v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="stat-card">
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Interactive Content Section -->
      <section class="content-section py-16" id="content">
        <v-container>
          <div class="section-header text-center mb-12">
            <h2 class="section-title">Tu Viaje de Aprendizaje</h2>
            <p class="section-subtitle">
              Cada módulo está diseñado para construir tu comprensión paso a paso
            </p>
          </div>

          <!-- Interactive Cards -->
          <v-row dense class="mb-8">
            <v-col 
              cols="12" 
              md="6" 
              v-for="(section, index) in sections" 
              :key="index"
              class="mb-4"
            >
              <div 
                class="interactive-card"
                :class="{ 'card-hover': hoveredCard === index }"
                @mouseenter="hoveredCard = index"
                @mouseleave="hoveredCard = null"
                @click="goToSection(section.link)"
              >
                <div class="card-background">
                  <div class="card-icon">
                    <v-icon size="48" color="white">{{ section.icon }}</v-icon>
                  </div>
                  <div class="card-content">
                    <h3 class="card-title">{{ section.title }}</h3>
                    <p class="card-description">{{ section.description }}</p>
                    <div class="card-features">
                      <div 
                        v-for="feature in section.features" 
                        :key="feature"
                        class="feature-tag"
                      >
                        {{ feature }}
                      </div>
                    </div>
                  </div>
                  <div class="card-arrow">
                    <v-icon color="white">mdi-arrow-right</v-icon>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Learning Path -->
          <div class="learning-path mt-16">
            <h3 class="path-title text-center mb-8">Ruta de Aprendizaje Recomendada</h3>
            <div class="path-container">
              <div 
                v-for="(step, index) in learningPath" 
                :key="index"
                class="path-step"
                :class="{ 'active': activeStep === index }"
                @click="activeStep = index"
              >
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">
                  <h4 class="step-title">{{ step.title }}</h4>
                  <p class="step-description">{{ step.description }}</p>
                </div>
                <div v-if="index < learningPath.length - 1" class="path-connector"></div>
              </div>
            </div>
          </div>
        </v-container>
      </section>

      <!-- Interactive Demo Section -->
      <section class="demo-section py-16">
        <v-container>
          <div class="demo-container">
            <h3 class="demo-title text-center mb-8">Demo Interactivo</h3>
            <div class="neural-simulator">
              <div class="simulator-controls mb-6">
                <v-btn
                  :color="isSimulating ? 'error' : 'success'"
                  @click="toggleSimulation"
                  class="mr-4"
                >
                  {{ isSimulating ? 'Detener' : 'Iniciar' }} Simulación
                </v-btn>
                <v-slider
                  v-model="simulationSpeed"
                  min="1"
                  max="10"
                  step="1"
                  label="Velocidad"
                  class="speed-slider"
                ></v-slider>
              </div>
              <div class="simulator-display">
                <div class="input-layer">
                  <div class="layer-label">Entrada</div>
                  <div 
                    v-for="i in 4" 
                    :key="i"
                    class="sim-neuron input"
                    :class="{ 'active': isSimulating && activeInputs.includes(i) }"
                  ></div>
                </div>
                <div class="hidden-layer">
                  <div class="layer-label">Oculta</div>
                  <div 
                    v-for="i in 6" 
                    :key="i"
                    class="sim-neuron hidden"
                    :class="{ 'active': isSimulating && activeHidden.includes(i) }"
                  ></div>
                </div>
                <div class="output-layer">
                  <div class="layer-label">Salida</div>
                  <div 
                    v-for="i in 3" 
                    :key="i"
                    class="sim-neuron output"
                    :class="{ 'active': isSimulating && activeOutputs.includes(i) }"
                  ></div>
                </div>
              </div>
            </div>
                    </div>
        </v-container>
      </section>

      <!-- Continuous Improvement Section -->
      <section class="improvement-section py-12">
        <v-container>
          <div class="improvement-content text-center">
            <v-icon size="64" color="white" class="mb-4">mdi-cog-sync</v-icon>
            <h3 class="improvement-title mb-4">En Mejora Continua</h3>
            <p class="improvement-text mb-6">
              Este Objeto Virtual de Aprendizaje (OVA) está en constante evolución. 
              Regularmente implementamos nuevas funcionalidades, mejoras en la interfaz 
              y actualizaciones de contenido para brindarte la mejor experiencia de aprendizaje posible.
            </p>
            <v-btn
              color="white"
              size="large"
              variant="outlined"
              class="credits-btn"
              @click="goToCredits"
            >
              Ver Créditos
              <v-icon right>mdi-account-group</v-icon>
            </v-btn>
          </div>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const hoveredCard = ref(null)
const activeStep = ref(0)
const isSimulating = ref(false)
const simulationSpeed = ref(5)
const activeInputs = ref([])
const activeHidden = ref([])
const activeOutputs = ref([])
let simulationInterval = null

const stats = [
  { number: '10+', label: 'Conceptos' },
  { number: '3', label: 'Ejercicios' },
  { number: '25+', label: 'Demos' },
  { number: '10+', label: 'Proyectos' }
]

const sections = [
  {
    title: 'Quiz Interactivo',
    description: 'Pon a prueba tus conocimientos con preguntas dinámicas y retroalimentación inmediata.',
    icon: 'mdi-brain',
    link: '/quiz',
    features: ['Preguntas Adaptativas', 'Explicaciones Visuales', 'Progreso en Tiempo Real']
  },
  {
    title: 'Evaluación Avanzada',
    description: 'Domina conceptos complejos con simulaciones interactivas y casos de estudio.',
    icon: 'mdi-chart-line',
    link: '/evaluacion',
    features: ['Casos Reales', 'Simulaciones 3D', 'Análisis Profundo']
  }
]

const learningPath = [
  {
    title: 'Fundamentos',
    description: 'Conceptos básicos de neuronas artificiales y perceptrones'
  },
  {
    title: 'Arquitecturas',
    description: 'Diferentes tipos de redes y sus aplicaciones'
  },
  {
    title: 'Entrenamiento',
    description: 'Algoritmos de aprendizaje y optimización'
  },
  {
    title: 'Aplicaciones',
    description: 'Casos de uso en el mundo real'
  }
]

const getNeuronCount = (layer) => {
  return layer === 1 ? 4 : layer === 2 ? 6 : 3
}

const scrollToContent = () => {
  document.getElementById('content').scrollIntoView({ behavior: 'smooth' })
}

const goToSection = (link) => {
  navigateTo(link)
}

const toggleSimulation = () => {
  isSimulating.value = !isSimulating.value
  
  if (isSimulating.value) {
    startSimulation()
  } else {
    stopSimulation()
  }
}

const startSimulation = () => {
  simulationInterval = setInterval(() => {
    // Simulate neural activity
    activeInputs.value = Array.from({length: Math.floor(Math.random() * 3) + 1}, 
      () => Math.floor(Math.random() * 4) + 1)
    
    setTimeout(() => {
      activeHidden.value = Array.from({length: Math.floor(Math.random() * 4) + 2}, 
        () => Math.floor(Math.random() * 6) + 1)
    }, 200)
    
    setTimeout(() => {
      activeOutputs.value = Array.from({length: Math.floor(Math.random() * 2) + 1}, 
        () => Math.floor(Math.random() * 3) + 1)
    }, 400)
    
    setTimeout(() => {
      activeInputs.value = []
      activeHidden.value = []
      activeOutputs.value = []
    }, 600)
  }, 1000 / simulationSpeed.value)
}

const stopSimulation = () => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
    simulationInterval = null
  }
  activeInputs.value = []
  activeHidden.value = []
  activeOutputs.value = []
}

onUnmounted(() => {
  stopSimulation()
})

const goToCredits = async () => {
  await navigateTo('/creditos')
}
</script>

<style scoped>
.neural-bg {
  background: #6b46c1;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
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
}

.hero-btn {
  background-color: white;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

/* Neural Animation */
.neural-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.neural-network {
  display: flex;
  gap: 80px;
  align-items: center;
}

.neural-layer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.neuron {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.6);
  animation: pulse 2s infinite ease-in-out;
}

.neuron:nth-child(odd) {
  animation-delay: 0.5s;
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    background: rgba(255, 255, 255, 0.3);
  }
  50% { 
    transform: scale(1.2);
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
}

/* Stats Section */
.stats-section {
  background: rgba(255, 255, 255, 0.1);
}

.stat-card {
  padding: 20px;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Content Section */
.content-section {
  background: rgba(255, 255, 255, 0.05);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Interactive Cards */
.interactive-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 20px;
  overflow: hidden;
}

.card-background {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
}

.card-hover .card-background {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.25);
}

.card-icon {
  margin-bottom: 24px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
}

.card-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
}

.card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.feature-tag {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.card-arrow {
  position: absolute;
  top: 24px;
  right: 24px;
  opacity: 0;
  transition: all 0.3s ease;
}

.card-hover .card-arrow {
  opacity: 1;
  transform: translateX(8px);
}

/* Learning Path */
.path-title {
  font-size: 2rem;
  color: white;
  font-weight: 600;
}

.path-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.path-step {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.path-step:hover,
.path-step.active {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(8px);
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #8b5cf6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 24px;
  flex-shrink: 0;
}

.step-content {
  flex-grow: 1;
}

.step-title {
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.step-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

/* Demo Section */
.demo-section {
  background: rgba(255, 255, 255, 0.1);
}

.demo-title {
  font-size: 2rem;
  color: white;
  font-weight: 600;
}

.neural-simulator {
  max-width: 1000px;
  margin: 0 auto;
}

.simulator-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.speed-slider {
  max-width: 200px;
}

.simulator-display {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  min-height: 300px;
}

.input-layer,
.hidden-layer,
.output-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.layer-label {
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.sim-neuron {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.sim-neuron.active {
  background: #4ecdc4;
  border-color: #4ecdc4;
  box-shadow: 0 0 20px rgba(78, 205, 196, 0.6);
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .neural-network {
    gap: 40px;
  }
  
  .simulator-display {
    padding: 20px;
    flex-direction: column;
    gap: 32px;
  }
  
  .input-layer,
  .hidden-layer,
  .output-layer {
    flex-direction: row;
  }
  
  .path-container {
    gap: 16px;
  }
  
  .path-step {
    padding: 16px;
  }
}
</style>