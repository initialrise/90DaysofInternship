import { useState } from "react";

const Todo = ({ todoItem, handleTodo, todos }) => {
  const [todo, setTodo] = useState(todoItem);
  const changeTodoStatus = () => {
    // const tempTodo = todo;
    // tempTodo.completed = !todo.completed;
    // setTodo(tempTodo);
    // let newTodos = todos.filter((todoEl) => todoEl.id != todo.id);
    // newTodos = [...newTodos, tempTodo];
    let newTodos = [...todos];
    let index = todo.id - 1;
    console.log(newTodos[index]);
    newTodos[index].completed = !todo.completed;
    handleTodo(newTodos);
  };

  const removeTodo = () => {
    const todoID = todo.id;
    const newTodos = todos.filter((todo) => todo.id != todoID);
    handleTodo(newTodos);
  };
  return (
    <div className="todo flex justify-between w-full items-center bg-todocolor px-[30px] py-[15px] text-primary border-b border-b-secondary">
      <div className="container flex items-center gap-[10px]">
        <input
          type="checkbox"
          className="appearance-none  rounded-full   bg-secondary h-[30px] w-[30px] accent-pink-900 checked:bg-[radial-gradient(circle,_rgba(63,206,251,1)_0%,_rgba(96,40,186,1)_89%)]"
          checked={todo.completed}
          onChange={changeTodoStatus}
        />
        <span className={`${todo.completed && "line-through text-secondary"}`}>
          {todo.todo}
        </span>
      </div>
      <button
        className="text-red-500 text-[25px] w-[30px] h-[30px] text-secondary hover:text-primary font-jersey"
        onClick={removeTodo}
      >
        X
      </button>
    </div>
  );
};
export default Todo;
