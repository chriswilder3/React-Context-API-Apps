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

  const updateTodoList = (id, updatedTask) => {
      setToDoList( (prevTodoList) =>{
        // It works similar as before. But we need to find the exact task
        // in the list first. Looping is best for this.
        prevTodoList.map( (task) =>{
            if(task.id === id){
              // Look at the current syntax of map() on chatgpt pdf map and react.
                return {id:id, ...updatedTask};
                // We update this particular task with new data, 
                // ie, JS object with new message and the same id 
            }
            else {
              return task;
              // other wise keep as it is
            } 
          // We can also define conditional ?: to do the same above
          // (task) => task.id===id ? {id:id, ...updatedTask}: task

        })
      })
  }

  const deleteTodoList = ( id ) => {
      setToDoList( (prevTodoList) => {
         // We can apply the same forloop/map here
         // But filter is the best for this.
         prevTodoList.filter( (task) =>{
            
            // For filter functions, on each element, we need to 
            // return a boolean val, depending on which
            // it will either be included or not included.

            return (!(task.id === id))  
              // For each task in the list, if it's ID
            // not equal to given id then include it. otherwise dont.
            // using !== also works here.
         })
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
