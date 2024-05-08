export interface TaskType {
  id: number;
  task: string;
  status: string;
}
type Status = "all" | "todo" | "progress" | "completed";

type TaskProps = {
  task: TaskType;
  handleRemove: (id: number) => void;
  handleUpdate: (id: number, status: Status) => void;
};

export function Task({ task, handleRemove, handleUpdate }: TaskProps) {
  return (
    <div className="task flex gap-[10px] justify-between w-[500px]  border-2 border-cyan-800">
      <h3>{task.task}</h3>

      <div className="button-group *:border-2">
        <button
          onClick={() => handleRemove(task.id)}
          className="bg-slate-500 text-white px-[30px]"
        >
          X
        </button>

        <select
          onChange={(e) => handleUpdate(task.id, e.target.value as Status)}
        >
          <option value="todo">TODO</option>
          <option value="completed">Completed</option>
          <option value="progress">Progress</option>
        </select>
      </div>
    </div>
  );
}

// export default Task;
