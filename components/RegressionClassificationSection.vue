<template>
    <v-container>
      <div class="section-header text-center mb-12">
        <h2 class="section-title">Regresión vs Clasificación</h2>
        <p class="section-subtitle">
          Dos enfoques fundamentales para resolver problemas diferentes
        </p>
      </div>
  
      <v-row>
        <v-col cols="12" md="6">
          <div class="comparison-card regression-card">
            <div class="concept-header mb-4">
              <v-icon color="blue lighten-1" size="48" class="mr-3">mdi-trending-up</v-icon>
              <h3 class="concept-title">Regresión</h3>
            </div>
            <p class="concept-text mb-4">
              Predice valores numéricos continuos. Como predecir la temperatura exacta 
              o el precio de una acción en el mercado.
            </p>
            <div class="examples-grid">
              <div class="example-card" v-for="example in regressionExamples" :key="example.title">
                <div class="example-title">{{ example.icon }} {{ example.title }}</div>
                <div class="example-text">{{ example.description }}</div>
              </div>
            </div>
          </div>
        </v-col>
  
        <v-col cols="12" md="6">
          <div class="comparison-card classification-card">
            <div class="concept-header mb-4">
              <v-icon color="green lighten-1" size="48" class="mr-3">mdi-format-list-checks</v-icon>
              <h3 class="concept-title">Clasificación</h3>
            </div>
            <p class="concept-text mb-4">
              Predice categorías o clases discretas. Como determinar si un email es spam 
              o si una imagen contiene un gato o un perro.
            </p>
            <div class="examples-grid">
              <div class="example-card" v-for="example in classificationExamples" :key="example.title">
                <div class="example-title">{{ example.icon }} {{ example.title }}</div>
                <div class="example-text">{{ example.description }}</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
                    <NuxtLink to="/quiz">
                  <v-btn color="primary">
                    Continuar aprendizaje
                  </v-btn>
                </NuxtLink>
  </template>
  
  <script setup>
  const regressionExamples = [
    { icon: '💰', title: 'Precio de Viviendas', description: '$125,000 - $450,000' },
    { icon: '📈', title: 'Ventas Futuras', description: '1,250 unidades' },
    { icon: '🌡️', title: 'Temperatura', description: '23.5°C' }
  ]
  
  const classificationExamples = [
    { icon: '📧', title: 'Email Spam', description: 'Spam / No Spam' },
    { icon: '🐱', title: 'Reconocimiento', description: 'Gato / Perro / Ave' },
    { icon: '🏥', title: 'Diagnóstico', description: 'Positivo / Negativo' }
  ]
  </script>
  
  <style scoped>
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
  
  .comparison-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    height: 100%;
  }
  
  .comparison-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }
  
  .concept-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .concept-title {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .concept-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .example-card {
    background: rgba(255, 255, 255, 0.1);
    border-left: 4px solid #ff6b6b;
    border-radius: 10px;
    padding: 1rem;
    transition: all 0.3s ease;
    text-align: left;
  }
  
  .example-card:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }
  
  .example-title {
    color: #ff6b6b;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .example-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.85rem;
  }
  
  @media (max-width: 768px) {
    .section-title {
      font-size: 2rem;
    }
    
    .examples-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>