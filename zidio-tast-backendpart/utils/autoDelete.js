const cron = require("node-cron");
const Task = require("../models/Task");

// Auto delete tasks from trash after 30 days
cron.schedule("0 0 * * *", async () => {
  const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  try {
    const result = await Task.deleteMany({
      deleted: true,
      deletedAt: { $lte: THIRTY_DAYS_AGO },
    });

    console.log(`[Auto Delete] ${result.deletedCount} tasks permanently deleted`);
  } catch (err) {
    console.error("Auto delete failed:", err.message);
  }
});