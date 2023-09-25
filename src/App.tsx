import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Components/TodoL/Todolist';
import { v1 } from 'uuid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AddItemForm } from './Components/AddItemForm';
import Paper from '@mui/material/Paper';
import { AuthPage } from './Components/auth/AuthPage';

export type filterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
  id: string
  title: string
  filter: filterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolisId1 = v1()
  let todolisId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolisId1, title: 'what to learn', filter: 'all' },
    { id: todolisId2, title: 'what to buy', filter: 'all' }
  ])

  let [tasksobj, setTasks] = useState<TasksStateType>({
    [todolisId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [todolisId2]: [
      { id: v1(), title: 'Car', isDone: true },
      { id: v1(), title: 'Fruits', isDone: true },
      { id: v1(), title: 'Company', isDone: false }
    ]
  })

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksobj[todolistId]
    let filteredtasks = tasks.filter(t => t.id !== id)
    tasksobj[todolistId] = filteredtasks
    setTasks({ ...tasksobj })
    // if(t.id != id) {
    //   return true
    // }
    // else {
    //   return false
    // }
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksobj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksobj[todolistId] = newTasks
    setTasks({ ...tasksobj })
  }

  function changeStatus(taskId: string,
    isDone: boolean,
    todolistId: string) {
    let tasks = tasksobj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksobj })
    }
  }

  function removeTodolist(todolistId: string) {
    let filteredtodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredtodolist)
    delete tasksobj[todolistId]
    setTasks({ ...tasksobj })
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    let todolist = todolists.find(t => t.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  function changeFilter(value: filterValuesType, todolistId: string) {
    let Todolist = todolists.find(tl => tl.id === todolistId);
    if (Todolist) {
      Todolist.filter = value
      setTodolists([...todolists])
    }
  }


  function changeTaskTitle(taskId: string,
    newTitle: string,
    todolistId: string) {
    // Достаём нужный массив
    let tasks = tasksobj[todolistId]
    // находим нужную таску
    let task = tasks.find(t => t.id === taskId)
    // изменяем её если она нашлась
    if (task) {
      task.title = newTitle
      setTasks({ ...tasksobj })
    }
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists])
    setTasks({
      ...tasksobj,
      [todolist.id]: []
    })
  }

  createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          path="/AuthPage"
          element={<AuthPage />}
        />
      </Route>
    )
  );
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/AuthPage",
          element: <AuthPage />,
        },]
    }
  ])

  return (
    <BrowserRouter basename='/'>
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
            <Routes>
              <Route path="/AuthPage" element={<AuthPage />} />
            </Routes>
          <Link color="inherit" to='/AuthPage'>Login</Link>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={(title: string) => {
            addTodolist(title)
          }} />
        </Grid>
        <Grid container spacing={6}>
          {
            todolists.map((tl) => {

              let tasksForTodolist = tasksobj[tl.id]
              if (tl.filter === 'completed') {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
              }
              if (tl.filter === 'active') {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
              }

              return <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                    removeTodolist={removeTodolist}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
 </BrowserRouter>
  );
}



export default App;
