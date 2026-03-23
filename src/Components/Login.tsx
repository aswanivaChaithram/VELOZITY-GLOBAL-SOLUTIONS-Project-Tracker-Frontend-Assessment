import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created. Please log in with your new credentials.");

    setUsername("");
    setEmail("");
    setPassword("");

    setIsLogin(true);
  };

  const handleLogin = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Invalid email or password");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (
      parsedUser.email === email &&
      parsedUser.password === password
    ) {
      navigate("/tasks");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) handleLogin();
    else handleSignup();
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#1E1F21] text-[#E4E6EB]">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] flex flex-col gap-5"
      >

        {isLogin ? (
          <>
            <h1 className="text-3xl font-bold text-center text-white">
              Welcome to Project Tracker
            </h1>
            <p className="text-lg text-center text-gray-400">
              To get started, Please Sign In
            </p>
          </>
        ) : (
          <h2 className="text-2xl font-bold text-center text-white">
            Sign Up
          </h2>
        )}

        {!isLogin && (
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="bg-[#2F3033] border-2 border-[#3A3B3F] p-2 rounded 
              focus:border-blue-500 outline-none text-white"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-[#2F3033] border-2 border-[#3A3B3F] p-2 rounded 
            focus:border-blue-500 outline-none text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-[#2F3033] border-2 border-[#3A3B3F] p-2 rounded 
            focus:border-blue-500 outline-none text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Continue
        </button>

        {isLogin ? (
          <p className="text-sm text-center text-gray-400">
            Create a new Account?{" "}
            <span
              onClick={() => setIsLogin(false)}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setIsLogin(true)}
              className="text-blue-500 cursor-pointer"
            >
              Sign In
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;