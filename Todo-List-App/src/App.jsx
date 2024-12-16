import { useEffect, useState } from 'react'

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

  const toggleComplete = ( id ) => {
      setToDoList( (prevTodoList) =>{
          prevTodoList.map( (task) =>{
             if(task.id == id){
               return {...task, completed: !task.completed}
             }
             else{
              return task;
             }
          })
      })
  }
  // IMP : Make sure not to modify any element directly inside any of these
  // functions, ex : even task element must be not stored and then changed
  // ex : const temp = task
  //      temp['completed'] = false
  //      return temp;
  // Its wrong. 
  // Why? Because it violated React state immulatabilty.
  // Note that even task is part of state(so saying task[a] = b)
  // without the use of setter is wrong.

  // Hence best practice is to use single stmt returns in setters.
  
  
  // React components lose their state when the page is reloaded, 
  // as the state only exists in memory during the component's lifecycle.

  // By saving the todoList to localStorage and reloading it when the 
  // app starts, the todoList can persist even if the user refreshes 
  // the page or closes and reopens the browser. Hence
  // We need to save the todoList to memory when changing, but first
  // We need to load it as well from the localstorage when app starts

  // lets first creating loading one.
  useEffect( () =>{
    const todoListFromMemory = JSON.parse(localStorage.getItem('todoList'))
    if( todoListFromMemory && todoListFromMemory.length > 0){
      // if to do list exists in memory and its size > 0(ie its not empty)
      // We will set it as the val of todoList state
      setToDoList( todoListFromMemory);
    }
  }, [])

  // Note that we need to save whenevever the state ie, todoList updates
  // But we cant do it in the prev useEffect which is reserved to run
  // only once per load. 

  // Hence lets have another useEffect
  useEffect( () =>{
    localStorage.setItem('todoList', JSON.stringify(todoList));
    
  }, [ todoList])

  return (
    < TodoContextProvider value={{ todoList, appendTodoList, updateTodoList, deleteTodoList, toggleComplete}}>
      <h1 className='text-3xl font-bold'>
        To-do List App
      </h1>
      
    </ TodoContextProvider>
  )
}

export default App
