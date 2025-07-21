import express from "express";
import Feedback from "../models/Feedback.js";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const response = await axios.post("http://127.0.0.1:5000/analyze", {
      text: message,
    });
    const sentiment = response.data.sentiment;

    const newFeedback = new Feedback({ name, email, message, sentiment });
    await newFeedback.save();

    res.json({ success: true, feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
