<template>
  <v-app>
    <v-main class="bg-light pa-6">
      <v-container>
        <!-- Título -->
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h3 font-weight-bold text-primary">Explorando las Redes Neuronales</h1>
            <p class="text-subtitle-1 mt-2">Aprende de forma interactiva cómo funcionan y se aplican las redes neuronales.</p>
          </v-col>
        </v-row>

        <!-- Tarjetas -->
        <v-row align="stretch" justify="center" class="g-4 mb-4">
          <v-col
            :cols="12"
            :md="index === 2 ? 12 : 6"
            class="mb-2"
            v-for="(section, index) in sections"
            :key="index"
          >
            <v-card
              class="pa-0 rounded-lg overflow-hidden"
              elevation="4"
              hover
              @click="goToSection(section.link)"
            >
              <!-- TERCERA TARJETA CON LAYOUT HORIZONTAL -->
              <template v-if="index === 2">
                <v-row no-gutters>
                  <!-- Imagen a la izquierda -->
                  <v-col cols="12" md="5">
                    <v-img :src="section.image" height="100%" cover class="h-100"></v-img>
                  </v-col>

                  <!-- Contenido a la derecha -->
                  <v-col cols="12" md="7">
                    <v-card-text class="pa-4">
                      <h3 class="text-h6 font-weight-bold mb-2">{{ section.title }}</h3>
                      <p class="text-body-2 text-grey-darken-1">{{ section.description }}</p>
                    </v-card-text>
                    <v-card-actions class="px-4 pb-4 justify-space-between">
                      <div class="d-flex align-center gap-2">
                        <v-icon size="18">mdi-account-circle</v-icon>
                        <span class="text-caption font-weight-medium">Open Neural</span>
                      </div>
                      <span class="text-caption text-grey"> {{ section.readTime }} MIN READ </span>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </template>

              <!-- TARJETAS 1 y 2 normales -->
              <template v-else>
                <v-img :src="section.image" height="200px" cover></v-img>

                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">{{ section.title }}</h3>
                  <p class="text-body-2 text-grey-darken-1">{{ section.description }}</p>
                </v-card-text>

                <v-card-actions class="px-4 pb-4 justify-space-between">
                  <div class="d-flex align-center gap-2">
                    <v-icon size="18">mdi-account-circle</v-icon>
                    <span class="text-caption font-weight-medium">Open Neural</span>
                  </div>
                  <span class="text-caption text-grey"> {{ section.readTime }} MIN READ </span>
                </v-card-actions>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const sections = [
  {
    title: 'Quiz: Fundamentos de Redes Neuronales',
    description: 'Pon a prueba tus conocimientos básicos sobre redes neuronales artificiales y conceptos fundamentales.',
    icon: 'mdi-lightbulb-on-outline',
    image: '/images/quiz.png',
    link: '/quiz',
    readTime: 5
  },
  {
  title: 'Quiz: Redes Neuronales Nivel Intermedio',
  description: 'Evalúa tu comprensión sobre conceptos más avanzados de redes neuronales.',
  icon: 'mdi-brain',
  image: '/images/quiz2.png', // Puedes cambiar esta imagen si no es la ideal
  link: '/content-providers',
  readTime: 5
  },
  {
    title: 'Evaluación: Redes Neuronales Avanzadas',
    description: 'Evalúa tu dominio de temas más complejos como retropropagación, funciones de pérdida y sobreajuste.',
    icon: 'mdi-school-outline',
    image: '/images/evaluacion.png',
    link: '/evaluacion',
    readTime: 10
  }
]

const goToSection = (link) => {
  navigateTo(link)
}
</script>

<style scoped>
.bg-light {
  background: linear-gradient(145deg, #f3f4f6, #fefefe);
}

h1 {
  font-family: 'Poppins', sans-serif;
  margin-top: 50px;
}

.gap-2 {
  gap: 8px;
}
</style>
