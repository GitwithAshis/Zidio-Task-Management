import express from "express";
import Team from "../models/Team.js";
import { verifyToken, allowedRoles } from "../middlewares/authMiddleware.js"; // Custom middleware

const router = express.Router();

// Add a new team member
router.post("/", verifyToken, allowedRoles("admin"), async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newMember = new Team({ name, email, role });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: "Failed to add team member" });
  }
});

// Update a team member's details
router.put("/:id", verifyToken, allowedRoles("admin"), async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedMember = await Team.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: "Failed to update team member" });
  }
});

// Delete a team member
router.delete("/:id", verifyToken, allowedRoles("admin"), async (req, res) => {
  try {
    const deletedMember = await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted successfully", deletedMember });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

// Get all team members
router.get("/", verifyToken, allowedRoles("admin"), async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

export default router;