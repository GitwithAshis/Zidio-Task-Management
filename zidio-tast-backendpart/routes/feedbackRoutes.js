
const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");
// const nodemailer = require("nodemailer");
const { io } = require("../server"); // Import socket instance

// Submit feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });

    await newFeedback.save();

    // Emit real-time update
    io.emit("newFeedback", newFeedback);
    console.log(newFeedback);
    res
      .status(201)
      .json({
        message: "Feedback submitted successfully",
        feedback: newFeedback,
      });
  } catch (error) {
    res.status(500).json({ error: "Error submitting feedback" });
  }
});

module.exports = router;
