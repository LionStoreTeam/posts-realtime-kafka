"use client"; // Indica que este componente es del lado del cliente (con React)

import { useForm } from "react-hook-form"; // Importa la función useForm de react-hook-form para manejar formularios
import { signIn } from "next-auth/react"; // Importa la función signIn de NextAuth para gestionar el inicio de sesión
import { useRouter } from "next/navigation"; // Importa useRouter para redirigir al usuario después del inicio de sesión
import { useState } from "react"; // Importa useState para manejar el estado local
import Link from "next/link"; // Importa Link para enlaces entre páginas dentro de Next.js
import { Toaster } from "react-hot-toast"; // Importa Toaster para mostrar notificaciones emergentes
import { caveat, lexend, manrope } from "@/app/fonts/fonts"; // Importa fuentes personalizadas para el estilo
import Image from "next/image"; // Importa Image para la optimización de imágenes en Next.js
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa los íconos de React Icons para mostrar/hide contraseñas
import { motion } from "framer-motion"; // Importa motion para animaciones con Framer Motion

export default function LoginPage() {
    // Inicialización de react-hook-form para manejar el formulario y las validaciones
    const {
        register, // Función para registrar los inputs en el formulario
        handleSubmit, // Función para manejar el envío del formulario
        formState: { errors }, // Contiene los errores de validación
    } = useForm();

    const router = useRouter(); // Hook para obtener el router y redirigir al usuario
    const [error, setError] = useState(""); // Estado local para manejar errores en el inicio de sesión
    const [passwordVisible, setPasswordVisible] = useState(false);  // Estado para manejar la visibilidad de la contraseña

    // Función para manejar el envío del formulario
    const onSubmit = handleSubmit(async (data) => {
        // Llamada a la función de NextAuth para realizar el inicio de sesión
        const res = await signIn("credentials", {
            email: data.email, // El email del usuario
            password: data.password, // La contraseña del usuario
            redirect: false, // No redirige automáticamente
        });

        // Si hay un error, lo muestra en el estado 'error'
        if (res?.error) {
            return setError(res.error as string);
        } else {
            // Si el inicio de sesión es exitoso, redirige a la página principal y refresca la página
            router.push("/");
            router.refresh();
        }
    });
    return (
        <div className="login p-10 min-h-screen flex flex-col md:flex-row justify-center items-center">
            {/* Sección del Formulario Inicio de Sesión*/}
            <div className="flex flex-col justify-center items-center text-center">
                <div className="relative select-none">
                    <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                        viewBox="0 0 300 300"
                        className="w-[220px] h-[220px] md:w-[500px] md:h-[500px]"
                    >
                        <defs>
                            <path
                                id="circlePath"
                                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0"
                            />
                        </defs>
                        <text fill="rgb(255, 200, 255)">
                            <textPath
                                xlinkHref="#circlePath"
                                className="text-lg"
                            >
                                Para crear tú primer Post - Inicia Sesión Ahora
                            </textPath>
                        </text>
                    </motion.svg>
                    <div
                        className="w-14 h-14 md:w-36 md:h-36 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-100 text-slate-600 font-bold hover:bg-pink-200 duration-300 rounded-full flex items-center justify-center "
                    >
                        <p className="text-[10px] sm:text-[25px] md:text-[25px]">
                            Login
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-7 px-5 w-[300px] md:w-[600px] xl:w-[750px] bg-white rounded-xl">
                <div className="flex items-center pb-5 select-none gap-3">
                    <Image src="/Logo.png" alt="wiki_ui_logo" width={70} height={70} />
                    <span className={caveat.className}>
                        <p className="text-[35px] font-bold text-slate-700">
                            Inicia Sesión
                        </p>
                    </span>
                </div>
                <h1 className="text-[20px] text-start text-slate-600 select-none">
                    <span className={lexend.className}>
                        Bienvenido a tú Blog!  {"  "} 👋🏻
                    </span>
                </h1>
                <h1 className="text-[12px] text-start text-slate-600 select-none">
                    <span className={lexend.className}>
                        Por favor inicia sesión en tu cuenta para empezar la aventura
                    </span>
                </h1>
                <div className=""></div>
                <form onSubmit={onSubmit}>
                    {error && (
                        <p className="bg-red-500 text-sm font-bold text-slate-100 p-3  mt-3 rounded-xl">
                            {error}
                        </p>
                    )}
                    <br />
                    {errors.email && (
                        <span className="text-red-500">
                            {errors.email.message?.toString()}
                        </span>
                    )}
                    <br />
                    <label className="pl-1 text-[13px] text-slate-600 uppercase">
                        <span className={lexend.className}>
                            Correo
                        </span>
                    </label>
                    <input
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El correo es requerido",
                            },
                        })}
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="email"
                        className="mt-2 mb-3 w-full rounded-lg bg-zinc-100 outline-rose-400 px-5 py-3"
                        placeholder="some@gmail.com"
                    />
                    {errors.password && (
                        <span className="text-red-500">
                            {errors.password.message?.toString()}
                        </span>
                    )}
                    <br />
                    <label className="pl-1 pt-5 text-[13px] text-slate-600 uppercase">
                        <span className={lexend.className}>
                            Contraseña
                        </span>
                    </label>
                    <div className="relative mt-2 mb-10">
                        <input
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida",
                                },
                            })}
                            autoComplete="off"
                            id="password"
                            name="password"
                            type={passwordVisible ? "text" : "password"}  // Cambiar el tipo de input según el estado
                            className="w-full rounded-lg bg-zinc-100 outline-rose-400 px-5 py-3 pr-12"  // Agregar padding extra para el icono
                            placeholder="••••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}  // Alternar visibilidad de la contraseña
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {passwordVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}  {/* Mostrar el icono adecuado */}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="mb-3 w-full rounded-lg bg-rose-500 px-5 py-3 font-semibold text-white"
                    >
                        Ingresar
                    </button>
                </form>
                <span className={manrope.className}>
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center text-center">
                        <p className="text-[13px] text-slate-600 font-semibold">
                            ¿Nuevo en nuestra plataforma?
                        </p>
                        <Link href="/auth/signup">
                            <p className="text-[14px] text-pink-600 font-semibold">
                                Crear una cuenta
                            </p>
                        </Link>
                    </div>
                </span>

            </div>
            <Toaster />
        </div>
    );
}


