import prisma from "@/lib/prisma";
import UserServerImageProfile from "../components/UserServerImageProfile";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentDots } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { PiMedal } from "react-icons/pi";


export default async function Posts() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen flex flex-col gap-5 items-center text-center">
            <div className="min-h-screen bg-[#fafaff] py-10 px-2 flex flex-col items-center gap-3 w-[330px] sm:w-[600px] xl:w-[800px] sm:px-10 xl:px-20">

                <h1 className="text-[25px] text-slate-800 font-extrabold mb-5">Posts Publicados</h1>
                {posts.map((post) => (
                    <div key={post.id} className="w-full p-2 flex flex-col bg-white rounded-xl xl:p-4">
                        {/* Owner */}
                        <div className="px-3 flex flex-row justify-between items-center">
                            <div className="flex gap-2 justify-center items-center">
                                <UserServerImageProfile />
                                <span className="text-black text-[13px] font-bold">{post.username}</span>
                            </div>

                            <div className="py-1 px-3 bg-pink-700 text-white rounded-3xl">
                                <div className="">
                                    <p>Follow +</p>
                                </div>
                            </div>
                        </div>
                        {/* Content */}
                        <div className="my-10">
                            <h2 className="pb-5 text-2xl font-bold text-black">
                                <span className="">
                                    {post.title}
                                </span>
                            </h2>
                            <p className="text-[16px] font-normal">
                                <span className="text-slate-400">
                                    {post.content}
                                </span>
                            </p>
                        </div>
                        {/* Interactions */}
                        <div className="p-2 flex gap-2 justify-start items-start">
                            <div className="p-1 flex gap-2 bg-slate-50 rounded-xl border border-slate-200">
                                <TbArrowBigUp className="text-slate-600" />
                                <p className="text-slate-600 text-[13px] font-bold">
                                    87
                                </p>
                                <TbArrowBigDown className="text-slate-600" />
                            </div>
                            <div className="py-1 px-3 flex gap-2 bg-slate-50 rounded-xl border border-slate-200">
                                <FaRegCommentDots className="text-slate-600" />
                                <p className="text-slate-600 text-[13px] font-bold">
                                    20
                                </p>
                            </div>
                            <div className="py-1 px-3 flex gap-2 bg-slate-50 rounded-xl border border-slate-200">
                                <PiShareFatLight className="text-slate-600" />
                                <p className="text-slate-600 text-[13px] font-bold">
                                    Share
                                </p>
                            </div>
                            <div className="py-1 px-3 flex gap-2 bg-slate-50 rounded-xl border border-slate-200">
                                <PiMedal className="text-slate-600" />
                            </div>
                        </div>
                        {/* Timestamp */}
                        <div className="mt-5 flex gap-2 justify-center items-center">
                            <p className="text-slate-400 text-[13px] font-normal">
                                Fecha de Creación:{" "}
                                <span>
                                    {new Date(post.createdAt).toLocaleString()}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
