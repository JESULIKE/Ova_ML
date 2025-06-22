import { defineStore } from 'pinia'

export const useProgresoStore = defineStore('progreso', {
  state: () => ({
    desafiosCompletados: 0,
    totalDesafios: 6 // puedes ajustarlo si necesitas más
  }),
  getters: {
    progresoPorcentaje(state) {
      return Math.min((state.desafiosCompletados / state.totalDesafios) * 100, 100)
    },
    nivel(state) {
      return Math.floor((state.desafiosCompletados / state.totalDesafios) * 5) + 1
    }
  },
  actions: {
    completarDesafio() {
      if (this.desafiosCompletados < this.totalDesafios) {
        this.desafiosCompletados++
      }
    },
    reiniciar() {
      this.desafiosCompletados = 0
    },
    actualizarDesdeRuta(ruta: string) {
      // Define el progreso por ruta
      const progresoPorRuta: Record<string, number> = {
        '/': 1, // index = 1/5 = 20%
        '/ml_index': 2,
        '/ml_tiposdeaprendizaje': 3,
        '/ml_regresionvsclasificacion': 4,
        '/quizrvscla': 4,
        '/quiz': 5,
        '/neuronalnets': 6
      }
      this.desafiosCompletados = progresoPorRuta[ruta] ?? 0
    }
  }
})
