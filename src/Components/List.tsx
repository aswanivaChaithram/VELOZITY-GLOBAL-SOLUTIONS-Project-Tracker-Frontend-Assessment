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

  // Sorting logic
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
    <div className="h-full overflow-auto bg-[#1E1F22] p-4">
      <table className="w-full text-left border-collapse">
        
        {/* Header */}
        <thead className="bg-[#2A2B2E] text-gray-300">
          <tr>
            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("title")}
            >
              Title {sortKey === "title" && (sortOrder === "asc" ? 
                <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>
            )}
            </th>

            <th className="p-3">Assignee</th>

            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("priority")}
            >
              Priority {sortKey === "priority" && (sortOrder === "asc" ? 
                <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>
            )}
            </th>

            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("dueDate")}
            >
              Due Date {sortKey === "dueDate" && (sortOrder === "asc" ?
                 <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>
            )}
            </th>

            <th className="p-3">Status</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {sortedTasks.map(task => (
            <tr
              key={task.id}
              className="border-b border-gray-700 hover:bg-[#2A2B2E]"
            >
              <td className="p-3">{task.title}</td>

              <td className="p-3">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-600 text-xs">
                  {task.assignee}
                </div>
              </td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {task.priority}
                </span>
              </td>

              <td className="p-3">
                <span
                  className={`${
                    new Date(task.dueDate) < new Date()
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  {task.dueDate}
                </span>
              </td>

              {/* Inline Status Dropdown */}
              <td className="p-3 text-gray-300">
                {task.status}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default List;