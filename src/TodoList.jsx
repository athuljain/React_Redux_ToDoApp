import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, deleteTodo } from "./todoListSlice";
import "./TodoList.css"

const TodoList = () => {
  const [newTodo, setNewTodo] = useState(""); 
  const todos = useSelector((state) => state.todoList);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo({ id: Date.now(), text: newTodo })); 
    setNewTodo(""); 
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todo-inputcontainer">
        <div className="todo-input-feild" >
        <input 
        className="todo-input"
        type="text"
        placeholder="Add Todo"
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
      />
      <button className="add-btn" onClick={handleAddTodo}>Add</button> {}
      </div>
      <div className="todo-list">
      <ul className="todo-ul">
        {todos.map((todo) => (
          <li className="todo-li" key={todo.id}>
            {todo.text}
            <button className="todo-delete-btn" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
      
    </div>
  );
};

export default TodoList;
