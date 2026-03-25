import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Tasks from "./Pages/Tasks"
import Login from "./Components/Login"
import Navbar from "./Components/Navbar"

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-[#1E1F21] text-white">
      <Navbar isAuthenticated={isAuthenticated} logoutUser={handleLogout} />

      <div className="px-[5%] py-6">

        <Routes>
          <Route path="/" element={ isAuthenticated ? 
            <Navigate to="/tasks" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route path="/tasks" element={ isAuthenticated ? 
            <Tasks /> : <Navigate to="/" replace />} />
        </Routes>

      </div>
    </div>
  );
};

export default App;