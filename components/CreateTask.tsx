"use client"


import { useState, FormEvent, useEffect } from "react"
import { v4 as uuid } from 'uuid';
import toast from "react-hot-toast"
import { TRELLO_API_KEY, TRELLO_TOKEN } from "@/env";
import axios from "axios"


interface ICreateTask {
    tasks: string | any
    setTasks: (e: any) => void
}

interface ITask {
    id: string,
    name: string,
    idList: string
}

export default function CreateTask({ tasks, setTasks }: ICreateTask) {

    const [task, setTask] = useState<ITask>(() => {
        return {
            id: "",
            name: "",
            idList: "64b79a22591813cf2cc22af6" // can also be inprogress or closed
        }
    })


    console.log(task)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setTasks((prev: any) => {

            if (task.name.length < 3) return toast.error("A tarefa deve ter pelo menos 3 characteres")

            if (task.name.length > 100) return toast.error("A tarefa nao pode ter mais 100 characteres")


            const list = [...prev, task]
            toast.success("Tarefa criada")
            // Guardando as tarefas
            // localStorage.setItem("tasks", JSON.stringify(list))
            // axios.post(`https://api.trello.com/1/cards?idList=64b79a22591813cf2cc22af6&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&name=${task.name}`).then((success) => {

            //     console.log(success)

            // }).catch((error) => {
            //     console.log(error)
            // })
            return list




        })





        setTask({
            id: "",
            name: "",
            idList: "64b79a22591813cf2cc22af6"
        })

    }

    // return (
    //     <div>
    //         <form onSubmit={handleSubmit}>
    //             <input type="text"
    //                 name=""
    //                 id=""
    //                 className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
    //                 value={task.name}
    //                 onChange={(e) => setTask({ ...task, id: uuid(), name: e.target.value })}
    //             />
    //             <button
    //                 className="bg-cyan-500 rounded-md px-4 h-12 text-white "
    //             >Criar</button>
    //         </form>
    //     </div>
    // )
}
