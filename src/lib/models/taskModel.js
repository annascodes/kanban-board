const { default: mongoose } = require("mongoose");

 
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    column: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,  
  }
);

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)

export default Task;