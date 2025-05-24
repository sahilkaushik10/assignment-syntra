const Campaign = require("../models/Campaign");
const generateSumary = require("../utils/summary");

/* defining a queue array - In memory */
const queue = [];

setInterval(async () => {
  if (queue.length === 0) return;

  const campaign = queue.shift();

  try {
    const summary = generateSumary(campaign?.messageBody);
    await Campaign.findByIdAndUpdate(campaign._id, {
      summary,
      status: "completed",
    });
    console.log(`processed campaign: ${campaign._id}`);
  } catch (e) {
    console.log(`processing error: ${err.message}`);
    await Campaign.findByIdAndUpdate(campaign._id, "failed");
  }
}, 2000);

module.exports = {
  addToQueue: (campaign) => queue.push(campaign),
};
