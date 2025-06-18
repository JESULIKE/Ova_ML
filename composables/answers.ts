export const useCorrectAnswers = async () => {
  const { data } = await useFetch('/api/answers')
  return data.value.respuestasCorrectas
}