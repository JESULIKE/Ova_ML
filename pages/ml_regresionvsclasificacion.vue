<template>
  <v-app>
    <v-main class="ml-bg">
      <!-- Sección: Regresión vs Clasificación -->
      <section class="regression-classification-section py-16" id="regression-classification">
        <RegressionClassificationSection />
      </section>

    </v-main>
  </v-app>
</template>

<script setup>
</script>

<style scoped>
.ml-bg {
  background: #6b46c1;
  min-height: 100vh;
}

.learning-types-section:nth-child(even) {
  background: rgba(255, 255, 255, 0.05);
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
