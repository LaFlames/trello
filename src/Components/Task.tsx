import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import { TaskType } from "../api/todolists-api";


export type TaskPropsType = {
    task: TaskType,
    todolistId: string
    removeTask: (taskId: string) => void,
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void,
    changeTaskTitle: (taskId: string, newTitle: string) => void
}


export const Task = React.memo(({task, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {

    const removeTaskHandler = () => removeTask(task.id)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDone)
    }
    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(task.id, newTitle)

    return <li key={task.id} className={task.completed ? "done" : ""}>
        <Checkbox
            checked={task.completed}
            onChange={changeTaskStatusHandler}
            color={"primary"}
        />
        <EditableSpan
            title={task.title}
            onChange={changeTaskTitleHandler}
        />
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </li>
})