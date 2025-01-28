import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/todoSliece";

const TodoList = ({ setEditTodo }) => {
  const { todos } = useSelector((state) => state.todos);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <ul className="bg-white p-4 shadow-md rounded-md">
      {todos.length === 0 ? (
        <p className="text-gray-500">No to-dos found.</p>
      ) : (
        todos.map((todo) => (
          <li key={todo._id} className="flex justify-between items-center p-2 border-b">
            <div>
              <h3 className="text-lg font-bold">{todo.name}</h3>
              <p className="text-sm text-gray-600">{todo.description}</p>
            </div>
            <div>
              <button className="bg-yellow-500 text-white px-3 py-1 mr-2" onClick={() => setEditTodo(todo)}>Edit</button>
              <button className="bg-red-500 text-white px-3 py-1" onClick={() => dispatch(deleteTodo({ token, id: todo._id }))}>Delete</button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
