// stores/learning.js
import { defineStore } from 'pinia'

export const useLearning = defineStore('learning', {
  state: () => ({
    // Progreso general del OVA
    generalProgress: {
      sectionsCompleted: [],
      totalSections: 0,
      startedDate: null,
      lastAccessDate: null
    },

    // Progreso específico por sección
    sectionsProgress: {
      'learning-types': {
        started: false,
        completed: false,
        viewedConcepts: [],
        quizAttempts: 0,
        correctAnswers: [],
        timeSpent: 0,
        startTime: null
      }
      // Aquí puedes agregar más secciones de tu OVA
    },

    // Configuración del usuario
    userPreferences: {
      showHints: true,
      autoSave: true,
      soundEnabled: true
    },

    // Estadísticas globales
    statistics: {
      totalTimeSpent: 0,
      conceptsLearned: [],
      quizzesCompleted: 0,
      averageScore: 0,
      streakDays: 0
    }
  }),

  getters: {
    // Progreso general como porcentaje
    overallProgress: (state) => {
      if (state.generalProgress.totalSections === 0) return 0
      return Math.round(
        (state.generalProgress.sectionsCompleted.length / state.generalProgress.totalSections) * 100
      )
    },

    // Obtener progreso de una sección específica
    getSectionProgress: (state) => {
      return (sectionId) => state.sectionsProgress[sectionId] || null
    },

    // Verificar si una sección está completada
    isSectionCompleted: (state) => {
      return (sectionId) => {
        const section = state.sectionsProgress[sectionId]
        return section ? section.completed : false
      }
    },

    // Obtener estadísticas de quiz de una sección
    getQuizStats: (state) => {
      return (sectionId) => {
        const section = state.sectionsProgress[sectionId]
        if (!section) return null
        
        return {
          attempts: section.quizAttempts,
          correctAnswers: section.correctAnswers.length,
          accuracy: section.quizAttempts > 0 
            ? Math.round((section.correctAnswers.length / section.quizAttempts) * 100) 
            : 0
        }
      }
    },

    // Conceptos aprendidos por sección
    getLearnedConcepts: (state) => {
      return (sectionId) => {
        const section = state.sectionsProgress[sectionId]
        return section ? section.viewedConcepts : []
      }
    },

    // Tiempo total invertido en aprendizaje
    getTotalLearningTime: (state) => {
      return Object.values(state.sectionsProgress)
        .reduce((total, section) => total + section.timeSpent, 0)
    },

    // Secciones disponibles para desbloquear
    getAvailableSections: (state) => {
      // Lógica para determinar qué secciones están disponibles
      // basado en el progreso actual
      return Object.keys(state.sectionsProgress)
    }
  },

  actions: {
    // Inicializar el OVA
    initializeOVA(totalSections = 1) {
      this.generalProgress.totalSections = totalSections
      if (!this.generalProgress.startedDate) {
        this.generalProgress.startedDate = new Date().toISOString()
      }
      this.generalProgress.lastAccessDate = new Date().toISOString()
    },

    // Marcar que una sección ha comenzado
    markSectionStarted(sectionId) {
      if (!this.sectionsProgress[sectionId]) {
        this.sectionsProgress[sectionId] = {
          started: false,
          completed: false,
          viewedConcepts: [],
          quizAttempts: 0,
          correctAnswers: [],
          timeSpent: 0,
          startTime: null
        }
      }

      const section = this.sectionsProgress[sectionId]
      if (!section.started) {
        section.started = true
        section.startTime = Date.now()
      }
      
      this._updateLastAccess()
    },

    // Marcar que un concepto ha sido visualizado
    markConceptViewed(sectionId, concept) {
      const section = this.sectionsProgress[sectionId]
      if (section && !section.viewedConcepts.includes(concept)) {
        section.viewedConcepts.push(concept)
        
        // Agregar a estadísticas globales
        if (!this.statistics.conceptsLearned.includes(concept)) {
          this.statistics.conceptsLearned.push(concept)
        }
      }
    },

    // Registrar respuesta correcta en quiz
    recordCorrectAnswer(sectionId, questionIndex) {
      const section = this.sectionsProgress[sectionId]
      if (section) {
        if (!section.correctAnswers.includes(questionIndex)) {
          section.correctAnswers.push(questionIndex)
        }
      }
    },

    // Registrar intento de quiz
    recordQuizAttempt(sectionId) {
      const section = this.sectionsProgress[sectionId]
      if (section) {
        section.quizAttempts++
      }
    },

    // Marcar sección como completada
    markSectionCompleted(sectionId) {
      const section = this.sectionsProgress[sectionId]
      if (section) {
        section.completed = true
        
        // Calcular tiempo invertido
        if (section.startTime) {
          const timeSpent = Date.now() - section.startTime
          section.timeSpent += timeSpent
          this.statistics.totalTimeSpent += timeSpent
        }

        // Agregar a secciones completadas si no está ya
        if (!this.generalProgress.sectionsCompleted.includes(sectionId)) {
          this.generalProgress.sectionsCompleted.push(sectionId)
        }

        // Actualizar estadísticas de quiz
        this.statistics.quizzesCompleted++
        this._calculateAverageScore()
      }

      this._updateLastAccess()
    },

    // Reiniciar progreso de una sección
    resetSectionProgress(sectionId) {
      if (this.sectionsProgress[sectionId]) {
        this.sectionsProgress[sectionId] = {
          started: false,
          completed: false,
          viewedConcepts: [],
          quizAttempts: 0,
          correctAnswers: [],
          timeSpent: 0,
          startTime: null
        }

        // Remover de secciones completadas
        const index = this.generalProgress.sectionsCompleted.indexOf(sectionId)
        if (index > -1) {
          this.generalProgress.sectionsCompleted.splice(index, 1)
        }
      }
    },

    // Actualizar preferencias del usuario
    updateUserPreferences(preferences) {
      this.userPreferences = { ...this.userPreferences, ...preferences }
    },

    // Guardar progreso en localStorage (backup)
    saveProgressToLocalStorage() {
      if (this.userPreferences.autoSave) {
        try {
          const progressData = {
            generalProgress: this.generalProgress,
            sectionsProgress: this.sectionsProgress,
            statistics: this.statistics,
            userPreferences: this.userPreferences,
            savedAt: new Date().toISOString()
          }
          localStorage.setItem('ova-learning-progress', JSON.stringify(progressData))
        } catch (error) {
          console.warn('No se pudo guardar el progreso en localStorage:', error)
        }
      }
    },

    // Cargar progreso desde localStorage
    loadProgressFromLocalStorage() {
      try {
        const savedProgress = localStorage.getItem('ova-learning-progress')
        if (savedProgress) {
          const data = JSON.parse(savedProgress)
          
          // Validar que los datos sean válidos antes de cargarlos
          if (data.generalProgress && data.sectionsProgress) {
            this.generalProgress = data.generalProgress
            this.sectionsProgress = data.sectionsProgress
            this.statistics = data.statistics || this.statistics
            this.userPreferences = data.userPreferences || this.userPreferences
            
            return true
          }
        }
      } catch (error) {
        console.warn('Error al cargar progreso desde localStorage:', error)
      }
      return false
    },

    // Exportar progreso para respaldo
    exportProgress() {
      return {
        generalProgress: this.generalProgress,
        sectionsProgress: this.sectionsProgress,
        statistics: this.statistics,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      }
    },

    // Importar progreso desde respaldo
    importProgress(progressData) {
      if (progressData && progressData.version === '1.0') {
        this.generalProgress = progressData.generalProgress
        this.sectionsProgress = progressData.sectionsProgress
        this.statistics = progressData.statistics
        return true
      }
      return false
    },

    // Métodos privados
    _updateLastAccess() {
      this.generalProgress.lastAccessDate = new Date().toISOString()
    },

    _calculateAverageScore() {
      const completedSections = Object.values(this.sectionsProgress)
        .filter(section => section.completed)
      
      if (completedSections.length === 0) {
        this.statistics.averageScore = 0
        return
      }

      const totalScore = completedSections.reduce((sum, section) => {
        const accuracy = section.quizAttempts > 0 
          ? (section.correctAnswers.length / section.quizAttempts) * 100 
          : 0
        return sum + accuracy
      }, 0)

      this.statistics.averageScore = Math.round(totalScore / completedSections.length)
    },

    // Obtener recomendaciones de aprendizaje
    getLearningRecommendations() {
      const recommendations = []
      
      // Verificar si hay secciones sin completar
      const incompleteSections = Object.entries(this.sectionsProgress)
        .filter(([_, section]) => section.started && !section.completed)
      
      if (incompleteSections.length > 0) {
        recommendations.push({
          type: 'continue',
          message: 'Tienes secciones iniciadas sin completar',
          sections: incompleteSections.map(([id, _]) => id)
        })
      }

      // Verificar rendimiento en quizzes
      const lowPerformanceSections = Object.entries(this.sectionsProgress)
        .filter(([_, section]) => {
          const accuracy = section.quizAttempts > 0 
            ? (section.correctAnswers.length / section.quizAttempts) * 100 
            : 0
          return section.completed && accuracy < 70
        })

      if (lowPerformanceSections.length > 0) {
        recommendations.push({
          type: 'review',
          message: 'Considera repasar estas secciones para mejorar tu comprensión',
          sections: lowPerformanceSections.map(([id, _]) => id)
        })
      }

      return recommendations
    }
  },

  // Nota: La persistencia se maneja manualmente con los métodos
  // saveProgressToLocalStorage() y loadProgressFromLocalStorage()
})