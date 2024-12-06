// app/api/auth/[...nextauth]/route.ts

// Importa NextAuth para manejar la autenticación
import NextAuth from "next-auth";
// Importa el proveedor de autenticación basado en credenciales
import CredentialsProvider from "next-auth/providers/credentials";
// Importa bcrypt para el manejo y comparación de contraseñas de forma segura
import bcrypt from "bcryptjs";
// Importa el cliente de Prisma para interactuar con la base de datos
import prisma from "@/lib/prisma";
// Importa el adaptador de Prisma para NextAuth, que conecta la base de datos con la sesión
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Configuración de NextAuth para manejar la autenticación en la aplicación
const handler = NextAuth({
  // Usamos el adaptador de Prisma para conectar NextAuth con la base de datos
  adapter: PrismaAdapter(prisma),

  // Configuración de los proveedores de autenticación
  providers: [
    CredentialsProvider({
      name: "credentials", // El nombre del proveedor
      // Definición de las credenciales que el usuario debe proporcionar
      credentials: {
        id: { label: "id", type: "text" },
        name: { label: "name", type: "text" },
        email: {
          label: "Email", // Campo para el correo electrónico
          type: "email",
          placeholder: "someemail@email.com",
          autocomplete: "off",
        },
        password: {
          label: "Password", // Campo para la contraseña
          type: "password",
          autocomplete: "off",
        },
      },
      // Función que se ejecuta para autenticar al usuario con las credenciales proporcionadas
      async authorize(credentials: any): Promise<{
        id: string;
        name: string;
        email: string;
      }> {
        // Busca al usuario en la base de datos utilizando el email proporcionado
        const userFound = await prisma.usuario.findUnique({
          where: {
            email: credentials.email, // Buscamos por correo electrónico
          },
        });

        // Si no se encuentra el usuario, se lanza un error
        if (!userFound) throw new Error("Usuario no encontrado");

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(
          credentials.password, // Contraseña proporcionada por el usuario
          userFound.password // Contraseña almacenada en la base de datos
        );

        // Si las contraseñas no coinciden, se lanza un error
        if (!passwordMatch) throw new Error("Contraseña incorrecta");

        // Si la autenticación es exitosa, devuelve los datos del usuario
        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],

  // Configuración de las rutas personalizadas para las páginas de autenticación
  pages: {
    signIn: "/auth/login", // Página personalizada de inicio de sesión
    error: "/auth/error", // Página personalizada de error en caso de fallo en la autenticación
  },

  // Configuración de la sesión
  session: {
    strategy: "jwt", // Usamos JWT para manejar las sesiones
    maxAge: 1 * 24 * 60 * 60, // Duración de la sesión: 1 día (en segundos)
  },

  // Secreto para firmar los tokens de sesión de NextAuth (debe estar en el archivo .env)
  secret: process.env.NEXTAUTH_SECRET,
});

// Exporta las funciones GET y POST para manejar las solicitudes relacionadas con la autenticación
export { handler as GET, handler as POST };
