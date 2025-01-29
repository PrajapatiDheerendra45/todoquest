import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, fetchTodos, deleteTodo } from "../redux/todoSliece";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const todos = useSelector((state) => state.todos.todos);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility

  useEffect(() => {
    if (token) dispatch(fetchTodos(token));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editTodo) {
      dispatch(updateTodo({ token, id: editTodo._id, data: { name, description } }));
      setEditTodo(null);
    } else {
      dispatch(addTodo({ token, name, description }));
    }

    setName("");
    setDescription("");
    setShowModal(false); // Close modal after submit
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo({ token, id }));
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setName(todo.name);
    setDescription(todo.description);
    setShowModal(true); // Open modal for editing
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setEditTodo(null); // Clear the edit state
    setName("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">To-Do List</h2>

      {/* TodoForm (Add or Edit) */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg max-w-xl mx-auto mb-8 space-y-4">
        <input
          className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="To-Do Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">
          {editTodo ? "Update" : "Add"} To-Do
        </button>
      </form>

      {/* TodoList (Display All Todos) */}
      <div className="space-y-4 max-w-xl mx-auto">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-center space-x-4 hover:shadow-xl transition duration-300"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-xl text-gray-800">{todo.name}</h3>
              <p className="text-gray-600">{todo.description}</p>
            </div>

            {/* Edit & Delete Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(todo)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit To-Do</h2>
            <form onSubmit={handleSubmit}>
              <input
                className="border-2 border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="To-Do Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="border-2 border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-between space-x-4">
                <button className="w-1/2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">
                  {editTodo ? "Update" : "Add"} To-Do
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-1/2 bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
