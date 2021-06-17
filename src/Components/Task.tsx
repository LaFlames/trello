import React, {ChangeEvent} from "react";

import {TaskType} from "../AppWithRedux";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";


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

    return <li key={task.id} className={task.isDone ? "done" : ""}>
        <Checkbox
            checked={task.isDone}
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