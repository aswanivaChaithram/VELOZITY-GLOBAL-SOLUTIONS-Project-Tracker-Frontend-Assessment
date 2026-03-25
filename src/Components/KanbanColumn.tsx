import type { Task } from "../Type/taskType";
import TaskCard from "./TaskCard";

type Props = {
  title: string;
  status: Task["status"];
  tasks: Task[];
  draggedTask: Task | null;
  hoverStatus: Task["status"] | null;
  startDrag: (task: Task) => void;
  onDragOverColumn: (status: Task["status"]) => void;
  dropTask: (status: Task["status"]) => void;
};

const KanbanColumn = ({
  title,
  status,
  tasks,
  draggedTask,
  hoverStatus,
  startDrag,
  onDragOverColumn,
  dropTask,
}: Props) => {
  const isActive = hoverStatus === status;

  return (
    <div onDragOver={(e) => { e.preventDefault();
        onDragOverColumn(status); }} onDrop={() => dropTask(status)}
      className={`flex-1 min-w-[250px] h-full rounded-lg flex flex-col transition
        ${isActive ? "bg-[#333]" : "bg-[#2A2B2E]"}`} >

      {/* Header */}
      <div className="p-3 border-b border-gray-600 flex justify-between">
        <span>{title}</span>
        <span className="text-gray-400">{tasks.length}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {tasks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm 
            border border-dashed border-gray-600 rounded-lg p-4 text-center">
            No tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDragStart={() => startDrag(task)}
              isDragging={draggedTask?.id === task.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;