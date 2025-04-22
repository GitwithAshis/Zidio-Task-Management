import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  email:  { type: String, unique: true },
  role: {
    type: String,
    enum: ["employee", "manager"],
    default: "employee",
  },
});

export default mongoose.model("Team", teamSchema);