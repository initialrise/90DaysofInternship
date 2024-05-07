import { Task, TaskType } from "./Task";

type Status = "all" | "todo" | "progress" | "completed";

export type TaskContainerProps = {
  tasks: TaskType[];
  handleRemove: (id: number) => void;
  handleUpdate: (id: number, status: Status) => void;
};
export function TaskContainer({
  tasks,
  handleRemove,
  handleUpdate,
}: TaskContainerProps) {
  return (
    <div className="tasks-container">
      {tasks.map((task) => (
        <Task
          task={task}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
          key={task.id}
        />
      ))}
    </div>
  );
}
