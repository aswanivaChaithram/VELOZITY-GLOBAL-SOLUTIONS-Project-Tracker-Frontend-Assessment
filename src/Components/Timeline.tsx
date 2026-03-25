import type { Task } from "../Type/taskType";

type Props = {
  tasks: Task[];
};

const Timeline = ({ tasks }: Props) => {
  const today = new Date();

  // 🔥 Get all dates from tasks
  const allDates = tasks
    .flatMap((task) => [
      task.startDate ? new Date(task.startDate) : null,
      new Date(task.dueDate),
    ])
    .filter(Boolean) as Date[];

  // 🔥 Min & Max range
  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

  // 🔥 Add buffer days
  minDate.setDate(minDate.getDate() - 2);
  maxDate.setDate(maxDate.getDate() + 2);

  const totalDays =
    Math.ceil(
      (maxDate.getTime() - minDate.getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  // 🔥 Convert date → %
  const getPosition = (date: string) => {
    const d = new Date(date);
    const diff =
      (d.getTime() - minDate.getTime()) /
      (1000 * 60 * 60 * 24);

    return (diff / totalDays) * 100;
  };

  // 🔥 Width calculation (FIXED)
  const getWidth = (start: string, end: string) => {
    const width = getPosition(end) - getPosition(start);
    return Math.max(width, 1.5); // ✅ important fix
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    if (priority === "High") return "bg-red-500";
    if (priority === "Medium") return "bg-yellow-600";
    return "bg-green-500";
  };

  const todayPosition = getPosition(today.toISOString());

  return (
    <div className="h-full overflow-auto bg-[#1E1F22] p-4">
      <div className="min-w-[900px] relative">

        {/* 🔥 Header */}
        <div className="flex border-b border-gray-700 mb-4 text-gray-400 text-xs relative">
          {Array.from({ length: totalDays }).map((_, i) => {
            const day = new Date(minDate);
            day.setDate(day.getDate() + i);

            const left = (i / totalDays) * 100;
            const showMonth = day.getDate() === 1;

            return (
              <div
                key={i}
                className="absolute text-center"
                style={{ left: `${left}%`, transform: "translateX(-50%)" }}
              >
                {showMonth && (
                  <div className="text-[10px] text-gray-500">
                    {day.toLocaleString("default", { month: "short" })}
                  </div>
                )}
                <div>{day.getDate()}</div>
              </div>
            );
          })}
        </div>

        {/* 🔥 Today Line */}
        <div
          className="absolute top-[60px] bottom-0 w-[2px] bg-blue-400 z-10"
          style={{ left: `${todayPosition}%` }}
        />

        {/* 🔥 Tasks */}
        <div className="flex flex-col gap-4 relative">
          {tasks.map((task) => {
            const hasStart = task.startDate;

            const left = hasStart
              ? getPosition(task.startDate!)
              : getPosition(task.dueDate);

            const width = hasStart
              ? getWidth(task.startDate!, task.dueDate)
              : 1.5;

            return (
              <div
                key={task.id}
                className="relative h-10 flex items-center"
              >
                {/* Title */}
                <div className="w-[180px] text-sm text-gray-300 truncate">
                  {task.title}
                </div>

                {/* Timeline */}
                <div className="flex-1 relative h-6 bg-[#2A2B2E] rounded">

                  <div
                    className={`absolute h-6 rounded ${getPriorityColor(
                      task.priority
                    )}`}
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                    }}
                  />

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;