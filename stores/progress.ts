// stores/progress.js - Versión completamente corregida
import { defineStore } from 'pinia'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    completedMLSteps: 0,
    totalMLSteps: 5,
    completedNNSteps: 0,
    totalNNSteps: 5,
    mlModuleCompleted: false,
    nnModuleUnlocked: false,
    mlQuizCompleted: false,
    // Flag para controlar si es la primera carga
    isInitialized: false
  }),
  
  getters: {
    mlProgress: (state) => Math.round((state.completedMLSteps / state.totalMLSteps) * 100),
    nnProgress: (state) => Math.round((state.completedNNSteps / state.totalNNSteps) * 100),
    // Solo se desbloquea si REALMENTE se completó el quiz
    isNeuralNetworkUnlocked: (state) => state.mlQuizCompleted && state.mlModuleCompleted
  },
  
  actions: {
    // PRIMERA CARGA - Resetear por defecto para desarrollo
    initializeProgress() {
      if (!this.isInitialized) {
        console.log('🔄 Inicializando progreso desde cero...')
        this.resetAllProgress()
        this.isInitialized = true
      }
    },
    
    // Completar el módulo de Machine Learning SOLO cuando se apruebe el quiz
    completeMLModule() {
      this.completedMLSteps = this.totalMLSteps
      this.mlModuleCompleted = true
      this.mlQuizCompleted = true
      this.nnModuleUnlocked = true
      
      console.log('✅ Módulo ML completado - Redes Neuronales desbloqueadas')
      this.saveProgress()
    },
    
    // Incrementar progreso de ML paso a paso (para las otras lecciones)
    incrementMLProgress() {
      if (this.completedMLSteps < this.totalMLSteps - 1) {
        this.completedMLSteps++
        this.saveProgress()
      }
    },
    
    // Completar solo las lecciones (no el quiz)
    completeMLLessons() {
      this.completedMLSteps = this.totalMLSteps - 1
      this.saveProgress()
    },
    
    incrementNNProgress() {
      if (this.completedNNSteps < this.totalNNSteps) {
        this.completedNNSteps++
        this.saveProgress()
      }
    },
    
    completeNNModule() {
      this.completedNNSteps = this.totalNNSteps
      this.saveProgress()
    },
    
    saveProgress() {
      const progressData = {
        completedMLSteps: this.completedMLSteps,
        completedNNSteps: this.completedNNSteps,
        mlModuleCompleted: this.mlModuleCompleted,
        nnModuleUnlocked: this.nnModuleUnlocked,
        mlQuizCompleted: this.mlQuizCompleted,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('learning-progress', JSON.stringify(progressData))
      console.log('💾 Progreso guardado:', progressData)
    },
    
    loadProgress() {
      const saved = localStorage.getItem('learning-progress')
      if (saved) {
        try {
          const data = JSON.parse(saved)
          
          // VALIDACIÓN ADICIONAL: Solo cargar si los datos son válidos
          if (this.isValidProgressData(data)) {
            this.completedMLSteps = data.completedMLSteps || 0
            this.completedNNSteps = data.completedNNSteps || 0
            this.mlModuleCompleted = data.mlModuleCompleted || false
            this.nnModuleUnlocked = data.nnModuleUnlocked || false
            this.mlQuizCompleted = data.mlQuizCompleted || false
            
            console.log('📊 Progreso cargado:', data)
          } else {
            console.warn('⚠️ Datos de progreso inválidos, reseteando...')
            this.resetAllProgress()
          }
        } catch (error) {
          console.error('❌ Error al cargar progreso:', error)
          this.resetAllProgress()
        }
      } else {
        console.log('📝 No hay progreso previo, iniciando desde cero')
      }
    },
    
    // Validar que los datos del localStorage sean coherentes
    isValidProgressData(data) {
      // Si dice que el módulo está completado pero no tiene el quiz completado, es inválido
      if (data.mlModuleCompleted && !data.mlQuizCompleted) {
        return false
      }
      
      // Si tiene pasos completados fuera del rango válido, es inválido
      if (data.completedMLSteps > this.totalMLSteps || data.completedMLSteps < 0) {
        return false
      }
      
      return true
    },
    
    resetAllProgress() {
      this.completedMLSteps = 0
      this.completedNNSteps = 0
      this.mlModuleCompleted = false
      this.nnModuleUnlocked = false
      this.mlQuizCompleted = false
      localStorage.removeItem('learning-progress')
      console.log('🔄 Progreso reseteado completamente')
    },
    
    // Método para debugging
    debugProgress() {
      console.log('🐛 Estado actual del progreso:', {
        completedMLSteps: this.completedMLSteps,
        totalMLSteps: this.totalMLSteps,
        mlProgress: this.mlProgress,
        mlModuleCompleted: this.mlModuleCompleted,
        mlQuizCompleted: this.mlQuizCompleted,
        isNeuralNetworkUnlocked: this.isNeuralNetworkUnlocked,
        localStorage: localStorage.getItem('learning-progress')
      })
    }
  }
})