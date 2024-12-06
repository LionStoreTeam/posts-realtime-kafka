"use client"
import { signOut } from 'next-auth/react'

const LogOut = () => {
    return (
        <div className="px-4 py-2 rounded-sm bg-white text-pink-400 font-bold hover:bg-slate-200 cursor-pointer duration-300">
            <button onClick={() => signOut()}>Cerrar sesión</button>
        </div>
    );
}

export default LogOut;