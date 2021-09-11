import React, {useEffect, useState} from 'react'
import { todolistsApi } from '../api/todolists-api'

export default {
   title: 'API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
       todolistsApi.getTodolists()
            .then(res => {
                setState(res.data)
            })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    let [title, setTitle] = useState<any>(""); 


   const addTodolistOnClick = () => {
        if (title) {
            todolistsApi.createTodolist(title)
                .then(res => {
                    setState(res.data)
                })
            setTitle("")
        }
   }

   return <div> 
       {JSON.stringify(state)}
       <div>
           <input type="text" placeholder={"todo title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}} />
           <button onClick={addTodolistOnClick}>Add</button>
       </div>
    </div>
}

export const DeleteTodolist = () => {

   const [state, setState] = useState<any>(null)
   let [todoId, setTodoId] = useState<any>(""); 


   const deleteTodolistOnClick = () => {
        if (todoId) {
            todolistsApi.deleteTodolist(todoId)
                .then( (res) => {
                    setState(res.data);
                })
            setTodoId("")
        }
   }

   return <div> 
       {JSON.stringify(state)}
       <div>
           <input type="text" placeholder={"todo id"} value={todoId} onChange={(e) => {setTodoId(e.currentTarget.value)}} />
           <button onClick={deleteTodolistOnClick}>Delete</button>
       </div>
    </div>
}

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)

   let [todoId, setTodoId] = useState<any>(""); 
   let [title, setTitle] = useState<any>(""); 

   const updateTodolistOnClick = () => {
        if (todoId && title) {
            todolistsApi.changeTodolistTitle(todoId, title)
                .then( (res) => {
                    setState(res.data);
                })
            setTodoId("")
            setTitle("")
        }
   }

   return <div> 
       {JSON.stringify(state)}
       <div>
           <input type="text" placeholder={"todo id"} value={todoId} onChange={(e) => {setTodoId(e.currentTarget.value)}} />
           <input type="text" placeholder={"new todo title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}} />
           <button onClick={updateTodolistOnClick}>Update</button>
       </div>
    </div>
}






export const GetTasks = () => {

    const [state, setState] = useState<any>(null)
    let [todoId, setTodoId] = useState<string>(""); 


    const getTasksOnClick = () => {
        if (todoId) {
            todolistsApi.getTasks(todoId)
                .then( (res) => {
                    setState(res.data);
                })
            setTodoId("")
        }
   }

   return <div> 
       {JSON.stringify(state)}
       <div>
           <input type="text" placeholder={"todo id"} value={todoId} onChange={(e) => {setTodoId(e.currentTarget.value)}} />
           <button onClick={getTasksOnClick}>Get tasks</button>
       </div>
    </div>
}

export const CreateTasks = () => {

    const [state, setState] = useState<any>(null)
  
    let [todoId, setTodoId] = useState<any>(""); 
    let [title, setTitle] = useState<any>(""); 

    const addTaskOnClick = () => {
        if (todoId && title) {
            todolistsApi.createTask(todoId, title)
                .then(res => {
                    setState(res.data.data)
                })
            setTodoId("")
            setTitle("")
        }
   }

    return <div> 
       {JSON.stringify(state)}
       <div>
           <input type="text" placeholder={"todo id"} value={todoId} onChange={(e) => {setTodoId(e.currentTarget.value)}} />
           <input type="text" placeholder={"task title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}} />
           <button onClick={addTaskOnClick}>Add task</button>
       </div>
    </div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    let [todoId, setTodoId] = useState<any>('')
    let [taskId, setTaskId] = useState<any>('')
 
    const deleteTaskOnClick = () => {
        if (todoId && taskId) {
            todolistsApi.deleteTask(todoId, taskId)
                .then(res => {
                    setState(res.data)
                })
            setTodoId("")
            setTaskId("")
        }
   }

    return <div> 
       {JSON.stringify(state)}
       <div>
           <input type="text" placeholder={"todo id"} value={todoId} onChange={(e) => {setTodoId(e.currentTarget.value)}} />
           <input type="text" placeholder={"task id"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}} />
           <button onClick={deleteTaskOnClick}>Delete task</button>
       </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);

    let [todoId, setTodoId] = useState<any>('')
    let [taskId, setTaskId] = useState<any>('')
    let [title, setTitle] = useState<any>(""); 

    const properties = {
        title,
        description: "",
        status: 0,
        priority: 0,
        startDate: "",
        deadline: ""
    };
 
    const deleteTaskOnClick = () => {
        if (todoId && taskId && title) {
            todolistsApi.updateTask(todoId, taskId, properties)
                .then(res => {
                    setState(res.data)
                })
            setTodoId("")
            setTaskId("")
            setTitle("")
        }
   }

    return <div> 
       {JSON.stringify(state)}
       <div>
           <input type="text" placeholder={"todo id"} value={todoId} onChange={(e) => {setTodoId(e.currentTarget.value)}} />
           <input type="text" placeholder={"task id"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}} />
           <input type="text" placeholder={"new title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}} />
           <button onClick={deleteTaskOnClick}>Update task</button>
       </div>
    </div>
}
