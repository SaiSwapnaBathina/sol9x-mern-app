import express from "express";
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getOwnProfile,
  updateOwnProfile
} from "../controllers/studentController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("your here testing student routes")
    res.send("✅ studentRoutes are working");
  });
  

// Student routes
router.get("/me/profile", protect, authorizeRoles("student"), getOwnProfile);
router.put("/me/profile", protect, authorizeRoles("student"), updateOwnProfile);

// Admin routes
router.get("/", protect, authorizeRoles("admin"), getAllStudents);
router.post("/", protect, authorizeRoles("admin"), addStudent);
router.put("/:id", protect, authorizeRoles("admin"), updateStudent);
router.delete("/:id", protect, authorizeRoles("admin"), deleteStudent);


export default router;

