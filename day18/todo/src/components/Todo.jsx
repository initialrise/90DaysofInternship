import { useState } from "react";
import EditModal from "./EditModal";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

const Todo = ({ todoItem, handleTodo, todos }) => {
  const [todo, setTodo] = useState(todoItem);
  const [editView, setEditView] = useState(false);
  const changeTodoStatus = () => {
    // const tempTodo = todo;
    // tempTodo.completed = !todo.completed;
    // setTodo(tempTodo);
    // let newTodos = todos.filter((todoEl) => todoEl.id != todo.id);
    // newTodos = [...newTodos, tempTodo];
    console.log("todo status changing");
    let newTodos = [...todos];
    // console.log(newTodos);
    for (let todoEL of newTodos) {
      if (todo.id == todoEL.id) {
        todo.completed = !todo.completed;
      }
    }
    // let index = todo.id - 1;
    // newTodos[index].completed = !todo.completed;
    handleTodo(newTodos);
  };

  const removeTodo = () => {
    const todoID = todo.id;
    const newTodos = todos.filter((todo) => todo.id != todoID);
    handleTodo(newTodos);
  };
  return (
    <>
      {editView ? (
        <EditModal
          todo={todo}
          todos={todos}
          setTodos={handleTodo}
          setEditView={setEditView}
        />
      ) : (
        <div className="todo flex justify-between w-full items-center bg-todocolor px-[30px] py-[15px] text-primary border-b border-b-secondary">
          <div className="container flex items-center gap-[10px]">
            <div className="checkbox-container flex items-center justify-center">
              <input
                type="checkbox"
                className="relative peer appearance-none  rounded-full   bg-secondary h-[30px] w-[30px] accent-pink-900 checked:bg-[radial-gradient(circle,_rgba(63,206,251,1)_0%,_rgba(96,40,186,1)_89%)]"
                checked={todo.completed}
                onChange={changeTodoStatus}
              />
              <svg
                className="absolute w-4 h-4 mt-1 hidden peer-checked:block pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span
              className={`${todo.completed && "line-through text-secondary"}`}
            >
              {todo.todo}
            </span>
          </div>
          <div className="button-group flex gap-[8px]">
            <button
              className="text-red-500  text-secondary hover:text-primary font-jersey"
              title="Edit Todo"
              onClick={() => setEditView(!editView)}
            >
              <FaPencil />
            </button>
            <button
              className="text-red-500   text-secondary hover:text-primary font-jersey"
              title="Remove Todo"
              onClick={removeTodo}
            >
              <FaRegTrashCan />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Todo;
