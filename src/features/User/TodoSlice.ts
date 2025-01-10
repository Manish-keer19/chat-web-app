import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;

  text: string;

  completed: boolean;
}

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos") || '[]'),
};

const todoSlice = createSlice({
  name: "todo",

  initialState,

  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      console.log("action.payload", action.payload);
      state.todos = action.payload;
      localStorage.setItem("todos", JSON.stringify(state.todos));
      console.log("Todo saved in local storage");
    },
  },
});

export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;
