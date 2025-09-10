import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  course: { type: String,  required: [true, "Course is required"] }, // default course
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student"
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
