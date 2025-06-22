import { defineStore } from 'pinia'

export const useEvaluationStore = defineStore('evaluation', {
  state: () => ({
    evaluationPassed: localStorage.getItem('evaluationPassed') === 'true'
  }),
  actions: {
    markAsPassed() {
      this.evaluationPassed = true
      localStorage.setItem('evaluationPassed', 'true')
    }
  }
})