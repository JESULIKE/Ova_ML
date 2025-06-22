// stores/mlProgress.js
import { defineStore } from 'pinia'

export const useMLProgressStore = defineStore('mlProgress', {
  state: () => ({
    sections: {
      basics: {
        definition: false,
        types: false,
        features: false,
        completed: false
      },
      algorithms: {
        supervised: false,
        unsupervised: false,
        reinforcement: false,
        completed: false
      },
      applications: {
        vision: false,
        nlp: false,
        prediction: false,
        completed: false
      }
    },
    quizScores: {},
    achievements: [],
    currentSection: 'basics'
  }),

  getters: {
    // Progreso general del curso
    overallProgress: (state) => {
      const totalSections = Object.keys(state.sections).length
      const completedSections = Object.values(state.sections)
        .filter(section => section.completed).length
      return (completedSections / totalSections) * 100
    },

    // Progreso de una sección específica
    sectionProgress: (state) => (sectionName) => {
      const section = state.sections[sectionName]
      if (!section) return 0
      
      const totalSubsections = Object.keys(section).length - 1 // -1 para 'completed'
      const completedSubsections = Object.entries(section)
        .filter(([key, value]) => key !== 'completed' && value).length
      
      return (completedSubsections / totalSubsections) * 100
    },

    // Lista de logros obtenidos
    getAchievements: (state) => state.achievements,

    // Verificar si una sección está completada
    hasCompletedSection: (state) => (sectionName) => {
      return state.sections[sectionName]?.completed || false
    },

    // Obtener puntuación de un quiz específico
    getQuizScore: (state) => (sectionName, quizName) => {
      return state.quizScores[`${sectionName}_${quizName}`] || null
    },

    // Progreso por sección para dashboard
    sectionsOverview: (state) => {
      return Object.entries(state.sections).map(([name, section]) => {
        const totalSubsections = Object.keys(section).length - 1
        const completedSubsections = Object.entries(section)
          .filter(([key, value]) => key !== 'completed' && value).length
        
        return {
          name,
          progress: (completedSubsections / totalSubsections) * 100,
          completed: section.completed,
          subsections: {
            total: totalSubsections,
            completed: completedSubsections
          }
        }
      })
    }
  },

  actions: {
    // Actualizar progreso de subsección
    updateProgress(sectionName, subsectionName, completed) {
      if (this.sections[sectionName]) {
        this.sections[sectionName][subsectionName] = completed

        // Verificar si toda la sección está completa
        const section = this.sections[sectionName]
        const allSubsectionsComplete = Object.entries(section)
          .filter(([key]) => key !== 'completed')
          .every(([_, value]) => value)

        if (allSubsectionsComplete && !section.completed) {
          this.sections[sectionName].completed = true
          this.addAchievement(`¡Sección ${sectionName} completada!`)
        }
        
        this.saveProgress()
      }
    },

    // Actualizar puntuación de quiz
    updateQuizScore(sectionName, quizName, passed) {
      const key = `${sectionName}_${quizName}`
      const previousScore = this.quizScores[key]
      
      this.quizScores[key] = {
        passed,
        attempts: (previousScore?.attempts || 0) + 1,
        timestamp: new Date().toISOString()
      }

      // Agregar logro si es la primera vez que pasa
      if (passed && !previousScore?.passed) {
        this.addAchievement(`¡Quiz ${quizName} aprobado!`)
      }

      this.saveProgress()
    },

    // Agregar nuevo logro
    addAchievement(achievement) {
      if (!this.achievements.includes(achievement)) {
        this.achievements.push(achievement)
      }
    },

    // Establecer sección actual
    setCurrentSection(sectionName) {
      this.currentSection = sectionName
      this.saveProgress()
    },

    // Reiniciar todo el progreso
    resetProgress() {
      this.$reset()
      if (process.client) {
        localStorage.removeItem('ml-ova-progress')
      }
    },

    // Guardar progreso en localStorage
    saveProgress() {
      if (process.client) {
        try {
          const progressData = {
            sections: this.sections,
            quizScores: this.quizScores,
            achievements: this.achievements,
            currentSection: this.currentSection,
            lastSaved: new Date().toISOString()
          }
          localStorage.setItem('ml-ova-progress', JSON.stringify(progressData))
        } catch (error) {
          console.warn('No se pudo guardar el progreso:', error)
        }
      }
    },

    // Cargar progreso desde localStorage
    loadProgress() {
      if (process.client) {
        try {
          const saved = localStorage.getItem('ml-ova-progress')
          if (saved) {
            const progressData = JSON.parse(saved)
            
            this.sections = { ...this.sections, ...progressData.sections }
            this.quizScores = progressData.quizScores || {}
            this.achievements = progressData.achievements || []
            this.currentSection = progressData.currentSection || 'basics'
          }
        } catch (error) {
          console.warn('No se pudo cargar el progreso guardado:', error)
        }
      }
    }
  }
})