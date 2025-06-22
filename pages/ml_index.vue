<template>
  <v-app>
    <v-main class="ml-bg">
      <!-- Hero Section -->
      <section class="hero-section py-16">
        <HeroSection @scroll-to-content="scrollToContent" />
      </section>
      <!-- Interactive Demo Section -->
      <section class="demo-section py-16">
        <DemoSection />
      </section>
      <!-- Sección: ¿Qué es ML? -->
      <section class="basics-section py-16" id="basics">
        <BasicsSection />
      </section>
    </v-main>
  </v-app>
</template>

<script setup>
import DemoSection from '../components/DemoSection.vue'
import BasicsSection from '../components/BasicsSection.vue'
import HeroSection from '../components/HeroSection.vue'
import { ref, onMounted, onUnmounted } from 'vue'

// Estado general
const completedSteps = ref([0, 1])

// Evaluación
const evaluationPassed = ref(false)

// Verificar evaluación al montar
onMounted(() => {
  const passed = localStorage.getItem('ml_evaluation_passed')
  evaluationPassed.value = passed === 'true'
})

const scrollToEvaluation = () => {
  document.getElementById('evaluation')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContent = () => {
  document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.ml-bg {
  background: #6b46c1;
  min-height: 100vh;
}

.learning-types-section:nth-child(even),
.regression-classification-section:nth-child(even),
.interactive-demo-section:nth-child(even) {
  background: rgba(255, 255, 255, 0.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 48px 0;
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
</style>