import Todo from '../models/todoModel.js';

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

export const addTodo = async (req, res) => {
  const { name, description } = req.body;
  const todo = await Todo.create({ user: req.user.id, name, description });
  res.json(todo);
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
