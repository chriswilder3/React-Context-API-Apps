import { useContext, createContext } from "react";

export const TodoContext = createContext(
    {
        todoList : [
                    {
                        id : 1,
                        message : "Todo Message",
                        completed : false
                    }
                    // Here We have a list of to do tasks, which
                    // of which have unique ID, message, and toggle property
                    // indicate whether the task is done or not.
                ],
                // But in addition to this List, Since its a context
                // Imagine it a state. We need methods to change the states
                // Hence we need methods to change the todoList
                // Inside the context.

        appendTodoList : (todoTask) => {}, // Its used to add new tasks to the list
                        // Note that it doesnt need ID, since we automatically
                        // generate new ID for each task on creation

        updateTodoList : (id, todoTask) => {},
                        // It updates the todoTask with given ID

        deleteTodoList : (id) => {},

                // The above ones are obvious. But we also need a method
                // to toggle checkbox indicating completion of a todoTask.
                // Why? because, When user clicks on togglebtn, 
                // completed flag must set be set/ unset
                // A special method is dedicated to this operation

        toggleComplete : (id) => {}
                
    }
)


export const useTodo = () => { 
    // A custom hook That returns the whole context to all component
    // That imports it.
    return useContext( TodoContext);
}

export const TodoContextProvider = TodoContext.Provider