import { useContext, useState } from "preact/hooks";
import type { IUser } from "../types/event";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

export default function Login() {
  //navigation
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Error");
  }
  const { state, login } = context;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const users: IUser[] = await response.json();
      const foundUser = users.find(
        (user) => user.userName === username && user.password === password
      );
      if (foundUser) {
        login(foundUser);
        return navigate("/");
      } else {
        setError("Invalid Username and Password");
      }
    } catch (error: any) {
      setError("Invalid Username and Password");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="user"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your user name"
                onChange={(e: any) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              class="font-bold dark:bg-black border-secondary bg-teal-500 py-2 px-4 text-white rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
