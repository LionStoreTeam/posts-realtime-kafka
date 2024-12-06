"use client" // Indica que este componente es un componente del lado del cliente (client-side), lo que permite usar hooks y otros recursos que solo funcionan en el navegador.

import Image from 'next/image'; // Importa el componente 'Image' de Next.js para optimizar las imágenes.
import { caveat, lexend } from './fonts/fonts';
import { useSession } from "next-auth/react";
import Link from 'next/link';

export default function NewPost() {
  const { data: session } = useSession();


  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      {/* Sección del Formulario */}
      <div className="flex flex-col justify-center items-center py-7 px-5 w-[300px] md:w-[600px] xl:w-[750px] bg-slate-700 bg-opacity-80 rounded-xl">
        <div className="flex items-center pb-5 select-none gap-3">
          <Image src="/Logo.png" alt="wiki_ui_logo" width={70} height={70} />
          <span className={caveat.className}>
            <p className="text-[35px] font-bold text-slate-200">
              Welcome
            </p>
          </span>
        </div>
        <h1 className="text-[20px] text-center text-slate-200 select-none">
          <span className={lexend.className}>
            Bienvenido a tú Blog!  {"  "} 👋🏻
          </span>
        </h1>
        <h1 className="pt-3 text-[15px] text-center text-slate-200 select-none">
          <span className={lexend.className}>
            Crea un nuevo Post y empieza la aventura
          </span>
        </h1>
        <div className="w-full flex mt-10 p-1 justify-center items-center text-center">
          {session && (
            <Link
              href="/new"
              className='mb-3 w-[320px] rounded-xl bg-rose-500 px-5 py-3 font-semibold text-white border-2 border-slate-400 opacity-70 hover:opacity-100 ease-linear duration-300'>Comenzar a publicar</Link>
          )}
          {!session && (
            <Link
              href="/auth/login"
              className='mb-3 w-[320px] rounded-xl bg-white px-5 py-3 font-semibold text-slate-700 border-2 border-pink-700 opacity-70 hover:opacity-100 ease-linear duration-300'>Inicia sesión para publicar</Link>
          )}
        </div>
      </div>
    </div>
  );
}
