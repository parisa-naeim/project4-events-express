Events - Backend Express

## Description

This repository contains the backend implementation for the Events application. The backend utilizes JSON Web Token (JWT) for authentication, MongoDB as the database, and Express for handling HTTP requests.

## Deployment

The project is deployed to Render. Can be accessed via:

https://project4-events-express.onrender.com

The Client of Events app is deployed to Render, and can be accessed on this link:

https://project4-events-react.onrender.com/

## Features

Public routes:

- `/signup` and `/signin` with `POST` method is to sign in and sign up a new user
- `/events` with `GET` method is for getting the list of all events

Protected routes are as following and only requests with a valid token from a signed in user is passed to the corresponding route:

- `/events/` with `POST` method is for creating a new event
- `/events/:id` with `GET` method is for getting the details of an event
- `/events/:id` with `PUT` method is for updating the details of an event
- `/events/:id` with `DELETE` method is for deleting an event
- `/events/:id/join` with `POST` method to join the logged in user to the event
- `/events/:id/leave` with `POST` method to remove the logged in user from the attendess of the event

## Technologies:

- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- Mongoose
- bcrypt
- dotenv
- Render
- cors
- multer

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/parisa-naeim/project4-events-express
   cd project4-events-express
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
     ```env
     MONGODB_URI=<connection-string-to-mongo-db>
     JWT_SECRET=your_jwt_secret
     ```

3. Start the application:

   ```bash
   npx nodemon
   ```

4. Visit `localhost:3000`

## Contributors

- Parisa Naeim https://github.com/parisa-naeim

## Next Steps:

- Add time to event date
- Add profile to user
- Add image to user's profile
- Add notifications for each user
