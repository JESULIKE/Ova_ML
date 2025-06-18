export default defineEventHandler(() => {
  const questions = [
    {
      id: 1,
      question: "¿Cuál es la función de la retropropagación en el entrenamiento de redes neuronales?",
      answers: {
        a: "Dividir los datos en entrenamiento y prueba",
        b: "Ajustar los pesos minimizando el error del modelo",
        c: "Clasificar automáticamente los datos"
      }
    },
    {
      id: 2,
      question: "¿Cómo ayuda la técnica de dropout a mejorar una red neuronal?",
      answers: {
        a: "Reduce el tamaño del conjunto de datos",
        b: "Introduce regularización eliminando conexiones aleatorias temporalmente",
        c: "Duplica el número de neuronas para mayor precisión"
      }
    },
    {
      id: 3,
      question: "¿Qué es una función de pérdida (loss function) y cuál es su papel?",
      answers: {
        a: "Medir la diferencia entre la salida deseada y la obtenida",
        b: "Incrementar la velocidad de entrenamiento",
        c: "Elegir la mejor arquitectura para la red"
      }
    },
    {
      id: 4,
      question: "¿Cuál es la principal diferencia entre una CNN y una RNN?",
      answers: {
        a: "Las CNN se especializan en imágenes, mientras que las RNN en secuencias temporales",
        b: "Las RNN tienen mayor número de capas ocultas",
        c: "Las CNN funcionan mejor con texto"
      }
    },
    {
      id: 5,
      question: "¿Qué significa que un modelo tenga buena capacidad de generalización?",
      answers: {
        a: "Que funciona únicamente con los datos de entrenamiento",
        b: "Que es muy complejo y con muchos parámetros",
        c: "Que ofrece buen rendimiento con datos nuevos no vistos"
      }
    }
  ];

  return { questions };
});