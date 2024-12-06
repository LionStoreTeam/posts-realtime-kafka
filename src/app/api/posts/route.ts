import { NextResponse } from "next/server"; // Importa NextResponse para manejar las respuestas HTTP en Next.js
import { ensureProducerConnected, producer } from "@/lib/kafka"; // Importa las funciones para interactuar con Kafka (productor de mensajes tipo Posts)
import prisma from "@/lib/prisma"; // Importa la instancia de Prisma para interactuar con la base de datos

// Función que maneja las solicitudes POST para publicar un nuevo post
export async function POST(req: Request) {
  try {
    // Obtiene el cuerpo de la solicitud (JSON) y extrae los datos
    const body = await req.json();
    const { username, title, content } = body; // Desestructura los datos para obtener el nombre de usuario, título y contenido del post

    // Asegura que el productor de Kafka esté conectado antes de enviar el mensaje
    await ensureProducerConnected();

    // Envía un mensaje al tema "posts" en Kafka con los datos del nuevo post
    await producer.send({
      topic: "posts", // El tema de Kafka al que se enviará el mensaje
      messages: [
        {
          value: JSON.stringify({
            username, // Nombre de usuario del autor del post
            title, // Título del post
            content, // Contenido del post
            timestamp: new Date(), // Marca de tiempo para el post
          }),
        },
      ],
    });

    // Crea el post en la base de datos usando Prisma
    await prisma.post.create({
      data: { username, title, content }, // Datos del post a crear
    });

    // Muestra un mensaje en la consola con los detalles del post enviado a Kafka
    console.log("Mensaje enviado:", {
      username,
      title,
      content,
      timestamp: new Date(), // Se incluye la marca de tiempo
    });

    // Devuelve una respuesta exitosa indicando que el post fue publicado correctamente
    return NextResponse.json({ message: "Post publicado correctamente." });
  } catch (error) {
    // Si ocurre un error en cualquier parte del proceso, lo captura y muestra en la consola
    console.error("Error al publicar el post:", error);

    // Devuelve una respuesta con un error indicando que algo salió mal
    return NextResponse.json(
      { error: "Error al publicar el post." },
      { status: 500 } // Código de estado HTTP 500: Internal Server Error
    );
  }
}
