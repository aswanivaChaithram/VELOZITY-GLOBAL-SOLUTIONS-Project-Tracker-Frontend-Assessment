import { useState } from "react";
import Board from "../Components/Board";
import FitersandURL from "../Components/FitersandURL";
import type { Task } from "../Type/taskType";
import List from "../Components/List";
import Timeline from "../Components/Timeline";

type ViewType = "board" | "list" | "timeline";

const Tasks = () => {
  const [activeView, setActiveView] = useState<ViewType>("board");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  return (
    <div className="flex h-[calc(100vh-130px)]">

      {/******** SIDEBAR ********/}
      <div className={`${ isSidebarOpen ? "w-[240px]" : "w-[57px]" } 
        bg-[#151618] p-4 flex flex-col transition-all duration-300`}>

        <div className="mb-6 text-xl text-gray-300 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <i className="fa-solid fa-bars"></i>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-300 mb-3">
            {isSidebarOpen && (
              <>
                <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400 text-xs">
                  <i className="fa-solid fa-check"></i>
                </div>
                <span className="font-semibold">My Tasks</span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 ml-2">
            {isSidebarOpen && (
              <>
                <button onClick={() => setActiveView("board")}
                  className={`px-3 py-2 rounded-md font-semibold cursor-pointer 
                    ${ activeView === "board" ? 
                        "bg-[#2A2B2E] text-white" : "text-gray-400" }`}>
                  Board
                </button>

                <button onClick={() => setActiveView("list")}
                  className={`px-3 py-2 rounded-md font-semibold cursor-pointer
                    ${ activeView === "list" ? 
                        "bg-[#2A2B2E] text-white" : "text-gray-400" }`}>
                  List
                </button>

                <button onClick={() => setActiveView("timeline")}
                  className={`px-3 py-2 rounded-md font-semibold cursor-pointer
                    ${ activeView === "timeline" ? 
                        "bg-[#2A2B2E] text-white" : "text-gray-400" }`}>
                  Timeline
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/******** RIGHT SECTION ********/}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Filters */}
        <FitersandURL onFilter={setFilteredTasks} />

        {/* Views */}
        <div className="flex-1 overflow-hidden">

          {activeView === "board" && (<Board tasks={filteredTasks} />)}

          {activeView === "list" && (<List tasks={filteredTasks} />)}

          {activeView === "timeline" && (<Timeline tasks={filteredTasks} />)}
          
        </div>

      </div>
    </div>
  );
};

export default Tasks;