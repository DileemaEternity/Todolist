import IconButton from '@mui/material/IconButton';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = ((e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    })

    const onkeyPressHandler = ((e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    })

    let addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
         <TextField
           label={'debugger | console.log ?'}
           variant={'outlined'}
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onkeyPressHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTask} color={'primary'} ><ControlPointIcon /></IconButton>
        </div>
        }