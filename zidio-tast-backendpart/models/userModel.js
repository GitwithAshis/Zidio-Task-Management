
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "employee","manager"], //Differentiate the role for every individual, and delfault to employee.
    default: "employee",
  },
  phone: Number,
  location: String,
  birthday: Date,
  bio: String,
  // avatar: File,
  
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
