<template>
  <!-- ... tu template existente ... -->
  <v-app>
    <v-main class="ml-bg">

      <!-- Tu contenido existente... -->
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
                      <v-icon
                        v-if="progressStore.mlModuleCompleted"
                        class="completion-badge"
                        size="30"
                        color="success"
                      >
                        mdi-check-circle
                      </v-icon>
                    </div>

                    <h3 class="text-h4 mb-4 text-primary font-weight-bold">
                      Módulo 1: Machine Learning
                    </h3>

                    <p class="text-h6 mb-6 text-grey-darken-1">
                      Fundamentos del Aprendizaje Automático
                    </p>

                    <div class="progress-section mb-6">
                      <div class="d-flex justify-space-between align-center mb-2">
                        <span class="text-body-2">Progreso: {{ progressStore.mlProgress }}%</span>
                        <span class="text-body-2">{{ progressStore.completedMLSteps }}/{{ progressStore.totalMLSteps }} lecciones</span>
                      </div>
                      <v-progress-linear
                        :model-value="progressStore.mlProgress"
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
                          <v-icon class="mr-2" size="20" :color="progressStore.mlModuleCompleted ? 'success' : 'purple'">
                            {{ progressStore.mlModuleCompleted ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                          </v-icon>
                          Evaluación Final
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-btn
                      size="large"
                      :color="progressStore.mlModuleCompleted ? 'success' : 'primary'"
                      @click="startMLModule"
                      class="module-btn px-8"
                      elevation="4"
                    >
                      <v-icon left class="mr-2">
                        {{ progressStore.mlModuleCompleted ? 'mdi-check' : 'mdi-play' }}
                      </v-icon>
                      {{ progressStore.mlModuleCompleted ? 'Módulo Completado' : 'Comenzar Módulo' }}
                    </v-btn>
                  </v-card>
                </v-col>

                <v-col cols="12" md="2" class="text-center">
                  <div class="connector-arrow">
                    <v-icon 
                      size="60" 
                      :color="progressStore.isNeuralNetworkUnlocked ? 'success' : 'white'" 
                      class="d-none d-md-block"
                    >
                      {{ progressStore.isNeuralNetworkUnlocked ? 'mdi-arrow-right-bold' : 'mdi-arrow-right' }}
                    </v-icon>
                    <v-icon 
                      size="60" 
                      :color="progressStore.isNeuralNetworkUnlocked ? 'success' : 'white'" 
                      class="d-md-none"
                    >
                      {{ progressStore.isNeuralNetworkUnlocked ? 'mdi-arrow-down-bold' : 'mdi-arrow-down' }}
                    </v-icon>
                  </div>
                </v-col>

                <v-col cols="12" md="5">
                  <v-card
                    class="module-card pa-8 text-center"
                    elevation="12"
                    height="100%"
                    :class="{ 'locked-module': !progressStore.isNeuralNetworkUnlocked, 'unlocked-module': progressStore.isNeuralNetworkUnlocked }"
                  >
                    <div class="module-icon mb-6">
                      <v-icon
                        size="80"
                        :color="progressStore.isNeuralNetworkUnlocked ? 'secondary' : 'grey'"
                      >
                        mdi-network
                      </v-icon>
                      <v-icon
                        v-if="!progressStore.isNeuralNetworkUnlocked"
                        class="lock-icon"
                        size="30"
                        color="grey"
                      >
                        mdi-lock
                      </v-icon>
                      <v-icon
                        v-else-if="progressStore.isNeuralNetworkUnlocked && !progressStore.nnModuleCompleted"
                        class="unlock-icon"
                        size="30"
                        color="success"
                      >
                        mdi-lock-open
                      </v-icon>
                    </div>

                    <h3 class="text-h4 mb-4 font-weight-bold" :class="progressStore.isNeuralNetworkUnlocked ? 'text-secondary' : 'text-grey'">
                      Módulo 2: Redes Neuronales
                    </h3>

                    <p class="text-h6 mb-6 text-grey-darken-1">
                      Deep Learning y Arquitecturas Avanzadas
                    </p>

                    <div class="progress-section mb-6">
                      <div class="d-flex justify-space-between align-center mb-2">
                        <span class="text-body-2">Progreso: {{ progressStore.nnProgress }}%</span>
                        <span class="text-body-2">{{ progressStore.completedNNSteps }}/{{ progressStore.totalNNSteps }} lecciones</span>
                      </div>
                      <v-progress-linear
                        :model-value="progressStore.nnProgress"
                        color="secondary"
                        height="8"
                        rounded
                        :disabled="!progressStore.isNeuralNetworkUnlocked"
                      ></v-progress-linear>
                    </div>

                    <v-list class="module-content mb-6">
                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="progressStore.isNeuralNetworkUnlocked ? 'indigo' : 'grey'">mdi-circle-outline</v-icon>
                          Fundamentos de Redes Neuronales
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="progressStore.isNeuralNetworkUnlocked ? 'cyan' : 'grey'">mdi-circle-outline</v-icon>
                          Perceptrón y Multicapa
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="progressStore.isNeuralNetworkUnlocked ? 'teal' : 'grey'">mdi-circle-outline</v-icon>
                          Backpropagation
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="progressStore.isNeuralNetworkUnlocked ? 'pink' : 'grey'">mdi-circle-outline</v-icon>
                          Deep Learning Básico
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item class="px-0">
                        <v-list-item-title class="text-left">
                          <v-icon class="mr-2" size="20" :color="progressStore.isNeuralNetworkUnlocked ? 'deep-purple' : 'grey'">mdi-circle-outline</v-icon>
                          Aplicaciones Prácticas
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-btn
                      size="large"
                      :color="progressStore.isNeuralNetworkUnlocked ? 'secondary' : 'grey'"
                      @click="startNNModule"
                      class="module-btn px-8"
                      elevation="4"
                      :disabled="!progressStore.isNeuralNetworkUnlocked"
                    >
                      <v-icon left class="mr-2">
                        {{ progressStore.isNeuralNetworkUnlocked ? 'mdi-play' : 'mdi-lock' }}
                      </v-icon>
                      {{ progressStore.isNeuralNetworkUnlocked ? 'Comenzar Módulo' : 'Completar Módulo 1' }}
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Notificación de desbloqueo -->
      <v-snackbar
        v-model="showUnlockNotification"
        :timeout="4000"
        color="success"
        location="bottom"
      >
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi-trophy</v-icon>
          ¡Módulo de Redes Neuronales desbloqueado!
        </div>
        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="showUnlockNotification = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>

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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '@/stores/progress'
// Assuming HeroSectionIndex is properly imported from your components folder
// import HeroSectionIndex from '~/components/HeroSectionIndex.vue';

const router = useRouter()
const progressStore = useProgressStore()
const showUnlockNotification = ref(false)

// Watch para mostrar notificación cuando se desbloquee el módulo
watch(() => progressStore.isNeuralNetworkUnlocked, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    showUnlockNotification.value = true
  }
})

const startMLModule = () => {
  router.push('/ml_index')
}

const startNNModule = () => {
  if (progressStore.isNeuralNetworkUnlocked) {
    router.push('/neuronalnets')
  }
}

// Cargar progreso al montar el componente
onMounted(() => {
  progressStore.loadProgress()
})

// Meta tags para SEO
useHead({
  title: 'OVA Machine Learning - Inicio',
  meta: [
    { name: 'description', content: 'Objeto Virtual de Aprendizaje interactivo sobre Machine Learning y Redes Neuronales' }
  ]
})
</script>

<style scoped>
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
  cursor: not-allowed;
}

.unlocked-module {
  border: 2px solid #4CAF50;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.3) !important;
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
  z-index: 1;
}

.unlock-icon {
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  background: white;
  border-radius: 50%;
  padding: 4px;
  z-index: 1;
  animation: pulse-success 2s infinite;
}

.completion-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: white;
  border-radius: 50%;
  padding: 2px;
}

@keyframes pulse-success {
  0% { 
    opacity: 0.6; 
    transform: translateY(-50%) scale(1);
  }
  50% { 
    opacity: 1; 
    transform: translateY(-50%) scale(1.1);
  }
  100% { 
    opacity: 0.6; 
    transform: translateY(-50%) scale(1);
  }
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
    font-size: 2.5rem !important;
  }

  .display-3 {
    font-size: 2rem !important;
  }

  .text-h3 {
    font-size: 1.8rem !important;
  }

  .text-h4 {
    font-size: 1.5rem !important;
  }

  .module-card {
    margin-bottom: 20px;
  }

  .connector-arrow {
    margin: 20px 0;
  }

  .modules-container {
    padding: 0 10px;
  }
}

@media (max-width: 480px) {
  .module-card {
    padding: 20px 16px !important;
  }

  .module-icon {
    margin-bottom: 16px !important;
  }

  .module-icon v-icon {
    font-size: 60px !important;
  }

  .text-h4 {
    font-size: 1.3rem !important;
  }

  .text-h6 {
    font-size: 1rem !important;
  }

  .module-btn {
    width: 100%;
    padding: 12px 16px !important;
  }

  .info-card {
    padding: 20px 16px !important;
    margin-bottom: 16px;
  }
}

/* Animaciones adicionales */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.module-card {
  animation: fadeInUp 0.6s ease-out;
}

.module-card:nth-child(2n) {
  animation-delay: 0.2s;
}

.info-card {
  animation: fadeInUp 0.6s ease-out;
}

.info-card:nth-child(2n) {
  animation-delay: 0.1s;
}

.info-card:nth-child(3n) {
  animation-delay: 0.2s;
}

/* Efectos de scroll */
@media (prefers-reduced-motion: no-preference) {
  .module-card {
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .info-card {
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
  }
}

/* Estados de hover mejorados */
.module-btn:not(:disabled):hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

.module-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Mejoras para accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .module-card,
  .info-card,
  .connector-arrow,
  .unlock-icon {
    animation: none !important;
    transition: none !important;
  }
  
  .module-card:hover,
  .info-card:hover,
  .step-card:hover,
  .module-btn:hover {
    transform: none !important;
  }
}

/* Focus states para accesibilidad */
.module-btn:focus {
  outline: 2px solid #2196F3;
  outline-offset: 2px;
}

.module-card:focus-within {
  outline: 2px solid #2196F3;
  outline-offset: 4px;
}
</style>