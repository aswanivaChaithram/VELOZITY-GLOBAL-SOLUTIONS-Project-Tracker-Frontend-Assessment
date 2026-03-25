import { useState } from "react";
import type { Task } from "../Type/taskType";

export const useDragAndDrop = (
  tasks: Task[],
  setTasks: (tasks: Task[]) => void
) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [hoverStatus, setHoverStatus] = useState<Task["status"] | null>(null);

  const startDrag = (task: Task) => {
    setDraggedTask(task);
  };

  const onDragOverColumn = (status: Task["status"]) => {
    setHoverStatus(status);
  };

  const dropTask = (status: Task["status"]) => {
    if (!draggedTask) return;

    const updatedTasks = tasks.map((t) =>
      t.id === draggedTask.id
        ? { ...t, status } // ✅ ONLY update status
        : t
    );

    setTasks(updatedTasks);
    resetDrag();
  };

  const resetDrag = () => {
    setDraggedTask(null);
    setHoverStatus(null);
  };

  return {
    draggedTask,
    hoverStatus,
    startDrag,
    onDragOverColumn,
    dropTask,
    resetDrag,
  };
};