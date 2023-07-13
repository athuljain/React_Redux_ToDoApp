import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todoIndex = state.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state[todoIndex].text = text;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
