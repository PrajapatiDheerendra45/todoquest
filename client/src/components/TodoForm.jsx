import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../redux/todoSliece";

const TodoForm = ({ editTodo, setEditTodo }) => {
  const [name, setName] = useState(editTodo ? editTodo.name : "");
  const [description, setDescription] = useState(editTodo ? editTodo.description : "");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Token in API Call:", token); // ✅ Debugging token
    if (!name.trim()) return;
  
    if (editTodo) {
      dispatch(updateTodo({ token, id: editTodo._id, data: { name, description } }));
      setEditTodo(null);
    } else {
      dispatch(addTodo({ token, name, description }));
    }
    
    setName("");
    setDescription("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md mb-4">
      <input className="border p-2 w-full mb-2" type="text" placeholder="To-Do Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="border p-2 w-full mb-2" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2">{editTodo ? "Update" : "Add"} To-Do</button>
    </form>
  );
};

export default TodoForm;
