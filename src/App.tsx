import React, {useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import { v1 } from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed"
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}
type TaskStateType = {
    [key: string]: TaskType[]
}



function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistId1, title: "Music", filter: "all" },
        { id: todolistId2, title: "What to learn", filter: "all" }
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "Rap", isDone: true},
            {id: v1(), title: "Pop", isDone: false},
            {id: v1(), title: "Punk-rock", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ]
    })

    /*let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "Redux", isDone: false}
    ])*/

    let changeFilter = (value: FilterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    let removeTask = (taskId: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != taskId)
        setTasks({...tasks})
    }
    let addTask = (taskTitle: string, todolistId: string) => {
        let newTask = { id: v1(), title: taskTitle, isDone: false }
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    let changeStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = newIsDone
            setTasks({...tasks})
        }
    }
    let removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    let addTodolist = (todolistTitle: string) => {
        let todolist: TodolistType = {
            id: v1(),
            title: todolistTitle,
            filter: "all"
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={ addTodolist }  />

            { todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                }

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}

                />
            }) }
        </div>
    );
}

export default App;
