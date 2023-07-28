
import { useState, useEffect, FC, } from "react"
import { MinusCircle, MoreHorizontal, ArrowDown } from 'lucide-react';
import toast from "react-hot-toast"
import { useDrag, useDrop } from "react-dnd";
import { TRELLO_API_KEY, TRELLO_TOKEN } from "@/env";
import axios from "axios"
import Option from "./Option";




interface ICreateTask {
    tasks: string | any
    setTasks: (e: any) => void
}

type ITask = {
    id: string,
    name: string,
    idList: "64b79a2279af55b4e2adeeb2" | "64b79a22591813cf2cc22af6" | "64b79a227a3a8a7d1bab00df"
}

type TSection = {
    listaTarefas?: {
        id?: string,
        idBoard?: string
        name?: string
        pos?: number
        softLimit?: null
        status?: null
        subscribed?: false
    }
    tasks: any
    setTasks: any
    todos: any
    closed: any

}

type THeader = {
    text: string | undefined,
    bg: string,
    listaId: string | undefined
    count: number
}

type TTask = {
    task: any
    tasks: any
    setTasks: any
    id: string | number
}




export default function ListTasks({ tasks, setTasks }: ICreateTask) {


    const [listaTarefas, setListaTarefas] = useState<any>([])

    useEffect(() => {


        async function Fetch() {
            const response = await axios.get(`https://api.trello.com/1/boards/64bfce01a766d5a8767ad767/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`)
            const newData = response.data
            setListaTarefas((value: any) => {
                return value = newData
            })



        }

        Fetch()

    }, [tasks])


    const statusesListaTarefas = listaTarefas


    return (
        <div className="w-full overflow-auto ">

            <div className="flex gap-10 w-56">
                {statusesListaTarefas.map(({
                    id,
                    idBoard,
                    name,
                    pos,
                    softLimit,
                    status,
                    subscribed,
                }: { id: string, idBoard: string, name: string, pos: number, softLimit: null, status: null, subscribed: false }, index: number) => {
                    return <Section
                        todos={() => { }}
                        key={index}
                        listaTarefas={
                            {
                                id: id,
                                idBoard: idBoard,
                                name: name,
                                pos: pos,
                                softLimit: softLimit,
                                status: status,
                                subscribed: subscribed
                            }}
                        tasks={tasks}
                        setTasks={setTasks}
                        closed={closed}
                    />
                })}
            </div>
        </div>
    )
}


const Section: FC<TSection> = ({
    setTasks,
    tasks,
    listaTarefas,
    todos }) => {

    const [tarefas, setTarefas] = useState<any>([])
    const [tarefaListId, setTarefasListId] = useState<any>([])

    const [nomeTarefa, setNomeTarefa] = useState(() => {
        return { tarefa: "" }
    })


    const solutions = [
        {
            name: 'Insights',
            description: 'Measure actions your users take',
            href: '##',
        },
        {
            name: 'Automations',
            description: 'Create your own targeted content',
            href: '##',
        },
        {
            name: 'Reports',
            description: 'Keep track of your growth',
            href: '##',
        },
    ]

    useEffect(() => {

        async function Fetch() {

            const response = await axios.get(`https://api.trello.com/1/boards/64bfce01a766d5a8767ad767/cards?key=5511fdecf841ef59bea4f33d3beb4a9e&token=ATTA3cb2d77250ccf319eabc00041f60a6e7c8bf1c3b9b178085a62db6434c3f006a21920B7A`)

            const newData = response.data
            setTarefas(newData)

            const responseListId = await axios.get(`https://api.trello.com/1/boards/64bfce01a766d5a8767ad767/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`)
            const newDataListId = responseListId.data
            setTarefasListId((value: any) => {
                return value = newDataListId
            })



        }

        Fetch()

    }, [nomeTarefa.tarefa, tasks, todos])



    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: ({ id }: any) => addItemToSection(id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text: string | undefined
    let bg = "bg-slate-500"
    let tasksToMap = todos
    let listaId: string | undefined


    if (listaTarefas?.id === listaTarefas?.id) {
        text = listaTarefas?.name
        listaId = listaTarefas?.id
        tasksToMap = tarefas.filter(({ idList }: ITask) => idList === listaTarefas?.id)
    }


    const addItemToSection = (id: string | number) => {

        setTasks((prev: any) => {

            const mTasks = prev.map((t: any) => {
                if (t.id === id) {

                    console.log(id)
                    console.log("Id da lista", listaId)

                    axios.put(`https://api.trello.com/1/cards/${t.shortLink}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&idList=${t.idList}`).then((success) => {
                        console.log(success)
                    }).catch((error) => {
                        console.log(error)
                    })

                    console.log("Valor de t", t)


                    return { ...t, idList: listaId }
                }




                return t
            })

            localStorage.setItem("tasks", JSON.stringify(mTasks))

            setTasks(mTasks)

            toast.success("Estado da tarefa alterado")

            return mTasks
        })



    }

    return (
        <div
            ref={drop}
            className={`
            w-[18rem] rounded-md p-2 bg-red-400
            pb-96
             ${isOver ? "bg-slate-200" : ""}
             cursor-grab
             `}>
            <Header
                text={text}
                listaId={listaId}
                bg={bg}
                count={tasksToMap.length}
            />
            {tasksToMap.map(({ name, id }: { name: string, id: number | string }) => {
                return <Task
                    key={id}
                    task={name}
                    id={id}
                    tasks={tasks}
                    setTasks={setTasks}
                />
            })}
            <div
                className={`mt-3 mb-3`}
            >

            </div>

            {tarefaListId.map(({ name, id }: { name: string, id: number | string, idList: string }) => {

                if (name === text) {

                    return (
                        <>



                            <input
                                className="
                w-[18rem]
                inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
    focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
    disabled:cursor-not-allowed"
                                type="text"
                                value={nomeTarefa.tarefa}
                                onChange={(e) => {


                                    setNomeTarefa(() => {
                                        return { tarefa: e.target.value }
                                    })



                                }}
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        axios.post(`https://api.trello.com/1/cards?idList=${id}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&name=${nomeTarefa.tarefa}`).then((success) => {
                                            // console.log(success)
                                            localStorage.setItem("tasks", JSON.stringify(success))
                                        }).catch((error) => {
                                            console.log(error)
                                        })

                                        nomeTarefa.tarefa = ""

                                    }




                                }}

                                placeholder="Add uma tarefa e click enter"
                            />

                        </>
                    )
                }






            })}

        </div>
    )
}

const Header: FC<THeader> = ({ text, bg, count, listaId }) => {



    return (
        <div
            className={`${bg}
        w-[18rem] 
         flex items-center justify-between h-10 pl-4 rounded-md lowercase text-sm text-white
          border border-transparent bg-slate-400 px-4 py-2font-medium hover:bg-slate-500 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                    disabled:cursor-not-allowed"
        `}>
            <div className={` flex items-center`}   >
                {text}
                <div className={`
            ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center
            `}>{count}
                </div>
            </div>

            <div>


                <div>
                    <button
                        className="ps-4"
                        onClick={(e) => {

                        }}
                    >
                        <MinusCircle size={18} />
                    </button>

                    <button
                    >
                        <Option />
                    </button>
                </div>



            </div>
        </div>
    )
}

const Task: FC<TTask> = ({ setTasks, task, id, tasks }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    console.log(isDragging)


    const handleRemove = (id: string | number) => {


        setTasks((prev: any) => {

            const mTasks = prev.map((t: any) => {
                if (t.id === id) {

                    console.log(id)

                    axios.delete(`https://api.trello.com/1/cards/${t.shortLink}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`).then((success) => {
                        console.log(success)
                    }).catch((error) => {
                        console.log(error)

                    })

                    return { ...t }
                }



                return t
            })


            setTasks(mTasks)

            return mTasks
        })


        // console.log(id)
        const fTasks = tasks.filter((t: { id: string | number }) => t.id !== id)
        localStorage.setItem("tasks", JSON.stringify(fTasks))
        setTasks(fTasks)

        toast("Tarefa excluida", { icon: "☠" })
    }

    return (
        <div
            ref={drag}
            className={`relative p-4 mt-3 shadow-md 
            w-[18rem] 
         flex items-center justify-between h-10 pl-4 rounded-md lowercase text-sm text-white
          border border-transparent bg-slate-500 px-4 py-2font-medium hover:bg-slate-500 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                    disabled:cursor-not-allowed"
            
            cursor-grab 
            ${isDragging ? "opacity-25" : "opacity-100"}`}>
            <p>{task}</p>
            <div
                className=" flex items-center justify-between"
            >
                <button
                    className=" text-slate-400"
                    onClick={(e) => handleRemove(id)}
                >
                    <MinusCircle size={18}
                        color="white"
                    />
                </button>


            </div>
        </div>
    )
}