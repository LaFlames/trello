import {ActionsType, removeTodolistAC, TodolistEntityType, todoListsReducer} from './todolist-reducer';
import {v1} from 'uuid';
import {FilterType} from "../../../app/App";
import {TodolistType} from "../../../api/todolists-api";


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistEntityType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    let todolist = {
        id: "string",
        addedDate: "",
        order: 0,
        title: newTodolistTitle
    }

    const endState = todoListsReducer(startState, { type: 'ADD-TODOLIST', todolist })

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action: ActionsType = {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId: todolistId2,
        newTitle: newTodolistTitle
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = "completed";

    const action: ActionsType = {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId: todolistId2,
        newFilterValue: newFilter
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

