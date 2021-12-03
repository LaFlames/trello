import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterType,
    removeTodolistAC,
    TodolistEntityType,
    todoListsReducer
} from './todolist-reducer';
import {v1} from 'uuid';


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistEntityType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0, filter: "all", entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0, filter: "all", entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolist = {
        id: "string",
        addedDate: "",
        order: 0,
        title: "New Todolist"
    }

    const endState = todoListsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Todolist");
});

test('correct todolist should change its name', () => {
    let newTitle = "New Todolist";

    const endState = todoListsReducer(startState, changeTodolistTitleAC({todolistId: todolistId2, newTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = "completed";

    const endState = todoListsReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, newFilterValue: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


