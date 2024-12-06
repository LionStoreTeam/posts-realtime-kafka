import { Kafka } from "kafkajs"; // Importa la librería KafkaJS para interactuar con Kafka

// Crea una instancia de Kafka con la configuración del cliente y el servidor de Kafka
const kafka = new Kafka({
  clientId: "posts-app", // El identificador del cliente para Kafka (puede ser cualquier nombre único)
  brokers: [process.env.KAFKA_BROKER as string], // Dirección del servidor de Kafka, obtenida de las variables de entorno
});

// Crea el productor y consumidor de Kafka
export const producer = kafka.producer(); // El productor envía mensajes a Kafka
export const consumer = kafka.consumer({ groupId: "posts-group" }); // El consumidor recibe mensajes de Kafka

// Variables de estado para rastrear si el productor y el consumidor están conectados
let producerConnected = false;
let consumerConnected = false;

// Función para inicializar Kafka (conectar tanto al productor como al consumidor)
export async function initializeKafka() {
  // Si el productor no está conectado, lo conectamos
  if (!producerConnected) {
    await producer.connect(); // Conecta el productor a Kafka
    producerConnected = true; // Marca el productor como conectado
  }

  // Si el consumidor no está conectado, lo conectamos
  if (!consumerConnected) {
    await consumer.connect(); // Conecta el consumidor a Kafka
    consumerConnected = true; // Marca el consumidor como conectado

    // El consumidor se suscribe al tema "posts" para recibir mensajes
    // desde el inicio de los mensajes disponibles en el tema
    await consumer.subscribe({ topic: "posts", fromBeginning: true });
  }
}

// Función para asegurar que el productor está conectado antes de enviar mensajes
export async function ensureProducerConnected() {
  // Si el productor no está conectado, lo conectamos
  if (!producerConnected) {
    await producer.connect(); // Conecta el productor a Kafka
    producerConnected = true; // Marca el productor como conectado
  }
}
