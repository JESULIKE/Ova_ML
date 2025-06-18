<template>
    <section class="path-section py-16">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title">Tu Ruta de Aprendizaje</h2>
          <p class="section-subtitle">
            Sigue este camino estructurado para dominar el Machine Learning
          </p>
        </div>
        
        <div class="learning-roadmap">
          <div 
            v-for="(step, index) in learningPath" 
            :key="index"
            class="roadmap-step"
            :class="{ 'completed': completedSteps.includes(index) }"
          >
            <div class="step-connector" v-if="index > 0"></div>
            <div class="step-circle">
              <v-icon v-if="completedSteps.includes(index)" color="success">mdi-check</v-icon>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="step-content">
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-description">{{ step.description }}</p>
              <div class="step-duration">{{ step.duration }}</div>
            </div>
          </div>
        </div>
      </v-container>
    </section>
  </template>
  
  <script setup>
  // Props
  const props = defineProps({
    completedSteps: {
      type: Array,
      default: () => [0, 1]
    }
  })
  
  // Ruta de aprendizaje
  const learningPath = [
    {
      title: 'Fundamentos de ML',
      description: 'Conceptos básicos, tipos de aprendizaje y preparación de datos',
      duration: '2-3 semanas'
    },
    {
      title: 'Matemáticas para ML',
      description: 'Álgebra lineal, estadística y cálculo aplicado',
      duration: '3-4 semanas'
    },
    {
      title: 'Algoritmos Supervisados',
      description: 'Regresión, clasificación y evaluación de modelos',
      duration: '4-5 semanas'
    },
    {
      title: 'Algoritmos No Supervisados',
      description: 'Clustering, reducción de dimensionalidad y análisis exploratorio',
      duration: '3-4 semanas'
    },
    {
      title: 'Deep Learning',
      description: 'Redes neuronales profundas y arquitecturas avanzadas',
      duration: '6-8 semanas'
    },
    {
      title: 'Proyectos Prácticos',
      description: 'Implementación de soluciones reales y despliegue de modelos',
      duration: '4-6 semanas'
    }
  ]
  </script>
  
  <style scoped>
  .path-section {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .section-header {
    text-align: center;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .learning-roadmap {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }
  
  .roadmap-step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40px;
    position: relative;
  }
  
  .step-connector {
    position: absolute;
    left: 24px;
    top: -40px;
    width: 2px;
    height: 40px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .step-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    margin-right: 24px;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }
  
  .roadmap-step.completed .step-circle {
    background: #4caf50;
    border-color: #4caf50;
    transform: scale(1.1);
  }
  
  .step-content {
    flex: 1;
    padding-top: 4px;
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
    margin-bottom: 8px;
  }
  
  .step-duration {
    color: #8b5cf6;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    .section-title {
      font-size: 2rem;
    }
    
    .roadmap-step {
      margin-bottom: 32px;
    }
    
    .step-circle {
      width: 40px;
      height: 40px;
      margin-right: 16px;
    }
    
    .step-connector {
      left: 19px;
    }
  }
  </style>