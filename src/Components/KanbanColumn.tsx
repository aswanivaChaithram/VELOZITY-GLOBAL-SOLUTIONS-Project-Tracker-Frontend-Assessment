import type { Task } from "../Type/taskType";
import TaskCard from "./TaskCard";
import DragPlaceholder from "./DragPlaceholder";

type Props = {
  title: string;
  status: Task["status"];
  tasks: Task[];
  dragState: any;
  startDrag: any;
  updateHover: any;
  dropTask: any;
};

const KanbanColumn = ({
  title,
  status,
  tasks,
  dragState,
  startDrag,
  updateHover,
  dropTask,
}: Props) => {
  const isActive = dragState.hoverStatus === status;

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        updateHover(status, tasks.length);
      }}
      onDrop={dropTask}
      className={`flex-1 min-w-[250px] h-full rounded-lg flex flex-col transition
        ${isActive ? "bg-[#333]" : "bg-[#2A2B2E]"}`}
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-600 flex justify-between">
        <span>{title}</span>
        <span className="text-gray-400">{tasks.length}</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {tasks.map((task, index) => {
          const isDragging = dragState.draggedTask?.id === task.id;

          return (
            <div
              key={task.id}
              onDragOver={(e) => {
                e.preventDefault();
                updateHover(status, index);
              }}
            >
              {dragState.hoverIndex === index &&
                dragState.hoverStatus === status && <DragPlaceholder />}

              <TaskCard
                task={task}
                index={index}
                status={status}
                onDragStart={() => startDrag(task, status, index)}
                isDragging={isDragging}
              />
            </div>
          );
        })}

        {dragState.hoverStatus === status &&
          dragState.hoverIndex === tasks.length && <DragPlaceholder />}
      </div>
    </div>
  );
};

export default KanbanColumn;