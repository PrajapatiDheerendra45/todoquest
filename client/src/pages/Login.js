import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
    console.log("response",response)
    dispatch(loginSuccess({ token: response.data.token }));
    navigate("/dashboard");
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="border p-2 w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white px-4 py-2">Login</button>
        <div>Does't Account <span> <a href="/Register">Register</a></span></div>
      </form>
    </div>
  );
};

export default Login;
