// components/LoginButton.tsx
"use client"
import Link from 'next/link';
import { AiTwotoneMail } from "react-icons/ai";


export default function LoginButton() {
    return (
        <div className="flex gap-2">
            <Link href="/auth/login" className="p-2 font-semibold text-pink-400 rounded-xl bg-pink-50 bg-opacity-40 hover:bg-pink-100 transition-all ease-in duration-200 cursor-pointer">
                <AiTwotoneMail
                    className='w-[27px] h-[27px]'
                />
            </Link>
        </div>
    );
}
