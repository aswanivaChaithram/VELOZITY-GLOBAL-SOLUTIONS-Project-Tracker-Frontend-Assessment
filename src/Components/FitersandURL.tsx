import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../Type/taskType";

const FitersandURL = ({ onFilter }: { onFilter: (tasks: Task[]) => void }) => {
  const { tasks } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState<string[]>(
    searchParams.get("status")?.split(",") || []
  );
  const [priority, setPriority] = useState<string[]>(
    searchParams.get("priority")?.split(",") || []
  );
  const [assignee, setAssignee] = useState<string[]>(
    searchParams.get("assignee")?.split(",") || []
  );
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // URL Sync
  useEffect(() => {
    const params: any = {};

    if (status.length) params.status = status.join(",");
    if (priority.length) params.priority = priority.join(",");
    if (assignee.length) params.assignee = assignee.join(",");
    if (from) params.from = from;
    if (to) params.to = to;

    setSearchParams(params);
  }, [status, priority, assignee, from, to, setSearchParams]);

  // Filter Logic
  useEffect(() => {
    const filtered: Task[] = tasks.filter((task) => {
      if (status.length && !status.includes(task.status)) return false;
      if (priority.length && !priority.includes(task.priority)) return false;
      if (assignee.length && !assignee.includes(task.assignee)) return false;
      if (from && new Date(task.dueDate) < new Date(from)) return false;
      if (to && new Date(task.dueDate) > new Date(to)) return false;

      return true;
    });

    onFilter(filtered);
  }, [tasks, status, priority, assignee, from, to, onFilter]);

  const toggle = (value: string, list: string[], setList: any) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearFilters = () => {
    setStatus([]);
    setPriority([]);
    setAssignee([]);
    setFrom("");
    setTo("");
  };

  const hasFilters =
    status.length || priority.length || assignee.length || from || to;

  // Dropdown Component
  const Dropdown = ({ label, options, selected, setSelected, color }: any) => (
    <div className="relative">
      <button onClick={() => setOpenDropdown(openDropdown === label ? null : label) }
        className="px-3 py-1 bg-[#1E1F21] text-gray-300 rounded cursor-pointer">
          {label} <i className="fa-solid fa-angle-down"></i>
      </button>

      {openDropdown === label && (
        <div className="absolute mt-2 bg-[#2A2B2E] border border-gray-700 rounded p-2 z-10">
          {options.map((opt: string) => (
            <div key={opt} onClick={() => toggle(opt, selected, setSelected)}
              className={`px-3 py-1 rounded mb-1 text-sm cursor-pointer 
                ${ selected.includes(opt) ? 
                  `${color} text-white` : "text-gray-400 hover:bg-[#1E1F21]" }`}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-[#2A2B2E] p-4 flex flex-wrap gap-3 items-center border-b border-gray-700">

      <Dropdown label="Status"
        options={["Todo", "In-progress", "In-review", "Done"]}
        selected={status} setSelected={setStatus} color="bg-blue-600"/>

      <Dropdown label="Priority" options={["Low", "Medium", "High"]}
        selected={priority} setSelected={setPriority} color="bg-green-600"/>

      <Dropdown label="Assignee" options={["AV", "RK", "SP", "JD", "MK", "SR"]}
        selected={assignee} setSelected={setAssignee} color="bg-purple-600"/>

      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
        className="bg-[#1E1F21] text-gray-300 px-2 py-1 rounded"/>

      <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
        className="bg-[#1E1F21] text-gray-300 px-2 py-1 rounded"/>

      {hasFilters && (
        <button onClick={clearFilters}
          className="ml-auto px-4 py-1 bg-red-600 text-white rounded cursor-pointer">
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FitersandURL;