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
    <div className="task flex gap-[10px] justify-between w-[500px] border border-2 border-cyan-800">
      <h3>{task.task}</h3>
      <button
        onClick={() => handleRemove(task.id)}
        className="bg-slate-500 text-white px-[30px]"
      >
        X
      </button>
      <button
        onClick={() => handleUpdate(task.id, "all")}
        className="bg-slate-500 text-white px-[30px]"
      >
        X
      </button>
    </div>
  );
}

// export default Task;
