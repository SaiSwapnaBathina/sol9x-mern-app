import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  enrollmentDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
