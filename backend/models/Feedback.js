import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  sentiment: String, // Positive, Negative, Neutral
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", FeedbackSchema);
