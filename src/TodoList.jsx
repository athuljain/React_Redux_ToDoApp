// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { addTodo, deleteTodo, editTodo } from "./todoListSlice";
// import "./TodoList.css";

// const TodoList = () => {
//   const [newTodo, setNewTodo] = useState("");
//   const [editingText, setEditingText] = useState("");
//   const [editingTodoId, setEditingTodoId] = useState(null);
//   const todos = useSelector((state) => state.todoList);
//   const dispatch = useDispatch();

//   const handleAddTodo = () => {
//     if (newTodo.trim() !== "") {
//       dispatch(addTodo({ id: Date.now(), text: newTodo }));
//       setNewTodo("");
//     }
//   };

//   const handleDeleteTodo = (id) => {
//     dispatch(deleteTodo(id));
//   };

//   const handleEditTodo = (id, newText) => {
//     dispatch(editTodo({ id, text: newText }));
//     setEditingText("");
//     setEditingTodoId(null);
//   };
  

//   return (
//     <div className="todo-inputcontainer">
//       <div className="todo-input-feild">
//         <input
//           className="todo-input"
//           type="text"
//           placeholder="Add Todo"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//         />
//         <button className="add-btn" onClick={handleAddTodo}>
//           Add
//         </button>
//       </div>
//       <div className="todo-list">
//         <ul className="todo-ul">
//           {todos.map((todo) => (
//             <li className="todo-li" key={todo.id}>
//               {editingTodoId === todo.id ? (
//                 <div>
//                   <input className="input-edit"
//                     type="text"
//                     value={editingText}
//                     onChange={(e) => setEditingText(e.target.value)}
//                   />
//                   <div></div>
//                   <button
//                     className="todo-save-btn"
//                     onClick={() => {
//                       handleEditTodo(todo.id, editingText);
//                     }}
//                   >
//                     Save
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   {todo.id === editingTodoId ? (
//                     <div>{editingText}</div>
//                   ) : (
//                     <div>{todo.text}</div>
//                   )}
//                   <div>
//                   <button
//                     className="todo-edit-btn"
//                     onClick={() => {
//                       setEditingText(todo.text);
//                       setEditingTodoId(todo.id);
//                     }}
//                   >
//                     Edit
//                   </button>
//                   </div>
//                 </div>
//               )}
//               <button
//                 className="todo-delete-btn"
//                 onClick={() => handleDeleteTodo(todo.id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TodoList;

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, deleteTodo, editTodo } from "./todoListSlice";
import { motion, AnimatePresence } from "framer-motion"; 
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

  const handleEditTodo = (id, newText) => {
    dispatch(editTodo({ id, text: newText }));
    setEditingText("");
    setEditingTodoId(null);
  };

  return (
    <div className="todo-wrapper">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="todo-container"
      >
        <h2 className="todo-title">My Tasks</h2>
        
        <div className="todo-input-field">
          <input
            className="todo-input"
            type="text"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <button className="add-btn" onClick={handleAddTodo}>
            Add Task
          </button>
        </div>

        <div className="todo-list">
          <ul className="todo-ul">
            <AnimatePresence mode='popLayout'>
              {todos.map((todo) => (
                <motion.li 
                  layout
                  initial={{ opacity: 0, scale: 0.9, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                  className="todo-li" 
                  key={todo.id}
                >
                  {editingTodoId === todo.id ? (
                    <div className="edit-mode-container">
                      <input 
                        className="input-edit"
                        type="text"
                        autoFocus
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <button className="todo-save-btn" onClick={() => handleEditTodo(todo.id, editingText)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="todo-content">
                      <span className="todo-text">{todo.text}</span>
                      <div className="todo-actions">
                        <button
                          className="todo-edit-btn"
                          onClick={() => {
                            setEditingText(todo.text);
                            setEditingTodoId(todo.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="todo-delete-btn"
                          onClick={() => dispatch(deleteTodo(todo.id))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default TodoList;