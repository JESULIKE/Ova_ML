import { defineStore } from 'pinia'

export const useEvaStore = defineStore('eva', () => {
  const questions = ref([])
  const correctAnswers = ref({})
  const userAnswers = ref({})
  const results = ref({})

  const fetchQuestions = async () => {
    const { data } = await useFetch('/api/advanced')
    questions.value = data.value.questions
  }

  const fetchCorrectAnswers = async () => {
    const { data } = await useFetch('/api/answerseva')
    correctAnswers.value = data.value.respuestasCorrectas
  }

  const verificar = () => {
    const res: Record<number, boolean> = {}
    for (const id in correctAnswers.value) {
      res[id] = userAnswers.value[id] === correctAnswers.value[id]
    }
    results.value = res
  }

  return {
    questions,
    correctAnswers,
    userAnswers,
    results,
    fetchQuestions,
    fetchCorrectAnswers,
    verificar
  }
})