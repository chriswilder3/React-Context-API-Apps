import { useState } from 'react'

import './App.css'
import { TodoContextProvider, useTodo } from './contexts/TodoContext'

function App() {
  const [todoList, setToDoList ] = useState([])

  const appendTodoList = ( newTodoTask ) =>{
          const id = Date.now()
          // Note that we already have thing needed to 
          // insert into the todoList(id, newtodoTask), but We cant change it
          // directly since its a state var. Hence we use
          // setToDoList, which can also take a callback
          // That can be used to declare advanced ways of changing
          // state vars. In this technique, the arg to the callback 
          // will the prevState(ie, current val) of the state variable, which we can use
          // futher in the body of the callback.

          setToDoList( (prevTodoList) => {

              // Note that the newTodoTask passed from
              // the component can be in below form. It wont have ID, since
              // ID will be generated in this current funcn.
              //
              // const newTodoTask = 
              //   {
              //     message : msg,
              //     completed : false // Its optional
              //   }

              // Further Note that we will not append at the end, instead
              // We will keep it the top, For this
              // We can use spread operator
              // But we also need to add id to newTodoTask, for this
              // we will use spread operator again
              // Ex : {id :id,...newTodoTask } 

              [ { id: id, ...newTodoTask}, ...prevTodoList]

              // Its essential to leave the above expressoion as it is
              // setter function will assign the above value as new
              // TodoList automatically
              
          })
  }

  return (
    < TodoContextProvider value={{ todoList, appendTodoList, updateTodoList, deleteTodoList, toggleComplete}}>
      <h1 className='text-3xl font-bold'>
        To-do List App
      </h1>
      
    </ TodoContextProvider>
  )
}

export default App
