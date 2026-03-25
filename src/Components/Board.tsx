import { useEffect, useState } from "react";
import type { Task } from "../Type/taskType";
import KanbanColumn from "./KanbanColumn";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

type BoardProps = {
  tasks: Task[];
};

const statusMap = {
  "To Do": "Todo",
  "In Progress": "In-progress",
  "In Review": "In-review",
  "Done": "Done",
} as const;

const Board = ({ tasks }: BoardProps) => {
  // Local state (important for drag updates)
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  // Sync when filters change
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // Drag logic
  const { draggedTask, hoverStatus, startDrag, onDragOverColumn, dropTask } =
  useDragAndDrop(localTasks, setLocalTasks);

  // Group tasks per column
  const getTasksByStatus = (status: Task["status"]) =>
    localTasks.filter((task) => task.status === status);

  return (
    <div className="h-full flex gap-4 overflow-x-auto">
      {Object.entries(statusMap).map(([title, status]) => (
        <KanbanColumn
          key={status}
          title={title}
          status={status}
          tasks={getTasksByStatus(status)}
          draggedTask={draggedTask}
          hoverStatus={hoverStatus}
          startDrag={startDrag}
          onDragOverColumn={onDragOverColumn}
          dropTask={dropTask}
        />
      ))}
    </div>
  );
};

export default Board;