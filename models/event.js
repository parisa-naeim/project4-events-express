const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Science & Education",
        "Technology",
        "Health & Wellbeing",
        "Art & Culture",
        "Career & Business",
        "Sports & Fitness",
        "Travel & Outdoor",
        "Social Activities",
      ],
    },
    type: {
      type: String,
      required: true,
      enum: [
        "Online",
        "In person",
      ],
    },
    cost: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },
    attendees: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("event", eventSchema);
