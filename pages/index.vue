<template>
  <v-app>
    <v-main class="ml-bg">
      <HeroSectionIndex />

      <section class="modules-section py-12">
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <h2 class="text-h3 text-center mb-12 text-white font-weight-bold">
                Módulos de Aprendizaje
              </h2>

              <v-row justify="center" align="center" class="modules-container">
                <v-col cols="12" md="5">
                  <v-card class="module-card pa-8 text-center" elevation="12" height="100%">
                    <div class="module-icon mb-6">
                      <v-icon size="80" color="primary">mdi-brain-outline</v-icon>
                    </div>

                    <h3 class="text-h4 mb-4 text-primary font-weight-bold">
                      Módulo 1: Machine Learning
                    </h3>

                    <p class="text-h6 mb-6 text-grey-darken-1">
                      Fundamentos del Aprendizaje Automático
                    </p>

                    <div class="progress-section mb-6">
                      <div class="d-flex justify-space-between align-center mb-2">
                        <span class="text-body-2">Progreso: {{ mlProgress }}%</span>
                        <span class="text-body-2">{{ completedMLSteps }}/{{ totalMLSteps }} lecciones</span>
                      </div>
                      <v-progress-linear
                        :model-value="mlProgress"
                        color="primary"
                        height="8"
                        rounded
                      ></v-progress-linear>
                    </div>

                    <v-list class="module-content mb-6">
                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" color="blue">mdi-circle-outline</v-icon>
                          ¿Qué es Machine Learning?
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" color="green">mdi-circle-outline</v-icon>
                          Tipos de Aprendizaje
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" color="orange">mdi-circle-outline</v-icon>
                          Regresión vs Clasificación
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" color="red">mdi-circle-outline</v-icon>
                          Evaluación de Modelos
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" color="purple">mdi-circle-outline</v-icon>
                          Evaluación Final
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-btn
                      size="large"
                      color="primary"
                      @click="startMLModule"
                      class="module-btn px-8"
                      elevation="4"
                    >
                      <v-icon left class="mr-2">mdi-play</v-icon>
                      Comenzar Módulo
                    </v-btn>
                  </v-card>
                </v-col>

                <v-col cols="12" md="2" class="text-center">
                  <div class="connector-arrow">
                    <v-icon size="60" color="white" class="d-none d-md-block">mdi-arrow-right</v-icon>
                    <v-icon size="60" color="white" class="d-md-none">mdi-arrow-down</v-icon>
                  </div>
                </v-col>

                <v-col cols="12" md="5">
                  <v-card
                    class="module-card pa-8 text-center"
                    elevation="12"
                    height="100%"
                    :class="{ 'locked-module': !isNeuralNetworkUnlocked }"
                  >
                    <div class="module-icon mb-6">
                      <v-icon
                        size="80"
                        :color="isNeuralNetworkUnlocked ? 'secondary' : 'grey'"
                      >
                        mdi-network
                      </v-icon>
                      <v-icon
                        v-if="!isNeuralNetworkUnlocked"
                        class="lock-icon"
                        size="30"
                        color="grey"
                      >
                        mdi-lock
                      </v-icon>
                    </div>

                    <h3 class="text-h4 mb-4 font-weight-bold" :class="isNeuralNetworkUnlocked ? 'text-secondary' : 'text-grey'">
                      Módulo 2: Redes Neuronales
                    </h3>

                    <p class="text-h6 mb-6 text-grey-darken-1">
                      Deep Learning y Arquitecturas Avanzadas
                    </p>

                    <div class="progress-section mb-6">
                      <div class="d-flex justify-space-between align-center mb-2">
                        <span class="text-body-2">Progreso: {{ nnProgress }}%</span>
                        <span class="text-body-2">{{ completedNNSteps }}/{{ totalNNSteps }} lecciones</span>
                      </div>
                      <v-progress-linear
                        :model-value="nnProgress"
                        color="secondary"
                        height="8"
                        rounded
                        :disabled="!isNeuralNetworkUnlocked"
                      ></v-progress-linear>
                    </div>

                    <v-list class="module-content mb-6">
                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="isNeuralNetworkUnlocked ? 'indigo' : 'grey'">mdi-circle-outline</v-icon>
                          Fundamentos de Redes Neuronales
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="isNeuralNetworkUnlocked ? 'cyan' : 'grey'">mdi-circle-outline</v-icon>
                          Perceptrón y Multicapa
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="isNeuralNetworkUnlocked ? 'teal' : 'grey'">mdi-circle-outline</v-icon>
                          Backpropagation
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="isNeuralNetworkUnlocked ? 'pink' : 'grey'">mdi-circle-outline</v-icon>
                          Deep Learning Básico
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="isNeuralNetworkUnlocked ? 'deep-purple' : 'grey'">mdi-circle-outline</v-icon>
                          Aplicaciones Prácticas
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-btn
                      size="large"
                      :color="isNeuralNetworkUnlocked ? 'secondary' : 'grey'"
                      @click="startNNModule"
                      class="module-btn px-8"
                      elevation="4"
                      :disabled="!isNeuralNetworkUnlocked"
                    >
                      <v-icon left class="mr-2">
                        {{ isNeuralNetworkUnlocked ? 'mdi-play' : 'mdi-lock' }}
                      </v-icon>
                      {{ isNeuralNetworkUnlocked ? 'Comenzar Módulo' : 'Completar Módulo 1' }}
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section class="info-section py-12">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-card class="info-card pa-6 h-100" elevation="6">
                <v-icon size="60" color="blue" class="mb-4">mdi-clock-outline</v-icon>
                <h3 class="text-h5 mb-3 text-blue">Duración Estimada</h3>
                <p class="text-body-1">
                  Aproximadamente 3-4 horas de estudio interactivo
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="info-card pa-6 h-100" elevation="6">
                <v-icon size="60" color="green" class="mb-4">mdi-account-school</v-icon>
                <h3 class="text-h5 mb-3 text-green">Nivel</h3>
                <p class="text-body-1">
                  Principiante a Intermedio<br>
                  No se requieren conocimientos previos
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="info-card pa-6 h-100" elevation="6">
                <v-icon size="60" color="orange" class="mb-4">mdi-trophy</v-icon>
                <h3 class="text-h5 mb-3 text-orange">Certificación</h3>
                <p class="text-body-1">
                  Completa todas las secciones y evaluaciones para obtener tu certificado
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// Assuming HeroSectionIndex is properly imported from your components folder
// import HeroSectionIndex from '~/components/HeroSectionIndex.vue';

const router = useRouter()

// Progreso de los módulos (esto podría venir de un store/pinia en una app real)
const completedMLSteps = ref(0)
const totalMLSteps = ref(5)
const completedNNSteps = ref(0)
const totalNNSteps = ref(5)

// Computed properties para el progreso
const mlProgress = computed(() => {
  return Math.round((completedMLSteps.value / totalMLSteps.value) * 100)
})

const nnProgress = computed(() => {
  return Math.round((completedNNSteps.value / totalNNSteps.value) * 100)
})

// El módulo de redes neuronales se desbloquea al completar ML
const isNeuralNetworkUnlocked = computed(() => {
  // For testing, you can temporarily set this to true:
  // return true;
  return completedMLSteps.value >= totalMLSteps.value
})

const startMLModule = () => {
  router.push('/ml_index')
}

const startNNModule = () => {
  if (isNeuralNetworkUnlocked.value) {
    router.push('/neuronalnets')
  }
}

// Meta tags para SEO
useHead({
  title: 'OVA Machine Learning - Inicio',
  meta: [
    { name: 'description', content: 'Objeto Virtual de Aprendizaje interactivo sobre Machine Learning y Redes Neuronales' }
  ]
})
</script>

<style scoped>
/*
  No hay cambios necesarios en la sección de estilos
  ya que los errores no estaban relacionados con CSS directamente.
*/
.ml-bg {
  min-height: 100vh;
}

.min-height {
  min-height: 60vh;
}

.hero-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px !important;
}

.objectives-card {
  border-radius: 15px !important;
}

.modules-section {
  background: rgba(255, 255, 255, 0.05);
}

.modules-container {
  max-width: 1200px;
  margin: 0 auto;
}

.module-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px !important;
  transition: all 0.3s ease;
  position: relative;
}

.module-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}

.locked-module {
  opacity: 0.7;
  /* Optional: Add a cursor style to indicate it's not clickable */
  cursor: not-allowed;
}

.module-icon {
  position: relative;
}

.lock-icon {
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  background: white;
  border-radius: 50%;
  padding: 4px;
  z-index: 1; /* Ensure lock icon is above other elements if needed */
}

.progress-section {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 16px;
}

.module-content {
  background: transparent;
  text-align: left;
}

.module-btn {
  font-weight: bold;
  border-radius: 25px !important;
  transition: all 0.3s ease;
}

.module-btn:hover {
  transform: translateY(-2px);
}

.connector-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.learning-stepper {
  border-radius: 15px !important;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.step-card {
  border-radius: 12px !important;
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
}

.info-card {
  border-radius: 15px !important;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-section,
.modules-section,
.start-section {
  background: rgba(255, 255, 255, 0.05);
}

.info-section:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 32px 0;
  }

  .display-2 {
    font-size: 2rem !important;
  }

  .start-btn {
    width: 100%;
  }
}

/* Scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 48px 0;
  }
}
</style>