"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }: {
    link: {
        url: string;
        title: string;
    }
}) => {
    const pathName = usePathname();
    return (
        <Link
            className={`text-white font-medium hover:text-pink-200 hover:border-b hover:border-pink-500 cursor-pointer transition-all ease-in duration-200 && ${pathName == link.url}`}
            href={link.url}
        >
            {link.title}
        </Link>
    );
};

export default NavLink;
