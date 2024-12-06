"use client" // Indica que este componente es un componente del lado del cliente (client-side), lo que permite usar hooks y otros recursos que solo funcionan en el navegador.

import Image from 'next/image'; // Importa el componente 'Image' de Next.js para optimizar las imágenes.
import { useState } from 'react'; // Importa el hook 'useState' de React para manejar el estado dentro del componente.
import { caveat, lexend } from '../fonts/fonts'; // Importa dos fuentes personalizadas (caveat y lexend) definidas en otro archivo.
import toast, { Toaster } from 'react-hot-toast'; // Importa la librería react-hot-toast para mostrar notificaciones emergentes.

export default function NewPost() {
    // Definición de los estados para almacenar los valores de los campos del formulario.
    const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario.
    const [title, setTitle] = useState(''); // Estado para almacenar el título del post.
    const [content, setContent] = useState(''); // Estado para almacenar el contenido del post.

    // Función que maneja el envío del formulario.
    const handleSubmit = async () => {
        // Notificación de éxito cuando se crea un post.
        const postCreated = () => toast.success("Post creado con éxito", {
            style: {
                borderRadius: '10px',
                background: '#138d75', // Color de fondo verde.
                color: '#FFF', // Color de texto blanco.
            },
        });

        // Notificación de error si ocurre un problema al crear el post.
        const errorCreatedPost = () => toast.error("Error al publicar el post", {
            style: {
                borderRadius: '10px',
                background: '#333', // Color de fondo oscuro.
                color: '#fff', // Color de texto blanco.
            },
        });

        // Notificación si algún campo está vacío.
        const fieldsEmpty = () => toast.error("Por favor, completa todos los campos antes de enviar", {
            style: {
                borderRadius: '10px',
                background: '#CD5C5C', // Color de fondo rojo.
                color: '#FFF', // Color de texto blanco.
            },
        });

        // Verifica si alguno de los campos está vacío y muestra la notificación correspondiente.
        if (!username || !title || !content) {
            fieldsEmpty();
            return; // Detiene la ejecución si algún campo está vacío.
        }

        // Realiza una solicitud POST para crear un nuevo post.
        const res = await fetch('/api/posts', {
            method: 'POST', // Método HTTP utilizado (POST).
            body: JSON.stringify({ username, title, content }), // Los datos del formulario se envían en formato JSON.
            headers: {
                'Content-Type': 'application/json', // Establece que el cuerpo de la solicitud es JSON.
            },
        });

        // Si la respuesta es exitosa, muestra la notificación de éxito y limpia los campos del formulario.
        if (res.ok) {
            postCreated();
            setUsername(''); // Limpia el campo de nombre de usuario.
            setTitle(''); // Limpia el campo de título.
            setContent(''); // Limpia el campo de contenido.
        } else {
            errorCreatedPost(); // Muestra la notificación de error si la respuesta no es exitosa.
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            {/* Sección del Formulario */}
            <div className="py-7 px-5 w-[300px] md:w-[600px] xl:w-[750px] bg-slate-700 bg-opacity-80 rounded-xl">
                <div className="flex items-center pb-5 select-none gap-3">
                    <Image src="/Logo.png" alt="wiki_ui_logo" width={70} height={70} />
                    <span className={caveat.className}>
                        <p className="text-[35px] font-bold text-slate-200">
                            Welcome
                        </p>
                    </span>
                </div>
                <h1 className="text-[20px] text-start text-slate-200 select-none">
                    <span className={lexend.className}>
                        Bienvenido a tú Blog!  {"  "} 👋🏻
                    </span>
                </h1>
                <h1 className="text-[13px] text-start text-slate-200 select-none">
                    <span className={lexend.className}>
                        Crea un nuevo Post y empieza la aventura
                    </span>
                </h1>
                <br />
                <label className="pl-1 text-[13px] text-slate-200 uppercase">
                    <span className={lexend.className}>
                        Nombre de Usuario
                    </span>
                </label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                    id="username"
                    name="username"
                    type="text"
                    className="mb-3 mt-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                    placeholder=" Nombre de Usuario"
                />
                <br />
                <label className="pl-1 text-[13px] text-slate-200 uppercase">
                    <span className={lexend.className}>
                        Titulo del Post
                    </span>
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete="off"
                    required
                    id="title"
                    name="title"
                    type="text"
                    className="mb-3 mt-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                    placeholder=" Titulo del Post"
                />
                <br />
                <label className="pl-1 text-[13px] text-slate-200 uppercase">
                    <span className={lexend.className}>
                        Contenido del Post
                    </span>
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    autoComplete="off"
                    required
                    id="content"
                    name="content"
                    className="mb-3 mt-3 w-full rounded-2xl bg-zinc-100 outline-rose-400 px-5 py-3"
                    placeholder=" Contenido del Post"
                />
                <div className="w-full flex p-1 justify-center items-center">
                    <button onClick={handleSubmit} className='mb-3 w-[320px] rounded-lg bg-rose-500 px-5 py-3 font-semibold text-white'>Publicar</button>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
}
