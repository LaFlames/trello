import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {AddBox, Delete} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

export type AddItemPropsType = {
    addItem: (title: string) => void
    disabled?: boolean

}

export const AddItemForm = React.memo(({addItem, disabled}: AddItemPropsType) => {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => { //give only TITLE to parent's callback
        if (title.trim() !== "") {
            addItem(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.charCode === 13) {
            addItemHandler()
        }
    }

    return (
        <div>
            <div>
                <TextField
                    variant={"outlined"}
                    value={title}
                    onChange={onChangeTitleHandler}
                    onKeyPress={onKeyPressAddItemHandler}
                    label={"Title"}
                    error={!!error}
                    helperText={error}
                />
                {/*<input value={title}
                       onChange={onChangeTitleHandler}
                       onKeyPress={onKeyPressAddItemHandler}
                       className={error ? "error" : ""}
                />*/}
                {/*<button onClick={addItemHandler}>+</button>*/}
                <IconButton
                    onClick={ addItemHandler }
                    color={"primary"}
                    disabled={disabled}
                >
                    <AddBox />
                </IconButton>
                {/*{error && <div className="error-message"> {error} </div>}*/}
            </div>
        </div>
    )
})