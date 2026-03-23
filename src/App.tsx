import { Route, Routes } from "react-router-dom"
import Tasks from "./Pages/Tasks"
import Login from "./Components/Login"
import Navbar from "./Components/Navbar"

const App = () => {
  return (
    <div className="min-h-screen bg-[#1E1F21] text-white">
      <Navbar />
      <div className="px-[5%] py-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;