import type { Task } from "../Type/taskType";

type Props = {
  task: Task;
  index: number;
  status: Task["status"];
  onDragStart: () => void;
  isDragging: boolean;
};

const assigneeColors: Record<string, string> = {
  AV: "bg-purple-500",
  RK: "bg-blue-500",
  SP: "bg-green-500",
  JD: "bg-yellow-600",
  MK: "bg-pink-500",
  SR: "bg-indigo-500",
};

const priorityStyles: Record<"Low" | "Medium" | "High", string> = {
  Low: "bg-green-600 text-white",
  Medium: "bg-yellow-600",
  High: "bg-red-600 text-white",
};

const TaskCard = ({ task, onDragStart, isDragging }: Props) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`bg-[#1E1F21] p-3 rounded-lg cursor-grab transition 
        ${isDragging ? "opacity-50 shadow-2xl scale-105" : ""}`}
    >
      <p className="font-medium mb-2">{task.title}</p>

      <div className="flex items-center justify-between mb-2">
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs 
          ${assigneeColors[task.assignee]}`}
        >
          {task.assignee}
        </div>

        <span
          className={`text-xs px-2 py-1 rounded 
          ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-300">{task.dueDate}</p>
    </div>
  );
};

export default TaskCard;