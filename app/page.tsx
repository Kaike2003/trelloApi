"use client"

import CreateTask from "@/components/CreateTask"
import ListTasks from "@/components/ListTasks"
import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TRELLO_API_KEY, TRELLO_TOKEN } from "@/env";
import axios from "axios"
import HeaderBoard from "@/components/HeaderBoard"


export default function Home() {

  const [tasks, setTasks] = useState<any>(() => {
    return []
  })

  useEffect(() => {



    async function Fetch() {

      const response = await axios.get(`https://api.trello.com/1/boards/64bfce01a766d5a8767ad767/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`)
      setTasks((value: any) => {
        return value = response.data
      })

    }

    Fetch()

  }, [])


  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <HeaderBoard />
      <div className="bg-slate-100
       w-screen
        h-full 
        flex flex-col items-center
         pt-6
          gap-16
           p-3
           ">
        {/* <CreateTask
          tasks={tasks}
          setTasks={setTasks}
        /> */}
        <ListTasks
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
    </DndProvider>
  )
}
