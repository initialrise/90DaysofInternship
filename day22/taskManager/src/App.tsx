import { useState } from "react";
// import Task from "./Task";
import { TaskType } from "./components/Task";
import { TaskContainer } from "./components/TaskContainer";
const defaultTasks: TaskType[] = [
  {
    id: 1,
    task: "This is a task todo",
    status: "todo",
  },
  {
    id: 2,
    task: "This is a task thats being on progress",
    status: "progress",
  },
  {
    id: 3,
    task: "This is a completed task",
    status: "completed",
  },
];

type Status = "all" | "todo" | "progress" | "completed";
function App() {
  const [tasks, setTasks] = useState<TaskType[]>(defaultTasks);
  const [taskView, setTaskView] = useState<Status>("all");
  const [task, setTask] = useState<string>("");

  let listToView;

  // function findListToView:TaskType[]() {
  //   if (taskView == "todo") {
  //     return tasks.filter((task) => task.status == "todo");
  //   } else if (taskView == "progress") {
  //     return tasks.filter((task) => task.status == "progress");
  //   } else if (taskView == "completed") {
  //     return tasks.filter((task) => task.status == "completed");
  //   } else {
  //     return tasks;
  //   }
  // }

  function handleRemove(id: number): void {
    const newTasks = tasks.filter((task) => task.id != id);
    setTasks(newTasks);
  }

  function handleUpdate(id: number, status: Status): void {
    const newTasks = tasks;
    for (const task of newTasks) {
      if (task.id == id) {
        task.status = status;
      }
    }
    setTasks(newTasks);
  }

  function handleAdd(e: any): void {
    console.log(e);
    e.preventDefault();
    const newTask: TaskType = {
      id: Date.now(),
      task: task,
      status: "todo",
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  }
  return (
    <>
      <main className="flex flex-col justify-center items-center gap-[20px]">
        <div className="task-header">
          <h1 className="text-[30px] font-bold">Task List</h1>
        </div>
        <form className="task-input" onSubmit={handleAdd}>
          <input
            className="border border-black"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="border border-black">Add</button>
        </form>
        <div className="taskview-switcher flex gap-[10px] *:border-2 *:border-black *:bg-neutral-400 *:text-white">
          <button onClick={() => setTaskView("all")}>All</button>
          <button onClick={() => setTaskView("todo")}>Todo</button>
          <button onClick={() => setTaskView("progress")}>Progress</button>
          <button onClick={() => setTaskView("completed")}>Completed</button>
        </div>

        <h2>Showing {taskView}</h2>
        <TaskContainer
          tasks={listToView}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
        />
      </main>
    </>
  );
}

export default App;
