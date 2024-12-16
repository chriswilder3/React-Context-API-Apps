import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem( todoTask) {
  // Note that todoTask will be passed to this component by someone else
  // Which we can use further adding logic for UI of one task item.

  // Note that we need to track whether current task
  // is editable or not. Why? Because if the user has ticked it as
  // completed, user shouldnt be able to edit it further( unless he unchecks it)
  const [ isTodoTaskEditable, setIsTodoTaskEditable] = useState( false)
    

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

  const toggleCompleteHandle = () =>{
        // Note this function is handler so that once the
        // user task is done, the the completed flag is toggled for it.
        toggleComplete( todoTask.id);
  }

  return (
    <div
    className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  
        text-black ${ todoTask.completed?  "bg-[#c6e9a7]" : "bg-[#ccbed7]" } `}>
        {/* Note that in above tag, We added dynamic UI part, where depending on
        whether task is done or not, the UI style will change */}
        
        {/* Next we will have a checkbox, whose initial value displayed
        will be derived from the task itself( so that when page loads
        It fetches the tasks completed status)
        And when this checkbox is clicked(toggled), then we should
        change the status of the task, hence call the toggleCompleteHandle */}
        <input type="checkbox"  className=' cursor-pointer'
            checked={ todoTask.completed}
            onChange={ toggleCompleteHandle}
        />

        {/* Next we need to add a input field which is not new text field
        for adding tasks. Instead its for updating the tasks inplace.
        Hence if this task is editable we will show the borders of the
        input otherwise not. Also if task is completed, we need to 
        add strike through. And when its text value changes corresponding
        message in the todoTask must change( which can be done through
        another state method we declated: setTodoMsg).
        And obliviosly When this input loads, what value shoul be in it?
        It must be the todoMsg( that we set earlier). Note that changing
        isTodoTaskEditable is not enough. To make the UI itself editable
        or not, we can use readonly property of input tag. When task
        is editable,readonly should be false. When task is not editable,
        readonly must be true. */}

        <input type="text"  
            
            className={ `border outline-none w-full bg-transparent 
            rounded-lg ${ isTodoTaskEditable? "border-black/10 px-2" : "border-transparent" }
            ${ todoTask.completed? "line-through" : "" }
            `
            }
            value={ todoMsg}
            onChange={ 
                        e => { setTodoMsg(e.target.value)}
                    }
            readOnly={!isTodoTaskEditable}
        />


    </div>
  )
}

export default TodoItem