import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // <--- añade computed

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref([])
  const correctAnswers = ref({})
  const userAnswers = ref({})
  const results = ref({})

  const fetchQuestions = async () => {
    try {
      const data = await $fetch('/api/neuronalnets')
      console.log('✅ fetchQuestions:', data)
      questions.value = data
    } catch (err) {
      console.error('❌ Error en fetchQuestions:', err)
    }
  }

  const fetchCorrectAnswers = async () => {
    try {
      const data = await $fetch('/api/answers')
      correctAnswers.value = data.respuestasCorrectas
    } catch (err) {
      console.error('❌ Error en fetchCorrectAnswers:', err)
    }
  }

  const verificar = () => {
    const res = {}
    for (const id in correctAnswers.value) {
      res[id] = userAnswers.value[id] === correctAnswers.value[id]
    }
    results.value = res
  }

  // ✅ Computado para saber si pasó
  const passed = computed(() => {
    return (
      Object.keys(results.value).length > 0 &&
      Object.values(results.value).every((v) => v)
    )
  })

  return {
    questions,
    correctAnswers,
    userAnswers,
    results,
    passed, // <-- Asegúrate de devolverlo
    fetchQuestions,
    fetchCorrectAnswers,
    verificar
  }
})
