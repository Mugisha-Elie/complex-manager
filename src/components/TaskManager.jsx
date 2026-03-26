import {useState} from "react"

export default function TaskManager(){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLocked ,setIsLocked] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [timer, setTimer] = useState(null)

    function handleAddTask(){
        if(isLocked){
            setError("Cannot add task while system is locked!!!");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage('');

        setTimer(setTimeout(() => {
            setItems(items => [...items, `Task ${items.length + 1}`]);
            setLoading(false);
            setSuccessMessage("Task addedd successfully");
        }, 1000))
    }


    function handleClearAll(){
        if(isLocked){
            setError("Cannot clear tasks while system is locked!!!");
            return;
        }

        clearTimeout(timer)
        setItems([]);
        setError(null);
        setSuccessMessage('')
    }


    return (
        <div>
            <h1>Task Manager</h1>

            {isLocked && <h2 style={{color: "red"}}>SYSTEM LOCKED</h2>}

            <button
            onClick={handleAddTask}
            >Add Task</button>

            <button
            onClick={handleClearAll}
            >Clear All</button>
            
            <button
            onClick={() => setIsLocked(prevValue => !prevValue)}
            >
                {isLocked ? "Unlock" : "Lock System"}
            </button>

            {loading && <p>Loading...</p>}
            {error && <p style={{color: "red"}}>Error: {error}</p>}
            {successMessage && <p style={{color: "green"}}>{successMessage}</p>}


            <ul>
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    )
}