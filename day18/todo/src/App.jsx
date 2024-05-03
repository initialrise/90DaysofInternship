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
  // const [theme, setTheme] = useState("dark");
  const [todos, setTodos] = useState(defaultTodos);
  const [todoInput, setTodoInput] = useState("");
  const [todoView, setTodoView] = useState("all");

  const todosCompleted = todos.filter((todo) => todo.completed);
  const todosActive = todos.filter((todo) => !todo.completed);

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

    if (todoInput.length > 1) {
      const newItem = {
        id: todos.length + 1,
        todo: todoInput,
        completed: false,
      };
      setTodoInput("");
      setTodos([...todos, newItem]);
    }
  };
  return (
    <main className="flex flex-1 flex-col items-center bg-[#161722] min-h-screen text-white font-josefin text-[18px] gap-[20px] ">
      <div className="bgimg bg-main w-full h-[300px] bg-cover absolute"></div>
      <div className="text-container flex flex-col gap-[20px] z-10 mt-[50px]">
        <h1 className="text-primary text-[60px] font-jersey tracking-[8px]">
          TODO
        </h1>
        <form className="todo-input flex bg-todocolor " onSubmit={handleSubmit}>
          <input
            type="text"
            name="todo"
            id="todo"
            className="bg-todocolor w-[400px] px-[30px] py-[15px] text-primary peer"
            placeholder="Add Todo"
            onChange={(e) => setTodoInput(e.target.value)}
            value={todoInput}
            required
          />
          <button className="hidden peer-focus:block peer-valid:block peer w-[95px] ml-[5px] bg-todocolor add-button align-middle py-[15px] text-secondary hover:text-primary text-center">
            Add
          </button>
        </form>
        <div className="todo-container flex flex-col items-center w-[500px] rounded-t-2xl bg">
          {todoView === "all" &&
            todos.map((todoItem) => (
              <Todo
                todoItem={todoItem}
                key={todoItem.id}
                handleTodo={setTodos}
                todos={todos}
              />
            ))}

          {todoView === "active" &&
            todosActive.map((todoItem) => (
              <Todo
                todoItem={todoItem}
                key={todoItem.id}
                handleTodo={setTodos}
                todos={todos}
              />
            ))}

          {todoView === "completed" &&
            todosCompleted.map((todoItem) => (
              <Todo
                todoItem={todoItem}
                key={todoItem.id}
                handleTodo={setTodos}
                todos={todos}
              />
            ))}
        </div>
        <div className="utils flex justify-between bg-todocolor text-primary px-[30px] py-[15px] text-[15px]">
          <span>
            {remainingItems > 1
              ? `${remainingItems} items`
              : `${remainingItems} item`}{" "}
            left
          </span>
          <div className="button-group flex gap-[10px] text-secondary">
            <button
              className={`${todoView === "all" && "text-primary"}`}
              onClick={() => setTodoView("all")}
            >
              All
            </button>
            <button
              className={`${todoView === "active" && "text-primary"}`}
              onClick={() => setTodoView("active")}
            >
              Active
            </button>
            <button
              className={`${todoView === "completed" && "text-primary"}`}
              onClick={() => setTodoView("completed")}
            >
              Completed
            </button>
          </div>
          <button onClick={handleClear}>Clear Completed</button>
        </div>
      </div>
    </main>
  );
}

export default App;
