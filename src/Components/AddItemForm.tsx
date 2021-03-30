import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemPropsType) {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    return (
        <div>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message"> {error} </div>}
            </div>
        </div>
    )
}