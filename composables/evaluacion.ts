export const useQuestionseva = async () => {
  const { data } = await useFetch('/api/advanced')
  return data.value.questions
}