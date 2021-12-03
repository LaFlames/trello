import {addTodolistAC, TodolistEntityType, todoListsReducer} from "./todolist-reducer";
import {tasksReducer, TaskStateType} from "./Task/tasks-reducer";
import {action} from "@storybook/addon-actions";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistEntityType> = [];

    const todolist = {
        id: "string",
        addedDate: "",
        order: 0,
        title: "New Todolist"
    }

    const endTasksState = tasksReducer(startTasksState, addTodolistAC(todolist))
    const endTodolistsState = todoListsReducer(startTodolistsState, addTodolistAC(todolist))

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(todolist.id);
    expect(idFromTodolists).toBe(todolist.id);
});

