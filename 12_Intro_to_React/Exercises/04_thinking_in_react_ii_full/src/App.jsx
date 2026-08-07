import { useState } from "react";
import AddToDo from "./components/AddToDo";
import FilterComponent from "./components/FilterComponent";
import ToDoList from "./components/ToDoList";
import Nav from "./components/Nav";

const App = () => {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem("theme")) ?? true);
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [filter, setFilter] = useState("all");

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };
  const toggleDark = () => {
    localStorage.setItem("theme", !isDark);
    setIsDark((prev) => !prev);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed" && todo.completed) return true;
    if (filter === "active" && !todo.completed) return true;
    return false;
  });

  return (
    <div className={`p-4 min-h-screen w-screen dark:bg-slate-600 ${isDark ? "dark" : ""}`}>
      <div className="max-w-3xl mx-auto p-4">
        <Nav isDark={isDark} toggleDark={toggleDark} />
        <AddToDo setTodos={setTodos} />
        <FilterComponent setFilter={setFilter} />
        <ToDoList todos={filteredTodos} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
};

export default App;
