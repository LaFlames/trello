import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../сomponents/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";


export type TaskPropsType = {
    task: TaskType,
    todolistId: string
    removeTask: (taskId: string) => void,
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void,
    changeTaskTitle: (taskId: string, newTitle: string) => void
}


export const Task = React.memo(({task, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {

    const removeTaskHandler = () => removeTask(task.id)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDone ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(task.id, newTitle)

    return <li key={task.id} className={task.status === 2 ? "done" : ""}>
        <Checkbox
            checked={task.status === 2}
            onChange={changeTaskStatusHandler}
            color={"primary"}
        />
        <EditableSpan
            title={task.title}
            onChange={changeTaskTitleHandler}
        />
        <IconButton onClick={removeTaskHandler} disabled={task.status === TaskStatuses.InProgress}>
            <Delete/>
        </IconButton>
    </li>
})