import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/users/register", { name, email, password });
    navigate("/");
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input className="border p-2 w-full" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border p-2 w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-green-500 text-white px-4 py-2">Register</button>
      </form>
      <div>Already Account <span> <a href="/">Login</a></span></div>
    </div>
  );
};

export default Register;
