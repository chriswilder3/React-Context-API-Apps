import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoForm() {
  // Note that we need to track the current task that was added by the
  // Form as well. This todoTask is bind to the input of the form.
  // Note that it actually holds a string that is task message.
  const [todoTask, setTodoTask] = useState('')
  
  // Now to add this task to the todoList in the context, we need 
  // its method
  const {appendTodoList} = useTodo()

  // Wheneve some related trigger like button for adding task is clicked
  // We need to get the value that resides currently in todoTask
  // and add it to the main todoList via addtodoList

  const handleAddBtn = (e) =>{
    e.preventDefault()
    
    // Now check whether val exists in todoTask before adding
    if(! todoTask) return
    else{
        appendTodoList(
            {   todoTask, 
                completed : False
            }
        );
        // After adding the task to the list
        // We need to clear the input to "" empty string so that new things
        // can be put.

        setTodoTask(" ")
    }
  }

  return (
    <div>TodoForm</div>
  )
}

export default TodoForm