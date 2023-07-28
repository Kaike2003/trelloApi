import { useModalStore } from "@/store/ModalStore";
import { Inter } from "next/font/google"
import { useState } from "react";

const inter = Inter({ weight: ["500"], subsets: ["latin"] })

export default function Header() {

    const [openModal] = useModalStore((state) => [
        state.openModal
    ])

    return (
        <div className={`
        bg-stone-300
        w-full
        h-auto
        px-10
        py-5
        flex
        items-center
        justify-between
        `}
        >
            <h1
                className={`
            text-xl
            ${inter.className}
            `}
            >Meu quadro</h1>
            <button onClick={openModal}>
                <p className={`
                text-lg
                ${inter.className}
                `}>Adicionar lista de tarefa</p>
            </button>
        </div>
    )
}

