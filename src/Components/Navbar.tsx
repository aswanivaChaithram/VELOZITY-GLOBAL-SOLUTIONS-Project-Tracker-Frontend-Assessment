import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-full px-[5%] py-4 bg-[#2A2B2E] flex justify-between items-center shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
      
      {/* Left */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-white">
          Project Tracker
        </h1>
      </div>

      {/* Right */}
      {isLoggedIn && location.pathname === "/tasks" && (
        <button
          onClick={handleLogout}
          className="px-5 py-2 border-2 border-red-400 text-red-400 font-bold rounded-full 
          bg-transparent hover:bg-red-500/10 transition cursor-pointer"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;