const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  subtasks: [
    {
      type: String,
      title: String,
      completed: { type: Boolean, default: false },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
  dueDate: Date,
  deleted: { type: Boolean, default: false },
  deletedAt: {
    type: Date,
    default: null,
  },
  deletedBy: {
    type: String,
    default: null, // or mongoose.Schema.Types.ObjectId if you want reference
  },
  progress: { type: Number, default: 0 },
  assignedTo: {
    type: String,
    ref: "User",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);