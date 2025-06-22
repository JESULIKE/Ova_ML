<script setup>
import { onMounted } from 'vue'
import { useEvaStore } from '@/stores/evaluacion'

const eva = useEvaStore()

onMounted(async () => {
  await eva.fetchQuestions()
  await eva.fetchCorrectAnswers()
  console.log("Correct answers EVA:", eva.correctAnswers)
})
</script>

<template>
  <div v-if="eva.questions.length > 0">
    <h1 class="text-2xl font-bold mb-4">Cuestionario de Redes Neuronales</h1>

    <div v-for="q in eva.questions" :key="q.id" class="mb-6 border-b pb-4">
      <p class="font-semibold mb-2">{{ q.id }}. {{ q.question }}</p>
      <div class="space-y-1">
        <div v-for="(text, key) in q.answers" :key="key">
          <label class="flex items-center gap-2">
            <input
              type="radio"
              :name="q.id"
              :value="key"
              v-model="eva.userAnswers[q.id]"
            />
            {{ key }}) {{ text }}
          </label>
        </div>
      </div>

      <div v-if="eva.results[q.id] !== undefined" class="mt-2 text-sm font-medium"
           :class="eva.results[q.id] ? 'text-green-600' : 'text-red-600'">
        {{ eva.results[q.id] ? '✅ Correcto' : '❌ Incorrecto' }}
      </div>
    </div>

    <v-btn @click="eva.verificar" class="mt-4 px-4 py-2 bg-blue-600 text-black rounded">
      Verificar respuestas
    </v-btn>
  </div>

  <div v-else>
    <p class="text-center">Cargando preguntas...</p>
  </div>
</template>