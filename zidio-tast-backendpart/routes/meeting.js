
const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");

// POST - Create a new meeting
router.post("/", async (req, res) => {
  const { title, date, time, participants, description } = req.body;

  if (!title || !date || !time || !participants) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    const meeting = new Meeting({ title, date, time, participants, description });
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    console.error("Error saving meeting:", error);
    res.status(500).json({ message: "Server error while creating meeting." });
  }
});

// GET - Fetch all meetings
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ date: 1, time: 1 });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve meetings." });
  }
});

module.exports = router;
