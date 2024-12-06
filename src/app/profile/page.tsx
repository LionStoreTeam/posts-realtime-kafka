"use client"

import UserImageProfile from "@/app/components/UserImageProfile";
import { geologica } from "@/app/fonts/fonts";
import { useSession } from "next-auth/react";
import { TypeAnimation } from "react-type-animation";
import LogOut from "../components/signOutButton";

function DashboardPage() {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return <div>Loading...</div>;
    }
    return (
        <section className="welcome min-h-screen mt-16 flex flex-col items-center">
            <h1 className="pb-10 text-slate-800 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-semibold">
                <p className="text-pink-500 border-b-2 border-pink-500">
                    <span className={geologica.className}>
                        <TypeAnimation
                            sequence={[
                                "Bienvenido a",
                                2000,
                                "Tú Blog",
                                2000,


                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </span>
                </p>
            </h1>
            <div className="w-[300px] md:w-[600px] xl:w-[750px] bg-pink-600 bg-opacity-10 p-10 rounded-xl flex flex-col justify-center items-center text-center gap-8">
                <UserImageProfile />
                <h1 className="">
                    <span className="text-[20px] text-slate-600 font-bold">Nombre:</span> <br />{" "}
                    <p className="text-[30px] text-pink-500 font-bold">
                        {session?.user?.name}
                    </p>
                </h1>
                <div className="">
                    <LogOut />
                </div>
            </div>
        </section>
    );
}

export default DashboardPage;
