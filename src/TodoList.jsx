import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, deleteTodo, editTodo } from "./todoListSlice";
import "./TodoList.css";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editingText, setEditingText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const todos = useSelector((state) => state.todoList);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo({ id: Date.now(), text: newTodo }));
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id, newText) => {
    dispatch(editTodo({ id, text: newText }));
    setEditingText("");
    setEditingTodoId(null);
  };
  

  return (
    <div className="todo-inputcontainer">
      <div className="todo-input-feild">
        <input
          className="todo-input"
          type="text"
          placeholder="Add Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <div className="todo-list">
        <ul className="todo-ul">
          {todos.map((todo) => (
            <li className="todo-li" key={todo.id}>
              {editingTodoId === todo.id ? (
                <div>
                  <input className="input-edit"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div></div>
                  <button
                    className="todo-save-btn"
                    onClick={() => {
                      handleEditTodo(todo.id, editingText);
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {todo.id === editingTodoId ? (
                    <div>{editingText}</div>
                  ) : (
                    <div>{todo.text}</div>
                  )}
                  <div>
                  <button
                    className="todo-edit-btn"
                    onClick={() => {
                      setEditingText(todo.text);
                      setEditingTodoId(todo.id);
                    }}
                  >
                    Edit
                  </button>
                  </div>
                </div>
              )}
              <button
                className="todo-delete-btn"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
