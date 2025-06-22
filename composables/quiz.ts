export const useQuestions = async () => {
  const { data } = await useFetch('/api/neuronalnets')
  return data.value.questions
}