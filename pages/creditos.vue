<template>
  <v-app>
    <v-main class="neural-bg">
      <!-- Header Section -->
      <section class="credits-header py-16">
        <v-container>
          <div class="text-center">
            <v-icon size="80" color="white" class="mb-6">mdi-account-group</v-icon>
            <h1 class="credits-title mb-4">Créditos</h1>
            <p class="credits-subtitle">
              Reconocimiento a quienes hicieron posible este Objeto Virtual de Aprendizaje
            </p>
          </div>
        </v-container>
      </section>

      <!-- Academic Section -->
      <section class="academic-section py-12">
        <v-container>
          <div class="section-card mb-8">
            <div class="card-header">
              <v-icon size="48" color="#4ecdc4" class="mr-4">mdi-school</v-icon>
              <h2 class="section-title">Información Académica</h2>
            </div>
            <div class="academic-info">
              <div class="info-row">
                <span class="info-label">Universidad:</span>
                <span class="info-value">Universidad de Córdoba</span>
              </div>
              <div class="info-row">
                <span class="info-label">Asignatura:</span>
                <span class="info-value">Inteligencia Computacional</span>
              </div>
              <div class="info-row">
                <span class="info-label">Profesor:</span>
                <span class="info-value">Manuel Caro</span>
              </div>
              <div class="info-row">
                <span class="info-label">Tema:</span>
                <span class="info-value">Redes Neuronales Artificiales</span>
              </div>
            </div>
          </div>
        </v-container>
      </section>

      <!-- Development Team Section -->
      <section class="team-section py-12">
        <v-container>
          <div class="section-card">
            <div class="card-header mb-8">
              <v-icon size="48" color="#45b7d1" class="mr-4">mdi-code-tags</v-icon>
              <h2 class="section-title">Equipo de Desarrollo</h2>
            </div>
            
            <v-row dense>
              <v-col 
                cols="12" 
                sm="6" 
                md="4" 
                v-for="(developer, index) in developers" 
                :key="index"
                class="mb-4"
              >
                <div 
                  class="developer-card"
                  :class="{ 'card-hover': hoveredDev === index }"
                  @mouseenter="hoveredDev = index"
                  @mouseleave="hoveredDev = null"
                >
                  <div class="developer-avatar">
                    <v-icon size="40" color="white">mdi-account-circle</v-icon>
                  </div>
                  <div class="developer-info">
                    <h3 class="developer-name">{{ developer.name }}</h3>
                    <p class="developer-role">{{ developer.role }}</p>
                  </div>
                  <div class="developer-decoration"></div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </section>

      <!-- Technologies Section -->
      <section class="tech-section py-12">
        <v-container>
          <div class="section-card">
            <div class="card-header mb-8">
              <v-icon size="48" color="#8b5cf6" class="mr-4">mdi-cog</v-icon>
              <h2 class="section-title">Tecnologías Utilizadas</h2>
            </div>
            
            <div class="tech-grid">
              <div 
                v-for="(tech, index) in technologies" 
                :key="index"
                class="tech-item"
                :class="{ 'tech-hover': hoveredTech === index }"
                @mouseenter="hoveredTech = index"
                @mouseleave="hoveredTech = null"
              >
                <v-icon size="32" :color="tech.color" class="mb-2">{{ tech.icon }}</v-icon>
                <h4 class="tech-name">{{ tech.name }}</h4>
                <p class="tech-description">{{ tech.description }}</p>
              </div>
            </div>
          </div>
        </v-container>
      </section>

      <!-- Purpose Section -->
      <section class="purpose-section py-12">
        <v-container>
          <div class="section-card">
            <div class="card-header mb-6">
              <v-icon size="48" color="#10b981" class="mr-4">mdi-lightbulb-on</v-icon>
              <h2 class="section-title">Propósito del OVA</h2>
            </div>
            <div class="purpose-content">
              <p class="purpose-text">
                Este Objeto Virtual de Aprendizaje fue desarrollado con el objetivo de facilitar 
                la comprensión de conceptos fundamentales sobre Redes Neuronales Artificiales 
                a través de una experiencia interactiva, visual y pedagógicamente estructurada.
              </p>
              <div class="purpose-features">
                <div class="feature-item" v-for="feature in purposeFeatures" :key="feature">
                  <v-icon color="#10b981" class="mr-2">mdi-check-circle</v-icon>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </section>

      <!-- Footer Section -->
      <section class="footer-section py-8">
        <v-container>
          <div class="footer-content text-center">
            <div class="footer-logo mb-4">
              <v-icon size="64" color="white">mdi-brain</v-icon>
            </div>
            <p class="footer-text mb-4">
              © 2025 - Desarrollado para fines educativos en la Universidad de Córdoba
            </p>
            <div class="footer-actions">
              <v-btn
                color="white"
                variant="outlined"
                size="large"
                @click="goBack"
                class="mr-4"
              >
                <v-icon left>mdi-arrow-left</v-icon>
                Volver al Inicio
              </v-btn>
              <v-btn
                color="#4ecdc4"
                variant="flat"
                size="large"
                @click="scrollToTop"
              >
                <v-icon left>mdi-arrow-up</v-icon>
                Subir
              </v-btn>
            </div>
          </div>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const hoveredDev = ref(null)
const hoveredTech = ref(null)

const developers = [
  { name: 'Jesus Gonzalez', role: 'Desarrollador Full Stack' },
  { name: 'Yuliana Otero', role: 'Desarrolladora Frontend' },
  { name: 'Pedro Romero', role: 'Desarrollador Backend' },
  { name: 'Juan Miranda', role: 'Diseñador UX/UI' },
  { name: 'Fabián Muñoz', role: 'Diseño Guias' },
  { name: 'Jander Ensuncho', role: 'Especialista en Contenido' },
  { name: 'Iván Ramiro', role: 'Analista de Sistemas' },
  { name: 'Miguel', role: 'Coordinador de Proyecto' },
  { name: 'Emanuel Mestra', role: 'Redaccion Guias' }
]

const technologies = [
  {
    name: 'Nuxt.js',
    description: 'Framework de Vue.js para aplicaciones universales',
    icon: 'mdi-nuxt',
    color: '#00dc82'
  },
  {
    name: 'Vuetify',
    description: 'Framework de componentes Material Design',
    icon: 'mdi-vuetify',
    color: '#1976d2'
  },
  {
    name: 'Pinia',
    description: 'Gestión de estado para Vue.js',
    icon: 'mdi-database',
    color: '#ffd859'
  },
  {
    name: 'Vue.js',
    description: 'Framework JavaScript progresivo',
    icon: 'mdi-vuejs',
    color: '#4fc08d'
  },
  {
    name: 'Typescript',
    description: 'Lenguaje de programación principal',
    icon: 'mdi mdi-language-typescript',
    color: '#3178C6'
  },
  {
    name: 'CSS3',
    description: 'Estilos y animaciones avanzadas',
    icon: 'mdi-language-css3',
    color: '#1572b6'
  }
]

const purposeFeatures = [
  'Aprendizaje interactivo y visual',
  'Contenido pedagógicamente estructurado',
  'Evaluaciones dinámicas y adaptativas',
  'Simulaciones en tiempo real',
  'Interfaz intuitiva y moderna',
  'Accesibilidad y usabilidad optimizada'
]

const goBack = () => {
  navigateTo('/')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.neural-bg {
  background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #6366f1 100%);
  min-height: 100vh;
}

/* Header Section */
.credits-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.credits-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.credits-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Section Cards */
.section-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 2rem;
  color: white;
  font-weight: 600;
  margin: 0;
}

/* Academic Info */
.academic-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border-left: 4px solid #4ecdc4;
}

.info-label {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.info-value {
  color: white;
  font-weight: 600;
  text-align: right;
}

/* Developer Cards */
.developer-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.developer-card:hover,
.developer-card.card-hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.developer-avatar {
  margin-bottom: 16px;
}

.developer-name {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.developer-role {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0;
}

.developer-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #4ecdc4, #45b7d1, #8b5cf6);
}

/* Technologies Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.tech-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tech-item:hover,
.tech-item.tech-hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.tech-name {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.tech-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

/* Purpose Section */
.purpose-content {
  text-align: center;
}

.purpose-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.purpose-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  color: white;
  font-weight: 500;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

/* Footer Section */
.footer-section {
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: 600px;
  margin: 0 auto;
}

.footer-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin: 0;
}

.footer-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-card {
    padding: 24px;
    margin: 16px;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .academic-info {
    grid-template-columns: 1fr;
  }
  
  .info-row {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
  }
  
  .purpose-features {
    grid-template-columns: 1fr;
  }
  
  .footer-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-actions .v-btn {
    margin: 4px 0;
  }
}

@media (max-width: 480px) {
  .credits-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-card {
    padding: 20px;
    margin: 12px;
  }
  
  .developer-card {
    height: auto;
    min-height: 140px;
  }
}
</style>