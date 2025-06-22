<template>
  <v-app>
    <!-- Barra de progreso siempre fija arriba -->
    <div style="position: sticky; top: 0; z-index: 9999;">
      <ProgressBar />
    </div>

    <v-main>
      <slot />
    </v-main>

    <!-- Footer -->
    <v-footer
  color="black"
  class="text-white d-flex flex-column align-center py-6"
  padless
>
  <!-- Texto de descripción -->
  <div class="text-caption font-weight-light px-4 mb-2" style="max-width: 800px; text-align: center;">
    Este OVA fue desarrollado como recurso para <strong>Inteligencia Computacional</strong> en la <strong>Universidad de Córdoba</strong>.
  </div>
  <!-- Separador -->
  <v-divider class="my-2" color="grey lighten-1" :thickness="2" style="width: 100%;" />

  <!-- Créditos -->
  <div class="text-caption mt-2" style="text-align: center;">
    Desarrollado por <strong>Jesus David Gonzalez Hernandez</strong>
    <br>&copy; {{ new Date().getFullYear() }} 
  </div>
</v-footer>
  </v-app>
</template>

<script setup>
import ProgressBar from '@/components/ProgressBar.vue'
import { useProgresoStore } from '@/stores/progreso'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { watch } from 'vue'

const progreso = useProgresoStore()
const route = useRoute()

// Cuando el layout se carga, actualiza progreso
progreso.actualizarDesdeRuta(route.path)

// Si navega entre páginas, actualiza también
watch(() => route.path, (newPath) => {
  progreso.actualizarDesdeRuta(newPath)
})
</script>
