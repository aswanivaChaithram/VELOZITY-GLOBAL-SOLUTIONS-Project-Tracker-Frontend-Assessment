import { useState } from "react";
import type { Task } from "../Type/taskType";

type DragState = {
  draggedTask: Task | null;
  sourceStatus: Task["status"] | null;
  sourceIndex: number | null;
  hoverStatus: Task["status"] | null;
  hoverIndex: number | null;
};

export const useDragAndDrop = (
  tasks: Task[],
  setTasks: (tasks: Task[]) => void
) => {
  const [dragState, setDragState] = useState<DragState>({
    draggedTask: null,
    sourceStatus: null,
    sourceIndex: null,
    hoverStatus: null,
    hoverIndex: null,
  });

  const startDrag = (
    task: Task,
    status: Task["status"],
    index: number
  ) => {
    setDragState({
      draggedTask: task,
      sourceStatus: status,
      sourceIndex: index,
      hoverStatus: status,
      hoverIndex: index,
    });
  };

  const updateHover = (
    status: Task["status"],
    index: number
  ) => {
    setDragState((prev) => ({
      ...prev,
      hoverStatus: status,
      hoverIndex: index,
    }));
  };

  const dropTask = () => {
    const {
      draggedTask,
      sourceStatus,
      sourceIndex,
      hoverStatus,
      hoverIndex,
    } = dragState;

    if (!draggedTask || hoverIndex === null || !hoverStatus) {
      resetDrag();
      return;
    }

    const updatedTasks = [...tasks];

    // remove from old position
    const sourceTasks = updatedTasks.filter(
      (t) => t.status === sourceStatus
    );

    const [removed] = sourceTasks.splice(sourceIndex!, 1);

    // change status if moved
    removed.status = hoverStatus;

    // insert into new column
    const targetTasks = updatedTasks.filter(
      (t) => t.status === hoverStatus
    );

    targetTasks.splice(hoverIndex, 0, removed);

    // rebuild full list
    const newTasks = updatedTasks
      .filter((t) => t.status !== sourceStatus && t.status !== hoverStatus)
      .concat(sourceTasks, targetTasks);

    setTasks(newTasks);
    resetDrag();
  };

  const resetDrag = () => {
    setDragState({
      draggedTask: null,
      sourceStatus: null,
      sourceIndex: null,
      hoverStatus: null,
      hoverIndex: null,
    });
  };

  return {
    dragState,
    startDrag,
    updateHover,
    dropTask,
    resetDrag,
  };
};