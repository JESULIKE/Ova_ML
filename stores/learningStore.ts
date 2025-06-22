// stores/learning.js
import { defineStore } from 'pinia'

export const useLearningStore = defineStore('learning', {
  state: () => ({
    user: {
      name: '',
      level: 1,
      totalPoints: 0,
      streak: 0,
      lastActivity: null,
      preferences: {
        theme: 'light',
        notifications: true,
        autoSave: true
      }
    },
    
    modules: {
      'introduction': {
        started: false,
        completed: false,
        progress: 0,
        timeSpent: 0,
        attempts: 0,
        score: 0,
        unlocked: true
      },
      'regression-classification': {
        started: false,
        completed: false,
        progress: 0,
        timeSpent: 0,
        attempts: 0,
        score: 0,
        unlocked: false
      },
      'supervised-learning': {
        started: false,
        completed: false,
        progress: 0,
        timeSpent: 0,
        attempts: 0,
        score: 0,
        unlocked: false
      },
      'neural-networks': {
        started: false,
        completed: false,
        progress: 0,
        timeSpent: 0,
        attempts: 0,
        score: 0,
        unlocked: false
      }
    },
    
    achievements: [
      // Ejemplos de logros predefinidos
    ],
    
    currentSession: {
      startTime: null,
      moduleId: null,
      interactions: [],
      pointsEarned: 0
    },
    
    stats: {
      totalTimeStudied: 0,
      modulesCompleted: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      streakRecord: 0
    },

    // Quiz específico para regression-classification
    quizResults: {
      'regression-classification': {
        attempts: 0,
        bestScore: 0,
        averageScore: 0,
        timeSpent: 0,
        completed: false
      }
    }
  }),

  getters: {
    getModuleProgress: (state) => (moduleId) => {
      return state.modules[moduleId]?.progress || 0
    },
    
    isModuleCompleted: (state) => (moduleId) => {
      return state.modules[moduleId]?.completed || false
    },
    
    isModuleUnlocked: (state) => (moduleId) => {
      return state.modules[moduleId]?.unlocked || false
    },
    
    getUserLevel: (state) => {
      // Calcular nivel basado en puntos (cada 1000 puntos = 1 nivel)
      return Math.floor(state.user.totalPoints / 1000) + 1
    },
    
    getNextLevelPoints: (state) => {
      const currentLevel = Math.floor(state.user.totalPoints / 1000) + 1
      return currentLevel * 1000 - state.user.totalPoints
    },

    getLevelProgress: (state) => {
      const currentLevel = Math.floor(state.user.totalPoints / 1000) + 1
      const pointsInCurrentLevel = state.user.totalPoints % 1000
      return (pointsInCurrentLevel / 1000) * 100
    },

    getCompletedModulesCount: (state) => {
      return Object.values(state.modules).filter(module => module.completed).length
    },

    getTotalStudyTime: (state) => {
      return Object.values(state.modules).reduce((total, module) => total + module.timeSpent, 0)
    },

    getAccuracyRate: (state) => {
      if (state.stats.questionsAnswered === 0) return 0
      return Math.round((state.stats.correctAnswers / state.stats.questionsAnswered) * 100)
    },

    getCurrentStreak: (state) => {
      // Verificar si la racha sigue activa (último día de actividad)
      if (!state.user.lastActivity) return 0
      
      const today = new Date()
      const lastActivity = new Date(state.user.lastActivity)
      const diffTime = Math.abs(today - lastActivity)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      return diffDays <= 1 ? state.user.streak : 0
    },

    getAvailableModules: (state) => {
      return Object.entries(state.modules)
        .filter(([_, module]) => module.unlocked)
        .map(([id, module]) => ({ id, ...module }))
    },

    getRecentAchievements: (state) => {
      return state.achievements
        .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
        .slice(0, 5)
    }
  },

  actions: {
    // === INICIALIZACIÓN Y CONFIGURACIÓN ===
    initializeUser(userData = {}) {
      this.user = {
        ...this.user,
        ...userData,
        lastActivity: new Date().toISOString()
      }
      this.updateStreak()
    },

    updateUserPreferences(preferences) {
      this.user.preferences = { ...this.user.preferences, ...preferences }
      this.saveToLocalStorage()
    },

    // === GESTIÓN DE MÓDULOS ===
    startModule(moduleId) {
      if (!this.modules[moduleId]) {
        console.warn(`Módulo ${moduleId} no encontrado`)
        return
      }
      
      this.modules[moduleId].started = true
      this.modules[moduleId].attempts++
      
      this.currentSession = {
        startTime: new Date(),
        moduleId,
        interactions: [],
        pointsEarned: 0
      }

      this.recordInteraction('module_started', { moduleId })
      this.updateActivity()
    },

    updateProgress(moduleId, progress) {
      if (this.modules[moduleId]) {
        const oldProgress = this.modules[moduleId].progress
        this.modules[moduleId].progress = Math.max(oldProgress, progress)
        
        // Otorgar puntos por progreso
        if (progress > oldProgress) {
          const pointsEarned = Math.floor((progress - oldProgress) / 10) * 5
          this.addPoints(pointsEarned)
        }

        this.recordInteraction('progress_updated', { 
          moduleId, 
          oldProgress, 
          newProgress: progress 
        })
      }
    },

    completeModule(moduleId) {
      if (!this.modules[moduleId]) return

      const module = this.modules[moduleId]
      module.completed = true
      module.progress = 100
      
      // Calcular tiempo transcurrido
      if (this.currentSession.startTime) {
        const timeSpent = new Date() - this.currentSession.startTime
        module.timeSpent += timeSpent
        this.stats.totalTimeStudied += timeSpent
      }
      
      // Actualizar estadísticas
      this.stats.modulesCompleted++
      
      // Otorgar puntos por completar
      const completionPoints = this.calculateCompletionPoints(moduleId)
      this.addPoints(completionPoints)
      
      // Desbloquear siguiente módulo
      this.unlockNextModule(moduleId)
      
      // Verificar logros
      this.checkAchievements()
      
      // Guardar progreso
      this.saveToLocalStorage()

      this.recordInteraction('module_completed', { 
        moduleId, 
        pointsEarned: completionPoints,
        timeSpent: module.timeSpent 
      })
    },

    unlockNextModule(completedModuleId) {
      const moduleOrder = [
        'introduction',
        'regression-classification', 
        'supervised-learning',
        'neural-networks'
      ]
      
      const currentIndex = moduleOrder.indexOf(completedModuleId)
      if (currentIndex !== -1 && currentIndex < moduleOrder.length - 1) {
        const nextModule = moduleOrder[currentIndex + 1]
        if (this.modules[nextModule]) {
          this.modules[nextModule].unlocked = true
          this.unlockAchievement('module_unlocked', `¡Desbloqueaste: ${nextModule}!`)
        }
      }
    },

    calculateCompletionPoints(moduleId) {
      const basePoints = 100
      const module = this.modules[moduleId]
      
      // Bonificación por pocos intentos
      const attemptBonus = Math.max(0, (5 - module.attempts) * 20)
      
      // Bonificación por tiempo (completar rápido)
      const timeBonus = module.timeSpent < 1800000 ? 50 : 0 // 30 minutos
      
      return basePoints + attemptBonus + timeBonus
    },

    // === SISTEMA DE PUNTOS Y NIVELES ===
    addPoints(points) {
      const oldLevel = this.getUserLevel
      this.user.totalPoints += points
      this.currentSession.pointsEarned += points
      const newLevel = this.getUserLevel
      
      // Si subió de nivel
      if (newLevel > oldLevel) {
        this.unlockAchievement('level_up', `¡Subiste al nivel ${newLevel}!`)
      }

      this.recordInteraction('points_earned', { points, totalPoints: this.user.totalPoints })
    },

    // === SISTEMA DE RACHAS ===
    updateStreak() {
      const today = new Date()
      const lastActivity = this.user.lastActivity ? new Date(this.user.lastActivity) : null
      
      if (!lastActivity) {
        this.user.streak = 1
      } else {
        const diffTime = Math.abs(today - lastActivity)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays === 1) {
          // Continuó la racha
          this.user.streak++
          if (this.user.streak > this.stats.streakRecord) {
            this.stats.streakRecord = this.user.streak
            this.unlockAchievement('streak_record', `¡Nueva racha récord: ${this.user.streak} días!`)
          }
        } else if (diffDays > 1) {
          // Se rompió la racha
          this.user.streak = 1
        }
      }
      
      this.user.lastActivity = today.toISOString()
    },

    updateActivity() {
      this.updateStreak()
      this.saveToLocalStorage()
    },

    // === SISTEMA DE LOGROS ===
    unlockAchievement(id, title, description = '') {
      // Verificar si ya tiene el logro
      if (this.achievements.find(a => a.id === id)) return
      
      const achievement = {
        id,
        title,
        description,
        unlockedAt: new Date().toISOString(),
        points: this.getAchievementPoints(id)
      }
      
      this.achievements.push(achievement)
      this.addPoints(achievement.points)
      
      // Mostrar notificación (se podría implementar con un toast)
      this.recordInteraction('achievement_unlocked', achievement)
    },

    getAchievementPoints(achievementId) {
      const pointsMap = {
        'level_up': 50,
        'first_module': 100,
        'streak_record': 75,
        'perfect_score': 150,
        'speed_demon': 100,
        'persistent': 50,
        'explorer': 25
      }
      return pointsMap[achievementId] || 25
    },

    checkAchievements() {
      // Primer módulo completado
      if (this.getCompletedModulesCount === 1) {
        this.unlockAchievement('first_module', '¡Primer módulo completado!')
      }
      
      // Todos los módulos completados
      if (this.getCompletedModulesCount === Object.keys(this.modules).length) {
        this.unlockAchievement('completionist', '¡Completaste todos los módulos!')
      }
      
      // Racha de 7 días
      if (this.user.streak >= 7) {
        this.unlockAchievement('week_warrior', '¡7 días consecutivos!')
      }
      
      // 1000 puntos totales
      if (this.user.totalPoints >= 1000) {
        this.unlockAchievement('point_collector', '¡Alcanzaste 1000 puntos!')
      }
    },

    // === GESTIÓN DE QUIZ ===
    startQuiz(moduleId) {
      if (!this.quizResults[moduleId]) {
        this.quizResults[moduleId] = {
          attempts: 0,
          bestScore: 0,
          averageScore: 0,
          timeSpent: 0,
          completed: false
        }
      }
      
      this.quizResults[moduleId].attempts++
      this.recordInteraction('quiz_started', { moduleId })
    },

    completeQuiz(moduleId, score, timeSpent) {
      const quiz = this.quizResults[moduleId]
      if (!quiz) return
      
      quiz.completed = true
      quiz.timeSpent += timeSpent
      
      // Actualizar mejor puntuación
      if (score > quiz.bestScore) {
        quiz.bestScore = score
        if (score === 100) {
          this.unlockAchievement('perfect_score', '¡Puntuación perfecta!')
        }
      }
      
      // Calcular promedio
      quiz.averageScore = ((quiz.averageScore * (quiz.attempts - 1)) + score) / quiz.attempts
      
      // Otorgar puntos basados en la puntuación
      const quizPoints = Math.floor(score * 2) // 2 puntos por cada % de acierto
      this.addPoints(quizPoints)
      
      this.recordInteraction('quiz_completed', { 
        moduleId, 
        score, 
        timeSpent, 
        pointsEarned: quizPoints 
      })
      
      this.saveToLocalStorage()
    },

    // === GESTIÓN DE PREGUNTAS ===
    recordAnswer(isCorrect) {
      this.stats.questionsAnswered++
      if (isCorrect) {
        this.stats.correctAnswers++
        this.addPoints(10) // 10 puntos por respuesta correcta
      }
      
      this.recordInteraction('question_answered', { isCorrect })
    },

    // === INTERACCIONES Y ANALÍTICAS ===
    recordInteraction(type, data) {
      this.currentSession.interactions.push({
        type,
        data,
        timestamp: new Date().toISOString()
      })
    },

    getSessionSummary() {
      return {
        ...this.currentSession,
        duration: this.currentSession.startTime ? 
          new Date() - this.currentSession.startTime : 0,
        interactionCount: this.currentSession.interactions.length
      }
    },

    // === PERSISTENCIA ===
    saveToLocalStorage() {
      try {
        const dataToSave = {
          user: this.user,
          modules: this.modules,
          achievements: this.achievements,
          stats: this.stats,
          quizResults: this.quizResults,
          lastSaved: new Date().toISOString()
        }
        localStorage.setItem('ml-learning-progress', JSON.stringify(dataToSave))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },

    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('ml-learning-progress')
        if (saved) {
          const data = JSON.parse(saved)
          
          // Mergear datos guardados con estado actual
          this.user = { ...this.user, ...data.user }
          this.modules = { ...this.modules, ...data.modules }
          this.achievements = data.achievements || []
          this.stats = { ...this.stats, ...data.stats }
          this.quizResults = { ...this.quizResults, ...data.quizResults }
          
          return true
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error)
      }
      return false
    },

    resetProgress() {
      // Resetear todo el progreso (útil para desarrollo/testing)
      this.$reset()
      localStorage.removeItem('ml-learning-progress')
    },

    // === EXPORTAR/IMPORTAR DATOS ===
    exportProgress() {
      return {
        user: this.user,
        modules: this.modules,
        achievements: this.achievements,
        stats: this.stats,
        quizResults: this.quizResults,
        exportedAt: new Date().toISOString()
      }
    },

    importProgress(data) {
      try {
        this.user = { ...this.user, ...data.user }
        this.modules = { ...this.modules, ...data.modules }
        this.achievements = data.achievements || []
        this.stats = { ...this.stats, ...data.stats }
        this.quizResults = { ...this.quizResults, ...data.quizResults }
        
        this.saveToLocalStorage()
        return true
      } catch (error) {
        console.error('Error importing progress:', error)
        return false
      }
    }
  }
})