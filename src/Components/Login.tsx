import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // SIGNUP
  const handleSignup = (): void => {
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created. Please log in.");

    setUsername("");
    setEmail("");
    setPassword("");

    setIsLogin(true);
  };

  // LOGIN
  const handleLogin = (): void => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Invalid email or password");
      return;
    }

    const parsedUser: {
      username: string;
      email: string;
      password: string;
    } = JSON.parse(storedUser);

    if (
      parsedUser.email === email &&
      parsedUser.password === password
    ) {
      localStorage.setItem("isAuthenticated", "true");

      setIsAuthenticated(true);

      navigate("/tasks", { replace: true });
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isLogin) handleLogin();
    else handleSignup();
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#1E1F21] text-[#E4E6EB]">
      <form onSubmit={handleSubmit} className="w-[400px] flex flex-col gap-5">

        {isLogin ? (
          <>
            <h1 className="text-3xl font-bold text-center text-white">
              Welcome to Project Tracker
            </h1>
            <p className="text-lg text-center text-gray-400">
              Please Sign In
            </p>
          </>
        ) : (
          <h2 className="text-2xl font-bold text-center text-white">
            Sign Up
          </h2>
        )}

        {!isLogin && (
          <input type="text" placeholder="Username" required value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className="bg-[#2F3033] p-2 rounded"/>)}

        <input type="email" placeholder="Email" required value={email} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="bg-[#2F3033] p-2 rounded"/>

        <input type="password" placeholder="Password" required value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="bg-[#2F3033] p-2 rounded"/>

        <button className="bg-blue-600 py-2 rounded cursor-pointer">
          Continue
        </button>

        <p className="text-center text-gray-400">
          {isLogin ? (
            <>
              Create account?{" "}
              <span onClick={() => setIsLogin(false)} className="text-blue-500 cursor-pointer">
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have account?{" "}
              <span onClick={() => setIsLogin(true)} className="text-blue-500 cursor-pointer">
                Sign In
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;