<template>
  <section class="hero-container">
    <!-- Elementos flotantes de fondo -->
    <div class="floating-background">
      <div
        v-for="element in floatingElements"
        :key="element.id"
        class="floating-element"
        :style="{
          left: `${element.x}%`,
          top: `${element.y}%`,
          width: `${element.size}px`,
          height: `${element.size}px`,
          backgroundColor: element.color,
          animationDuration: `${element.speed + 3}s`,
          animationDelay: `${element.id * 0.2}s`
        }"
      >
        <span class="floating-icon">{{ element.icon }}</span>
      </div>
    </div>

    <!-- Contenido principal -->
    <v-container class="hero-content">
      <v-row align="center" justify="center">
        <v-col cols="12" lg="7" class="hero-text">
          <div class="main-icon-container">
            <div class="main-icon bouncing">
              {{ icons[currentIcon] }}
            </div>
            <div class="icon-glow"></div>
          </div>
          
          <h1 class="hero-title">
            <span class="title-line animate-slide-up">Domina el </span>
            <span class="title-highlight animate-slide-up">Machine Learning </span>
            <span class="title-line animate-slide-up">y las </span>
            <span class="title-highlightl animate-slide-up">Redes Neuronales </span>
            <span class="title-line animate-slide-up">desde cero</span>
          </h1>
          
          <p class="hero-description animate-fade-in">
            🚀 Descubre el poder de los algoritmos inteligentes y aprende 
            a crear sistemas que aprenden y se adaptan. ¡Tu puerta de 
            entrada al futuro de la tecnología! ✨
          </p>
          
          <v-row class="hero-stats animate-slide-up" justify="start">
            <v-col cols="auto">
              <v-card class="stat-item" elevation="0">
                <div class="stat-icon">⏱️</div>
                <div class="stat-text">
                  <span class="stat-number">3-4</span>
                  <span class="stat-label">horas</span>
                </div>
              </v-card>
            </v-col>
            <v-col cols="auto">
              <v-card class="stat-item" elevation="0">
                <div class="stat-icon">🎓</div>
                <div class="stat-text">
                  <span class="stat-number">2</span>
                  <span class="stat-label">módulos</span>
                </div>
              </v-card>
            </v-col>
            <v-col cols="auto">
              <v-card class="stat-item" elevation="0">
                <div class="stat-icon">🏆</div>
                <div class="stat-text">
                  <span class="stat-number">1</span>
                  <span class="stat-label">certificado</span>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        
        <v-col cols="12" lg="5" class="hero-visual">
  <div class="learning-path">
    <template v-for="(node, index) in pathNodes" :key="index">
      <v-card
        class="path-node"
        :class="{ active: index === 0 }"
        elevation="4"
        @click="$emit('node-clicked', node)"
      >
        <div class="node-icon">{{ node.icon }}</div>
        <div class="node-label">{{ node.label }}</div>
        <v-tooltip activator="parent" location="top">
          {{ node.tooltip }}
        </v-tooltip>
      </v-card>

      <div
        v-if="index < pathNodes.length - 1"
        class="path-connector"
        :key="`connector-${index}`"
      ></div>
    </template>
  </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Emits
defineEmits(['start-learning', 'node-clicked'])

// Datos reactivos
const currentIcon = ref(0)
const floatingElements = ref([])

// Configuración de iconos y colores
const icons = ['🧠', '🤖', '⚡', '🔬', '🌟', '💡', '🎯', '🚀']
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']

// Nodos del path de aprendizaje
const pathNodes = [
  { icon: '🎯', label: 'INICIO', tooltip: '¡Empezamos aquí!' },
  { icon: '🧠', label: 'ML BÁSICO', tooltip: 'Aprende los básicos' },
  { icon: '🕸️', label: 'REDES', tooltip: 'Redes neuronales' },
  { icon: '🚀', label: 'EXPERTO', tooltip: '¡Eres un experto!' }
]

// Lifecycle
onMounted(() => {
  // Crear elementos flotantes
  const elements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 10,
    speed: Math.random() * 2 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    icon: icons[Math.floor(Math.random() * icons.length)]
  }))
  floatingElements.value = elements

  // Cambiar icono principal cada 2 segundos
  setInterval(() => {
    currentIcon.value = (currentIcon.value + 1) % icons.length
  }, 2000)
})
</script>

<style scoped>
.hero-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.floating-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float infinite ease-in-out;
  opacity: 0.7;
}

.floating-icon {
  font-size: 0.6em;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.hero-content {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1200px;
}

.hero-text {
  color: white;
}

.main-icon-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
}

.main-icon {
  font-size: 6rem;
  position: relative;
  z-index: 2;
}

.bouncing {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0;
  }
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}


.title-highlight {
  color: #4ecdc4;
}

.title-highlightl {
  color: rgb(201, 73, 98);
}


@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-description {
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.hero-stats {
  margin-bottom: 3rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255,255,255,0.15) !important;
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  border-radius: 20px !important;
  border: 1px solid rgba(255,255,255,0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255,255,255,0.25) !important;
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2rem;
}

.stat-text {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
  color: white;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  color: white;
}

.cta-button {
  position: relative;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4) !important;
  color: white !important;
  font-size: 1.2rem !important;
  font-weight: bold !important;
  padding: 1.5rem 3rem !important;
  border-radius: 50px !important;
  overflow: hidden;
  transition: all 0.3s ease;
  text-transform: none !important;
  letter-spacing: normal !important;
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.4) !important;
}

.button-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  animation: sparkle 2s infinite;
}

.sparkle:nth-child(1) {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.sparkle:nth-child(2) {
  top: 60%;
  right: 20%;
  animation-delay: 0.7s;
}

.sparkle:nth-child(3) {
  bottom: 20%;
  left: 50%;
  animation-delay: 1.4s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.learning-path {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.path-node {
  background: rgba(255,255,255,0.2) !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.3) !important;
  border-radius: 20px !important;
  padding: 1.5rem !important;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.path-node:hover {
  transform: scale(1.1);
  background: rgba(255,255,255,0.3) !important;
}

.path-node.active {
  background: rgba(255,255,255,0.4) !important;
  border-color: #4ecdc4 !important;
  box-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
}

.node-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.node-label {
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

.path-connector {
  width: 4px;
  height: 30px;
  background: linear-gradient(to bottom, #4ecdc4, #45b7d1);
  border-radius: 2px;
}

/* Animaciones de entrada */
.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.animate-slide-up:nth-child(1) { animation-delay: 0.2s; }
.animate-slide-up:nth-child(2) { animation-delay: 0.4s; }
.animate-slide-up:nth-child(3) { animation-delay: 0.6s; }

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out 0.8s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 0.95;
  }
}

.animate-bounce {
  animation: bounceIn 0.8s ease-out 1.2s forwards;
  opacity: 0;
  transform: scale(0.3);
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .hero-stats {
    justify-content: center;
  }

  .learning-path {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .path-connector {
    display: none;
  }

  .main-icon {
    font-size: 4rem;
  }
}

@media (max-width: 600px) {
  .hero-container {
    padding: 1rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .cta-button {
    width: 100%;
  }

  .stat-item {
    padding: 0.8rem 1rem;
  }
}
</style>