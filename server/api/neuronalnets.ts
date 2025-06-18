export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      question: "¿Qué es el Machine Learning?",
      answers: {
        a: "Un sistema que requiere programación manual para cada tarea",
        b: "Una técnica para crear gráficos interactivos",
        c: "Una rama de la IA que permite a las computadoras aprender automáticamente de los datos"
      }
    },
    {
      id: 2,
      question: "¿Cuál es una característica clave del aprendizaje automático?",
      answers: {
        a: "Mejora su rendimiento al recibir más datos",
        b: "Necesita que todos los resultados se ingresen manualmente",
        c: "Solo funciona con imágenes"
      }
    },
    {
      id: 3,
      question: "¿Qué define al aprendizaje supervisado?",
      answers: {
        a: "Trabaja con datos sin etiquetas para encontrar patrones",
        b: "Aprende mediante recompensas y castigos",
        c: "Utiliza datos etiquetados para predecir resultados"
      }
    },
    {
      id: 4,
      question: "¿Cuál de los siguientes ejemplos corresponde a una tarea de regresión?",
      answers: {
        a: "Clasificar si un correo es spam o no",
        b: "Predecir el precio de una vivienda en dólares",
        c: "Detectar fraudes en transacciones financieras"
      }
    },
    {
      id: 5,
      question: "¿Cómo actúa el aprendizaje no supervisado?",
      answers: {
        a: "Clasifica imágenes de forma precisa gracias a etiquetas previas",
        b: "Encuentra patrones ocultos en datos sin necesidad de etiquetas",
        c: "Sigue instrucciones predefinidas para cada resultado"
      }
    }
  ];
});