const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const upload = require("../middleware/upload-file.js");
const Event = require("../models/event.js");
const router = express.Router();

// Public Routes

// Protected Routes
// Show all events page
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({})
      .populate("organiser")
      .sort({ createAt: "desc" });
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.use(verifyToken);

// Show a Event page
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organiser")
      .populate("attendees");
    // .populate({ path: "bids", populate: "bidder" });
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Creating a new Event
router.post("/", async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organiser: req.user._id,
      attendees: [req.user._id],
    });
    res.status(201).json(await event.populate("organiser"));
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Update an existing event
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.organiser.equals(req.user._id)) {
      return res.status(403).json("You are not permitted to modify this event");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("organiser");

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

// Deleting a event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.organiser.equals(req.user._id)) {
      return res.status(403).json("You are not permitted to delete this event");
    }

    await event.deleteOne();
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// Join to a specific Event
router.post("/:eventId/join", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      res.status(404).json("This event dosen't exist.");
    }
    event.attendees.push(req.user);
    await event.save();

    await event.populate("attendees");
    const lastAttendee = event.attendees.pop();
    res.status(200).json(lastAttendee);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// leave a specific Event
router.post("/:eventId/leave", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      res.status(404).json("This event dosen't exist.");
    }
    // event.attendees.push(req.user);
    console.log("leaving...");
    const index = event.attendees.indexOf(req.user._id);
    console.log("index: ", index);
    event.attendees.splice(index, 1);
    await event.save();
    console.log("event saved");
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// file uploads for an event
router.post("/upload", upload.single("file"), (req, res) => {
  console.log("received file: " + req.file);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Access file information
  const file = req.file;
  const filePath = file.path; // Path to the uploaded file

  console.log("successful upload ", file);
  // Send the file path as a response or process it further
  res.send({
    message: "File uploaded successfully",
    url: file.filename,
  });
});

module.exports = router;
