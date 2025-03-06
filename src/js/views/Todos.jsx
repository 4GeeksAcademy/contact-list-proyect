
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";


const initialTask = {
    label: "",
    is_done: false
}

const urlBase = "https://playground.4geeks.com/todo"


const Todos = () => {
    const [task, setTask] = useState(initialTask);
    const [taskList, setTaskList] = useState([]);

    const { store, actions } = useContext(Context);

   
    useEffect(() => {
        setTaskList(store.todos); 
    }, [store.todos]); 

    
    const handleChange = ({ target }) => {
        setTask({
            ...task,
            [target.name]: target.value
        });
    };

   
    const addTask = async (event) => {
        if (event.key === "Enter") {
            
            const result = await actions.addTask(task);
            if (result) {
                setTask(initialTask)
            }

           
        }
    };

    
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${urlBase}/todos/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                
                setTaskList(taskList.filter((item) => item.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Editar una tarea
    const editTask = async (item) => {
        try {
            const response = await fetch(`${urlBase}/todos/${item.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: item.label,
                    is_done: !item.is_done
                })
            });
            if (response.ok) {
                
                setTaskList(
                    taskList.map((task) =>
                        task.id === item.id ? { ...task, is_done: !task.is_done } : task
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-7">
                    <h1>Lista de tareas</h1>
                    <form onSubmit={(event) => event.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Agrega la tarea"
                            className="form-control"
                            name="label"
                            value={task.label}
                            onChange={handleChange}
                            onKeyDown={addTask}
                        />
                    </form>

                    {taskList.length <= 0 ? (
                        <div>No tiene tareas</div>
                    ) : (
                        taskList.map((item) => (
                            <div key={item.id} className="task">
                                {item.label}
                                <span>
                                    <button onClick={() => actions.deleteTask(item.id)}>X</button>

                                    <input
                                        type="checkbox"
                                        checked={item.is_done}
                                        onChange={() => actions.editTask(item)}
                                        className="form-check-input mt-0"
                                    />
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Todos;
