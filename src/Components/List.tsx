import { useState, useMemo } from "react";
import type { Task } from "../Type/taskType";

type Props = {
  tasks: Task[];
};

type SortKey = "title" | "priority" | "dueDate";
type SortOrder = "asc" | "desc";

const priorityOrder = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const List = ({ tasks }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Sorting 
  const sortedTasks = useMemo(() => {
    const sorted = [...tasks].sort((a, b) => {
      let valA: any = a[sortKey];
      let valB: any = b[sortKey];

      if (sortKey === "priority") {
        valA = priorityOrder[a.priority];
        valB = priorityOrder[b.priority];
      }

      if (sortKey === "dueDate") {
        valA = new Date(a.dueDate).getTime();
        valB = new Date(b.dueDate).getTime();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [tasks, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="h-full overflow-y-auto  bg-[#1E1F22] p-2 sm:p-4">

      {sortedTasks.length === 0 ? (
  
      <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
        
        <div className="text-lg">No tasks found</div>
        <div className="text-sm text-gray-500">
          Try adjusting your filters
        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded
           text-white text-sm cursor-pointer">
          Clear Filters
        </button>

      </div>
    ) : (
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        
        {/* Header */}
        <thead className="bg-[#2A2B2E] text-gray-300">
          <tr>
            <th className="p-2 sm:p-3 whitespace-nowrap cursor-pointer"
              onClick={() => handleSort("title")} >
              Title {sortKey === "title" && (sortOrder === "asc" ? 
                <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>)}
            </th>

            <th className="p-1 sm:p-3 whitespace-nowrap">Assignee</th>

            <th className="p-2 sm:p-3 whitespace-nowrap cursor-pointer"
              onClick={() => handleSort("priority")} >
              Priority {sortKey === "priority" && (sortOrder === "asc" ? 
                <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>)}
            </th>

            <th className="p-2 sm:p-3 whitespace-nowrap cursor-pointer"
              onClick={() => handleSort("dueDate")}>
              Due Date {sortKey === "dueDate" && (sortOrder === "asc" ?
                 <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>)}
            </th>

            <th className="p-2 sm:p-3 whitespace-nowrap">Status</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {sortedTasks.map(task => (
            <tr key={task.id} className="border-b border-gray-700 hover:bg-[#2A2B2E]">
              <td className="p-2 sm:p-3 max-w-[100px] sm:max-w-none truncate">
                {task.title}
              </td>

              <td className="p-3">
                <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full
                 bg-gray-600 text-[10px] sm:text-xs">
                  {task.assignee}
                </div>
              </td>

              <td className="p-2">
                <span className={`px-1 py-[2px] sm:px-2 sm:py-1 text-[10px] sm:text-xs rounded 
                ${
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                      ? "bg-yellow-600"
                      : "bg-green-500"
                  }`}
                >
                  {task.priority}
                </span>
              </td>

              <td className="p-2 sm:p-3 text-[10px] sm:text-sm whitespace-nowrap">
                <span className={`${
                    new Date(task.dueDate) < new Date()
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  {task.dueDate}
                </span>
              </td>

              <td className="p-2 sm:p-3 text-[12px] sm:text-sm text-gray-300 whitespace-nowrap">
                {task.status}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    )};
    </div>
  );
};

export default List;