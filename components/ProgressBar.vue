<template>
    <div class="progress-container">
      <div class="progress-bar-outer">
        <div
          class="progress-bar-inner"
          :style="{ width: progreso.progresoPorcentaje + '%' }"
        >
          <div class="progress-label">
            <v-icon size="16" class="mr-1">mdi-star</v-icon>
            Nivel {{ progreso.nivel }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useProgresoStore } from '@/stores/progreso'
  const progreso = useProgresoStore()
  </script>
  
  <style scoped>
  .progress-container {
    max-width: 600px;
    margin: 0 auto 12px;
    text-align: center;
    margin-top: 20px
  }
  
  .progress-bar-outer {
    background-color: #eee;
    border-radius: 999px;
    height: 30px;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .progress-bar-inner {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(to right, #ff6a6a, #fcd36b);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 16px;
    color: white;
    font-weight: bold;
    transition: width 0.5s ease-in-out;
  }
  
  .progress-label {
    display: flex;
    align-items: center;
  }
  
  </style>