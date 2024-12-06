"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import NavLink from "./NavLinks";
import UserImageProfile from "./UserImageProfile";


const links = [
    { id: 1, url: "/new", title: "Inicio", },
    { id: 2, url: "/posts", title: "All Posts", },
];

const Navbar = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const pathname = usePathname(); // Usamos usePathname para obtener la ruta actual


    // Cada vez que la ruta cambie, cerramos el menú
    useEffect(() => {
        setOpen(false); // Cerrar el menú cuando cambie la ruta
    }, [pathname]); // Dependencia en pathname

    const topVariants = {
        closed: {
            rotate: 0,
            backgroundColor: "rgb(255, 230, 255)",
        },
        opened: {
            rotate: 45,
            backgroundColor: "rgb(255,255,255)",
        },
    };

    const centerVariants = {
        closed: {
            opacity: 1,
            backgroundColor: "rgb(255, 230, 255)",
        },
        opened: {
            opacity: 0,
        },
    };

    const bottomVariants = {
        closed: {
            rotate: 1,
            backgroundColor: "rgb(255, 230, 255)",
        },
        opened: {
            rotate: -45,
            backgroundColor: "rgb(255,255,255)",
        },
    };

    const listVariants = {
        closed: {
            x: "100vw",
            opacity: 0, // Hacer el menú invisible cuando está cerrado
        },
        opened: {
            x: 0,
            opacity: 1, // Mostrar el menú cuando está abierto
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const listItemVariants = {
        closed: {
            x: -10,
            opacity: 0, // Hacer los elementos invisibles cuando el menú está cerrado

        },
        opened: {
            x: 0,
            opacity: 1, // Hacer los elementos visibles cuando el menú está abierto
        },
    };

    return (
        <div className="w-full flex justify-around items-center h-[7rem] px-4 bg-black bg-opacity-80">
            {/* LINKS */}
            <div className="hidden md:flex gap-4 justify-center items-center">
                {/* Logo */}
                <Link href="/" className="pr-8">
                    <Image src="/Logo.png" alt="wiki_ui_logo" width={70} height={70} priority />
                </Link>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex md:gap-7'>
                    {links.map((link) => (
                        <NavLink link={link} key={link.id} />
                    ))}
                </ul>
            </div>
            {/* LOGO */}
            <div className="md:hidden lg:hidden xl:hidden xl:w-1/3 xl:justify-center">
                <Link href="/" className="pr-8 relative">
                    <Image src="/Logo.png" alt="" width={70} height={70} />
                </Link>
            </div>
            {/* LOGIN/REGISTER */}
            {
                session && (
                    <div className="flex gap-4 items-center">
                        <UserImageProfile />
                    </div>
                )}
            {!session && (
                <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:gap-4">
                    <h1 className="text-white font-medium">Inicia Sesión:</h1>
                    <LoginButton />
                </div>
            )}

            {/* RESPONSIVE MENU */}
            <div className="md:hidden flex justify-between items-center">
                {/* MENU BUTTON */}
                <button
                    className="w-10 h-8 flex flex-col justify-between z-50 relative"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <motion.div
                        variants={topVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-10 h-1 rounded origin-left"
                    ></motion.div>
                    <motion.div
                        variants={centerVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-10 h-1 rounded"
                    ></motion.div>
                    <motion.div
                        variants={bottomVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-10 h-1 rounded origin-left"
                    ></motion.div>
                </button>
                {/* MENU LIST */}
                {open && (
                    <motion.div
                        variants={listVariants}
                        initial="closed"
                        animate={open ? "opened" : "closed"}
                        className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40"
                    >
                        {links.map((link) => (
                            <motion.div
                                variants={listItemVariants}
                                key={link.id}
                            >
                                <Link href={link.url}>{link.title}</Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
