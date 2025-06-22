<template>
  <section class="quiz-section py-16">
    <v-container>
      <h2 class="text-center mb-8">🧠 Evaluación final sobre Machine Learning</h2>

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
        <v-card class="pa-6 mx-auto" max-width="600" elevation="8">
          <div class="text-center">
            <v-icon size="80" color="success" class="mb-4">mdi-trophy</v-icon>
            <h2 class="mb-4 text-success">🎉 ¡Evaluación aprobada!</h2>
            <p class="text-h6 mb-4">
              ¡Felicitaciones! Has completado exitosamente el Módulo de Machine Learning.
            </p>
            <p class="text-body-1 mb-6 text-grey-darken-1">
              El Módulo de Redes Neuronales se ha desbloqueado para ti.
            </p>
            
            <div class="d-flex justify-center gap-4">
              <v-btn 
                color="success" 
                @click="goBackToIndex"
                size="large"
                class="px-8"
              >
                <v-icon left class="mr-2">mdi-home</v-icon>
                Volver al Inicio
              </v-btn>
              

            </div>
          </div>
        </v-card>
      </div>

      <div v-else-if="quizChecked && !quizStore.passed" class="text-center mt-8">
        <v-card class="pa-6 mx-auto" max-width="600" elevation="8">
          <div class="text-center">
            <v-icon size="80" color="error" class="mb-4">mdi-close-circle</v-icon>
            <h2 class="mb-4 text-error">❌ Aún hay respuestas incorrectas</h2>
            <p class="text-body-1 mb-6">
              Revisa las respuestas marcadas en rojo e inténtalo nuevamente.
            </p>
            <v-btn color="warning" @click="resetQuiz" size="large" class="px-8">
              <v-icon left class="mr-2">mdi-refresh</v-icon>
              Intentar de nuevo
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { useProgressStore } from '@/stores/progress'

const router = useRouter()
const quizStore = useQuizStore()
const progressStore = useProgressStore()
const quizChecked = ref(false)
const mounted = ref(false)

const verificarRespuestas = () => {
  quizStore.verificar()
  quizChecked.value = true
  
  // ✅ AQUÍ ES DONDE SE DEBE COMPLETAR EL MÓDULO
  if (quizStore.passed) {
    console.log('🎉 Quiz aprobado - Completando módulo ML')
    progressStore.completeMLModule()
  }
}

const resetQuiz = () => {
  quizStore.userAnswers = {}
  quizStore.results = {}
  quizChecked.value = false
}

const goBackToIndex = () => {
  router.push('/')
}

const goToNeuralNets = () => {
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