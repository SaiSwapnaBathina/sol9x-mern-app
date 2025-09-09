import express from "express";
import Student from "../models/Student.js";
import User from "../models/User.js";


// 🔹 STUDENT: View own profile
export const getOwnProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  };
  
  // 🔹 STUDENT: Update own profile
  export const updateOwnProfile = async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: req.body.name,
          email: req.body.email,
        },
        { new: true }
      ).select("-password");
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ message: "Failed to update profile" });
    }
  };
  
// 🔹 ADMIN: Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// 🔹 ADMIN: Add new student
export const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: "Failed to add student" });
  }
};

// 🔹 ADMIN: Update student
export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update student" });
  }
};

// 🔹 ADMIN: Delete student
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete student" });
  }
};

