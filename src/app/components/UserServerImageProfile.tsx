import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";


import React from 'react'

export default async function UserServerImageProfile() {
    const session = await getServerSession();
    // Función para generar la imagen de perfil con las iniciales
    const getInitialsImage = (name: string) => {
        if (!name) return null;
        const initials = name
            .split(' ')
            .slice(0, 2) // Obtener las dos primeras palabras (si existen)
            .map(word => word.charAt(0).toUpperCase()) // Obtener la primera letra de cada palabra
            .join(''); // Unir las letras

        return (
            <div
                className="w-8 h-8 flex items-center justify-center bg-slate-700 border-2 border-pink-200 text-white rounded-full text-lg"
                style={{ fontSize: '16px' }}
            >
                <Link href="/profile">
                    {initials}
                </Link>
            </div>
        );
    };
    return (
        <>
            {/* Imagen de perfil */}
            <div className="">
                {session?.user?.image ? (
                    <Link href="/profile">
                        <Image
                            src={session.user.image}
                            alt="User profile"
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    </Link>
                ) : (
                    getInitialsImage(session?.user?.name || "")
                )}
            </div>
        </>
    );
}
