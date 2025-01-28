import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/todoSliece.js";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    if (token) dispatch(fetchTodos(token));
  }, [dispatch, token]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">To-Do List</h2>
      <TodoForm editTodo={editTodo} setEditTodo={setEditTodo} />
      <TodoList setEditTodo={setEditTodo} />
    </div>
  );
};

export default Dashboard;
