<template>
  <section class="quiz-section py-16">
    <v-container>
      <h2 class="text-center mb-8">🧠 Evaluación sobre Redes Neuronales</h2>

      <!-- Preguntas (solo se muestran si está montado y hay preguntas) -->
      <div v-if="mounted && quizStore.questions.length">
        <div
          v-for="question in quizStore.questions"
          :key="question.id"
          class="mb-6 pa-4 rounded-lg bg-white shadow"
        >
          <h3 class="mb-2">{{ question.id }}. {{ question.question }}</h3>

          <v-radio-group
            v-model="quizStore.userAnswers[question.id]"
            :disabled="quizChecked"
          >
            <v-radio
              v-for="(answer, key) in question.answers"
              :key="key"
              :label="answer"
              :value="key"
            />
          </v-radio-group>

          <!-- Resultado por pregunta -->
          <div v-if="quizChecked" class="mt-2">
            <p v-if="quizStore.results[question.id]" class="text-green-600">
              ✔️ Respuesta correcta
            </p>
            <p v-else class="text-red-600">
              ❌ Incorrecto. La correcta era: {{ question.answers[correctAnswer(question.id)] }}
            </p>
          </div>
        </div>

        <!-- Botón de verificar -->
        <div class="text-center mt-6">
          <v-btn color="primary" @click="verificarRespuestas" v-if="!quizChecked">
            Verificar Respuestas
          </v-btn>
        </div>
      </div>

      <!-- Resultado final -->
      <div v-if="quizStore.passed && quizChecked" class="text-center mt-8">
        <h2 class="mb-4">🎉 ¡Evaluación aprobada!</h2>
        <v-btn color="success" @click="goBackToIndex">Volver al Inicio</v-btn>
      </div>

      <div v-else-if="quizChecked && !quizStore.passed" class="text-center mt-8">
        <h2 class="mb-4 text-red-600">❌ Aún hay respuestas incorrectas</h2>
        <v-btn color="warning" @click="resetQuiz">Intentar de nuevo</v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

const router = useRouter()
const quizStore = useQuizStore()
const quizChecked = ref(false)
const mounted = ref(false)

const verificarRespuestas = () => {
  quizStore.verificar()
  quizChecked.value = true
}

const resetQuiz = () => {
  quizStore.userAnswers = {}
  quizStore.results = {}
  quizChecked.value = false
}

const goBackToIndex = () => {
  router.push('/neuronalnets')
}

const correctAnswer = (id) => {
  return quizStore.correctAnswers[id]
}

onMounted(async () => {
  await quizStore.fetchQuestions()
  await quizStore.fetchCorrectAnswers()
  mounted.value = true
})
</script>

<style scoped>
.quiz-section {
  background: #f5f5f5;
}
</style>
