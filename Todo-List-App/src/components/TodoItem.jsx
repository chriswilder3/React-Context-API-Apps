import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem( todoTask) {
  // Note that todoTask will be passed to this component by someone else
  // Which we can use further adding logic for UI of one task item.

  // Note that we need to track whether current task
  // is editable or not. Why? Because if the user has ticked it as
  // completed, user shouldnt be able to edit it further( unless he unchecks it)
  const [ isTodoTaskEditable, setIsTodoTaskEditable] = useState( false)
    // It can be attached to tick btn intuitively.

  // We also need to track which the message that must be 
  // displayed to the user, ( for the task.)
  // Obviously its value is initialized from todoTask arg passed.
  const [todoMsg, setTodoMsg] = todoTask.message

  // Now lets fetch methods to change the todoList values.
  const { updateTodoList, deleteTodoList, toggleComplete }  = useTodo

  const editableBtnHandle = () => {
        // As written in App.jsx, we need to pass the id of task
        // and todoTask( with the new updated message in it )
        updateTodoList( todoTask.id, { ...todoTask, message : todoMsg})

        // After the edit is done we need to declare this task is not
        // editable after the update.
        setIsTodoTaskEditable( false)
        // Who sets it to true in the first place? the toggle btn
  }

  const toggleCompleteBtnHandle = () =>{
        // Note this function is handler so that once the
        // user task is done, the the completed flag is toggled for it.
        toggleComplete( todoTask.id);
  }

  return (
    <div
    className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  
        text-black ${ todoTask.complete?  "bg-[#c6e9a7]" : "bg-[#ccbed7]" } `}>
        // Note that in above tag, We added dynamic UI part, where depending on
        // whether task is done or not, the UI style will change
        
    </div>
  )
}

export default TodoItem