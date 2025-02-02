import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Todo', todoSchema);
