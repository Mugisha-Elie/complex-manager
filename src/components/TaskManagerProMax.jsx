import { useReducer } from "react"

const initialState = {
    items: [],
    loading: false,
    error: null,
    isLocked: false,
    successMessage: ""
}

function taskReducer(state, action){
    switch(action.type){
        case 'START_ADDING':
            return{
                ...state,
                loading: true,
                error: null,
                successMessage: ''
            }

        case 'ADD_SUCCESS':
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload],
                successMessage: `Task added successfully`,
            }

        case 'ADD_ERROR':
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case 'LOCKDOWN':
            return{
                ...state,
                isLocked: !state.isLocked,
                successMessage: '',
                error: null
            }

        case 'CLEAR_ALL':
            return {
                ...state,
                items: [],
                successMessage: 'All tasks cleared!',
                error: null 
            }

        default: return state
    }   
}

export default function TaskManagerProMax(){
    const [state, dispatch] = useReducer(taskReducer, initialState)
    function handleAddTask(){
        if(state.isLocked){
            dispatch({type: 'ADD_ERROR', payload: 'System is locked'});
            return;
        }

        dispatch({type: 'START_ADDING'})

        setTimeout(() => {
            const newTask = `Task ${state.items.length + 1}`;
            dispatch({type: 'ADD_SUCCESS', payload: newTask})
        }, 1000)
    }

    function handleLockdown(){
        dispatch({type: 'LOCKDOWN'})
    }

    function handleClearAll(){
        if (state.isLocked) {
        dispatch({ type: 'ADD_ERROR', payload: 'System is locked! Cannot clear.' });
        return;
    }
        dispatch({type: 'CLEAR_ALL'})
    }


    return (
        <div>
            <h1>Task Manager</h1>

            {state.isLocked && <h2 style={{color: "red"}}>SYSTEM LOCKED</h2>}

            <button
            onClick={handleAddTask}
            >Add Task</button>

            <button
            onClick={handleClearAll}
            >Clear All</button>
            
            <button
            onClick={handleLockdown}
            >
                {state.isLocked ? "Unlock" : "Lock System"}
            </button>

            {state.loading && <p>Loading...</p>}
            {state.error && <p style={{color: "red"}}>Error: {state.error}</p>}
            {state.successMessage && <p style={{color: "green"}}>{state.successMessage}</p>}


            <ul>
                {state.items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    )
}