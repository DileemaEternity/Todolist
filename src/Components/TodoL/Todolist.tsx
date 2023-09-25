import { ChangeEvent } from "react"
import { filterValuesType } from "../../App"
import { AddItemForm } from '../../Components/AddItemForm'
import { EditableSpan } from "../EditableSpan"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  id: string
  removeTask: (id: string, todolistId: string) => void
  tasks: Array<TaskType>
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeFilter: (value: filterValuesType, todolistId: string) => void
  filter: filterValuesType
  changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {



  const onAllClickHandler = () => props.changeFilter('all', props.id)
  const onActiveClickHandler = () => props.changeFilter('active', props.id)
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
  const removeTodoList = () => {
    props.removeTodolist(props.id)
  }

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  const addTask = ((title: string) => {
    props.addTask(title, props.id)
  })

  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {
          props.tasks.map(t => {

            const onRemoveHandler = () => { props.removeTask(t.id, props.id) }
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            }

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(t.id, newValue, props.id)
            }

            return (
              <div key={t.id} className={t.isDone === true ? "is-done" : ''}><Checkbox
                onChange={onChangeStatusHandler}
                checked={t.isDone} />
                <EditableSpan title={t.title}
                  onChange={onChangeTitleHandler} />
                <IconButton onClick={onRemoveHandler}>
                  <Delete />
                </IconButton>
              </div>
            )
          }
          )}
      </div>
      <div>

        <Button variant={props.filter === 'all' ? "contained" : 'text'}
          color={"inherit"}
          onClick={(e) => { onAllClickHandler() }}
        >All</Button>
        <Button color={"primary"}
         onClick={(e) => { onActiveClickHandler() }}
          variant={props.filter === 'active' ? "contained" : 'text'}>Active</Button>
        <Button color={"secondary"} onClick={(e) => { onCompletedClickHandler() }}
          variant={props.filter === 'completed' ? "contained" : 'text'}>Completed</Button>
      </div>
    </div>
  )
}

