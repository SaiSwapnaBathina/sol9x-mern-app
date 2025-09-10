import express from "express";
import User from "../models/User.js";
import Student from "../models/Student.js"; // ✅ import Student model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

// Utility: Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// @desc    Signup
// @route   POST /api/auth/signup
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role,course });

    //creating student document dynamically while sign up 
    if (role === "student") {
        await Student.create({
          name: user.name,
          email: user.email,
          course: user.course, // default course
          enrollmentDate: new Date()
        });
      }
  
    const token = generateToken(user);
    res.status(201).json({
      token,
      role: user.role,
      message: "Signup successful"
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// @desc    Login
// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    
    const token = generateToken(user);
    res.status(200).json({
      token,
      role: user.role,
      message: "Login successful"
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
