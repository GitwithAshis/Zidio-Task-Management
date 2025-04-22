const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    title: "About Zidio Task Management",
    description:
      "Zidio Task Management helps teams stay organized and boost productivity.",
    team: "We are a team of 7 dedicated developers, designers, and project managers.",
    project:
      "Built using the MERN stack, this platform allows task creation, assignment, and tracking in real-time.",
  });
});

module.exports = router;