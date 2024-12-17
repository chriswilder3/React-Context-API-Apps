import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoForm() {
  // Note that we need to track the current task that was added by the
  // Form as well. This todoTask is bind to the input of the form.
  // Note that it actually holds a string that is task message.
  // Hence its initialized with a ''
  const [todoMsg, setTodoMsg] = useState('')
  
  // Now to add this task to the todoList in the context, we need 
  // its method
  const {appendTodoList} = useTodo()

  // Wheneve some related trigger like button for adding task is clicked
  // We need to get the value that resides currently in todoMsg
  // and add it to the main todoList via addtodoList

  const handleAddTaskBtn = (e) =>{
    e.preventDefault()
    
    // Now check whether val exists in todoMsg before adding
    if(! todoMsg) return
    else{
        appendTodoList(
            {   message : todoMsg, 
                completed : False
            }
        );
        // After adding the task to the list
        // We need to clear the input to "" empty string so that new things
        // can be put.

        setTodoMsg(" ")
    }
  }

  return (
    <div>
        <form action="" onSubmit={handleAddTaskBtn} className='flex'>
            <input type="text" name="task" id="task" 
              placeholder=' Write To-do Task.... '
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            // Like We said earlier, We need to link this input field with
            // todoTask State. For this, lets set the task to the value of
            // this field whenver it changes.
             onChange={ (e) => { setTodoMsg( e.target.value)}}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
              onClick={handleAddTaskBtn}>
                Add Task
            </button>
        </form>
    </div>
  )
}

export default TodoForm