import { useState } from "react";

const EditModal = ({ todo, todos, setTodos, setEditView }) => {
  const [todoInput, setTodoInput] = useState(todo.todo);
  const updateTodo = () => {
    let newTodos = todos;
    for (let todoEl of newTodos) {
      if (todoEl.id === todo.id) {
        todoEl.todo = todoInput;
      }
    }
    setTodos(newTodos);
    setEditView(false);
  };
  return (
    <div className="todo flex justify-between w-full items-center bg-todocolor px-[30px] py-[15px] text-primary border-b border-b-secondary">
      <div className="container flex items-center gap-[10px]">
        <input
          type="checkbox"
          className="appearance-none  rounded-full   bg-secondary h-[30px] w-[30px] accent-pink-900 checked:bg-[radial-gradient(circle,_rgba(63,206,251,1)_0%,_rgba(96,40,186,1)_89%)]"
          checked={todo.completed}
          readOnly={true}
        />
        <input
          type="text"
          value={todoInput}
          className="bg-secondary p-[10px] rounded-[10px] w-[82%]"
          onChange={(e) => setTodoInput(e.target.value)}
        />

        {/* <span contentEditable>{todo.todo}</span> */}
      </div>
      <div className="button-group flex">
        <button
          className="text-secondary hover:text-primary"
          onClick={() => updateTodo()}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditModal;
