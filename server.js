const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const testJWTController = require("./controllers/test-jwt");
const usersController = require("./controllers/users");
const profilesController = require("./controllers/profiles");
const eventsController = require("./controllers/events");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
server.use(cors());
server.use(express.json());

// Routes go here
server.use("/test-jwt", testJWTController);
server.use("/users", usersController);
server.use("/profiles", profilesController);
server.use("/events", eventsController);

server.listen(3000, () => {
  console.log("The express server is ready!");
});
