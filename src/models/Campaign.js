const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    title: String,
    channel: String,
    messageBody: String,
    targetList: [String],
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    summary: {
      characterCount: Number,
      keywords: [String],
      fakeResponseRate: String,
      aiHint: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(`Campaign`, CampaignSchema)