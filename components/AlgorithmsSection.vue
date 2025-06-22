<template>
  <client-only>
    <section class="algorithms-section py-16" id="content">
      <v-container>
        <!-- Overlay de bloqueo -->
        <div v-if="!evaluationPassed" class="locked-overlay">
          <div class="lock-content">
            <v-icon size="64" color="warning">mdi-lock</v-icon>
            <h3 class="lock-title">Contenido Bloqueado</h3>
            <p class="lock-message">
              Completa la evaluación para desbloquear las Redes Neuronales
            </p>
            <NuxtLink to="/quiz">
              <v-btn color="deep-purple">
                Ir a Evaluación
              </v-btn>
            </NuxtLink>
          </div>
        </div>

        <!-- Contenido normal de algoritmos -->
        <div :class="{ 'content-blurred': !evaluationPassed }">
          <div class="section-header text-center mb-12">
            <h2 class="section-title">Algoritmos Principales</h2>
            <p class="section-subtitle">
              Explora los algoritmos más importantes y sus aplicaciones
            </p>
          </div>

          <v-row class="mb-8">
            <v-col 
              cols="12" 
              md="4" 
              v-for="(algorithm, index) in algorithms" 
              :key="index"
              class="mb-4"
            >
              <div 
                class="algorithm-card"
                :class="{ 'card-hover': hoveredCard === index }"
                @mouseenter="hoveredCard = index"
                @mouseleave="hoveredCard = null"
                @click="$emit('go-to-algorithm', algorithm.link)"
              >
                <div class="card-header">
                  <div class="algorithm-icon">
                    <v-icon size="48" color="white">{{ algorithm.icon }}</v-icon>
                  </div>
                  <div class="difficulty-badge" :class="algorithm.difficulty">
                    {{ getDifficultyText(algorithm.difficulty) }}
                  </div>
                </div>
                
                <div class="card-content">
                  <h3 class="algorithm-title">{{ algorithm.title }}</h3>
                  <p class="algorithm-description">{{ algorithm.description }}</p>
                  
                  <div class="applications mb-4">
                    <h4 class="applications-title">Aplicaciones:</h4>
                    <div class="application-tags">
                      <span 
                        v-for="app in algorithm.applications" 
                        :key="app"
                        class="app-tag"
                      >
                        {{ app }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="progress-info">
                    <div class="progress-label">
                      <span>Complejidad</span>
                      <span>{{ algorithm.complexity }}%</span>
                    </div>
                    <v-progress-linear
                      :model-value="algorithm.complexity"
                      :color="getComplexityColor(algorithm.complexity)"
                      height="6"
                      rounded
                    ></v-progress-linear>
                  </div>
                </div>

                <div class="card-footer">
                  <v-btn
                    color="deep-purple"
                    variant="flat"
                    block
                    @click.stop="$emit('go-to-algorithm', algorithm.link)"
                  >
                    Comenzar a Aprender
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()
const evaluationPassed = computed(() => store.passed)

defineEmits(['scroll-to-evaluation', 'go-to-algorithm'])

const hoveredCard = ref(null)

const algorithms = [
  {
    title: 'Redes Neuronales',
    description: 'Sistemas inspirados en el cerebro humano, capaces de aprender patrones complejos y no lineales.',
    icon: 'mdi-brain',
    difficulty: 'advanced',
    complexity: 85,
    applications: ['Visión Computacional', 'NLP', 'Reconocimiento de Voz'],
    link: '/neuronalnets'
  }
]

const getDifficultyText = (difficulty) => {
  const map = {
    'beginner': 'Principiante',
    'intermediate': 'Intermedio',
    'advanced': 'Avanzado'
  }
  return map[difficulty] || difficulty
}

const getComplexityColor = (complexity) => {
  if (complexity < 50) return 'success'
  if (complexity < 75) return 'warning'
  return 'error'
}
</script>


<style scoped>
.locked-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 20px;
}

.lock-content {
  text-align: center;
  color: white;
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
}

.content-blurred {
  filter: blur(5px);
  pointer-events: none;
}

.algorithms-section {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
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

.algorithm-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.6s ease-out;
}

.algorithm-card:hover,
.card-hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.25);
}

.algorithm-card:nth-child(2) {
  animation-delay: 0.1s;
}

.algorithm-card:nth-child(3) {
  animation-delay: 0.2s;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.algorithm-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(139, 92, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.difficulty-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.difficulty-badge.beginner {
  background: rgba(76, 175, 80, 0.3);
  color: #4caf50;
}

.difficulty-badge.intermediate {
  background: rgba(255, 193, 7, 0.3);
  color: #ffc107;
}

.difficulty-badge.advanced {
  background: rgba(244, 67, 54, 0.3);
  color: #f44336;
}

.algorithm-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.algorithm-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
}

.applications-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.application-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.app-tag {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.progress-info {
  margin-bottom: 24px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

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

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .algorithm-card {
    margin-bottom: 24px;
    padding: 24px;
  }
}
</style>