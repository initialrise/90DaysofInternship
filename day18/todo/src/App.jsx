import { useState } from "react";
import Todo from "./components/Todo";

function App() {
  const defaultTodos = [
    {
      id: 1,
      todo: "Add some todo",
      completed: false,
    },
    {
      id: 2,
      todo: "Add more todo",
      completed: true,
    },
  ];
  const [theme, setTheme] = useState("dark");
  const [todos, setTodos] = useState(defaultTodos);
  const [todoInput, setTodoInput] = useState("");

  let remainingItems = 0;
  for (let i of todos) {
    if (!i.completed) {
      remainingItems++;
    }
  }

  const handleClear = () => {
    let newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: todos.length + 1,
      todo: todoInput,
      completed: false,
    };
    setTodoInput("");
    setTodos([...todos, newItem]);
  };
  return (
    <main className="flex flex-col items-center bg-[#161722] h-screen text-white font-josefin text-[18px] gap-[20px] ">
      <div className="bgimg bg-main w-full h-[300px] bg-cover absolute"></div>
      <div className="text-container flex flex-col gap-[20px] z-10 mt-[50px]">
        <h1 className="text-primary text-[60px] font-jersey tracking-[8px]">
          TODO
        </h1>
        <form className="todo-input" onSubmit={handleSubmit}>
          <input
            type="text"
            name="todo"
            id="todo"
            className="bg-todocolor w-[500px] px-[30px] py-[15px] text-primary"
            placeholder="Add Todo"
            onChange={(e) => setTodoInput(e.target.value)}
            value={todoInput}
          />
        </form>
        <div className="todo-container flex flex-col items-center w-[500px] rounded-t-2xl bg">
          {todos.map((todoItem) => (
            <Todo
              todoItem={todoItem}
              key={todoItem.id}
              handleTodo={setTodos}
              todos={todos}
            />
          ))}
        </div>
        <div className="utils flex justify-between bg-todocolor text-primary px-[30px] py-[15px]">
          <span>{remainingItems} items left</span>
          <button onClick={handleClear}>Clear Completed</button>
        </div>
      </div>
    </main>
  );
}

export default App;
