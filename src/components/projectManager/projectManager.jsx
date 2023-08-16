import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../todo/todo";
import { EditTodoForm } from "../editTodoForm/editTodoForm";
import { TodoForm } from './../todoForm/todoForm';
import { addTodoDB, deleteTodoDB, editTaskDB, getTodosDB, toggleCompleteDB } from './../../services/primitives';


export const ProjectManager = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = async (todo) => {
    let key = uuidv4()
    setTodos([
      ...todos,
      { id: key, userId: 1,task: todo, completed: false, isEditing: false },
    ]);
   
    let data = { id: key, userId: 1, task: todo, completed: false, isEditing: false }
    await addTodoDB(data)
   // await toggleComplete(key)
   
  }

  const deleteTodo = async (id) =>{ 
 
    setTodos(todos.filter((todo) => todo.id !== id));
    await deleteTodoDB(id) 
  }

  const toggleComplete = async (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    await toggleCompleteDB(id) 
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = async (task, id) => {
   try{
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
    await editTaskDB(task, id)
  }
  catch(error){
    alert(error.message)
  }
  };
  const useLoaderData = async ()=>{
    let data = await getTodosDB()
    if(data.length >0){
      setTodos(data)
    }
  }
  
  useEffect(() => {
     useLoaderData()
  }, [])
  

  return (
    <div className="TodoWrapper">

      <h1>Lista de proyectos</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <>
          {console.log("contenido del todo ",todo)}
          <Todo
            
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
          </>
        )
      )}
    </div>
  );
};
