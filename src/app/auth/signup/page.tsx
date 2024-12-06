"use client";
import { useRouter } from "next/navigation";  // Importamos el hook para la navegación entre páginas
import { useForm } from "react-hook-form";  // Importamos el hook para el manejo de formularios
import Link from "next/link";  // Importamos el componente Link para navegación entre páginas
import toast, { Toaster } from "react-hot-toast";  // Importamos las funciones para mostrar notificaciones
import { motion } from "framer-motion";  // Importamos para agregar animaciones con framer-motion
import Image from "next/image";  // Importamos el componente Image para manejar imágenes de Next.js
import { caveat, lexend, manrope } from "@/app/fonts/fonts";  // Importamos las fuentes personalizadas
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Importamos los íconos de visibilidad de contraseña
import { useState } from "react";  // Importamos useState para manejar el estado del componente

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();  // Inicializamos el formulario con react-hook-form
    const router = useRouter();  // Inicializamos el hook para navegar a otras páginas
    const [passwordVisible, setPasswordVisible] = useState(false);  // Estado para manejar la visibilidad de la contraseña

    // Función para manejar el envío del formulario
    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {  // Verificamos que las contraseñas coincidan
            return unmatchedPassword();  // Si no coinciden, mostramos un error
        }

        // Realizamos la petición para registrar al usuario
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,  // Recogemos el nombre del usuario
                email: data.email,  // Recogemos el correo del usuario
                password: data.password,  // Recogemos la contraseña del usuario
            }),
            headers: {
                "Content-Type": "application/json",  // Especificamos que estamos enviando JSON
            },
        });

        if (res.ok) {  // Si la respuesta es exitosa, mostramos mensajes de éxito y redirigimos al login
            loginNow();
            userCreated();
            router.push("/auth/login");
        }
    });

    // Funciones para mostrar notificaciones
    const userCreated = () => toast.success("¡Cuenta creada!");  // Notificación de cuenta creada
    const loginNow = () => toast.success("¡Ya puedes Iniciar Sesión!");  // Notificación para iniciar sesión
    const unmatchedPassword = () => toast.error("Las contraseñas no coinciden", {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',  // Estilo para la notificación de error
        },
    });

    console.log(errors);  // Mostramos los errores del formulario en consola para depuración

    return (
        <div className="login p-10 min-h-screen flex flex-col md:flex-row justify-center items-center">
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
                                Para Crear tú primer Post - ¡Regístrate Ahora!
                            </textPath>
                        </text>
                    </motion.svg>
                    <span
                        className="w-14 h-14 md:w-36 md:h-36 absolute top-0 left-0 right-0 bottom-0 m-auto bg-pink-100 text-slate-600 font-bold hover:bg-pink-200 duration-300 rounded-full flex items-center justify-center "
                    >
                        <p className="text-[10px] sm:text-[25px] md:text-[25px]">
                            Register
                        </p>
                    </span>
                </div>
            </div>
            {/* Sección del Formulario */}
            <div className="py-7 px-5 w-[300px] md:w-[600px] xl:w-[750px] bg-white rounded-xl">
                <div className="flex items-center pb-5 select-none gap-3">
                    <Image src="/Logo.png" alt="wiki_ui_logo" width={70} height={70} />
                    <span className={caveat.className}>
                        <p className="text-[35px] font-bold text-slate-700">
                            Regístrate
                        </p>
                    </span>
                </div>
                <h1 className="text-[20px] text-start text-slate-600 select-none">
                    <span className={lexend.className}>
                        Bienvenido a tú Blog!  {"  "} 👋🏻
                    </span>
                </h1>
                <h1 className="text-[13px] text-start text-slate-600 select-none">
                    <span className={lexend.className}>
                        Por favor registra una cuenta para empezar la aventura
                    </span>
                </h1>
                <form onSubmit={onSubmit}>
                    {errors.name && (
                        <span className="text-red-500">
                            {errors.name.message?.toString()}
                        </span>
                    )}
                    <br />
                    <label className="pl-1 text-[13px] text-slate-600 uppercase">
                        <span className={lexend.className}>
                            Nombre de Usuario
                        </span>
                    </label>
                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: "El nombre de usuario es requerido",
                            },
                        })}
                        autoComplete="off"
                        id="name"
                        name="name"
                        type="text"
                        className="mb-3 mt-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                        placeholder="Nombre completo"
                    />
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
                        className="mb-3 mt-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                        placeholder="correo@gmail.com"
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
                    <div className="relative mt-2">

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
                            className="mb-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                            placeholder="Contraseña"
                        />

                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}  // Alternar visibilidad de la contraseña
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {passwordVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}  {/* Mostrar el icono adecuado */}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-red-500">
                            {errors.confirmPassword.message?.toString()}
                        </span>
                    )}
                    <br />
                    <label className="pl-1 pt-5 text-[13px] text-slate-600 uppercase">
                        <span className={lexend.className}>
                            Confirmar Contraseña
                        </span>
                    </label>
                    <div className="relative mt-2 mb-10">
                        <input
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message:
                                        "La confirmación de la contraseña es requerida",
                                },
                            })}
                            autoComplete="off"
                            id="confirmPassword"
                            name="confirmPassword"
                            type={passwordVisible ? "text" : "password"}  // Cambiar el tipo de input según el estado
                            className="mb-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                            placeholder="Confirmar Contraseña"
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
                            ¿Ya tienes una cuenta?
                        </p>
                        <Link href="/auth/login">
                            <p className="text-[14px] text-pink-600 font-semibold">
                                Inicia sesión
                            </p>
                        </Link>
                    </div>
                </span>

            </div>
            {/*  */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div >
    );
}
