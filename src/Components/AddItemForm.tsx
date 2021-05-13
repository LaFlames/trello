import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {AddBox, Delete} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo((props: AddItemPropsType) => {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => { //give only TITLE to parent's callback
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.charCode === 13) {
            addItem()
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
                {/*<button onClick={addItem}>+</button>*/}
                <IconButton
                    onClick={ addItem }
                    color={"primary"}
                >
                    <AddBox />
                </IconButton>
                {/*{error && <div className="error-message"> {error} </div>}*/}
            </div>
        </div>
    )
})