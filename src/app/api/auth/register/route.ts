import bcrypt from "bcryptjs"; // Importa bcryptjs para el manejo de contraseñas de manera segura
import { PrismaClient } from "@prisma/client"; // Importa PrismaClient para interactuar con la base de datos
import { NextResponse } from "next/server"; // Importa NextResponse para manejar las respuestas HTTP en Next.js

// Crea una instancia de PrismaClient para interactuar con la base de datos
const prisma = new PrismaClient();

// Función que maneja las solicitudes POST para registrar un nuevo usuario
export async function POST(request: Request) {
  try {
    // Obtiene los datos enviados en la solicitud (JSON) y los guarda en 'data'
    const data = await request.json();

    // Busca un usuario en la base de datos utilizando el correo electrónico proporcionado
    const userFound = await prisma.usuario.findUnique({
      where: {
        email: data.email, // Buscamos por el correo electrónico del nuevo usuario
      },
    });

    // Si se encuentra un usuario con ese correo, se devuelve un error indicando que el email ya está en uso
    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already in use", // Mensaje de error
        },
        {
          status: 400, // Código de estado HTTP 400: Bad Request
        }
      );
    }

    // En caso de que no se encuentre el usuario, se procede a encriptar la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 12); // Encriptación de la contraseña con un "sal" de 12 rondas

    // Crea un nuevo usuario en la base de datos con los datos proporcionados y la contraseña encriptada
    const newUser = await prisma.usuario.create({
      data: {
        name: data.name, // Nombre del nuevo usuario
        email: data.email, // Correo electrónico del nuevo usuario
        password: hashedPassword, // Contraseña encriptada
      },
    });

    // Elimina el campo de la contraseña de la respuesta para no exponerla
    const { password, ...User } = newUser; // Desestructura para excluir la contraseña

    // Devuelve una respuesta exitosa con los datos del usuario (sin la contraseña)
    return NextResponse.json(User);
  } catch (error: any) {
    // Si ocurre un error, se maneja y se devuelve un mensaje de error con el código de estado 500
    return NextResponse.json(
      {
        message: error.message, // Mensaje de error
      },
      {
        status: 500, // Código de estado HTTP 500: Internal Server Error
      }
    );
  }
}
