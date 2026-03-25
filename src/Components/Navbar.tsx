import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo1.png";

type NavbarProps = {
  isAuthenticated: boolean;
  logoutUser: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  logoutUser,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full px-[5%] py-4 bg-[#2A2B2E] flex justify-between items-center">
      
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-white">
          Project Tracker
        </h1>
      </div>

      {isAuthenticated && location.pathname === "/tasks" && (
        <button
          onClick={() => {
            logoutUser();
            navigate("/", { replace: true });
          }}
          className="px-4 py-2 border-2 border-red-400 text-red-400 rounded-full cursor-pointer"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;