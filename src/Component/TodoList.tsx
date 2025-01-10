import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEdit, MdClose } from "react-icons/md";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../features/User/TodoSlice";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const todosData = useSelector((state: any) => state.Todo.todos);

  const [todos, SetTodos] = useState<Todo[]>(todosData);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      SetTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
    }
    console.log("todos is ", todos);
    dispatch(setTodos(todos));
    setInputValue("");
  };

  const handleDeleteTodo = (id: number) => {
    SetTodos(todos.filter((todo) => todo.id !== id));
    dispatch(setTodos(todos));
  };

  const handleToggleTodo = (id: number) => {
    SetTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    dispatch(setTodos(todos));
  };

  const handleEditTodo = (id: number, newText: string) => {
    SetTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    dispatch(setTodos(todos));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#1B2838] p-4 sm:p-6 md:p-8 flex flex-col items-center ">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white text-center"
        >
          Manage Your Todos
        </motion.h1>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
            placeholder="Write Todo..."
            className="flex-1 p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-[#2A3F5F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddTodo}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm sm:text-base"
          >
            Add
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md space-y-2 sm:space-y-3"
        >
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-[#3B4B69] bg-opacity-50 backdrop-blur-sm shadow-lg"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              <span
                className={`flex-1 text-white text-sm sm:text-base ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const newText = prompt("Edit todo:", todo.text);
                  if (newText) handleEditTodo(todo.id, newText);
                }}
                className="p-1.5 sm:p-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                <MdEdit size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDeleteTodo(todo.id)}
                className="p-1.5 sm:p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <MdClose size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default TodoList;
