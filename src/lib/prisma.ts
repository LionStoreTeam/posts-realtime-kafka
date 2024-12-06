import { PrismaClient } from "@prisma/client"; // Importa PrismaClient desde Prisma para interactuar con la base de datos

// Crea una función para generar una nueva instancia de PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient(); // Retorna una nueva instancia de PrismaClient
};

// Declara un tipo global para almacenar la instancia de PrismaClient
declare global {
  // Si existe, 'prismaGlobal' puede ser de tipo undefined o una instancia de PrismaClient
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Asigna la instancia de PrismaClient a 'prisma'. Si ya existe una instancia en el entorno global, se reutiliza.
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton(); // Usa la instancia global si está disponible, de lo contrario crea una nueva

// Si no estamos en un entorno de producción, guarda la instancia de PrismaClient en el entorno global para reutilizarla
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// Exporta la instancia de PrismaClient para usarla en otras partes de la aplicación
export default prisma;
