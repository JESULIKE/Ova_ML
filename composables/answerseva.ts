export const useCorrectAnswerseva = async () => {
  const { data } = await useFetch('/api/answerseva')
  return data.value.respuestasCorrectas
}