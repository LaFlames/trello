import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC, UpdateTaskDomainPropertiesType} from './tasks-reducer';
import {removeTodolistAC} from "../todolist-reducer";
import {TaskStateType} from "../../../../app/App";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";




test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "JS",status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "milk",status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ]
    };

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "JS",status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ]
    });

});

test('correct task should be added to correct array', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "JS",status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "milk",status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ]
    };

    const action = addTaskAC({ id: "3", title: "tea", status: TaskStatuses.Completed, todoListId: "todolistId2", startDate: "",
        deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("tea");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.Completed);
})

test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "JS",status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low,description: "" },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "milk",status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ]
    };

    const properties: UpdateTaskDomainPropertiesType = {
        status: TaskStatuses.InProgress
    }

    const action = updateTaskAC("2", properties, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.InProgress);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "JS",status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "milk",status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ]
    };

    const properties: UpdateTaskDomainPropertiesType = {
        title: "Eyy"
    }

    const action = updateTaskAC("2", properties, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Eyy");
    expect(endState["todolistId1"][1].title).toBe("JS");
});



test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "JS",status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "2", title: "milk",status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});










