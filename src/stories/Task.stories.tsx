import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Components/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: 'TODOLISTS/Task',
    component: Task
} as Meta;

const  changeTaskStatusCallback = action('Change status clicked')
const  changeTaskTitleCallback = action('Change title clicked')
const  removeTaskCallback = action('Remove task clicked')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: { id: '1', title: 'JS', status: TaskStatuses.New, todoListId: "1", startDate: "",
        deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""},
    todolistId: 'todolistId'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: { id: '2', title: 'Sass', status: TaskStatuses.New, todoListId: "1", startDate: "",
        deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""},
    todolistId: 'todolistId1'
};

