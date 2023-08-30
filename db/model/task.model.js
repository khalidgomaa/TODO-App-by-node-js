import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['toDo', 'doing', 'done'],
      default: 'toDo'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    deadline: {
      type: Date
    }
  });
  const taskModel = mongoose.model("Task",taskSchema);
        export default taskModel
