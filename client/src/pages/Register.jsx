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
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", { name, email, password });
      
      // Success toast
      alert("Registration successful! Please login.");
      
      navigate("/");  // Redirect to login page after registration
    } catch (error) {
      console.error("Error during registration", error);
      
      // Error toast
     alert("Registration failed. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create an Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <input
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span className="text-green-500 hover:text-green-700">
              <a href="/">Login</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
